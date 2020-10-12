import { Component, Input, OnInit } from '@angular/core';
import { Pelicula, PeliculaDetalle, CreditosActores, Cast } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detaille',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;

  detallesPelicula: PeliculaDetalle = {};
  creditosActores: CreditosActores = {};
  oculto = 150;
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }
  existe = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) { }

  async ngOnInit() {
    this.existe = await this.dataLocal.existePelicula(this.id);
    console.log("existe", this.existe);

    this.moviesService.getDetalles(this.id).subscribe(
      res => {
        console.log(res);
        this.detallesPelicula = res;
      },
      err => console.log(err)
    );
    console.log('ID ', this.id);

    this.moviesService.getAutores(this.id).subscribe(
      res => {

        this.creditosActores = res;
        console.log("cast", this.creditosActores)
      },
      err => console.log(err)
    );
    console.log('ID ', this.id);
  }

  regresar() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async favorito() {
    await this.dataLocal.guardarPelicula(this.detallesPelicula)
    this.existe = await this.dataLocal.existePelicula(this.id);
    console.log("existeeeee  ", this.existe);

  }
}
