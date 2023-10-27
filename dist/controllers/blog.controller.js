"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.createBlog = exports.updateBlog = exports.getBlog = exports.getBlogs = void 0;
const response_1 = require("../domain/response");
const code_enum_1 = require("../enums/code.enum");
const status_enum_1 = require("../enums/status.enum");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma.blog.findMany({
            include: {
                tags: true
            }
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Blogs Data retrived!", blogs));
    }
    catch (err) {
        console.log(err);
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.getBlogs = getBlogs;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                tags: true
            }
        });
        if (!blog) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Blog with id : ${req.params.id} is not exist in the database!`));
        }
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Blog Data retrived!", blog));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.getBlog = getBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    const tagsArray = requestBody.tags ? requestBody === null || requestBody === void 0 ? void 0 : requestBody.tags : [];
    requestBody.tags ? delete requestBody.tags : "";
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!blog) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Blog with id : ${req.params.id} is not exist in the database!`));
        }
        //Frist update the data
        const updateBlog = yield prisma.blog.update({
            where: {
                id: Number(req.params.id),
            },
            data: Object.assign(Object.assign({}, requestBody), { tags: {
                    set: tagsArray.map((id) => ({ id }))
                } }),
            include: {
                tags: true
            }
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Blog with id : ${req.params.id} is updated!`, updateBlog));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.updateBlog = updateBlog;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = req.body;
    const tagsArray = requestBody.tags ? requestBody === null || requestBody === void 0 ? void 0 : requestBody.tags : [];
    requestBody.tags ? delete requestBody.tags : "";
    try {
        const blog = yield prisma.blog.create({
            data: Object.assign(Object.assign({}, requestBody), { tags: {
                    connect: tagsArray.map((id) => ({ id }))
                } }),
            include: {
                tags: true
            }
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Blog with id : ${req.params.id} is created!`, blog));
    }
    catch (err) {
        console.log(err);
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.createBlog = createBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!blog) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Blog with id : ${req.params.id} is not exist in the database!`));
        }
        const deleteBlog = yield prisma.blog.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Blog with id : ${req.params.id} is delated!`));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.deleteBlog = deleteBlog;
