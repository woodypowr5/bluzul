import { Selection } from './selection';
import { Tile } from './tile';
import { ColorEnum } from './colorEnum';
import { Bag } from './bag';
import { Injectable } from '@angular/core';

@Injectable()
export class Street {
    private contents: Tile[] = [];
    private selectedColor = null;
    private selected = false;

    addTiles(tiles: Tile[]) {
        tiles.map(tile => {
            this.contents.push(tile);
        });
    }

    constructor(private bag: Bag) {
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

    clearSelected() {
        this.contents.map(tile => {
            tile.selected = false;
        });
        this.selected = false;
        this.selectedColor = null;
    }

    removeSelectedTiles(selection: Selection): void {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].color === selection.color) {
                this.contents.splice(i, 1);
                i--;
            }
        }
    }

    isEmpty() {
        return this.contents.length === 0;
    }
}
