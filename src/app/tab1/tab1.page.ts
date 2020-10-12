import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]=[];
peliculasPopulares: Pelicula[]=[];
  

  constructor(private moviesService: MoviesService) {

  }

  ngOnInit() {
    this.moviesService.getFeature().subscribe(
      res => { 
      this.peliculasRecientes = res.results;
     // console.log("PeliculasRecientes",this.peliculasRecientes) ;
      },
      err => { console.log(err) }
    );

    this.getPopulares();



  }
cargarMas(){
  this.getPopulares();
console.log("cargaMas");
}

getPopulares(){
  this.moviesService.getPopulares().subscribe(
    res => { 
    const arrTemp = [ ...this.peliculasPopulares, ...res.results]
      this.peliculasPopulares= arrTemp ;
     },
    err => { console.log(err) }
  );
}
}
