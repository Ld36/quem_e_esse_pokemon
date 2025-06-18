import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private favoritesKey = 'pokemon_favorites';

  constructor(private http: HttpClient) {}

  getPokemons(offset = 0, limit = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${name}`);
  }

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  }

  addFavorite(name: string) {
    const favs = this.getFavorites();
    if (!favs.includes(name)) {
      favs.push(name);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favs));
    }
  }

  removeFavorite(name: string) {
    let favs = this.getFavorites();
    favs = favs.filter(f => f !== name);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favs));
  }

  isFavorite(name: string): boolean {
    return this.getFavorites().includes(name);
  }
}
