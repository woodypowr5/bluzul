import { Injectable } from '@angular/core';
import { Level } from './level';

@Injectable()
export class Palace {
    public levels = [
        new Level(1),
        new Level(2),
        new Level(3),
        new Level(4),
        new Level(5)
    ];
}
