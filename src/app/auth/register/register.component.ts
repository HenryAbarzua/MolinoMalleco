import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from './../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl ('')

  });

  constructor(private authSvc:AuthService, private router: Router, 
    public flashMensaje : FlashMessagesService) { }

  ngOnInit(): void {}

async onRegister(){
  const {email, password} = this.registerForm.value;
  try{
    const user = this.authSvc.register(email, password);
    if(user){
      this.flashMensaje.show('Usuario creado correctamente , revisa tu correo para confirmar',{cssClass:'alert-success',timeout:4000});
    }else{
      this.router.navigate(['/home'])
    }
  }
  catch(error){
    console.log(error);

  }
}
}
