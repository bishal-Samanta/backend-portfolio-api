import { Response , Request} from "express"
import { HttpResponse } from "../domain/response";
import { PrismaClient } from "@prisma/client";
import { Code } from "../enums/code.enum";
import { Status } from "../enums/status.enum";


const prisma = new PrismaClient();

export const getProjects = async (req : Request , res : Response) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    // //Filtering data 
    // const { tag , search  } = req.query;

    // const filterOptions : any = {};

    // const modifiedTagToArray =  Array.isArray(tag) ? tag.map((el) => Number(el)) : [ Number(tag) ]


    // if(tag){
    //   filterOptions.techstacks = {
    //     some: {
    //       id: {
    //         in: modifiedTagToArray
    //       }
    //     }
    //   }
    // }

    // if(search){
    //   filterOptions.OR = [
    //     {
    //       title: {
    //         contains: search,
    //       },
    //     },
    //     {
    //       content: {
    //         contains: search,
    //       },
    //     },
    //     {
    //       sub_title: {
    //         contains: search,
    //       },
    //     }
    //   ];
    // }

    //Query Paramas
   const { tag , search , page , limit } = req.query;

   const filterOptions : any = {
    where: {}, 
   };

   const modifiedTagToArray =  Array.isArray(tag) ? tag.map((el) => Number(el)) : [ Number(tag) ]

   //Give 10 data by default based on the page value
   if(page  && !limit){
    const defaultData = 10
    const skip = (Number(page) - 1) * defaultData;
    filterOptions.skip = skip;
    filterOptions.take = Number(defaultData);
   }

   if(!page && limit){
    const skip = 0
    filterOptions.skip = skip;
    filterOptions.take = Number(limit);
   }

   //Give dynatic data 
   else if(page && limit){
    const skip = (Number(page) - 1) * Number(limit);
    filterOptions.skip = skip;
    filterOptions.take = Number(limit);
   }

   

  
   if(tag){
     filterOptions.where.techstacks = {
       some: {
         id: {
           in: modifiedTagToArray
         }
       }
     }
   }

   if(search){
     filterOptions.where.OR = [
       {
         title: {
           contains: search,
         },
       },
       {
         content: {
           contains: search,
         },
       },
       {
         sub_title: {
           contains: search,
         },
       }
     ];
   }

    try{
       const projects = await prisma.project.findMany({
            include : {
                techstacks : true
            },
            ...filterOptions
       });
       return res.status(Code.OK).send(
        new HttpResponse(Code.OK , Status.OK , "Projects data retrived" , projects )
       )
    }
    catch(err : any ){

        console.log(err)
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
           new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!",{ error: err }  )
        )
    }
}

export const getProject = async (req : Request , res : Response) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try{
       const project = await prisma.project.findUnique({
        where : {
            id : Number(req.params.id), 
        },
        include : {
            techstacks : true
        }
       });

       if(!project){
        return res.status(Code.NOT_FOUND).send(
            new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No project data found with the given id : ${req.params.id}`)
        )
       }

       return res.status(Code.OK).send(
        new HttpResponse(Code.OK , Status.OK , "Project data retrived" , {...project } )
       )
    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
           new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!")
        )
    }
}


export const updateProject = async (req : Request , res : Response) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    const updatedData = {...req.body};
    const techstacksData = updatedData.techstacks ;
    delete updatedData.techstacks ; 
    
    
    
    try{

        const project = await prisma.project.findUnique({
            where : {
                id : Number(req.params.id), 
            }
           });

        if(!project ){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No project data found with the given id : ${req.params.id}`)
            )
        }

        //First updating the data
        const updateProject = await prisma.project.update({
            where : {
                id : Number(req.params.id)
            },
            data : {
                ...updatedData
            }
        })

        //Then updating the techstacks 
        const updateTechstackPart = await prisma.project.update({
            where : {
                id : Number(req.params.id)
            },
            data : {
                techstacks : {
                    set : techstacksData.map(( id : number ) => ({id}))
                }
            }
        })

        //Get all the data again with relations
        const projectDataWithTechstackDetails = await prisma.project.findMany({
            where : {
                id : Number(req.params.id)
            },
            include : {
                techstacks : true 
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Project Data Updated" , {...projectDataWithTechstackDetails })
        )



    }
    catch(err : unknown  ){
        console.log(err);
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!" , {error : err} )
         )
    }
}


export const createProject = async (req : Request , res : Response) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    const requestData = {...req.body };
    const techstacksData = requestData.techstacks;
    delete requestData.techstacks;


    try{

        const createProject = await prisma.project.create({
            data: {
                ...requestData,
                techstacks : {
                    connect : techstacksData.map((el : number ) => ({ id : el }))
                }
            }
        })


        return res.status(Code.CREATED).send(
            new HttpResponse(Code.CREATED , Status.CREATED , "Project Data Created!" , {...createProject })
        )



    }
    catch(err : any ){
        console.log(typeof err)
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!", err )
         )
    }
}


export const deleteProject = async (req : Request , res : Response) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    try{

        const project = await prisma.project.findUnique({
            where : {
                id : Number(req.params.id), 
            }
           });

        if(!project){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No project data found with the gien id : ${req.params.id}`)
            )
        }

        const deleteProject = await prisma.project.delete({
            where: {
                id : Number(req.params.id)
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Project Data  deleted!" )
        )



    }
    catch(err){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!")
         )
    }
}




