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
exports.deleteTechstack = exports.updateTechstack = exports.createTechstack = exports.getTechstack = exports.getTechstacks = void 0;
const code_enum_1 = require("../enums/code.enum");
const response_1 = require("../domain/response");
const status_enum_1 = require("../enums/status.enum");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTechstacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const techstacks = yield prisma.techStack.findMany();
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Techstack data retrived", techstacks));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.getTechstacks = getTechstacks;
const getTechstack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const techstack = yield prisma.techStack.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if (!techstack) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No techstack data found with the given id : ${req.params.id}`));
        }
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Techstack data retrived.", Object.assign({}, techstack)));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.getTechstack = getTechstack;
const createTechstack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const createTechstack = yield prisma.techStack.create({
            data: Object.assign({}, req.body)
        });
        return res.status(code_enum_1.Code.CREATED).send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, "Techstack Data Created!", Object.assign({}, createTechstack)));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.createTechstack = createTechstack;
const updateTechstack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const techstack = yield prisma.techStack.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if (!techstack) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No techstack data found with the given id : ${req.params.id}`));
        }
        const updatetechStack = yield prisma.techStack.update({
            where: {
                id: Number(req.params.id)
            },
            data: Object.assign({}, req.body)
        });
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Techstack Data Updated", Object.assign({}, updatetechStack)));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.updateTechstack = updateTechstack;
const deleteTechstack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try {
        const techstack = yield prisma.techStack.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if (!techstack) {
            return res.status(code_enum_1.Code.NOT_FOUND).send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `No techstack data found with the given id : ${req.params.id}`));
        }
        ;
        const deleteTechstack = yield prisma.techStack.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(code_enum_1.Code.OK).send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Techtsck data deleted"));
    }
    catch (err) {
        return res.status(code_enum_1.Code.INTERNAME_SERVER_ERROR).send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { error: err }));
    }
});
exports.deleteTechstack = deleteTechstack;
