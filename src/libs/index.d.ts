import {BaseContext} from "koa";
import {Store} from "../utils";

declare module "koa" {
  interface BaseContext {
    store: Store<any>;
  }
}

export type ACTION = "upvote" | "downvote";

export interface Identifier {
  id: string
}

export interface Mutable {
  update(...a: any[]): void
}