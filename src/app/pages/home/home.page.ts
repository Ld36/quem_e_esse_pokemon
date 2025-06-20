import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, Subscription, lastValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  loading = false;

  private searchSubject = new Subject<string>();
  private searchSub?: Subscription;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit() {
    // Busca inicial (opcional: pode trazer todos ou nenhum)
    this.fetchAllPokemons();

    // Busca dinâmica
    this.searchSub = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (!term) {
        this.fetchAllPokemons();
      } else {
        this.dynamicSearch(term);
      }
    });
  }
  searchPokemon() {
  this.onSearchTermChange(this.searchTerm ?? '');
  }

onSearchTermChange(term: string | null | undefined) {
  this.searchSubject.next((term ?? '').trim().toLowerCase());
}

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }


  async fetchAllPokemons() {
    this.loading = true;
    try {
      const res = await lastValueFrom(this.pokemonService.getPokemons(0, 50));
      const results = res.results;
      const detailPromises = results.map((p: any) =>
        lastValueFrom(this.pokemonService.getPokemonDetail(p.name))
      );
      this.pokemons = await Promise.all(detailPromises);
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    } finally {
      this.loading = false;
    }
  }

  async dynamicSearch(term: string) {
    this.loading = true;
    try {
      // Tenta buscar por nome ou ID
      const poke = await lastValueFrom(this.pokemonService.getPokemonDetail(term));
      this.pokemons = [poke];
      this.searchError = '';
    } catch (error) {
      this.pokemons = [];
      this.searchError = 'Pokémon não encontrado!';
    } finally {
      this.loading = false;
    }
  }
}

