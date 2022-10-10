import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup

  constructor(
    private userService: UserService,
    private router: Router,
    private toast : NgToastService 
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => {
        //console.log(error);
        this.toast.warning({detail:'Error', summary:'El email o contraseña son incorrectos', sticky:true, position:'tr'})
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
