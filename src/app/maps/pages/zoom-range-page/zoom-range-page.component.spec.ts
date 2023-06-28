import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { ZoomRangePageComponent } from './zoom-range-page.component';

describe('ZoomRangePageComponent', () => {
  let component: ZoomRangePageComponent;
  let fixture: ComponentFixture<ZoomRangePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomRangePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomRangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpia el mapa después de cada prueba
    component.map?.remove();
  });

  it('debería inicializar el mapa después de la vista inicializada', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    expect(component.map).toBeDefined();
  });

  it('debería asignar el zoom al valor actual cuando se produce el evento de zoom', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const mockZoom = 12;
    component.map?.setZoom(mockZoom);
    component.map?.fire('zoom');

    expect(component.zoom).toEqual(mockZoom);
  });

  it('debería llamar a zoomTo(18) cuando el evento de zoomend se dispara con un zoom menor a 18', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const zoomSpy = spyOn(component.map!, 'zoomTo');
    component.map?.fire('zoomend', { target: { getZoom: () => 17 } });

    expect(zoomSpy).toHaveBeenCalledWith(18);
  });

  it('debería actualizar currentLngLat cuando ocurre el evento de movimiento del mapa', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const mockLngLat = new LngLat(-74.10380784179445, 4.651165392795477);
    component.map?.setCenter(mockLngLat);
    component.map?.fire('move');

    expect(component.currentLngLat).toEqual(mockLngLat);
  });

  it('debería incrementar el zoom al llamar a zoomIn', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const initialZoom = component.zoom;
    component.zoomIn();

    expect(component.zoom).toBeGreaterThan(initialZoom);
  });

  it('debería reducir el zoom al llamar a zoomOut', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const initialZoom = component.zoom;
    component.zoomOut();

    expect(component.zoom).toBeLessThan(initialZoom);
  });

  it('debería asignar el zoom al valor proporcionado y llamar a zoomTo con ese valor al llamar a zoomChanged', () => {
    component.divMap = new ElementRef(document.createElement('div'));
    component.ngAfterViewInit();

    const mockZoom = 15;
    const zoomToSpy = spyOn(component.map!, 'zoomTo');
    component.zoomChanged(mockZoom.toString());

    expect(component.zoom).toEqual(mockZoom);
    expect(zoomToSpy).toHaveBeenCalledWith(mockZoom);
  });
});
