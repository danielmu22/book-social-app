import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    const doc = document;
    const menuOpen = doc.querySelector(".menu");
    const menuClose = doc.querySelector(".close");
    const overlay = doc.querySelector(".overlay");

    //Para que no nos de un error colocamos una exclamacion porque el editor cree que sera null
    menuOpen!.addEventListener("click", () => {
      overlay!.classList.add("overlay--active");
    });

    menuClose!.addEventListener("click", () => {
      overlay!.classList.remove("overlay--active");
    });

  }

  fotoUsuario= this.auth.currentUser?.photoURL;

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch(error => console.error(error));
  }

}
