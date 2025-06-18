import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Certifique-se que CommonModule está aqui!
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, // <--- Este é crucial para o *ngIf e outras diretivas
    FormsModule,
    HttpClientModule,
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

  // --- NOVO MÉTODO PARA TRATAR OS TIPOS ---
  getPokemonTypesString(pokemon: any): string {
    if (pokemon && pokemon.types && Array.isArray(pokemon.types)) {
      // Mapeia os tipos para os nomes e junta-os com vírgula e espaço
      return pokemon.types.map((t: any) => t.type.name).join(', ');
    }
    return ''; // Retorna string vazia se não houver tipos
  }
  // ----------------------------------------

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

  fetchAllPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(0, 50).subscribe(async res => {
      const results = res.results;
      // Buscar detalhes completos de cada Pokémon
      const detailPromises = results.map((p: any) =>
        this.pokemonService.getPokemonDetail(p.name).toPromise()
      );
      this.pokemons = await Promise.all(detailPromises);
      this.loading = false;
    });
  }
}