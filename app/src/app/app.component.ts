import {ChangeDetectorRef, Component, effect, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {categoriesDb} from './db/categories.db';
import {RowComponent} from './components/row/row.component';
import {Category} from './models/category.interface';
import {CommonModule} from '@angular/common';
import {StateService} from './state/state.service';
import {ChipsComponent} from './components/chips/chips.component';
import {MatChipsModule} from '@angular/material/chips';
import {InputComponent} from './components/input/input.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Product} from './models/product.interface';
import {EncriptionUtils} from './utils/encription.utils';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TableComponent } from './components/table/table.component';
import { Mode } from './models/mode.enum';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RowComponent,
    ChipsComponent,
    MatChipsModule,
    InputComponent,
    MatSnackBarModule,
    TableComponent,
    CardsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly STATE_KEY = 'SHOP_STATE_SELECTED';
  title = 'app';
  data: Category[] = categoriesDb()

  constructor(
    public state: StateService,
    private _cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    effect(() => {
      if (this.state.selected()) {
        const stateStr = JSON.stringify(Array.from(this.state.selected()))
        window.localStorage.setItem(this.STATE_KEY, stateStr)
        console.log('effect stateStr', stateStr)
        this._cdr.detectChanges()
      }
    })
  }

  ngOnInit() {
    const localStoredSelected = window.localStorage.getItem(this.STATE_KEY)
    if (localStoredSelected) {
      const localStoredSelectedArr = JSON.parse(localStoredSelected)
      const localStoredSelectedSet = new Set<Product>()
      localStoredSelectedArr.forEach((s: Product) => {
        localStoredSelectedSet.add(s)
      })
      // this.state.selected.set(localStoredSelectedSet)
      this.state.onChangeProducts.next(localStoredSelectedSet)
      this._cdr.detectChanges()
    }

    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      if (data) {
        const selectedProducts = EncriptionUtils.decodedData(data);
        console.log('Полученные продукты:', selectedProducts);
        // this.state.selected.set(selectedProducts)
        this.state.onChangeProducts.next(selectedProducts)
      }
    });

  }

  ngOnDestroy() {
    const stateStr = JSON.stringify(Array.from(this.state.selected()))
    window.localStorage.setItem(this.STATE_KEY, stateStr)
  }

  get isAddNewShown(): boolean {
    return this.state.isAddNewMode()
  }

  get isTableShown(): boolean {
    return this.state.mode() === Mode.TABLE
  }

  get isSelectedChipsShown(): boolean {
    return !!(this.state?.selected()?.size && this.state.mode() === Mode.MAIN)
  }

  get isChipsShown(): boolean {
    return this.state.mode() === Mode.MAIN
  }
  
  get isCardsShown(): boolean {
    return this.state.mode() === Mode.CARDS
  }
}
