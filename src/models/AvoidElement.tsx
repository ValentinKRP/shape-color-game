import { GameElementInterface } from "./GameElementInterface";

export class AvoidElement implements GameElementInterface {
  type = 'Avoid';
  color = 'red';
  shape = 'circle';
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
