import {Identifier, Votable, ACTION} from "../../libs";

export default class Topic implements Identifier, Votable {
    readonly id: string
    val: number

    constructor(id: string, val: number) {
        this.id = id;
        this.val = val;
    }

    static comparator(a: Topic, b: Topic): number {
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