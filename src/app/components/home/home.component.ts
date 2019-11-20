import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userList: any[] = [];
  profile: any = {};
  constructor(private firebaseService: FirebaseService) {
    this.profile = firebaseService.getCurrentUser();
  }

  ngOnInit() {
    this.firebaseService.getAll('Users').subscribe(docs => {
      console.log('docs => ', docs);
      const users = [];
      docs.forEach(doc => users.push(doc.payload.doc.data()));
      this.userList = users;
    });
  }

}
