import {Injectable, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  defaultState = {
    selected: new Set<Product>(),
    isAddNewMode: false
  }
  selected = signal(this.defaultState.selected)
  isAddNewMode = signal(this.defaultState.isAddNewMode)
}
