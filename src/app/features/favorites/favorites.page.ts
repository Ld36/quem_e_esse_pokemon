import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [IonicModule,
            RouterModule,
            CommonModule,
            // PokemonInfoComponent
            ],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage {}
