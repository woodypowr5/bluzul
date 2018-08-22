import { GridRow } from './gridRow';
import { Injectable } from '@angular/core';

@Injectable()
export class Grid {
    public rows: GridRow[] = [
        new GridRow(0),
        new GridRow(1),
        new GridRow(2),
        new GridRow(3),
        new GridRow(4)
    ];
}
