import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Category} from '../../models/category.interface';
import {Product, ProductTag} from '../../models/product.interface';
import {StateService} from '../../state/state.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  value = '';
  private state = inject(StateService)

  onAddClick(): void {
    console.log(this.value)
    this.prepareNewProducts(this.value)
    this.value = '';
  }

  private prepareNewProducts(inputStr: string) {
    const selected = this.state.selected();
    const inputStrArr = inputStr.split(',')
    console.log(inputStrArr)

    const products = inputStrArr.map(str => {
      const trimmedStr = str.trim();
      const [namePart, categoryPart] = trimmedStr.split('*');
      // if (categoryPart) {
      //   selected.add(<Product>{
      //     productName: namePart.trim(),
      //     productId: namePart.trim().split(' ')[0],
      //     category: categoryPart.trim()
      //   });
      // }
      const newProduct = (<Product>{
        productName: namePart.trim(),
        productId: namePart.trim().split(' ')[0],
      });

      selected.add(newProduct)

      this.state.onChangeProducts.next(selected)
    });

    this.state.selected()
  }
}
