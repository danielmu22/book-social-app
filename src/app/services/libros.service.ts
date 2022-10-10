import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private firestore: AngularFirestore) { }

  agregarLibro(libro: any): Promise<any> {
    return this.firestore.collection('libros').add(libro);
  }

  getLibros(): Observable<any> {
    return this.firestore.collection('libros', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarLibro(id: string): Promise<any> {
    return this.firestore.collection('libros').doc(id).delete();
  }

  getLibro(id: string): Observable<any> {
    return this.firestore.collection('libros').doc(id).snapshotChanges();
  }

  actualizarLibro(id: string, data:any): Promise<any> {
    return this.firestore.collection('libros').doc(id).update(data);
  }

}
