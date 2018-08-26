import { ColorEnum } from './../shared/classes/colorEnum';
import { DisposalQueue } from './../shared/classes/disposalQueue';
import { TurnPhaseEnum } from './../shared/classes/turnPhaseEnum';
import { Factory } from './../shared/classes/factory';
import { GameService } from './../shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import { Level } from '../shared/classes/level';
import { Street } from '../shared/classes/street';

@Component({
  selector: 'app-bluzul',
  templateUrl: './bluzul.component.html',
  styleUrls: ['./bluzul.component.css']
})
export class BluzulComponent implements OnInit {
  private gameState;

  constructor(private gameService: GameService) {
    this.gameService.gameStateChanged.subscribe(gameState => {
      console.log(gameState)
      this.gameState = gameState;
    });
  }

  ngOnInit() {

  }

  computeSelected(color: ColorEnum, factory: Factory) {
    if (this.gameState.turnPhase === TurnPhaseEnum.selecting || this.gameState.turnPhase === TurnPhaseEnum.confirmingSelection) {
      this.gameState.disposalQueue.clear();
      this.gameState.factories.map(currentFactory => {
        currentFactory.clearSelected();
      });
      const selectedTiles = factory.computeSelected(color);
      this.gameState.selection = {
        color: color,
        numTiles: selectedTiles.length
      };
      this.gameState.disposalQueue = factory.computeDiscardedTiles(color);
      if (this.gameState.turnPhase === TurnPhaseEnum.selecting) {
        this.gameService.selectionMade();
      }
    }
  }

  computeSelectedStreet(color: ColorEnum) {
    if (this.gameState.turnPhase === TurnPhaseEnum.selecting || this.gameState.turnPhase === TurnPhaseEnum.confirmingSelection) {
      this.gameState.disposalQueue.clear();
      this.gameState.factories.map(currentFactory => {
        currentFactory.clearSelected();
      });
      const selectedTiles = this.gameState.street.computeSelected(color);
      this.gameState.selection = {
        color: color,
        numTiles: selectedTiles.length
      };
      if (this.gameState.turnPhase === TurnPhaseEnum.selecting) {
        this.gameService.selectionMade();
      }
    }
  }

  confirmSelection(factory: Factory) {
    this.gameState.street.addTiles(this.gameState.disposalQueue.tiles);
    factory.removeSelectedTiles();
    this.gameService.selectionConfirmed();
  }

  confirmSelectionStreet(street: Street) {
    street.removeSelectedTiles(this.gameState.selection);
    this.gameService.selectionConfirmed();
  }

  canAccomodate(level: Level): boolean {
    if (this.gameState.turnPhase === TurnPhaseEnum.placing) {
      const tileColor = this.gameState.selection.color;
      const gridRow = this.gameState.boards[this.gameState.whoseTurn].grid.rows[level.whichLevel()];
      if (gridRow.canPlaceTile(tileColor) === true && level.canAccomodateTiles(this.gameState.selection)) {
        return true;
      }
    }
    return false;
  }

  selectPlacement(level: Level) {
    if (this.canAccomodate(level)) {
      this.gameState.placement = {
        levelNum: level.whichLevel(),
        numTiles: this.gameState.selection.numTiles,
        color: this.gameState.selection.color
      };
      if (this.gameState.turnPhase === TurnPhaseEnum.placing) {
        this.gameService.placementSelected();
      }
    }
  }

  confirmPlacement() {
    const board = this.gameState.boards[this.gameState.whoseTurn];
    const placedLevel: Level = board.palace.levels[this.gameState.placement.levelNum];
    const remainingTiles = placedLevel.fillRooms(this.gameState.placement);
    board.trash.placeTiles(remainingTiles, this.gameState.placement.color);
    this.gameService.placementConfirmed();
  }

  calculateRoundScore() {
         
  }

  public getArrayFromNumber(number: number): any[] {
    return Array(number);
  }
}
