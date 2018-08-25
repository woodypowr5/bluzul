import { Placement } from './placement';
import { Selection } from './selection';
import { Room } from './room';
import { Injectable } from '@angular/core';
import { ColorEnum } from './colorEnum';
import { Tile } from './tile';

@Injectable()
export class Level {
    public rooms: Room[] = [];
    public color: ColorEnum = null;

    constructor(numCells: number) {
        for (let i = 0; i < numCells; i++) {
            this.rooms.push(new Room());
        }
    }

    whichLevel(): number {
        return this.rooms.length - 1;
    }

    canAccomodateTiles(selection: Selection) {
        if (this.color === selection.color || this.color === null) {
                return true;
        }
        return false;
    }

    numRoomsRemaining() {
        let emptyRooms = 0;
        this.rooms.map(room => {
            if (room.tile === null) {
                emptyRooms++;
            }
        });
        return emptyRooms;
    }

    fillRooms(placement: Placement): number {
        this.color = placement.color;
        let remaining: number  = placement.numTiles;
        for (let i = 0; i < this.rooms.length; i++) {
            if (remaining > 0 && this.rooms[i].tile === null) {
                this.rooms[i].tile = new Tile(placement.color);
                remaining--;
            }
        }
        return remaining;
    }
}
