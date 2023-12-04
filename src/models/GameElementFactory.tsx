import { GameElementInterface } from "./GameElementInterface";
import { AvoidElement } from "./AvoidElement";
import { CollectElement } from "./CollectElement";
import { ChangeElement } from "./ChangeElement";

export class GameElementFactory {
  static createElement(type: string): GameElementInterface {
    const id = GameElementFactory.generateUUID();
    switch (type) {
      case 'Avoid':
        return new AvoidElement(id);
      case 'Collect':
        return new CollectElement(id);
      case 'Change':
        const colors = ['green', 'red'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return new ChangeElement(randomColor, id);
      default:
        throw new Error('Invalid element type');
    }
  }

  private static generateUUID(): string {
    // Simple UUID-like generator
    return 'xxxx-xxxx-4xxx-yxxx-xxxx-yyyy'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}