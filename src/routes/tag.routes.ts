import { Router } from "express";
import { createTag, deleteTag, getTag, getTags, updateTag } from "../controllers/tag.controller";

const tagRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operations related to tags
 */

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Retrieve a list of tags
 *     tags:
 *       - Tags
 *     responses:
 *       '200':
 *         description: A list of tags.
 */
tagRoutes.get("/", getTags);

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     tags:
 *       - Tags
 *     responses:
 *       '201':
 *         description: Tag created successfully.
 */
tagRoutes.post("/", createTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Retrieve a tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag to retrieve.
 *     responses:
 *       '200':
 *         description: A tag object.
 *       '404':
 *         description: Tag not found.
 */
tagRoutes.get("/:id", getTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   patch:
 *     summary: Update a tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag to update.
 *     responses:
 *       '200':
 *         description: Tag updated successfully.
 *       '404':
 *         description: Tag not found.
 */
tagRoutes.patch("/:id", updateTag);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag to delete.
 *     responses:
 *       '204':
 *         description: Tag deleted successfully.
 *       '404':
 *         description: Tag not found.
 */
tagRoutes.delete("/:id", deleteTag);

export default tagRoutes;
