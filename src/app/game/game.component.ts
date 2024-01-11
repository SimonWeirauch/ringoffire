import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatInputModule,
            MatFormFieldModule, MatDialogModule, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game;
  currentCard: string;

    constructor(public dialog: MatDialog){
      this.newGame();
    }

    takeCard(){
      if(!this.pickCardAnimation){
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;
        
        console.log('new card is ' + this.currentCard)
        console.log(this.game);
        
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }

    newGame(){

      this.game = new Game();
      
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
      dialogRef.afterClosed().subscribe((name: string) => {
        if(name && name.length > 0){
          this.game.players.push(name);
        }
        
      });
    }
  }


