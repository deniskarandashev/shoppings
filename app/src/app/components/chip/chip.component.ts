import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatChipOption, MatChipSelectionChange, MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {StateService} from '../../state/state.service';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [
    MatChipsModule,
    MatProgressBarModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  private readonly STATE_KEY = 'SHOP_STATE_SELECTED';
  chipData!: Product
  i: number = 0;

  @ViewChild('chipOption') chipOption!: MatChipOption;
  @Input() set index(value: number) {
    this.i = value;
  }
  @Input() set data(value: any) {
    this.chipData = value;
    if (this.chipOption) {
      this.chipOption.selected = true;
      this.cdr.detectChanges()
    }
  }

  constructor(
    protected state: StateService,
    private cdr: ChangeDetectorRef
  ) {}

  get hasChipData(): boolean {
    return !!this.chipData;
  }

  onSelect($event: MatChipSelectionChange): void {
    const selectedProducts = this.state.selected();
    const selectedProductsIds = Array.from(selectedProducts).map((p: Product) => {
      return p.productId
    })
    if ($event.selected && !selectedProductsIds.includes(this.chipData.productId)) {
      selectedProducts?.add(this.chipData);
    }
    this.state.selected.set(selectedProducts);
    this.saveToLocalStorage()
  }

  onDelete() {
    const selectedProducts = this.state.selected();
    selectedProducts.delete(this.chipData);
    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    const stateStr = JSON.stringify(Array.from(this.state.selected()))
    window.localStorage.setItem(this.STATE_KEY, stateStr)
  }

  get isSelected(): boolean {
    const selectedIds: string[] = [];
    Array.from(this.state.selected()).forEach((p: Product) => {
      selectedIds.push(p.productId);
    })

    if (selectedIds.includes(this.chipData?.productId.toString())) {
      return true;
    }
    return false;
  }
}
