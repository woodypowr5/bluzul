import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BluzulComponent } from './bluzul/bluzul.component';
import { GameService } from './shared/services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    BluzulComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
