import { GridCell } from './gridCell';
import { Injectable } from '@angular/core';
import { ColorEnum } from './colorEnum';

@Injectable()
export class GridRow {
    cells: GridCell[] = [
        new GridCell(),
        new GridCell(),
        new GridCell(),
        new GridCell(),
        new GridCell()
    ];

    constructor(whichRow: number) {
        if (whichRow === 0) {
            this.cells[0].color = ColorEnum.blue;
            this.cells[1].color = ColorEnum.yellow;
            this.cells[2].color = ColorEnum.red;
            this.cells[3].color = ColorEnum.black;
            this.cells[4].color = ColorEnum.white;
        } else if (whichRow === 1) {
            this.cells[0].color = ColorEnum.white;
            this.cells[1].color = ColorEnum.blue;
            this.cells[2].color = ColorEnum.yellow;
            this.cells[3].color = ColorEnum.red;
            this.cells[4].color = ColorEnum.black;
        } else if (whichRow === 2) {
            this.cells[0].color = ColorEnum.black;
            this.cells[1].color = ColorEnum.white;
            this.cells[2].color = ColorEnum.blue;
            this.cells[3].color = ColorEnum.yellow;
            this.cells[4].color = ColorEnum.red;
        } else if (whichRow === 3) {
            this.cells[0].color = ColorEnum.red;
            this.cells[1].color = ColorEnum.black;
            this.cells[2].color = ColorEnum.white;
            this.cells[3].color = ColorEnum.blue;
            this.cells[4].color = ColorEnum.yellow;
        } else if (whichRow === 4) {
            this.cells[0].color = ColorEnum.yellow;
            this.cells[1].color = ColorEnum.red;
            this.cells[2].color = ColorEnum.black;
            this.cells[3].color = ColorEnum.white;
            this.cells[4].color = ColorEnum.blue;
        }
    }

    canPlaceTile(color: ColorEnum) {
        console.log(color)
        let isAvailable = false;
        this.cells.map(cell => {
            if (cell.color === color) {
                if (cell.contents === null) {
                    isAvailable  = true;
                } else {
                    isAvailable  = false;
                }
            }
        });
        return isAvailable;
    }
}
