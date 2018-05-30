import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { Chance } from 'chance';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchConfig = {
    ...environment.algolia,
    indexName: 'zoo_search'
  }

  showResults = false;

  constructor(private afs: AngularFirestore) { }


  searchChanged(query) {
    if (query.length) {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }


  addAnimal() {
    const chance = new Chance();
    const animal = {
      name: chance.animal(),
      bio: chance.paragraph(),
      gender: chance.gender(),
      avatar: chance.avatar({protocol: 'https'}),
    }

    this.afs.collection('zoo').doc(animal.name).set(animal);
  }

}
