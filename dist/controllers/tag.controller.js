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
exports.deleteTag = exports.createTag = exports.updateTag = exports.getTag = exports.getTags = void 0;
const response_1 = require("../domain/response");
const code_enum_1 = require("../enums/code.enum");
const status_enum_1 = require("../enums/status.enum");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield prisma.tag.findMany();
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Tags Data retrived!", tags));
    }
    catch (err) {
        console.log(err);
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.getTags = getTags;
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield prisma.tag.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!tag) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Tag with id : ${req.params.id} is not exist in the database!`));
        }
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Tag Data retrived!", tag));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.getTag = getTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield prisma.tag.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!tag) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Tag with id : ${req.params.id} is not exist in the database!`));
        }
        const updateTag = yield prisma.tag.update({
            where: {
                id: Number(req.params.id),
            },
            data: Object.assign({}, req.body),
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Tag with id : ${req.params.id} is updated!`, updateTag));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.updateTag = updateTag;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const tag = yield prisma.tag.create({
            data: Object.assign({}, req.body),
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Tag with id : ${req.params.id} is created!`, tag));
    }
    catch (err) {
        console.log(err);
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.createTag = createTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield prisma.tag.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!tag) {
            return res
                .status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Tag with id : ${req.params.id} is not exist in the database!`));
        }
        const deleteTag = yield prisma.tag.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        return res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, `Tag with id : ${req.params.id} is delated!`, deleteTag));
    }
    catch (err) {
        return res
            .status(code_enum_1.Code.INTERNAME_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAME_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, "An internal error occored from catch block!", { err }));
    }
});
exports.deleteTag = deleteTag;
