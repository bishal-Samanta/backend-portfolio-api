import { Router } from "express";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/project.controller";

const projectRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operations related to projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags:
 *       - Projects
 *     responses:
 *       '200':
 *         description: A list of projects.
 */
projectRoutes.get("/", getProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     responses:
 *       '201':
 *         description: Project created successfully.
 */
projectRoutes.post("/", createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to retrieve.
 *     responses:
 *       '200':
 *         description: A project object.
 *       '404':
 *         description: Project not found.
 */
projectRoutes.get("/:id", getProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   patch:
 *     summary: Update a project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to update.
 *     responses:
 *       '200':
 *         description: Project updated successfully.
 *       '404':
 *         description: Project not found.
 */
projectRoutes.patch("/:id", updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to delete.
 *     responses:
 *       '204':
 *         description: Project deleted successfully.
 *       '404':
 *         description: Project not found.
 */
projectRoutes.delete("/:id", deleteProject);

export default projectRoutes;
