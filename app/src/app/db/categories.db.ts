import {Category} from '../models/category.interface';
import {CategoryEnum} from '../models/category.enum';
import {breadObj, dairyObj, fruitsObj, greensObj, vegetablesObj} from './products.db';

export function categoriesDb(): Category[] {
  return [
    // Овощи и фрукты
    {
      name: 'Vegetables and fruits',
      category: CategoryEnum.vegetablesAndFruits,
      products: [vegetablesObj(), fruitsObj(), greensObj()]
    },
    // Молочные продукты
    {
      name: 'Dairy products',
      category: CategoryEnum.dairyProducts,
      products: [dairyObj()]
    },
    // Хлеб и выпечка
    {
      name: 'Bread and pastries',
      category: CategoryEnum.breadAndPastries,
      products: [breadObj()]
    },
    // // Мясные и рыбные продукты
    // {
    //   name: 'Meat and fish',
    //   nameId: CategoryEnum.meatAndFish
    // },
    // // Макаронные изделия, крупы и злаки
    // {
    //   name: 'Pasta, cereals and grains',
    //   nameId: CategoryEnum.pastaCerealsAndGrains
    // },
    // // Замороженные продукты
    // {
    //   name: 'Frozen food',
    //   nameId: CategoryEnum.frozenFood
    // },
    // // Консервы и соусы
    // {
    //   name: 'Cans and sauces',
    //   nameId: CategoryEnum.cansAndSauces
    // },
    // // Снеки и сладости
    // {
    //   name: 'Snacks and sweets',
    //   nameId: CategoryEnum.snacksAndSweets
    // },
    // // Напитки
    // {
    //   name: 'Drinks',
    //   nameId: CategoryEnum.drinks
    // },
    // // Бакалея
    // {
    //   name: 'Grocery',
    //   nameId: CategoryEnum.grocery
    // }
  ]
}
