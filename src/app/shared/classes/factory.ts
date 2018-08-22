import { Tile } from './tile';
import { Constants } from './../data/constants';
import { Bag } from './bag';
import { Injectable } from '@angular/core';
import { ColorEnum } from './colorEnum';

@Injectable()
export class Factory {
    private contents: Tile[] = [];
    private selectedColor = null;
    private selected = false;

    constructor(private bag: Bag) {
        this.populate(bag);
    }

    populate(bag: Bag): void {
        for (let i = 0; i < Constants.tilesPerFactory; i++) {
            this.contents.push(bag.getTile());
        }
    }

    computeSelected(color: ColorEnum): Tile[] {
        this.clearSelected();
        this.selected = true;
        this.selectedColor = color;
        const selectedTiles: Tile[] = [];
        this.contents.map(tile => {
            if (tile.color === color) {
                tile.selected = true;
                selectedTiles.push(new Tile(color));
            }
        });
        return selectedTiles;
    }

    computeDiscarded(color: ColorEnum): Tile[] {
        return [];
    }

    clearSelected() {
        this.contents.map(tile => {
            tile.selected = false;
        });
        this.selected = false;
        this.selectedColor = null;
    }
}
