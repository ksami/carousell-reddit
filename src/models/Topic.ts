import * as uuid from "uuid/v4";
import {Identifier, Mutable, ACTION} from "../libs";



export default class Topic implements Identifier, Mutable {
    readonly id: string
    readonly createdAt: string    
    text: string
    upvotes: number
    downvotes: number
    votes: number
    author: string

    constructor(text: string = "", author: string = "") {
        this.id = uuid();
        this.createdAt = (new Date).toISOString();
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
     * @returns {number} negative for a before b and vice-versa, 0 for same ordering
     * @memberof Topic
     */
    static comparator(a: Topic, b: Topic): number {
        return a.votes - b.votes;
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
        if(action === ACTION.UPVOTE) {
            this._upvote();
        } else {
            this._downvote();
        }
    }
}
