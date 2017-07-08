/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */

import * as path from "path";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import * as swagger from "swagger2";
import {ui as swaggerUi, validate} from "swagger2-koa";

import {v1} from "./routes";
import {Store} from "./utils";
import {Topic} from "./models";

const port = process.env.PORT || 3000;

// Validate swagger API specification
const document = swagger.loadDocumentSync(path.join(__dirname, "docs", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error("swagger.yml does not conform to the Swagger 2.0 schema");
}


let app = new Koa();
let router = new Router();
let store = new Store(Topic.comparator);


// Hook api routes to /api
router.use("/api", v1.routes(), v1.allowedMethods());

// Koa middlewares
app.use(bodyParser());
app.use(validate(document));
app.use(swaggerUi(document, "/docs"));
app.use(store.getMiddleware());

// Koa routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start server listening on port <port>
app.listen(port);
console.log(`Server started, listening on port ${port}`);
