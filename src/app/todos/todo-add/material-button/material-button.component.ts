import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-material-button',
  templateUrl: './material-button.component.html',
  styleUrls: ['./material-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class MaterialButtonComponent {

}
