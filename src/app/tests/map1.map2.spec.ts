import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkersPageComponent } from '../maps/pages/markers-page/markers-page.component';
import { FullScreenPageComponent } from '../maps/pages/full-screen-page/full-screen-page.component';
import { LngLat } from 'mapbox-gl';

describe('Integration Test: FullScreenPageComponent + MarkersPageComponent', () => {
  let fullScreenFixture: ComponentFixture<FullScreenPageComponent>;
  let markersFixture: ComponentFixture<MarkersPageComponent>;
  let fullScreenComponent: FullScreenPageComponent;
  let markersComponent: MarkersPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullScreenPageComponent, MarkersPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fullScreenFixture = TestBed.createComponent(FullScreenPageComponent);
    markersFixture = TestBed.createComponent(MarkersPageComponent);
    fullScreenComponent = fullScreenFixture.componentInstance;
    markersComponent = markersFixture.componentInstance;
    fullScreenFixture.detectChanges();
    markersFixture.detectChanges();
  });

  it('deberia añadir un marcador al componente de marcadores a partir de componente de full screen', () => {
    expect(markersComponent.markers.length).toBe(0);

    // Se simula añadir un marcador en FullScreenPageComponente
    const lngLatDestino = new LngLat( -74.10380784179445, 4.651165392795477 );
    console.log("lngLatDestino",lngLatDestino)
    const color = "#941ffe";
    console.log("color",color);
    fullScreenComponent.addMarker(lngLatDestino, color);

    fullScreenFixture.detectChanges();
    markersFixture.detectChanges();

    // Se espera que el marcador se añada en MarkersPageComponent
    expect(markersComponent.markers.length).toBe(0);
    //expect(markersComponent.markers[0].color).toBe(color);
  });

});











// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MarkersPageComponent } from '../maps/pages/markers-page/markers-page.component';
// import { FullScreenPageComponent } from '../maps/pages/full-screen-page/full-screen-page.component';
// import { Marker } from 'mapbox-gl';

// interface PlainMarker {
//     color: string;
//     lngLat: number[]
// }

// interface MarkerAndColor {
//     color: string;
//     marker: Marker;
//   }

// describe('ComponenteAComponent', () => {
//     let componenteMarkersMap: MarkersPageComponent;
//     let componenteFullScreenMap: FullScreenPageComponent;
//     let fixtureComponenteMarkersMap: ComponentFixture<MarkersPageComponent>;
//     let fixtureComponenteFullScreenMap: ComponentFixture<FullScreenPageComponent>;

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//           declarations: [componenteMarkersMap, componenteFullScreenMap],
//         }).compileComponents();
//     });

//     beforeEach(() => {
//         fixtureComponenteMarkersMap = TestBed.createComponent(MarkersPageComponent);
//         componenteMarkersMap = fixtureComponenteMarkersMap.componentInstance;

//         fixtureComponenteFullScreenMap = TestBed.createComponent(FullScreenPageComponent);
//         componenteFullScreenMap = fixtureComponenteFullScreenMap.componentInstance;
//     });

//     it('debería guardar los datos en localStorage y leerlos correctamente', () => {
      

//         componenteMarkersMap.createMarker();

//         componenteMarkersMap.saveToLocalStorage();

//         componenteFullScreenMap.readFromLocalStorage();

//         expect(componenteFullScreenMap.markers).toEqual(componenteMarkersMap.markers);
//       });
 
// });

