import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dsr-lang';
  constructor(private fdb: AngularFirestore) {}

  ngOnInit() {
    this.fdb
      .collection('test')
      .snapshotChanges()
      .subscribe((data) => console.log(data));
  }
}
