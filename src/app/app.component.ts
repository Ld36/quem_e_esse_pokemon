import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule, PokemonInfoComponent],
  template: `
    <ion-app>
      <router-outlet></router-outlet>
      <app-pokemon-info [nameOrId]="'ditto'"></app-pokemon-info>
    </ion-app>
  `
})
export class AppComponent {}
