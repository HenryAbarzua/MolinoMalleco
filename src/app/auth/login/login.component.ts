import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  //Instancia LoginForm
  //metodo recive un objeto email y password
  loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')

  });

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
//crear Metod onLogin
async onLogin(){
const {email, password}= this.loginForm.value;
try{
  const user = this.authSvc.login(email,password);
  if (user){
    //redirec to home
    this.router.navigate(['/home']);
  }
}
catch(error){
  console.log(error);
}


}
}
