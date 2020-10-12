import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle, Pelicula } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
    public toastController: ToastController
  ) {
    this.cargarFavoritos();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for (let peli of this.peliculas) {

      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      console.log("existe1 ",this.peliculas);
      mensaje = "Removido de favoritos"
    } else {
      this.peliculas.push(pelicula);
      mensaje = "Agregado a favoritos"

    }

    this.storage.set("peliculas", this.peliculas);
    console.log(mensaje);
    console.log(this.peliculas);
    this.presentToast(mensaje);
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe) ? true : false;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }


}
