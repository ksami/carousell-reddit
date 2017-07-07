import {BaseContext} from "koa";
import {Store} from "../utils";

declare module "koa" {
  interface BaseContext {
    store: Store<any>;
  }
}

export enum ACTION {
    UPVOTE,
    DOWNVOTE
}

export interface Identifier {
  id: string
}

export interface Mutable {
  update(...a: any[]): void
}