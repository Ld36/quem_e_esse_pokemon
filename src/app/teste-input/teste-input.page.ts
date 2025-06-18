// import { Component } from '@angular/core';
// import { IonicModule } from '@ionic/angular';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-teste-input',
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule],
//   templateUrl: './teste-input.page.html',
//   styleUrls: ['./teste-input.page.scss'],
// })
// export class TesteInputPage {
//   campo = '';
// }

import { Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-teste-input',
  standalone: true,
  templateUrl: './teste-input.page.html',
  styleUrls: ['./teste-input.page.scss'],
  imports: [IonSearchbar],
})
export class TesteInputPage {
  campo = ''

}