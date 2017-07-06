import {BaseContext} from "koa";
import {Store} from "../utils";
import {Topic} from "../models";

declare module "koa" {
  interface BaseContext {
    store: Store<Topic>;
  }
}