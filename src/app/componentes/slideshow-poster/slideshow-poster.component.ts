import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };
  @Input() peliculas: Pelicula[] = [];
  @Input() genero: string;
  @Output() carga= new EventEmitter();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    if (this.genero) {
      let peliculasFiltradas = [];
      console.log("genero:  ", this.genero);
      this.peliculas = this.peliculas.filter(peli => {
        peli.genres.forEach(gene => {
          if (this.genero === gene.name) {
            peliculasFiltradas.unshift(peli);
          }
        });
      });
      console.log(peliculasFiltradas);
      this.peliculas = peliculasFiltradas;
    }

  }

  async verDetalle(id: string) {
    
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present(); 
    const { data } = await modal.onWillDismiss();
    this.carga.emit(data);

    // console.log(data);
  }
}
