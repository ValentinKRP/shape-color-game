import { GameElementInterface } from "./GameElementInterface";

export class ChangeElement implements GameElementInterface {
  type = 'Change';
  color = 'green';
  shape = 'square';
  id: string;

  constructor(color: string, id: string) {
    this.color = color;
    this.id = id;
  }

  changeColor() {
    this.color = this.color === 'green' ? 'red' : 'green';
  }
}