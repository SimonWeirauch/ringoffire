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
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatInputModule,
            MatFormFieldModule, MatDialogModule, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  
  
  game: Game;
  firestore: Firestore = inject(Firestore);
  gameFromDB: any;
  currentGameId: string;
  


    constructor(public dialog: MatDialog, private route: ActivatedRoute ){
      this.newGame();
      this.identifyGame();
      this.loadGame();
    }


    //Read params to identify the game that will be loaded
    identifyGame(){
      return this.route.params.subscribe((params) => {
        this.currentGameId = params['id'];
        console.log(this.currentGameId);
      })
    }


    loadGame(){
      onSnapshot(collection(this.firestore, 'games'), (list) => {
        list.forEach(element => {
          if(this.currentGameId == element.id){
            this.gameFromDB = element.data();

            //fills the "game" variable with the game data from the params
            this.game.currentPlayer = this.gameFromDB.currentPlayer;
            this.game.playedCards = this.gameFromDB.playedCards;
            this.game.players = this.gameFromDB.players;
            this.game.stack = this.gameFromDB.stack;
            this.game.pickCardAnimation = this.gameFromDB.pickCardAnimation;
            this.game.currentCard = this.gameFromDB.currentCard;
            
            console.log(this.game);
          }
        });
      });
    }
    
    
    async saveGame(){
      await updateDoc(doc(collection(this.firestore, 'games'), this.currentGameId), this.game.toJson());
    }

    //Creates a new "game" variable
    newGame(){
      this.game = new Game();
    }


    takeCard(){
      if(!this.game.pickCardAnimation){
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();

        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
      }
    }



    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string) => {
        if(name && name.length > 0){
          this.game.players.push(name);
          this.saveGame();
        }
      });
    }
  }


