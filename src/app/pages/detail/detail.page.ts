import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonChip, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';

import { addIcons } from 'ionicons';
import { heart, homeOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonChip, IonSpinner, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class DetailPage implements OnInit {
  pokemon: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
      addIcons({homeOutline,starOutline});}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetail(name).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
  addToFavorites() {
  // Em breve: lógica para favoritar o Pokémon
  }
}