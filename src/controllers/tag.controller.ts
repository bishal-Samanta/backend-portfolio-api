import { Request, Response } from "express";
import { HttpResponse } from "../domain/response";
import { Code } from "../enums/code.enum";
import { Status } from "../enums/status.enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTags = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {

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
        tag_name: {
          contains: search,
        },
      },
      {
        tag_description: {
          contains: search,
        },
      }
    ];
  }




  try {
    const tags = await prisma.tag.findMany({
      ...filterOptions
    });
    return res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Tags Data retrived!", tags));
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

export const getTag = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!tag) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Tag with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    return res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Tag Data retrived!", tag));
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

export const updateTag = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!tag) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Tag with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    const updateTag = await prisma.tag.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Tag with id : ${req.params.id} is updated!`,
          updateTag
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

export const createTag = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  console.log(req.body);
  try {
    const tag = await prisma.tag.create({
      data: {
        ...req.body,
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Tag with id : ${req.params.id} is created!`,
          tag
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

export const deleteTag = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!tag) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Tag with id : ${req.params.id} is not exist in the database!`
          )
        );
    }

    const deleteTag = await prisma.tag.delete({
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
          `Tag with id : ${req.params.id} is delated!`,
          deleteTag
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
