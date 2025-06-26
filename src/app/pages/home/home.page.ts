import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline, search } from 'ionicons/icons';


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
  favorites: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    addIcons({
      search,
      heart,
      'heart-outline': heartOutline
    });
    }
  
  skeletonArray = Array(21); 
  
  ionViewWillEnter() {
    const favs = localStorage.getItem('favorites');
    this.favorites = favs ? JSON.parse(favs) : [];
  }

  ngOnInit() {
    const favs = localStorage.getItem('favorites');
    if (favs) this.favorites = JSON.parse(favs);
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

  goToDetail(name: string) {
    this.router.navigate(['/detail', name]);
  }

  toggleFavorite(name: string) {
    if (this.favorites.includes(name)) {
      this.favorites = this.favorites.filter(fav => fav !== name);
    } else {
      this.favorites.push(name);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(name: string): boolean {
    return this.favorites.includes(name);
  }
}