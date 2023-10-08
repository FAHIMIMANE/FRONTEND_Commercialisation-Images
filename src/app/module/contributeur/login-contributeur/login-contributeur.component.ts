// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/controller/service/Auth.service';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-login-contributeur',
//   templateUrl: './login-contributeur.component.html',
//   styleUrls: ['./login-contributeur.component.scss']
// })
// export class LoginContributeurComponent implements OnInit {
//   loginForm = new FormGroup({
//     username:new FormControl('',Validators.required),
//     password:new FormControl('',Validators.required)
//   })
//   constructor(private authService:AuthService,private router: Router) { }
//
//   ngOnInit(): void {
//   }
//   submit(){
//     const formValues = this.loginForm.value;
//     const username = formValues.username;
//     const passowrd = formValues.password;
//     this.authService.loginContributeur(username,passowrd);
//
//   }
//     register(){
//     this.router.navigate(['/contributeur/register']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/controller/service/Auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-contributeur',
  templateUrl: './login-contributeur.component.html',
  styleUrls: ['./login-contributeur.component.scss']
})
export class LoginContributeurComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  displayStyle = 'none';
  constructor(private authService: AuthService, private router: Router) { }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  ngOnInit(): void {
  }
  submit(){
    const formValues = this.loginForm.value;
    const username = formValues.username;
    const passowrd = formValues.password;
    this.authService.loginContributeur(username, passowrd );

  }
  register(){
    this.router.navigate(['/contributeur/register']);
  }
  redirectContributeur(){
    this.router.navigate(['/contributeur/login']);
  }
}
