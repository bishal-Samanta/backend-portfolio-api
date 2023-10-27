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
exports.deleteProject = exports.createProject = exports.updateProject = exports.getProject = exports.getProjects = void 0;
const response_1 = require("../domain/response");
const client_1 = require("@prisma/client");
const code_enum_1 = require("../enums/code.enum");
const status_enum_1 = require("../enums/status.enum");
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const projects = yield prisma.project.findMany({
            include: {
                techstacks: true
            }
        });
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Projects data retrived", projects));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.getProjects = getProjects;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const project = yield prisma.project.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                techstacks: true
            }
        });
        if (!project) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No project data found with the given id : ${req.params.id}`));
        }
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Project data retrived", Object.assign({}, project)));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!"));
    }
});
exports.getProject = getProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    const updatedData = Object.assign({}, req.body);
    const techstacksData = updatedData.techstacks;
    delete updatedData.techstacks;
    try {
        const project = yield prisma.project.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if (!project) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No project data found with the given id : ${req.params.id}`));
        }
        //First updating the data
        const updateProject = yield prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: Object.assign({}, updatedData)
        });
        //Then updating the techstacks 
        const updateTechstackPart = yield prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                techstacks: {
                    set: techstacksData.map((id) => ({ id }))
                }
            }
        });
        //Get all the data again with relations
        const projectDataWithTechstackDetails = yield prisma.project.findMany({
            where: {
                id: Number(req.params.id)
            },
            include: {
                techstacks: true
            }
        });
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Project Data Updated", Object.assign({}, projectDataWithTechstackDetails)));
    }
    catch (err) {
        console.log(err);
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.updateProject = updateProject;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    const requestData = Object.assign({}, req.body);
    const techstacksData = requestData.techstacks;
    delete requestData.techstacks;
    try {
        const createProject = yield prisma.project.create({
            data: Object.assign(Object.assign({}, requestData), { techstacks: {
                    connect: techstacksData.map((el) => ({ id: el }))
                } })
        });
        return res.status(code_enum_1.Code.CREATED).send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, "Project Data Created!", Object.assign({}, createProject)));
    }
    catch (err) {
        console.log(typeof err);
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", err));
    }
});
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const project = yield prisma.project.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if (!project) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No project data found with the gien id : ${req.params.id}`));
        }
        const deleteProject = yield prisma.project.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Project Data  deleted!"));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!"));
    }
});
exports.deleteProject = deleteProject;
