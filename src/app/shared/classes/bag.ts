import { Injectable } from '@angular/core';
import { Constants } from './../data/constants';
import { Tile } from './tile';
import { ColorEnum } from './colorEnum';

@Injectable()
export class Bag {
    private contents: Tile[] = [];

    constructor() {
        this.fillBag();
    }

    fillBag(): void {
        Object.keys(ColorEnum).map(color => {
            for (let index = 0; index < Math.floor(Constants.numTilesInBag / Object.keys(ColorEnum).length); index++) {
                this.contents.push(new Tile(ColorEnum[color]));
            }
        });
    }

    numTilesLeft(): number {
        return this.contents.length;
    }

    getTile(): Tile {
        const randomIndex = Math.floor(Math.random() * this.numTilesLeft());
        const selection = this.contents[randomIndex];
        this.contents.splice(randomIndex, 1);
        return selection;
    }
}
