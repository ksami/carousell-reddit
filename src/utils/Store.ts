import {Context} from "koa";
import {Identifier} from "../libs";

export default class Store<T extends Identifier> {
    private _store: T[]
    private _sortFn: (a: T, b: T) => number

    /**
     * Creates an instance of Store
     * @param {(a: T, b: T) => number} sortFn Sorting function to determine order between two items: negative for a before b and vice-versa, 0 for same ordering
     * @param {opts.boolean} [isAscending=true] Sort in ascending order
     * @memberof Store
     */
    constructor(sortFn: (a: T, b: T) => number, {isAscending = true}) {
        this._store = [];
        this._sortFn = isAscending ? sortFn : (a: T, b: T) => sortFn(b, a);
    }

    /**
     * Returns a Koa 2 style middleware
     * to attach this store to `ctx.store`
     */
    getMiddleware(): (ctx: Context, next: () => Promise<any>) => Promise<void> {
        return async (ctx: Context, next: () => Promise<any>) => {
            ctx.store = this;
            await next();
        };
    }


    /**
     * Inserts an item at its sorted location in the store
     * 
     * @param {T} item 
     * @memberof Store
     */
    insert(item: T): void {
        // find index i where item should be inserted at i
        let idx = this._store.findIndex(storeItem => this._sortFn(item, storeItem) <= 0);
        if(idx === -1) {
            this._store.push(item);
        } else {
            this._store.splice(idx, 0, item);
        }
    }

    /**
     * Get an item by its id
     * 
     * @param {string} id 
     * @returns {T|undefined}
     * @memberof Store
     */
    getById(id: string): T|undefined {
        return this._store.find(storeItem => storeItem.id === id);
    }

    /**
     * Gets a slice of items from the store
     * 
     * @param {number} [start=0] Index to start extracting from (including)
     * @param {number} [end=this.length] Index to end extracting from (excluding)
     * @returns {T[]} Array of items with max length n
     * @memberof Store
     */
    getSlice(start: number = 0, end: number = this._store.length): T[] {
        return this._store.slice(start, end);
    }
}
