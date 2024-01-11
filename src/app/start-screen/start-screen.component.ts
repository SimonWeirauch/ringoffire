import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructer(router: Router){

  }

  newGame(){
    window.location.href = 'http://localhost:4200/game'
  }

}
