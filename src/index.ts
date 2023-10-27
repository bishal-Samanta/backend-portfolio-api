import express, { Application, Request, Response } from "express";
import ip from "ip";
import cors from "cors";
import { Code } from "./enums/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enums/status.enum";
import blogRoutes from "./routes/blog.routes";
import projectRotes from "./routes/project.routes";
import techstackRoutes from "./routes/techstack.routes";
import morgan from "morgan";
import tagRoutes from "./routes/tag.routes";
import swaggerDocs from "./docs/swaggerDef";

//App 
const app: Application = express();
const port: string | number = process.env.SERVER_PORT || 5000;

//Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));
require('dotenv').config();

//Swagger 
swaggerDocs(app, port);


//APIs
app.use("/api/blogs", blogRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/projects", projectRotes);
app.use("/api/techstacks", techstackRoutes);



app.get("/api", (req: Request, res: Response) => {
  res
    .status(Code.OK)
    .send(
      new HttpResponse(Code.OK, Status.OK, "Welcome to Portfolio API v.1.0")
    );
});

app.get("/", (req: Request, res: Response) => {
  res
    .status(Code.OK)
    .send(
      new HttpResponse(
        Code.OK,
        Status.OK,
        "Please hit /api route to visit the home page."
      )
    );
});

//Bad Request API - 404
app.all("*", (req: Request, res: Response) => {
  res
    .status(Code.NOT_FOUND)
    .send(
      new HttpResponse(
        Code.NOT_FOUND,
        Status.NOT_FOUND,
        `Oops! No route exists like : ${req.params[0]}`
      )
    );
});

//Listening app
app.listen(port, () => {
  try{
    console.info(`Application is listening on: ${ip.address()}:${port}`);
  }catch(err){
    console.log(`Some error while listening the app on the port.`)
  }
});
