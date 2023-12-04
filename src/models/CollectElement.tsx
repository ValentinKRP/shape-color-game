import { GameElementInterface } from "./GameElementInterface";
export class CollectElement implements GameElementInterface {
    type = 'Collect';
    color = 'green';
    shape = 'rectangle';
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}