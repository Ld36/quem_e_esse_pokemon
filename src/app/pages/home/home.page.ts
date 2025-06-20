import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class HomePage implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchError: string = '';
  pokemons: any[] = [];
  allPokemons: any[] = [];
  loading = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.fetchAllPokemons();
  }

  ngOnDestroy() {}

  async fetchAllPokemons() {
    this.loading = true;
    try {
      const res = await lastValueFrom(this.pokemonService.getPokemons(0, 151));
      this.allPokemons = res.results;
      this.filterPokemons('');
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    } finally {
      this.loading = false;
    }
  }

  async filterPokemons(term: string) {
    this.loading = true;
    try {
      const filtered = this.allPokemons.filter((p: any) =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      // Limite para não sobrecarregar (ex: 20 resultados)
      const first20 = filtered.slice(0, 20);
      const detailPromises = first20.map((p: any) =>
        lastValueFrom(this.pokemonService.getPokemonDetail(p.name))
      );
      this.pokemons = await Promise.all(detailPromises);
      this.searchError = filtered.length === 0 ? 'Pokémon não encontrado!' : '';
    } catch (error) {
      this.pokemons = [];
      this.searchError = 'Erro ao buscar Pokémon!';
    } finally {
      this.loading = false;
    }
  }

  onSearchTermChange(term: string | null | undefined) {
    this.filterPokemons((term ?? '').trim().toLowerCase());
  }

  searchPokemon() {
    this.onSearchTermChange(this.searchTerm ?? '');
  }
}