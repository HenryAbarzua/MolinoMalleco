import { Component, OnInit } from '@angular/core';
import { Client } from '../Client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  client: Client = new Client();
  submitted= false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  newClient(): void{
    this.submitted = false;
    this.client = new Client();
  }
save() {
  this.clientService.createClient(this.client);
  this.client = new Client();
}
onSubmit(){
  this.submitted = true;
  this.save();
}
}
