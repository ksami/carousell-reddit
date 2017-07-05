"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(initialData = []) {
        this._store = initialData;
    }
    /**
     * Inserts an item, then sort the store
     *
     * @param {T} item
     * @param {(a: T, b: T) => number} compareFn Sorting function to determine order between two items: negative for a before b and vice-versa, 0 for same ordering
     * @param {boolean} [isDescending=false] Sort in descending order
     * @memberof Store
     */
    insert(item, compareFn, isDescending = false) {
        this._store.push(item);
        this._store.sort((a, b) => isDescending ? compareFn(b, a) : compareFn(a, b));
    }
    /**
     * Get the first n items in the store
     *
     * @param {number} numItems
     * @returns {T[]} Array of items with max length n
     * @memberof Store
     */
    getTopItems(numItems) {
        return this._store.slice(0, numItems);
    }
}
exports.default = Store;
