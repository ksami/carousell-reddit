"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
class Topic {
    constructor(text = "", author = "") {
        this.id = uuid();
        this.text = text;
        this.upVotes = 0;
        this.downVotes = 0;
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
    static comparator(a, b) {
        return a.votes - b.votes;
    }
    upVote() {
        this.upVotes++;
        this.votes++;
    }
    downVote() {
        this.downVotes++;
        this.votes--;
    }
}
exports.default = Topic;
