import { ColorEnum } from './colorEnum';
import { Tile } from './tile';
import { Injectable } from '@angular/core';

@Injectable()
export class Trash {
    public spaces: Tile[] = [null, null, null, null, null, null];

    placeTiles(number: number, color: ColorEnum): void {
        console.log(number)
        console.log(color)
        let remaining = number;
        for (let i = 0; i < this.spaces.length; i++) {
            if (remaining > 0 && this.spaces[i] === null) {
                this.spaces[i] = new Tile(color);
                remaining--;
            }
        }
    }
}
