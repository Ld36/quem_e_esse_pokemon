import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule
    //PokemonInfoComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  pokemonNameOrId: string = '';
  pokemonSelecionado: string = 'pikachu';

  buscarPokemon() {
    if (this.pokemonNameOrId) {
      this.pokemonSelecionado = this.pokemonNameOrId.trim().toLowerCase();
    }
  }
}