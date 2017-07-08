import {Context} from "koa";
import {Identifier, Mutable, ACTION} from "../libs";

export default class Store<T extends Mutable & Identifier> {
    private _store: T[]
    private _sortFn: (a: T, b: T) => number

    /**
     * Creates an instance of Store with items sorted in descending order
     * @param {(a: T, b: T) => number} sortFn Sorting function to determine order between two items: negative for b before a and vice-versa, 0 for same ordering
     * @memberof Store
     */
    constructor(sortFn: (a: T, b: T) => number) {
        this._store = [];
        this._sortFn = sortFn;
    }

    /**
     * Swaps the order of two elements in the store
     * 
     * @private
     * @param {number} idx1 Index of first element
     * @param {number} idx2 Index of second element
     * @memberof Store
     */
    private _swap(idx1: number, idx2: number) {
        const swap = this._store[idx2];
        this._store[idx2] = this._store[idx1];
        this._store[idx1] = swap;
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
     * @param {T} item Item to be inserted
     * @returns {T} Item that was inserted
     * @memberof Store
     */
    insertItem(item: T): T {
        // find index i where item should be inserted at i
        let idx = this._store.findIndex(storeItem => this._sortFn(item, storeItem) <= 0);
        if(idx === -1) {
            this._store.push(item);
        } else {
            this._store.splice(idx, 0, item);
        }
        return item;
    }

    /**
     * Executes <action> on an item in the store based on id
     * 
     * @param {string} id id of item to be updated
     * @param {ACTION} action "upvote" or "downvote"
     * @returns {(T|undefined)} Updated item
     * @memberof Store
     */
    updateItemById(id: string, action: ACTION): T|undefined {
        let idx = this._store.findIndex(storeItem => storeItem.id === id);
        if(idx === -1) {
            return undefined;
        } else {
            let item = this._store[idx];
            item.update(action);

            // Swap updated item with its neighbours to maintain ordering in the store
            if(action === "upvote" &&
                idx > 0 && this._sortFn(this._store[idx-1], item) > 0) {
                this._swap(idx-1, idx);
            } else if(action === "downvote" &&
                idx < this._store.length-1 && this._sortFn(item, this._store[idx+1]) > 0) {
                this._swap(idx, idx+1);
            }

            return item;
        }
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
