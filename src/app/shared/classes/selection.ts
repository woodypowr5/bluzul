import { Injectable } from '@angular/core';
import { ColorEnum } from './colorEnum';

@Injectable()
export class Selection {
    public color: ColorEnum = null;
    public numTiles = 0;

    clear() {
        this.color = null;
        this.numTiles = 0;
    }
}
