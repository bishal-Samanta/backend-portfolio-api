import { Request, Response } from "express";
import { HttpResponse } from "../domain/response";
import { Code } from "../enums/code.enum";
import { Status } from "../enums/status.enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBlogs = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    
    const blogs = await prisma.blog.findMany({
        include: {
            tags : true
        }
    })

    return res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Blogs Data retrived!" , blogs ));

  } catch (err) {
    console.log(err);
    return res
      .status(Code.INTERNAME_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAME_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An internal error occored from catch block!",
          { err }
        )
      );
  }
};

export const getBlog= async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include : {
        tags : true
      }
    });

    if (!blog) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Blog with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    return res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Blog Data retrived!", blog));
  } catch (err) {
    return res
      .status(Code.INTERNAME_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAME_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An internal error occored from catch block!",
          { err }
        )
      );
  }
};

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {

  const requestBody = req.body;
  const tagsArray = requestBody.tags ? requestBody?.tags : [];
  requestBody.tags ? delete requestBody.tags : "";


  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!blog) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Blog with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    //Frist update the data
    const updateBlog = await prisma.blog.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...requestBody ,
        tags : {
            set : tagsArray.map(( id : number ) => ({id}))
        }
      },
      include : {
        tags : true
      }
    });


    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Blog with id : ${req.params.id} is updated!`,
          updateBlog
        )
      );
  } catch (err) {
    return res
      .status(Code.INTERNAME_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAME_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An internal error occored from catch block!",
          { err }
        )
      );
  }
};

export const createBlog = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  const requestBody = req.body;
  const tagsArray = requestBody.tags ? requestBody?.tags : [];
  requestBody.tags ? delete requestBody.tags : "";


  try {
    
    const blog = await prisma.blog.create({
        data : {
            ...requestBody,
            tags : {
                connect : tagsArray.map((id : number ) => ({id}))
            }
        },
        include : {
            tags : true
        }
    })

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Blog with id : ${req.params.id} is created!`,
          blog
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(Code.INTERNAME_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAME_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An internal error occored from catch block!",
          { err }
        )
      );
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!blog) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Blog with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    const deleteBlog = await prisma.blog.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Blog with id : ${req.params.id} is delated!`,
          
        )
      );
  } catch (err) {
    return res
      .status(Code.INTERNAME_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAME_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          "An internal error occored from catch block!",
          { err }
        )
      );
  }
};
