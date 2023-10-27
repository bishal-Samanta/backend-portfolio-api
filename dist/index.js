"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const cors_1 = __importDefault(require("cors"));
const code_enum_1 = require("./enums/code.enum");
const response_1 = require("./domain/response");
const status_enum_1 = require("./enums/status.enum");
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const techstack_routes_1 = __importDefault(require("./routes/techstack.routes"));
const morgan_1 = __importDefault(require("morgan"));
const tag_routes_1 = __importDefault(require("./routes/tag.routes"));
const swaggerDef_1 = __importDefault(require("./docs/swaggerDef"));
//App 
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 5000;
//Middlewares
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
require('dotenv').config();
//Swagger 
(0, swaggerDef_1.default)(app, port);
//APIs
app.use("/api/blogs", blog_routes_1.default);
app.use("/api/tags", tag_routes_1.default);
app.use("/api/projects", project_routes_1.default);
app.use("/api/techstacks", techstack_routes_1.default);
app.get("/api", (req, res) => {
    res
        .status(code_enum_1.Code.OK)
        .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Welcome to Portfolio API v.1.0"));
});
app.get("/", (req, res) => {
    res
        .status(code_enum_1.Code.OK)
        .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, "Please hit /api route to visit the home page."));
});
//Bad Request API - 404
app.all("*", (req, res) => {
    res
        .status(code_enum_1.Code.NOT_FOUND)
        .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, `Oops! No route exists like : ${req.params[0]}`));
});
//Listening app
app.listen(port, () => {
    try {
        console.info(`Application is listening on: ${ip_1.default.address()}:${port}`);
    }
    catch (err) {
        console.log(`Some error while listening the app on the port.`);
    }
});
