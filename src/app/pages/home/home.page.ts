import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
// Add this import for lastValueFrom
import { lastValueFrom } from 'rxjs'; // <--- NEW IMPORT

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule, // While imported here, HttpClient is provided globally in main.ts
  ]
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  searchError: string = '';
  pokemons: any[] = [];
  loading = false;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.fetchAllPokemons();
  }

  getPokemonTypesString(pokemon: any): string {
    if (pokemon && pokemon.types && Array.isArray(pokemon.types)) {
      return pokemon.types.map((t: any) => t.type.name).join(', ');
    }
    return '';
  }

  searchPokemon() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.searchError = 'Por favor, digite um nome ou ID de Pokémon.';
      return;
    }

    this.pokemonService.getPokemonDetail(term).subscribe({
      next: () => {
        this.searchError = '';
        this.goToDetail(term);
      },
      error: (err) => {
        this.searchError = 'Pokémon não encontrado! Tente outro nome ou ID.';
        console.error('Erro ao buscar Pokémon:', err);
      }
    });
  }

  goToDetail(term: string) {
    this.router.navigate(['/detail', term]);
  }

  async fetchAllPokemons() { // Mark as async
    this.loading = true;
    try {
      const res = await lastValueFrom(this.pokemonService.getPokemons(0, 50)); // Use lastValueFrom
      const results = res.results;

      const detailPromises = results.map((p: any) =>
        lastValueFrom(this.pokemonService.getPokemonDetail(p.name)) // Use lastValueFrom here too
      );
      this.pokemons = await Promise.all(detailPromises);
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
      // Optionally handle error display to user
    } finally {
      this.loading = false;
    }
  }
}