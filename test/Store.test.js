const {assert} = require("chai");
const {Store} = require("../bin/utils");

module.exports = function() {
    let store;
    beforeEach(function() {
        store = new Store((a, b) => a - b, true);
    });

    afterEach(function() {
        store = null;
    });

    describe("Create", function() {
        it("should create a store with no items", function() {
            assert.equal(store._store.length, 0);
        });
    });

    describe("insert", function() {
        it("should insert element at index 0 for empty store", function() {
            store.insert(1);
            assert.sameOrderedMembers(store._store, [1]);
        });
        it("should insert and sort in ascending order", function() {
            store.insert(4);
            store.insert(1);
            store.insert(2);
            assert.sameOrderedMembers(store._store, [1, 2, 4]);
        });
        it("should insert and sort in descending order", function() {
            let descStore = new Store((a, b) => a - b, {isAscending: false});
            descStore.insert(4);
            descStore.insert(1);
            descStore.insert(2);
            assert.sameOrderedMembers(descStore._store, [4, 2, 1]);
        });
    });

    describe("getSlice", function() {
        it("should return empty array if store is empty", function() {
            let result = store.getSlice();
            assert.isArray(result);
            assert.lengthOf(result, 0);
        });
        it("should return slice of items from start (including) to end (excluding)", function() {
            store.insert(1);
            store.insert(2);
            store.insert(3);
            assert.sameOrderedMembers(store.getSlice(0, 3), [1,2,3]);
        });
    });
}