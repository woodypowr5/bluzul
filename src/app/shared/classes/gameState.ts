import { Street } from './street';
import { DisposalQueue } from './disposalQueue';
import { Placement } from './placement';
import { Selection } from './selection';
import { TurnPhaseEnum } from './turnPhaseEnum';
import { Trash } from './trash';
import { Bag } from './bag';
import { Factory } from './factory';
import { Board } from './board';
import { Injectable } from '@angular/core';

@Injectable()
export class GameState {
    public numPlayers = 2;
    public boards: Board[] = [];
    public whoseTurn: number = null;
    public turnPhase: TurnPhaseEnum = null;
    public factories: Factory[] = [];
    public street: Street;
    public bag: Bag = null;
    public selection: Selection = null;
    public placement: Placement;
    public disposalQueue: DisposalQueue;
}
