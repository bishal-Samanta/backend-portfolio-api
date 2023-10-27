"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const blogRoutes = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Operations related to blogs
 */
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve a list of blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       '200':
 *         description: A list of blogs.
 */
blogRoutes.get("/", blog_controller_1.getBlogs);
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags:
 *       - Blogs
 *     responses:
 *       '201':
 *         description: Blog created successfully.
 */
blogRoutes.post("/", blog_controller_1.createBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a blog by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to retrieve.
 *     responses:
 *       '200':
 *         description: A blog object.
 *       '404':
 *         description: Blog not found.
 */
blogRoutes.get("/:id", blog_controller_1.getBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to update.
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *       '404':
 *         description: Blog not found.
 */
blogRoutes.patch("/:id", blog_controller_1.updateBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to delete.
 *     responses:
 *       '204':
 *         description: Blog deleted successfully.
 *       '404':
 *         description: Blog not found.
 */
blogRoutes.delete("/:id", blog_controller_1.deleteBlog);
exports.default = blogRoutes;
