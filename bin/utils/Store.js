"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    /**
     * Creates an instance of Store
     * @param {(a: T, b: T) => number} sortFn Sorting function to determine order between two items: negative for a before b and vice-versa, 0 for same ordering
     * @param {opts.boolean} [isAscending=true] Sort in ascending order
     * @memberof Store
     */
    constructor(sortFn, { isAscending = true }) {
        this._store = [];
        this._sortFn = isAscending ? sortFn : (a, b) => sortFn(b, a);
    }
    /**
     * Returns a Koa 2 style middleware
     * to attach this store to `ctx.store`
     */
    getMiddleware() {
        return async (ctx, next) => {
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
    insertItem(item) {
        // find index i where item should be inserted at i
        let idx = this._store.findIndex(storeItem => this._sortFn(item, storeItem) <= 0);
        if (idx === -1) {
            this._store.push(item);
        }
        else {
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
    updateItemById(id, action) {
        let item = this._store.find(storeItem => storeItem.id === id);
        if (typeof item === "undefined") {
            return undefined;
        }
        else {
            item.update(action);
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
    getSlice(start = 0, end = this._store.length) {
        return this._store.slice(start, end);
    }
}
exports.default = Store;
