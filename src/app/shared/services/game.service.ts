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

@Injectable()
export class GameService {
    private gameState: GameState = new GameState();
    private gameStateSubscriptions: Subscription[] = [];
    public gameStateChanged = new BehaviorSubject<GameState>(null);

    constructor() {

    }

    startNewGame(numPlayers) {
        for (let player = 0; player < numPlayers; player++) {
            this.gameState.boards.push(new Board());
        }
        this.gameState.bag = new Bag();
        for (let factory = 0; factory < Config.defaults.numPlayers[numPlayers].numFactories; factory++) {
            this.gameState.factories.push(new Factory(this.gameState.bag));
        }
        this.gameState.selection = new Selection();
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

    parseGameState() {
        // later, for implmenenting database
    }
}
