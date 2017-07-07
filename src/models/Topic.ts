import * as uuid from "uuid/v4";
import {Identifier} from "../libs";

export default class Topic implements Identifier {
    id: string
    text: string
    upvotes: number
    downvotes: number
    votes: number
    createdAt: string
    author: string

    constructor(text: string = "", author: string = "") {
        this.id = uuid();
        this.text = text;
        this.upvotes = 0;
        this.downvotes = 0;
        this.votes = 0;
        this.createdAt = (new Date).toISOString();
        this.author = author;
    }

    /**
     * Compare two Topics to determine sorting order
     * 
     * @static
     * @param {Topic} a 
     * @param {Topic} b 
     * @returns {number} negative for a before b and vice-versa, 0 for same ordering
     * @memberof Topic
     */
    static comparator(a: Topic, b: Topic): number {
        return a.votes - b.votes;
    }

    upvote() {
        this.upvotes++;
        this.votes++;
    }

    downvote() {
        this.downvotes++;
        this.votes--;
    }
}
