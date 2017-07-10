import {Identifier, Votable, ACTION} from "../../libs";

export default class Store<T extends Votable & Identifier> {
    constructor(sortFn: (a: T, b: T) => number) {

    }

    async insertItem(item: T) {
        return Promise.resolve({});
    }

    async updateItemById(id: string, action: ACTION) {
        if(id === "not-found") {
            return Promise.reject(undefined);
        } else {
            return Promise.resolve({});
        }
    }

    async getSlice(start: number, end: number) {
        return Promise.resolve([]);
    }
}