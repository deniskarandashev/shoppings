import { MatTableDataSource } from '@angular/material/table';
import {Injectable, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../models/product.interface';
import { Subject } from 'rxjs';
import { Mode } from '../models/mode.enum';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  defaultState = {
    selected: new Set<Product>(),
    isAddNewMode: false,
    // tableData: new MatTableDataSource<Product>(null)
  }
  selected = signal(this.defaultState.selected)
  isAddNewMode = signal(this.defaultState.isAddNewMode)
  tableData = signal(new MatTableDataSource<Product>(Array.from(this.selected())))
  totalCost = signal(0)
  mode = signal(Mode.MAIN)

  onChangeProducts = new Subject<Set<Product>>();
  onChangeMode = new Subject<Mode>();

  constructor() {
    this.onChangeProducts.subscribe((pp: Set<Product>) => {
      this.selected.set(pp)
      this.tableData.set(new MatTableDataSource<Product>(Array.from(pp)))
      this.calcTotalCost();
    })

    this.onChangeMode.subscribe((m: Mode) => {
      this.mode.set(m)
    })
  }

  private calcTotalCost(): void {
    const selected = Array.from(this.selected());
    let sum = 0;
    selected.forEach((p: Product) => {
      const price: number = parseFloat(p.price ?? '0')
      const quantity: number = p.quantity ?? 0;
      const cost = price * quantity;
      sum += cost;
    })
    this.totalCost.set(sum)
  }
}