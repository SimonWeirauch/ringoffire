import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  game: Game = new Game();
  
  constructor(private router: Router){

  }

  //Creates a new document in the DB and directs the player to the game
  newGame(){
    addDoc(collection(this.firestore, "games"), this.toJson()).then((gameInfo:any) => {
      console.log(gameInfo);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
   
  }

  //JSON um es in die Datenbank zu bringen.
  public toJson(){
    return {
      players: this.game.players,
      stack: this.game.stack,
      playedCards: this.game.playedCards,
      currentPlayer: this.game.currentPlayer,
      currentCard: this.game.currentCard,
      pickCardAnimation: this.game.pickCardAnimation
    }
  }


}
