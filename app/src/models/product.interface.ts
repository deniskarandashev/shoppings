import {Category} from './category.interface';

export interface Product {
  name: string,
  categories?: Category[]
}
