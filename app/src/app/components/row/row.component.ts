import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {Category} from '../../models/category.interface';
import {CommonModule} from '@angular/common';
import {Product, ProductsObj} from '../../models/product.interface';
import {ChipsComponent} from '../chips/chips.component';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    ChipsComponent
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent {
  name: string = '';
  products!: ProductsObj[]

  @Input() set category(value: Category) {
    this.name = value.name
    this.products = value.products ?? [] as ProductsObj[]
    // console.log('this.products', this.products)
  }

  // get products() {
  //   const p = [];
  //
  //   return p;
  // }
}
