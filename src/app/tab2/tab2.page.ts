import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { BusquedasPeliculas } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../componentes/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  testoBuscar: string = "";
  ideas: string[] = ["Spiderman", "Avenger", "El señor de los anillos", "la vida es vella"];
  peliculas: BusquedasPeliculas = {};
  buscando = false;
  
  constructor(private moviesServicio: MoviesService,
              private modalCtrl: ModalController) {
    console.log(this.peliculas.total_results);

  }



  buscar(event) {
    const valor = event.detail.value;
    //console.log("valor",valor);
    this.buscando = true;
    this.peliculas = {};
    // console.log(this.peliculas.total_results);
    // console.log(this.buscando);
    // console.log(this.ideas);
    if (valor === "") {
      this.peliculas = {};
      this.buscando = false;
      return;
    }
    this.moviesServicio.buscarPeliculas(valor).subscribe(
      res => {
        this.peliculas = res;
        if (this.peliculas.total_results === 0) {
          this.buscando = true;
        } else {
          this.buscando = false;
          const result = this.ideas.filter(word => word === valor);
          if (result.length === 0) {
            this.ideas.unshift(valor);
          }
        }
      },
      err => {
        console.log("err");
      }
    );

  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
   
}
