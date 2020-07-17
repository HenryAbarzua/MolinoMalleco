import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
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
  if (user && (await user).user.emailVerified){
    //redirec to home
    this.router.navigate(['/home']);
  }else if(user){
    this.router.navigate(['verification-email'])
  }else{
    this.router.navigate(['/register'])
  }
  }

catch(error){
  console.log(error);
}


}
}
