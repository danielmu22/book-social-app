import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { Auth } from '@angular/fire/auth';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-mislibros',
  templateUrl: './mislibros.component.html',
  styleUrls: ['./mislibros.component.css']
})
export class MislibrosComponent implements OnInit {

  libros: any[] | undefined;
  mislibros: any[] | undefined;

  constructor(
    private _libroService: LibrosService,
    private auth: Auth,
    private toast : NgToastService 
  ) { }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.libros = []
      this.mislibros = []
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        this.libros?.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });

      //console.log(this.libros);

      this.libros.forEach((element: any) => {
        //console.log(this.auth.currentUser?.uid)
        const a:string = element.idUsuario; 
        //console.log(element.idUsuario)
        //console.log(this.auth.currentUser?.uid === a)
        if(this.auth.currentUser?.uid == a){ 
          this.mislibros?.push({...element});
        }
      });

      this.mislibros;
      //console.log(this.mislibros);
    });
  }


  eliminarLibro(id: string) {
    this._libroService.eliminarLibro(id).then(() => {
      //console.log('libro eliminado con exito');
      this.toast.success({detail:'Perfecto', summary:'Eliminado correctamente', sticky:true, position:'tr'})
    }).catch(error => {
      //console.log(error);
      this.toast.warning({detail:'Error', summary:'No se pudo eliminar', sticky:true, position:'tr'})
    })
  }

}
