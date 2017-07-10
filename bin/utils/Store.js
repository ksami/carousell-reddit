"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    /**
     * Creates an instance of Store with items sorted in descending order
     * @param {(a: T, b: T) => number} sortFn Sorting function to determine order between two items: negative for b before a and vice-versa, 0 for same ordering
     * @memberof Store
     */
    constructor(sortFn) {
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
    _swap(idx1, idx2) {
        const swap = this._store[idx2];
        this._store[idx2] = this._store[idx1];
        this._store[idx1] = swap;
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
     * @returns {Promise<T>} Item that was inserted
     * @memberof Store
     */
    async insertItem(item) {
        // find index i where item should be inserted at i
        let idx = this._store.findIndex(storeItem => this._sortFn(item, storeItem) <= 0);
        if (idx === -1) {
            this._store.push(item);
        }
        else {
            this._store.splice(idx, 0, item);
        }
        return Promise.resolve(item);
    }
    /**
     * Executes <action> on an item in the store based on id
     *
     * @param {string} id id of item to be updated
     * @param {ACTION} action "upvote" or "downvote"
     * @returns {Promise<T>} Updated item
     * @memberof Store
     */
    async updateItemById(id, action) {
        let idx = this._store.findIndex(storeItem => storeItem.id === id);
        if (idx === -1) {
            return Promise.reject(undefined);
        }
        else {
            let item = this._store[idx];
            item.update(action);
            // Swap updated item with its neighbours to maintain ordering in the store
            if (action === "upvote") {
                while (idx > 0 && this._sortFn(this._store[idx - 1], item) > 0) {
                    this._swap(idx - 1, idx);
                    idx--;
                }
            }
            else if (action === "downvote") {
                while (idx < this._store.length - 1 && this._sortFn(item, this._store[idx + 1]) > 0) {
                    this._swap(idx, idx + 1);
                    idx++;
                }
            }
            return Promise.resolve(item);
        }
    }
    /**
     * Gets a slice of items from the store
     *
     * @param {number} [start=0] Index to start extracting from (including)
     * @param {number} [end=this.length] Index to end extracting from (excluding)
     * @returns {Promise<T[]>} Array of items with max length n
     * @memberof Store
     */
    async getSlice(start = 0, end = this._store.length) {
        return Promise.resolve(this._store.slice(start, end));
    }
}
exports.default = Store;
