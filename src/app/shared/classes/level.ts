import { Selection } from './selection';
import { Room } from './room';
import { Injectable } from '@angular/core';
import { ColorEnum } from './colorEnum';

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
            if (selection.numTiles <= this.numRoomsRemaining()) {
                return true;
            }
        }
        return false;
    }

    numRoomsRemaining() {
        let emptyRooms = 0;
        this.rooms.map(room => {
            if (room.tile === null){
                emptyRooms++;
            }
        });
        return emptyRooms;
    }

    fillRooms(howMany: number) {

    }
}
