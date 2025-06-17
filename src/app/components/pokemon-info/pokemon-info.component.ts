import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-info.component.html'
})
export class PokemonInfoComponent implements OnInit {
  @Input() nameOrId!: string | number;
  pokemon: any;
  error: string | null = null;

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapi.getPokemon(this.nameOrId).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => this.error = 'Pokémon não encontrado'
    });
  }
}
