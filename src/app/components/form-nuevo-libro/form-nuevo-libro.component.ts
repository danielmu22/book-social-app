import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-form-nuevo-libro',
  templateUrl: './form-nuevo-libro.component.html',
  styleUrls: ['./form-nuevo-libro.component.css']
})
export class FormNuevoLibroComponent implements OnInit {

  createLibro: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _libroService: LibrosService,
    private router: Router,
    private toast : NgToastService, 
    public firestorage: FirestorageService,
    private auth: Auth,
    private aRoute: ActivatedRoute
  ) {
    this.createLibro = this.fb.group({
      nombreLibro: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id)
   }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarEditarLibro() {
    this.submitted=true

    if(this.createLibro.invalid){
      return;
    }
    if(this.id === null) this.agregarLibro();
    else this.editarLibro(this.id);

    
  }

  agregarLibro() {
    const libro: any = {
      nombreLibro: this.createLibro.value.nombreLibro,
      descripcion: this.createLibro.value.descripcion,
      urlFoto: `https://firebasestorage.googleapis.com/v0/b/books-social-app.appspot.com/o/images%2F${this.firestorage.id}?alt=media`,
      idUsuario: this.auth.currentUser?.uid,
      comentarios: {},
      valoracion: {},
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._libroService.agregarLibro(libro).then(() => {
      this.toast.success({detail:'Perfecto', summary:'Libro añadido', sticky:true, position:'tr'});
      this.router.navigate(['/main']);
    }).catch(error => {
      this.toast.warning({detail:'Error', summary:'Error al añadir libro', sticky:true, position:'tr'})
      //console.log(error);
    })
  }

 editarLibro(id: string) {
    const libro: any = {
      nombreLibro: this.createLibro.value.nombreLibro,
      descripcion: this.createLibro.value.descripcion,
      urlFoto: `https://firebasestorage.googleapis.com/v0/b/books-social-app.appspot.com/o/images%2F${this.firestorage.id}?alt=media`,
      idUsuario: this.auth.currentUser?.uid,
      comentarios: {},
      valoracion: {},
      fechaActualizacion: new Date()
    }

    this._libroService.actualizarLibro(id, libro).then(() => {
      this.toast.success({detail:'Perfecto', summary:'Libro editado', sticky:true, position:'tr'});
      this.router.navigate(['/main']);
    }).catch(error => {
      this.toast.warning({detail:'Error', summary:'Error al editar el libro', sticky:true, position:'tr'})
      //console.log(error);
    })
  }

  esEditar() {
    if(this.id !== null) {
      this.titulo= "Editar";
      this._libroService.getLibro(this.id).subscribe(data => {
        //console.log(data.payload.data())
        //console.log(data.payload.data().nombreLibro)
        this.createLibro.setValue({
          nombreLibro: data.payload.data().nombreLibro,
          descripcion: data.payload.data().descripcion
        })
      })
    }
  }


}
