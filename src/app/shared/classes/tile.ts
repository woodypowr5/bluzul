import { ColorEnum } from './colorEnum';

export class Tile {
    public color: ColorEnum = null;
    public selected = false;

    constructor(color: ColorEnum) {
        this.color = color;
    }
}
