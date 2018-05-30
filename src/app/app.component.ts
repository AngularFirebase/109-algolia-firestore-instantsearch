import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchConfig = {
    ...environment.algolia,
    indexName: 'animals'
  }

  constructor(private afs: AngularFirestore) { 

  }
}
