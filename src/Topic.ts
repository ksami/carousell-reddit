import * as uuid from "uuid/v4";

export default class Topic {
    id: string
    text: string
    upVotes: number
    downVotes: number
    votes: number
    createdAt: string
    author: string

    constructor(text: string = "", author: string = "") {
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