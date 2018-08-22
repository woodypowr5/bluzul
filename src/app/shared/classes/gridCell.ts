import { Tile } from './tile';
import { ColorEnum } from './colorEnum';
import { Injectable } from '@angular/core';

@Injectable()
export class GridCell {
    public color: ColorEnum = null;
    public contents: Tile = null;
}
