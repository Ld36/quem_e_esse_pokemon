import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonCard
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, heartOutline, homeOutline } from 'ionicons/icons';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonSpinner,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    CommonModule,
    FormsModule
  ]
})

export class FavoritesPage implements OnInit {
  favorites: string[] = [];
  pokemons: any[] = [];
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    addIcons({ heart, 'heart-outline': heartOutline, homeOutline });
  }

  async ngOnInit() {
    await this.loadFavorites();
  }

  // ADICIONE ESTE MÉTODO
  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  // EXTRAIA O CARREGAMENTO PARA UM MÉTODO REUTILIZÁVEL
  async loadFavorites() {
    const favs = localStorage.getItem('favorites');
    this.favorites = favs ? JSON.parse(favs) : [];
    this.pokemons = [];
    if (this.favorites.length > 0) {
      this.loading = true;
      try {
        const detailPromises = this.favorites.map(name =>
          lastValueFrom(this.pokemonService.getPokemonDetail(name))
        );
        this.pokemons = await Promise.all(detailPromises);
      } catch (e) {
        this.pokemons = [];
      } finally {
        this.loading = false;
      }
    }
  }

  toggleFavorite(name: string) {
    this.favorites = this.favorites.filter(fav => fav !== name);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.pokemons = this.pokemons.filter(p => p.name !== name);
  }

  isFavorite(name: string): boolean {
    return this.favorites.includes(name);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToDetail(name: string) {
    this.router.navigate(['/detail', name]);
  }
}

// export class FavoritesPage implements OnInit {
//   favorites: string[] = [];
//   pokemons: any[] = [];
//   loading = false;

//   constructor(
//     private pokemonService: PokemonService,
//     private router: Router
//   ) {
//     addIcons({ heart, 'heart-outline': heartOutline, homeOutline });
//   }

//   async ngOnInit() {
//     const favs = localStorage.getItem('favorites');
//     if (favs) this.favorites = JSON.parse(favs);

//     if (this.favorites.length > 0) {
//       this.loading = true;
//       try {
//         const detailPromises = this.favorites.map(name =>
//           lastValueFrom(this.pokemonService.getPokemonDetail(name))
//         );
//         this.pokemons = await Promise.all(detailPromises);
//       } catch (e) {
//         this.pokemons = [];
//       } finally {
//         this.loading = false;
//       }
//     }
//   }

//   toggleFavorite(name: string) {
//     this.favorites = this.favorites.filter(fav => fav !== name);
//     localStorage.setItem('favorites', JSON.stringify(this.favorites));
//     this.pokemons = this.pokemons.filter(p => p.name !== name);
//   }

//   isFavorite(name: string): boolean {
//     return this.favorites.includes(name);
//   }

//   goToHome() {
//     this.router.navigate(['/home']);
//   }

//   goToDetail(name: string) {
//   this.router.navigate(['/detail', name]);
// }
// }