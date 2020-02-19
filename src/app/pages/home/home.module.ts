import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { InformationCardsComponent } from './information-cards/information-cards.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { CardChoicesSelectionComponent } from './card-choices-selection/card-choices-selection.component';
import { GhostInformationCardComponent } from '../home/information-cards/ghost-information-card/ghost-information-card.component';
import { GhostCardChoiceCardComponent } from '../home/card-choices-selection/ghost-card-choice-card/ghost-card-choice-card.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    InformationCardsComponent,
    TrendingProductsComponent,
    CardChoicesSelectionComponent,
    GhostInformationCardComponent,
    GhostCardChoiceCardComponent
  ]
})
export class HomePageModule { }
