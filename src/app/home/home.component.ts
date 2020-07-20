import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  peliculas:any[]=[
    {name:'Molino Malleco',
    img:'assets/molinos.jpg',
    desc:'Los mejores Granos directamente de productores con mas de 50 años de experiencia.'},
    {
      name:'El Trigo',
      img:'assets/trigo.jpg',
      desc:'El pan es un alimento que en su mayoría está hecho de un cereal llamado trigo. Aunque el trigo no lo comemos tal como nos lo presenta la naturaleza, lo consumimos todos los días.'
    },
    {
      name:'Sub productos del Trigo',
      img:'assets/subproductos.jpg',
      desc:'Molino Malleco ofrece un amplio portafolio de derivados de trigo para diferentes usos, abarcando un consumo humano hasta el animal.'
    }
  ];

  
  constructor(private _config:NgbCarouselConfig) { 
    _config.interval = 3000;
    _config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

}
