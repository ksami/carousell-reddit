"use strict";
/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const swagger = require("swagger2");
const swagger2_koa_1 = require("swagger2-koa");
const routes_1 = require("./routes");
// Validate swagger API specification
const document = swagger.loadDocumentSync(path.join(__dirname, "docs", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error("swagger.yml does not conform to the Swagger 2.0 schema");
}
let app = new Koa();
let router = new Router();
// Hook api routes to /api
router.use("/api", routes_1.v1.routes(), routes_1.v1.allowedMethods());
// Koa middlewares
app.use(bodyParser());
app.use(swagger2_koa_1.validate(document));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(swagger2_koa_1.ui(document, "/docs"));
// Start server on port 3000
app.listen(3000);
