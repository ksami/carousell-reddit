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
        return b.val - a.val;
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
    let serialNumber: number;
    beforeEach(function() {
        store = new Store(ItemMock.comparator);
        serialNumber = 0;
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
        it("should insert and sort in descending order", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new ItemMock((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice();
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(ItemMock.comparator).map(s => s.val));
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
        it("should update and sort in descending order", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new ItemMock((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            await store.updateItemById("3", "downvote");
            let result = await store.getSlice();
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(ItemMock.comparator).map(s => s.val));
        });
    });

    describe("getSlice", function() {
        it("should return empty array if store is empty", async function() {
            let result = await store.getSlice();
            assert.isArray(result);
            assert.lengthOf(result, 0);
        });
        it("should return slice of items from start (including) to end (excluding)", async function() {
            let randomNums = Array(100).fill(0).map(() => Math.floor(Math.random() * 99));
            let arr = randomNums.map(val => new ItemMock((serialNumber++).toString(), val));
            await Promise.all(arr.map(item => store.insertItem(item)));
            let result = await store.getSlice(0, 20);
            assert.sameOrderedMembers(result.map(r => r.val), arr.sort(ItemMock.comparator).slice(0, 20).map(s => s.val));
        });
    });
}