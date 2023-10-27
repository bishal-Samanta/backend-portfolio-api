"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const techstack_controller_1 = require("../controllers/techstack.controller");
const techstackRoutes = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Techstacks
 *   description: Operations related to tech stacks
 */
/**
 * @swagger
 * /api/techstacks:
 *   get:
 *     summary: Retrieve a list of tech stacks
 *     tags:
 *       - Techstacks
 *     responses:
 *       '200':
 *         description: A list of tech stacks.
 */
techstackRoutes.get("/", techstack_controller_1.getTechstacks);
/**
 * @swagger
 * /api/techstacks:
 *   post:
 *     summary: Create a new tech stack
 *     tags:
 *       - Techstacks
 *     responses:
 *       '201':
 *         description: Tech stack created successfully.
 */
techstackRoutes.post("/", techstack_controller_1.createTechstack);
/**
 * @swagger
 * /api/techstacks/{id}:
 *   get:
 *     summary: Retrieve a tech stack by ID
 *     tags:
 *       - Techstacks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tech stack to retrieve.
 *     responses:
 *       '200':
 *         description: A tech stack object.
 *       '404':
 *         description: Tech stack not found.
 */
techstackRoutes.get("/:id", techstack_controller_1.getTechstack);
/**
 * @swagger
 * /api/techstacks/{id}:
 *   patch:
 *     summary: Update a tech stack by ID
 *     tags:
 *       - Techstacks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tech stack to update.
 *     responses:
 *       '200':
 *         description: Tech stack updated successfully.
 *       '404':
 *         description: Tech stack not found.
 */
techstackRoutes.patch("/:id", techstack_controller_1.updateTechstack);
/**
 * @swagger
 * /api/techstacks/{id}:
 *   delete:
 *     summary: Delete a tech stack by ID
 *     tags:
 *       - Techstacks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tech stack to delete.
 *     responses:
 *       '204':
 *         description: Tech stack deleted successfully.
 *       '404':
 *         description: Tech stack not found.
 */
techstackRoutes.delete("/:id", techstack_controller_1.deleteTechstack);
exports.default = techstackRoutes;
