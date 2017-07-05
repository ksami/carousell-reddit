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
