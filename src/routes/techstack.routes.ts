import { Router } from "express";
import { createTechstack, deleteTechstack, getTechstack, getTechstacks, updateTechstack } from "../controllers/techstack.controller";

const techstackRoutes = Router();

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
techstackRoutes.get("/", getTechstacks);

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
techstackRoutes.post("/", createTechstack);

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
techstackRoutes.get("/:id", getTechstack);

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
techstackRoutes.patch("/:id", updateTechstack);

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
techstackRoutes.delete("/:id", deleteTechstack);

export default techstackRoutes;
