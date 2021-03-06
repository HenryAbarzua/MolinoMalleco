import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers:[AuthService]
  
})
export class SendEmailComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService, private router:Router ) { }

  ngOnInit(): void {}
  
  
  onSendEmail():void{
this.authSvc.sendVerificationEmail();

  }
  

  
  

  
  


}

