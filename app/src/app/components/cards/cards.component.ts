import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cardToShow!: string;
  cards: {name: string, img: string, isSmall: boolean}[] = [
    {
      name: 'AB',
      img: 'ab',
      isSmall: true
    },
    {
      name: 'Auchan',
      img: 'auchan',
      isSmall: true
    },
    {
      name: 'LetEatBe',
      img: 'leteatbe',
      isSmall: true
    },
    {
      name: 'Lidl',
      img: 'lidl',
      isSmall: true
    },
    {
      name: 'Masoutis',
      img: 'masoutis',
      isSmall: true
    },
    {
      name: 'Pickard',
      img: 'picard',
      isSmall: true
    }
  ]

  setCardToShow(c: string) {
    this.cardToShow = c;
  }
}
