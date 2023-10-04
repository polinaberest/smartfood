import { Component } from '@angular/core';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent {
  suppliers = [
    {
      name: 'QuickBite Distributors',
      description: $localize `One-stop solution for fast-food essentials, delivering quality ingredients to keep customers coming back for more.`,
      registerDate: new Date(),
      img: 'assets/logos/food.png'
    },
    {
      name: 'SpeedySnacks Supplies',
      description: $localize `A fast-casual cafe, dedicated to serving up delectable on-the-go meals that satisfy your cravings in no time.`,
      registerDate: new Date(),
      img: 'assets/logos/chips.png'
    },
    {
      name: 'BurgerBuilder & Co',
      description: $localize `Their perfect burgers, hot dogs or sandwiches, made of top-notch ingredients, are ensuring mouthwatering fast-food experiences.`,
      registerDate: new Date(),
      img: 'assets/logos/burger.png'
    },
    {
      name: 'PizzaExpress',
      description: $localize `Pizza restourant, that will definetly save you from hunger with its delicious pizza. They serve Italy in every bite.`,
      registerDate: new Date('22-08-2023'),
      img: 'assets/logos/pizza.png'
    }
  ];
}
