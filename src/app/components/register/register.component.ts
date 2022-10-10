import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toast : NgToastService 
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
        this.toast.success({detail:'', summary:'Nuevo usuario dado de alta', sticky:true, position:'tr'})
      })
      .catch(error => {
        console.log(error)
        this.toast.warning({detail:'', summary:'Email no valido o contraseña menor de 6 caracteres', sticky:true, position:'tr'})
      });
  }
  
  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response)
        this.router.navigate(['/main']);
      })
      .catch(error => {
        //console.log(error);
        this.toast.error({detail:'Error', summary:'Error al conectar con google', sticky:true, position:'tr'})
      });
  }

}