import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipComponent} from '../chip/chip.component';
import {CategoryEnum} from '../../models/category.enum';
import {StateService} from '../../state/state.service';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    CommonModule,
    ChipComponent
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  dataArr!: any;
  state = inject(StateService)
  isSelectedMode = false;

  @Input() set data(value: any) {
    this.dataArr = []
    value.forEach((v1: any) => {
      const data = Object.entries(v1.data).map(([key, v2]) => ({
        productId: key,
        productName: v2,
        subCategoryName: v1.subCategory
      }));
      this.dataArr = [...this.dataArr, ...data];
    })
  }

  @Input() set selectedMode(value: boolean) {
    if (value) {
      this.dataArr = this.state.selected();
      this.isSelectedMode = true;
    }
  }
}
