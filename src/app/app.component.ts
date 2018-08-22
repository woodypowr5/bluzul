import { GameService } from './shared/services/game.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private gameService: GameService) {}

  startGame(numPlayers: number): void {
    this.gameService.startNewGame(numPlayers);
   }
}
