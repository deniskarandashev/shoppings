import {ProductsObj} from '../models/product.interface';
import {CategoryEnum, SubCategoryEnum} from '../models/category.enum';

export function vegetablesObj(): ProductsObj {
  return ({
    name: 'vegetables',
    subCategory: SubCategoryEnum.vegetables,
    data: {
      tomatoes: 'Tomatoes',
      potato: 'Potato',
      onion: 'Onion',
      cabbage: 'Chinese cabbage',
      corn: 'Corn',
      carrots: 'Carrots',
      cucumbers: 'Cucumbers',
      eggplant: 'Eggplant',
      zucchini: 'Zucchini'
    }
  })
}

export function fruitsObj(): ProductsObj {
  return ({
    name: 'fruits',
    subCategory: SubCategoryEnum.fruits,
    data: {
      bananas: 'Bananas',
      lemons: 'Lemons',
      tangerines: 'Tangerines'
    }
  })
}

export function greensObj(): ProductsObj {
  return ({
    name: 'greens',
    subCategory: SubCategoryEnum.greens,
    data: {
      arugula: 'Arugula',
      frillice: 'Frillice salad',
      dill: 'Dill',
      parsley: 'Parsley',
      spinach: 'Spinach'
    }
  })
}

export function dairyObj(): ProductsObj {
  return ({
    name: 'dairy',
    subCategory: SubCategoryEnum.dairy,
    data: {
      milk: 'Milk',
      cream: 'Cream',
      yogurt: 'Yogurt'
    }
  })
}

export function breadObj(): ProductsObj {
  return ({
    name: 'bread and eggs',
    subCategory: SubCategoryEnum.bread,
    data: {
      bread: 'Bread',
      eggs: 'Eggs',
      pita: 'Pita'
    }
  })
}

export function Obj(): ProductsObj {
  return ({
    name: '',
    data: {}
  })
}
