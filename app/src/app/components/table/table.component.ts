import { map } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {ChangeDetectorRef, Component, effect, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Product } from '../../models/product.interface';
import { StateService } from '../../state/state.service';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-table',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, AutocompleteComponent, CurrencyPipe, MatButtonModule, MatIconModule],
})
export class TableComponent {
  

  displayedColumns: string[] = ['select', 'productName', 'quantity', 'price', 'total'];
  selection = new SelectionModel<Product>(true, []);

  constructor(protected state: StateService, private cdr: ChangeDetectorRef) {
    // effect(() => {
    //   if (state.selected()) {
    //     this.state.tableData.set(new MatTableDataSource<Product>(Array.from(state.selected())));       
    //     cdr.detectChanges()
    //   }
    // }
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.state.tableData()?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.state.tableData().data);
  }

  onQuantityChanged(q: string, row: Product) {
    const selectedUpd = Array.from(this.state.selected()).map((p: Product) => {
      if (p.productName === row.productName) {
        p.quantity = q
      }
      return p;
    })

    this.state.onChangeProducts.next(new Set(selectedUpd))
  }

  onPriceChanged(p: string, row: Product) {
    const pNum = parseFloat(p) ?? null;
    const selectedUpd = Array.from(this.state.selected()).map((p: Product) => {
      if (p.productName === row.productName) {
        p.price = pNum.toString()
      }
      return p;
    })

    this.state.onChangeProducts.next(new Set(selectedUpd))
  }

  total(row: Product): string {
    const price: number = parseFloat(row.price || '0') ?? 0;
    const quantity: number = parseFloat(row.quantity || '0') ?? 0;
    return (price * quantity).toString()
  }

  // get totalCost(): string {
  //   const selected = Array.from(this.state.selected());
  //   let sum = 0;
  //   selected.forEach((p: Product) => {
  //     const price: number = parseFloat(p.price ?? '0')
  //     const quantity: number = p.quantity ?? 0;
  //     const cost = price * quantity;
  //     sum += cost;
  //   })
  //   return sum.toString();
  // }

  onCheckbox(row: Product): void {
    const selected = Array.from(this.state.selected())
    .map((p => {
      if (p.productName === row.productName) {
        p.includedToTotalPrice = !!p.includedToTotalPrice ? false : true;
      }
      return p;
    }))
    // .sort((a, b) => {
    //   return Number(!!a.includedToTotalPrice) - Number(!!b.includedToTotalPrice);
    // });
    this.state.onChangeProducts.next(new Set<Product>(selected))
  }
}
