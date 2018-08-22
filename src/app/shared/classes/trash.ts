import { Tile } from './tile';
import { Injectable } from '@angular/core';

@Injectable()
export class Trash {
    public spaces: Tile[] = [];
}
