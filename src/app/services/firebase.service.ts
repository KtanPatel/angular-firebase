import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
  }

  isAuth = () => {
    return this.auth.authState;
  }

  getCurrentUser = () => {
    return this.auth.auth.currentUser.toJSON();
  }

  doLogout = () => {
    return this.auth.auth.signOut();
  }

  doSignInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  doRegisterUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  addOrUpdateUser = (collection: string, data: any, uid: string) => {
    return this.db.collection(collection).doc(uid).set(data);
  }

  save = (collction: string, data: any) => {
    return this.db.collection(collction).add(data);
  }

  saveOrUpdateWithId = (collection: string, data: any, doc: string) => {
    return this.db.collection(collection).doc(doc).set(data);
  }

  update = (collection: string, data: any, doc: string) => {
    return this.db.collection(collection).doc(doc).update(data);
  }

  deleteOne = (collection: string, doc: string) => {
    return this.db.collection(collection).doc(doc).delete();
  }

  getAll = (collection: string) => {
    return this.db.collection(collection).snapshotChanges();
  }

  getOne = (collection: string, id: string) => {
    return this.db.collection(collection).doc(id).snapshotChanges();
  }

  search = (collection: string, searchKey: string, searchValue: string) => {
    return this.db.collection(collection, ref => ref.where(searchKey, '>=', searchValue)
      .where(searchKey, '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

}
