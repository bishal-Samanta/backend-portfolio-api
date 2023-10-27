// import express, { Application, Request, Response } from "express";
// import ip from "ip";
// import cors from "cors";
// import { Code } from "./enums/code.enum";
// import { HttpResponse } from "./domain/response";
// import { Status } from "./enums/status.enum";
// import blogRoutes from "./routes/blog.routes";
// import projectRotes from "./routes/project.routes";
// import techstackRoutes from "./routes/techstack.routes";
// import morgan from "morgan";
// import tagRoutes from "./routes/tag.routes";
// import swaggerDocs from "./swaggerDef";


// export class App extends express() {
//   private readonly app: Application;

//   //Constructor -> port
//   constructor(
//     private readonly port: string | number = process.env.SERVER_PORT || 5000
//   ) {
//     super()
//     this.app = express();
//     this.middleWares();
//     this.routes();
//   }

//   //Listening on port
//   listen(): void {
//     // swaggerDocs( this.app , this.port);
//     this.app.listen(this.port);
//     console.info(`Application is listening on: ${ip.address()}:${this.port}`);

//   }

//   //MiddleWares
//   middleWares() {
//     this.app.use(cors({ origin: "*" }));
//     this.app.use(express.json());
//     this.app.use(morgan('dev'));

//   }

//   //Routes
//   routes() {
//     this.app.use("/api/blogs", blogRoutes );
//     this.app.use("/api/tags", tagRoutes );
//     this.app.use("/api/projects", projectRotes );
//     this.app.use("/api/techstacks", techstackRoutes );


//     /*
   
//     */
//     this.app.get("/api", (req: Request, res: Response) => {
//       res
//         .status(Code.OK)
//         .send(
//           new HttpResponse(Code.OK, Status.OK, "Welcome to Portfolio API v.1.0")
//         );
//     });

//     this.app.get("/", (req: Request, res: Response) => {
//       res
//         .status(Code.OK)
//         .send(
//           new HttpResponse(
//             Code.OK,
//             Status.OK,
//             "Please hit /api route to visit the home page."
//           )
//         );
//     });

//     this.app.all("*", (req: Request, res: Response) => {
//       res
//         .status(Code.NOT_FOUND)
//         .send(
//           new HttpResponse(
//             Code.NOT_FOUND,
//             Status.NOT_FOUND,
//             `Oops! No route exist like : ${req.params[0]}`
//           )
//         );
//     });
//   }
// }
