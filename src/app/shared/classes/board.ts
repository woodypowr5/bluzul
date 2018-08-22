import { Palace } from './palace';
import { Grid } from './grid';
import { Injectable } from '@angular/core';
import { Trash } from './trash';

@Injectable()
export class Board {
    grid: Grid = new Grid();
    palace: Palace = new Palace();
    trash: Trash = new Trash();
}
