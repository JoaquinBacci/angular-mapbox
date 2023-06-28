import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent {

  @ViewChild('mapDestino') divMapDestino?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public mapDestino?: Map;
  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477);


  ngAfterViewInit(): void {

    if ( !this.divMapDestino ) throw 'El elemento HTML Destino no fue encontrado';

    this.mapDestino = new Map({
      container: this.divMapDestino.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    this.readFromLocalStorage();
  }


  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO!
    
    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    })
    
  }

  addMarker( lngLatDestino: LngLat, color: string ) {
    if ( !this.mapDestino ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLatDestino )
      .addTo( this.mapDestino );

    this.markers.push({ color, marker, });
    // this.saveToLocalStorage();

    // marker.on('dragend', () => this.saveToLocalStorage() );

    // dragend
  }




}
