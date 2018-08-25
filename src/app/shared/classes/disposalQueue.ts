import { Tile } from './tile';
import { Injectable } from '@angular/core';

@Injectable()
export class DisposalQueue {
    tiles: Tile[] = [];

    addTile(tile: Tile) {
        this.tiles.push(tile);
    }

    clear() {
        this.tiles = [];
    }
}
