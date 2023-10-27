import { Application,  Request , Response , Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    definition:{
        openapi : "3.0.0",
        info : {
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
    
  
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = ( app: Application , port: number | string )  =>{
    //swagger page
    app.use("/docs" , swaggerUi.serve , swaggerUi.setup(swaggerSpec))

    //Docs in json format 
    app.get("/docs.json" , (req: Request , res: Response) =>{
        res.setHeader("Content-Type" , "application/json");
        res.send(swaggerSpec);
    })

    console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;