"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rest API for portfolio (Blog and Project)",
            version: "1.0.0",
            description: "This is an api for project and blog in portfolio application.",
        }
    },
    tags: [
        {
            name: "Blogs",
            description: "Operations related to blogs",
        },
        {
            name: "Tags",
            description: "Operations related to tags",
        },
        {
            name: "Projects",
            description: "Operations related to projects",
        },
        {
            name: "Techstacks",
            description: "Operations related to tech stacks",
        }
    ],
    // Include all route files with Swagger tags
    apis: [
        "./src/routes/blog.routes.ts",
        "./src/routes/tag.routes.ts",
        "./src/routes/project.routes.ts",
        "./src/routes/techstack.routes.ts",
    ]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    //swagger page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    //Docs in json format 
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
};
exports.default = swaggerDocs;
