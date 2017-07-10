import {assert} from "chai";
import {Identifier, Votable, ACTION} from "../libs";
import {Store} from "../utils";

class ItemMock implements Identifier, Votable {
    readonly id: string
    val: number

    constructor(id: string, val: number) {
        this.id = id;
        this.val = val;
    }

    static comparator(a: ItemMock, b: ItemMock): number {
        return a.val - b.val;
    }

    update(action: ACTION) {
        if(action === "upvote") {
            this.val++;
        } else {
            this.val--;
        }
    }
}

export default function() {
    let store: Store<ItemMock>;
    beforeEach(function() {
        store = new Store(ItemMock.comparator);
    });

    describe("Create", function() {
        it("should create a store with no items", async function() {
            let result = await store.getSlice();
            assert.lengthOf(result, 0);
        });
    });

    describe("insertItem", function() {
        it("should insert element at index 0 for empty store", async function() {
            await store.insertItem(new ItemMock("1", 1));
            let result = await store.getSlice();
            assert.sameDeepOrderedMembers(result, [new ItemMock("1", 1)]);
        });
        it("should insert and sort in ascending order", async function() {
            let arr = [4,1,2].map(val => new ItemMock(val.toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice();
            assert.sameOrderedMembers(result, arr.sort(ItemMock.comparator));
        });
    });

    describe("updateItemById", function() {
        it("should return undefined for id not found", async function() {
            try {
                let result = await store.updateItemById("not-found", "upvote");
                // should not reach
                assert.isNotOk(result);
            } catch(e) {
                assert.isUndefined(e);
            }
        });
        it("should update and sort in ascending order", async function() {
            let arr = [3,1,4].map(val => new ItemMock(val.toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            await store.updateItemById("3", "downvote");
            let result = await store.getSlice();
            assert.sameOrderedMembers(result, arr.sort(ItemMock.comparator));
        });
    });

    describe("getSlice", function() {
        it("should return empty array if store is empty", async function() {
            let result = await store.getSlice();
            assert.isArray(result);
            assert.lengthOf(result, 0);
        });
        it("should return slice of items from start (including) to end (excluding)", async function() {
            let arr = [3,1,4,2].map(val => new ItemMock(val.toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice(0, 3);
            assert.sameOrderedMembers(result, arr.sort(ItemMock.comparator).slice(0, 3));
        });
    });
}