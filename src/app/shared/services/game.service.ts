import { Street } from './../classes/street';
import { Placement } from '../classes/placement';
import { Factory } from './../classes/factory';
import { Config } from './../data/config';
import { GameState } from './../classes/gameState';
import { Injectable } from '@angular/core';
import { Board } from '../classes/board';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Bag } from '../classes/bag';
import { Trash } from '../classes/trash';
import { TurnPhaseEnum } from '../classes/turnPhaseEnum';
import { Selection } from '../classes/selection';
import { DisposalQueue } from '../classes/disposalQueue';

@Injectable()
export class GameService {
    private gameState: GameState = new GameState();
    private gameStateSubscriptions: Subscription[] = [];
    public gameStateChanged = new BehaviorSubject<GameState>(null);

    constructor() {

    }

    startNewGame(numPlayers) {
        this.gameState.disposalQueue = new DisposalQueue();
        for (let player = 0; player < numPlayers; player++) {
            this.gameState.boards.push(new Board());
        }
        this.gameState.bag = new Bag();
        this.gameState.street = new Street(this.gameState.bag);
        for (let factory = 0; factory < Config.defaults.numPlayers[numPlayers].numFactories; factory++) {
            this.gameState.factories.push(new Factory(this.gameState.bag));
        }
        this.gameState.selection = new Selection();
        this.gameState.placement = new Placement();
        this.gameState.whoseTurn = 0;
        this.gameState.turnPhase = TurnPhaseEnum.selecting;
        this.gameStateChanged.next(this.gameState);
    }

    selectionMade() {
        this.gameState.turnPhase = TurnPhaseEnum.confirmingSelection;
        this.gameStateChanged.next(this.gameState);
    }

    selectionConfirmed() {
        this.gameState.turnPhase = TurnPhaseEnum.placing;
        this.gameStateChanged.next(this.gameState);
    }

    placementSelected() {
        this.gameState.turnPhase = TurnPhaseEnum.confirmingPlacement;
        this.gameStateChanged.next(this.gameState);
    }

    placementConfirmed() {
        this.gameStateChanged.next(this.gameState);
        this.nextTurn();
    }

    nextTurn() {
        this.toggleTurn();
        this.gameStateChanged.next(this.gameState);
        if (this.gameComplete() === false && this.roundComplete() === false) {
            this.gameState.turnPhase = TurnPhaseEnum.selecting;
        } else {
            console.log('round complete');
        }
    }

    roundComplete(): boolean {
        let complete = true;
        this.gameState.factories.map(factory => {
            if (factory.isEmpty() === false) {
                complete = false;
            }
        });
        if (this.gameState.street.isEmpty() === false) {
            complete = false;
        }
        return complete;
    }

    gameComplete(): boolean {
        return false;
    }

    parseGameState() {
        // later, for implmenenting database
    }

    toggleTurn() {
        if (this.gameState.whoseTurn === 0) {
            this.gameState.whoseTurn = 1;
        } else if (this.gameState.whoseTurn === 1) {
            this.gameState.whoseTurn = 0;
        }
    }
}
