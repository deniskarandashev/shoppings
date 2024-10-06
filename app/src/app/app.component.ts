import {ChangeDetectorRef, Component, effect, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    InputComponent
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
    private _cdr: ChangeDetectorRef
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
    console.log('localStoredSelected', localStoredSelected)
    if (localStoredSelected) {
      const localStoredSelectedArr = JSON.parse(localStoredSelected)
      const localStoredSelectedSet = new Set<Product>()
      localStoredSelectedArr.forEach((s: Product) => {
        localStoredSelectedSet.add(s)
      })
      this.state.selected.set(localStoredSelectedSet)
      console.log(this.state.selected())
      this._cdr.detectChanges()
    }
  }

  ngOnDestroy() {
    const stateStr = JSON.stringify(Array.from(this.state.selected()))
    window.localStorage.setItem(this.STATE_KEY, stateStr)
  }
}
