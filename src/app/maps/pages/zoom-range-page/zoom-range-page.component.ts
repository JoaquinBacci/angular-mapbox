import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
  styles: [`
    .mapa-container {
      width: 100%;
      height: 100%;
    }
    
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 30px;
      left: 30px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  // referencia local
  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [ number, number ] = [ -63.24314235553986,-32.410705910563124 ]
  
  constructor() {}
  
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});  
    this.mapa.off('zoomed', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    
    // console.log('AfterViewInit',this.divMapa);
  
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center,
      zoom: this.zoomLevel
    });

    //- EventListeners -

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo( 18 );
      }
    });

    this.mapa.on('move', (event) =>{
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat]
    })

    //--
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ){
    this.mapa.zoomTo( Number(valor) );
  }

}