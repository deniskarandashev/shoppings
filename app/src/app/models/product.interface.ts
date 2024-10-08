import {Category} from './category.interface';
import {SubCategoryEnum} from './category.enum';

export interface Product {
  productName: string,
  productId: string,
  tag?: ProductTag,
  categories?: Category[]
  category?: Category | string
}

export interface ProductsObj {
  name: string,
  category?: Category,
  subCategory?: SubCategoryEnum
  data: {
    [key: string]: string
  }
}

export enum ProductTag {

}
