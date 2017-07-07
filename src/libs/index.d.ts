import {BaseContext} from "koa";
import {Store} from "../utils";

declare module "koa" {
  interface BaseContext {
    store: Store<any>;
  }
}