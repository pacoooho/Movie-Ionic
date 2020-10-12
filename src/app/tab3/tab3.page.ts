import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritosPelis: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService
  ) { }


  async ngOnInit() {
    this.peliculas = await this.dataLocal.cargarFavoritos();

    await this.moviesService.cargarGeneros().subscribe(
      res => {
        this.generos = res['genres'];
        console.log(this.generos);
        this.pelisPorGenero(this.generos, this.peliculas);
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.peliculas);


  }

  async carga(d) {
    console.log("carga");
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.pelisPorGenero(this.generos, this.peliculas);
console.log(d);
  }


  async pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {

    this.favoritosPelis = [];

    await generos.forEach(genero => {
      this.favoritosPelis.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => { return peli.genres.find(gene => gene.id === genero.id); })
      });
    });
    console.log(this.favoritosPelis);


    // generos.forEach((genero) => {
    //   let array = { name: "", pelis: [] }
    //   array.name = genero.name;
    //    this.peliculas.forEach(peli => {
    //     peli.genres.forEach(gene => {
    //       if (genero.name === gene.name) {
    //         array.pelis.unshift(peli);
    //        }
    //     });
    //   });
    //   if (array.pelis.length > 0) {
    //     this.favoritosPelis.unshift(array);
    //   }
    // });
    // console.log(this.favoritosPelis);

  }
}
