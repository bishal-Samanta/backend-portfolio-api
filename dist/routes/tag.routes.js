"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const tagRoutes = (0, express_1.Router)();
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
tagRoutes.get("/", tag_controller_1.getTags);
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
tagRoutes.post("/", tag_controller_1.createTag);
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
tagRoutes.get("/:id", tag_controller_1.getTag);
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
tagRoutes.patch("/:id", tag_controller_1.updateTag);
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
tagRoutes.delete("/:id", tag_controller_1.deleteTag);
exports.default = tagRoutes;
