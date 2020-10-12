import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  slideOpts ={
    slidesPerView:3.3,
    freeMode: true,
    spacebetween: 50
  };
 @Input() peliculas: Pelicula[]=[];
 @Output() cargasMas= new EventEmitter();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick(){
    console.log("EMIT");
this.cargasMas.emit();
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
