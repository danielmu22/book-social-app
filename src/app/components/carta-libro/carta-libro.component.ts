import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-carta-libro',
  templateUrl: './carta-libro.component.html',
  styleUrls: ['./carta-libro.component.css']
})
export class CartaLibroComponent implements OnInit {

  libros: any[] | undefined;

  constructor(
    private _libroService: LibrosService,
  ) { }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.libros = []
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        this.libros?.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.libros.reverse();
      console.log(this.libros);
    });
  }

}
