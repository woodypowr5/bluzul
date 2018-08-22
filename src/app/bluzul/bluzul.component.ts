import { TurnPhaseEnum } from './../shared/classes/turnPhaseEnum';
import { Factory } from './../shared/classes/factory';
import { GameService } from './../shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import { ColorEnum } from '../shared/classes/colorEnum';
import { Level } from '../shared/classes/level';

@Component({
  selector: 'app-bluzul',
  templateUrl: './bluzul.component.html',
  styleUrls: ['./bluzul.component.css']
})
export class BluzulComponent implements OnInit {
  private gameState;

  constructor(private gameService: GameService) {
    this.gameService.gameStateChanged.subscribe(gameState => {
      this.gameState = gameState;
    });
  }

  ngOnInit() {

  }

  computeSelected(color: ColorEnum, factory: Factory) {
    if (this.gameState.turnPhase === TurnPhaseEnum.selecting || this.gameState.turnPhase === TurnPhaseEnum.confirmingSelection) {
      this.gameState.factories.map(currentFactory => {
        currentFactory.clearSelected();
      });
      const selectedTiles = factory.computeSelected(color);
      this.gameState.selection = {
        color: color,
        numTiles: selectedTiles.length
      };
      const discardedTiles = factory.computeDiscarded(color);
      if (this.gameState.turnPhase === TurnPhaseEnum.selecting) {
        this.gameService.selectionMade();
      }
    }
  }

  confirmSelection() {
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
}
