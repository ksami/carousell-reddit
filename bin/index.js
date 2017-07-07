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
const utils_1 = require("./utils");
const models_1 = require("./models");
const port = process.env.PORT || 3000;
// Validate swagger API specification
const document = swagger.loadDocumentSync(path.join(__dirname, "docs", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error("swagger.yml does not conform to the Swagger 2.0 schema");
}
let app = new Koa();
let router = new Router();
let store = new utils_1.Store(models_1.Topic.comparator, { isAscending: false });
// Hook api routes to /api
router.use("/api", routes_1.v1.routes(), routes_1.v1.allowedMethods());
// Koa middlewares
app.use(bodyParser());
app.use(swagger2_koa_1.validate(document));
app.use(swagger2_koa_1.ui(document, "/docs"));
app.use(store.getMiddleware());
// Koa routes
app.use(router.routes());
app.use(router.allowedMethods());
// Start server listening on port <port>
app.listen(port);
console.log(`Server started, listening on port ${port}`);
