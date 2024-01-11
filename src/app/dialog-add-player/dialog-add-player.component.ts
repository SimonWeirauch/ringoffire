import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef ,MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, PlayerComponent, FormsModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})

export class DialogAddPlayerComponent {
  name: string;

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){

  }

  onNoClick(){
    this.dialogRef.close();
  }
}
