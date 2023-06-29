import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkersPageComponent } from '../maps/pages/markers-page/markers-page.component';
import { FullScreenPageComponent } from '../maps/pages/full-screen-page/full-screen-page.component';
import { Marker } from 'mapbox-gl';

interface PlainMarker {
    color: string;
    lngLat: number[]
}

interface MarkerAndColor {
    color: string;
    marker: Marker;
  }

describe('ComponenteAComponent', () => {
    let componenteMarkersMap: MarkersPageComponent;
    let componenteFullScreenMap: FullScreenPageComponent;
    let fixtureComponenteMarkersMap: ComponentFixture<MarkersPageComponent>;
    let fixtureComponenteFullScreenMap: ComponentFixture<FullScreenPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [componenteMarkersMap, componenteFullScreenMap],
        }).compileComponents();
    });

    beforeEach(() => {
        fixtureComponenteMarkersMap = TestBed.createComponent(MarkersPageComponent);
        componenteMarkersMap = fixtureComponenteMarkersMap.componentInstance;

        fixtureComponenteFullScreenMap = TestBed.createComponent(FullScreenPageComponent);
        componenteFullScreenMap = fixtureComponenteFullScreenMap.componentInstance;
    });

    it('debería guardar los datos en localStorage y leerlos correctamente', () => {

        componenteMarkersMap.createMarker();

        componenteMarkersMap.saveToLocalStorage();

        componenteFullScreenMap.readFromLocalStorage()

        expect(componenteFullScreenMap.markers).toEqual(componenteMarkersMap.markers);
      });
 
});

