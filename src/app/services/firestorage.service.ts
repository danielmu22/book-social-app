import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LibrosService } from './libros.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  
  public url= "no existe";
  public formato= "lo que sea"
  public id = 567;

  constructor( 
    public firestorage: AngularFireStorage,
    public libro: LibrosService,
    ) { }

  update(event: any) {
    console.log("event: " ,event);
    this.id =this.getRandom();
    this.url = 'images/' + this.id
    this.formato = event.target.files[0];
    this.firestorage.upload(this.url, event.target.files[0])
    .then(result => {
      console.log('result: ', result);
    }).catch(error => {
      console.log('error: ', error);
    });
  }

  getRandom() {
    return Math.floor(Math.random() * (10000000000000 - 1)) + 1;;
  }
}
