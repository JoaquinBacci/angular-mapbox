import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-destino-map',
  templateUrl: './mini-map-destino.component.html',
  styleUrls: ['./mini-map-destino.component.css']
})
export class MiniMapDestinoComponent {

  @Input() lngLatDestino?: [number, number];
  @ViewChild('mapDestino') divMapDestino?: ElementRef;


  ngAfterViewInit() {
    if( !this.divMapDestino?.nativeElement ) throw "Map Div Destino not found";
    if( !this.lngLatDestino ) throw "LngLatDestino can't be null";

    const mapDestino = new Map({
      container: this.divMapDestino.nativeElement, // container ID
      center: this.lngLatDestino,
      zoom: 15,
      interactive: false,
      accessToken: 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja3hramV2OWIwbjEwMzFwYzJlZWl6N2g5In0.iKXPpYvo7UPRiiZ-x_lCrw'
    });

    new Marker()
      .setLngLat( this.lngLatDestino )
      .addTo( mapDestino )

  }

}
