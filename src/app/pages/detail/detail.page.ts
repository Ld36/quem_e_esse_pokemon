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

  typeColors: { [key: string]: string } = {
  normal:    '#A8A77A',
  fire:      '#EE8130',
  water:     '#6390F0',
  electric:  '#F7D02C',
  grass:     '#7AC74C',
  ice:       '#96D9D6',
  fighting:  '#C22E28',
  poison:    '#A33EA1',
  ground:    '#E2BF65',
  flying:    '#A98FF3',
  psychic:   '#F95587',
  bug:       '#A6B91A',
  rock:      '#B6A136',
  ghost:     '#735797',
  dragon:    '#6F35FC',
  dark:      '#705746',
  steel:     '#B7B7CE',
  fairy:     '#D685AD'
};

getTypeColor(type: string): string {
  return this.typeColors[type] || '#777';
}

}