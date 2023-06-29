import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomRangePageComponent } from './zoom-range-page.component';
import { LngLat } from 'mapbox-gl';

describe('ZoomRangePageComponent', () => {
  let component: ZoomRangePageComponent;
  let fixture: ComponentFixture<ZoomRangePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoomRangePageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomRangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el mapa', () => {
    expect(component.map).toBeDefined();
  });

  it('debería tener un nivel de zoom inicial de 10', () => {
    expect(component.zoom).toEqual(10);
  });

  it('debería tener un centro inicial definido', () => {
    let currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477);
    expect(component.currentLngLat).toEqual(currentLngLat);
  });

  it('debería cambiar el nivel de zoom al llamar a zoomCambio', () => {
    const newZoom = '12';
    component.zoomChanged(newZoom);
    expect(component.zoom).toEqual(Number(newZoom));
  });

  it('debería incrementar el nivel de zoom al llamar a zoomIn', () => {
    const initialZoom = component.zoom;
    console.log("initialZoom 1",initialZoom);
    component.zoomIn();
    expect(component.zoom).toEqual(initialZoom - 1);
  });

  it('debería decrementar el nivel de zoom al llamar a zoomOut', () => {
    const initialZoom = component.zoom;
    console.log("initialZoom 2",initialZoom);
    component.zoomOut();
    expect(component.zoom).toEqual(initialZoom + 1);
  });
});
