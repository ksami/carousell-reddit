"use strict";
/**
 * Entry point
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Imports from npm
const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const send = require("koa-send");
const swagger = require("swagger2");
const swagger2_koa_1 = require("swagger2-koa");
// Explicitly define import as any type
const logger = require("koa-pino-logger");
// Imports from local
const routes_1 = require("./routes");
const utils_1 = require("./utils");
const models_1 = require("./models");
// Port for server to listen on
const port = process.env.PORT || 3000;
// Validate swagger API specification
const document = swagger.loadDocumentSync(path.join(__dirname, "docs", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error("swagger.yml does not conform to the Swagger 2.0 schema");
}
let app = new Koa();
let router = new Router();
let store = new utils_1.Store(models_1.Topic.comparator);
// Hook api routes to /api
router.use("/api", routes_1.v1.routes(), routes_1.v1.allowedMethods());
// Koa middlewares
app.use(bodyParser());
app.use(logger());
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (e) {
        ctx.status = ctx.status || 500;
        ctx.body = {
            success: false,
            message: e.message
        };
    }
});
app.use(swagger2_koa_1.validate(document));
app.use(swagger2_koa_1.ui(document, "/docs"));
app.use(store.getMiddleware());
// Koa routes
app.use(async (ctx, next) => {
    // Serve /index.html on /
    if (ctx.path === "/") {
        await send(ctx, "/index.html", { root: path.join(__dirname, "public") });
    }
    else if (ctx.path === "/index.js") {
        await send(ctx, "/index.js", { root: path.join(__dirname, "public") });
    }
    else {
        await next();
    }
});
app.use(router.routes());
app.use(router.allowedMethods());
// Start server listening on port <port>
app.listen(port);
console.log(`Server started, listening on port ${port}`);
