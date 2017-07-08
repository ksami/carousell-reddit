"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
class Topic {
    constructor(text = "", author = "") {
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
     * @returns {number} negative for b before a and vice-versa, 0 for same ordering
     * @memberof Topic
     */
    static comparator(a, b) {
        return b.votes - a.votes;
    }
    /**
     * Increases the vote count on this topic
     *
     * @private
     * @memberof Topic
     */
    _upvote() {
        this.upvotes++;
        this.votes++;
    }
    /**
     * Decreases the vote count on this topic
     *
     * @private
     * @memberof Topic
     */
    _downvote() {
        this.downvotes++;
        this.votes--;
    }
    /**
     * Executes <action> on this topic
     *
     * @param {ACTION} action
     * @memberof Topic
     */
    update(action) {
        if (action === "upvote") {
            this._upvote();
        }
        else {
            this._downvote();
        }
    }
}
exports.default = Topic;
