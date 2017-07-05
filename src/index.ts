/**
 * @file: Entry point to start server
 * @author: Kenneth <ksami.ihide@gmail.com>
 */

import * as path from "path";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as swagger from "swagger2";
import {ui as swaggerUi, validate} from "swagger2-koa";

import {v1} from "./routes";


// Validate swagger API specification
const document = swagger.loadDocumentSync(path.join(__dirname, "docs", "swagger.yml"));
if (!swagger.validateDocument(document)) {
    throw Error("swagger.yml does not conform to the Swagger 2.0 schema");
}


let app = new Koa();

// Koa middlewares
app.use(bodyParser());
app.use(validate(document));
app.use(v1.routes());
app.use(v1.allowedMethods());
app.use(swaggerUi(document, "/docs"));

// Start server on port 3000
app.listen(3000);
