import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonChip, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, homeOutline, starOutline } from 'ionicons/icons';

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
  favorites: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    addIcons({homeOutline,starOutline,heart,'heartOutline':heartOutline});
  }

  ngOnInit() {
    const favs = localStorage.getItem('favorites');
    if (favs) this.favorites = JSON.parse(favs);

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

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
}