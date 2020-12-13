import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent{
name : string;
photo : string;
name2: string
  public user$:Observable <any> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService, private router:Router) { 
} 

ngOnInit(){
  this.authSvc.getUserAuth().subscribe(user => {
    this.name = user.email;
    this.photo = user.photoURL;
    let a = this.name;
    a = a.replace('@gmail.com','');
    this.name2 = a;

  })
}
   async onLogout(){
try{
  
  await this.authSvc.logout();
  this.router.navigate(['/login'])

}

catch(error){
  console.log(error);
}
 

  }

}
