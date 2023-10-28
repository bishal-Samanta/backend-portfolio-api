import { Request , Response } from "express"
import { Code } from "../enums/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enums/status.enum";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getTechstacks = async ( req : Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    
    const { search , page , limit } = req.query;

  const filterOptions : any = {
    where: {}, 
  };

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


   if(search){
    filterOptions.where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      }
    ];
  }
    
    
    
    try{
        const techstacks = await prisma.techStack.findMany({
            ...filterOptions
        });
        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Techstack data retrived" , techstacks )
        )

    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!" ,  {error : err })
         )
    }
}

export const getTechstack = async ( req : Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try{
        const techstack = await prisma.techStack.findUnique({
            where : {
                id : Number(req.params.id),
            }
        });
        if(!techstack){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No techstack data found with the given id : ${req.params.id}`)
            )
        }

        return res.status(Code.OK).send( 
            new HttpResponse(Code.OK , Status.OK , "Techstack data retrived." , {...techstack})
         )
    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!" ,  {error : err } )
         )
    }
}

export const createTechstack = async ( req : Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try{
        const createTechstack = await prisma.techStack.create({
            data: {
                ...req.body
            }
        })

        return res.status(Code.CREATED).send(
            new HttpResponse(Code.CREATED , Status.CREATED , "Techstack Data Created!" , {...createTechstack })
        )
    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!" ,  {error : err })
         )
    }
}

export const updateTechstack = async ( req : Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try{
        const techstack = await prisma.techStack.findUnique({
            where : {
                id : Number(req.params.id),
            }
        });
        if(!techstack){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No techstack data found with the given id : ${req.params.id}`)
            )
        }

        const updatetechStack = await prisma.techStack.update({
            where : {
                id : Number(req.params.id)
            },
            data : {
                ...req.body
            }
        }) 

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Techstack Data Updated" , {...updatetechStack})
        )

    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!",  {error : err })
         )
    }
}

export const deleteTechstack = async ( req : Request , res : Response ) : Promise<Response<HttpResponse>> =>{

    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);

    try{
        const techstack = await prisma.techStack.findUnique({
            where : {
                id : Number(req.params.id),
            }
        });


        if(!techstack){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `No techstack data found with the given id : ${req.params.id}`)
            )
        };

        const deleteTechstack = await prisma.techStack.delete({
            where: {
                id : Number(req.params.id)
            }
        });

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Techtsck data deleted")
        )

    }
    catch(err : unknown ){
        return res.status(Code.INTERNAME_SERVER_ERROR ).send(
            new HttpResponse(Code.INTERNAME_SERVER_ERROR , Status.INTERNAL_SERVER_ERROR , "An internal error occored from catch block!" , {error : err } )
        )
    }
}