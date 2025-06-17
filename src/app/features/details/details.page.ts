import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule,
            RouterModule,
            CommonModule,
            // PokemonInfoComponent
           ],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage {}
