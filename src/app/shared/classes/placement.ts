import { ColorEnum } from './colorEnum';
import { Injectable } from '@angular/core';

@Injectable()
export class Placement {
    levelNum: number = null;
    numTiles: number = null;
    color: ColorEnum = null;
}
