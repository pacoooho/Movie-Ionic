import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, Pelicula, PeliculaDetalle, CreditosActores, BusquedasPeliculas, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  popularesPage = 0;
  generos: Genre[] = [];

  constructor(
    private http: HttpClient
  ) {

  }

  ejecutarQuery<T>(query: string) {
    query = `${apiUrl}${query}&api_key=${apiKey}&language=es&include_image_language=es`;
    console.log("query  ", query);
    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }


  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();

    const mes = hoy.getMonth() + 1;
    let mesString = '';

    if (mes < 10) {
      mesString += '0' + mes;
    } else {
      mesString += mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    console.log(inicio);
    console.log(fin);
    // return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?api_key=0d2a86a976b326dcfe12770de1d4c50e&primary_release_date.gte=2020-09-01&primary_release_date.lte=2020-10-01&language=es&include_image_language=es')
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getDetalles(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }
  getAutores(id: string) {
    return this.ejecutarQuery<CreditosActores>(`/movie/${id}/credits?a=1`);

  }

  buscarPeliculas(texto: string) {
    //return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/search/collection?api_key=0d2a86a976b326dcfe12770de1d4c50e&language=es&query=${pelicula}&page=1`);


    //console.log("Servicio", pelicula);
    return this.ejecutarQuery<any>(`/search/movie?query=${texto}`);
  }

  cargarGeneros(){
    return this.ejecutarQuery<any>(`/genre/movie/list?a=1`);
    // return new Promise(resolve => {
    //   this.ejecutarQuery(`/genre/movie/list?a=1`).
    //     subscribe(
    //       res => {
    //         this.generos = res['genres'];
    //         // console.log(this.generos);
    //       },
    //       err => console.log(err));
    //   resolve(this.generos);
    // });


  }
}
