import { Router } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blog.controller";

const blogRoutes = Router();

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
blogRoutes.get("/", getBlogs);

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
blogRoutes.post("/", createBlog);

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
blogRoutes.get("/:id", getBlog);

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
blogRoutes.patch("/:id", updateBlog);

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
blogRoutes.delete("/:id", deleteBlog);

export default blogRoutes;
