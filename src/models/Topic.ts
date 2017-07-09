import * as uuid from "uuid/v4";
import {Identifier, Mutable, ACTION} from "../libs";

export default class Topic implements Identifier, Mutable {
    readonly id: string
    readonly createdAt: number
    text: string
    upvotes: number
    downvotes: number
    votes: number
    author: string

    /**
     * Creates an instance of Topic
     * @param {string} [text=""] Text of the topic
     * @param {string} [author=""] User who created the topic
     * @memberof Topic
     */
    constructor(text: string = "", author: string = "") {
        this.id = uuid();
        this.createdAt = Date.now();
        this.text = text;
        this.upvotes = 0;
        this.downvotes = 0;
        this.votes = 0;
        this.author = author;
    }

    /**
     * Compare two Topics to determine sorting order
     * 
     * @static
     * @param {Topic} a 
     * @param {Topic} b 
     * @returns {number} negative for b before a and vice-versa, 0 for same ordering
     * @memberof Topic
     */
    static comparator(a: Topic, b: Topic): number {
        return b.votes - a.votes;
    }

    /**
     * Increases the vote count on this topic
     * 
     * @private
     * @memberof Topic
     */
    private _upvote() {
        this.upvotes++;
        this.votes++;
    }

    /**
     * Decreases the vote count on this topic
     * 
     * @private
     * @memberof Topic
     */
    private _downvote() {
        this.downvotes++;
        this.votes--;
    }

    /**
     * Executes <action> on this topic
     * 
     * @param {ACTION} action
     * @memberof Topic
     */
    update(action: ACTION) {
        if(action === "upvote") {
            this._upvote();
        } else {
            this._downvote();
        }
    }
}
