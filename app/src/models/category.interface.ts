import {Product} from './product.interface';

export interface Category {
  name: string,
  products?: Product[]
}
