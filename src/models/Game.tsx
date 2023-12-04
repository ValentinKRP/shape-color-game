import { GameElementInterface } from "./GameElementInterface";
import { GameElementFactory } from "./GameElementFactory";

export class Game {
  private static instance: Game;
  private elements: GameElementInterface[] = [];

  private constructor() {

  }

  static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  addElement(element: GameElementInterface) {
    this.elements.push(element);
  }

  getElements(): GameElementInterface[] {
    return this.elements;
  }

  reset() {
    this.elements = [];
    this.generateElements();
  }

  generateElements() {
    const types = ['Avoid', 'Collect', 'Change'];
    for (let i = 0; i < 10; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)];
      const newElement = GameElementFactory.createElement(randomType);
      this.addElement(newElement);
    }
  }

  changeColorOfChangeElements() {
    for (let i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];
      if (element.type === 'Change') {
        element.color = element.color === 'green' ? 'red' : 'green';
      }
    }
  }

  removeElementById(id: string) {
    this.elements = this.elements.filter(element => element.id !== id);
  }

  isGameWon(): boolean {

    return this.elements.every(element => element.type !== 'Collect') && this.elements.every(element => element.type !== 'Change')
  }

}