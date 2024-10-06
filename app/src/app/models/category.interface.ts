import {Product, ProductsObj} from './product.interface';
import {CategoryEnum} from './category.enum';

export interface Category {
  name: string,
  category?: CategoryEnum,
  products?: ProductsObj[],
}


