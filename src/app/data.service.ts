import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      recipes: [
        {
          id: 1,
          name: 'Cajun Pasta',
          description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
          imgSrc: 'assets/images/pasta.png',
          cookTime: 120
        },
        {
          id: 2,
          name: 'Jambalaya',
          description: 'amet consectetur adipisicing elit.Lorem ipsum dolor sit ',
          imgSrc: 'assets/images/jambalya.png',
          cookTime: 60
        },
        {
          id: 3,
          name: 'Catfish',
          description: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
          imgSrc: 'assets/images/catfish.png',
          cookTime: 30
        },
        {
          id: 4,
          name: 'Crawfish Pie',
          description: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
          imgSrc: 'assets/images/no-image.png',
          cookTime: 240
        }
      ]
    };
  }
}
