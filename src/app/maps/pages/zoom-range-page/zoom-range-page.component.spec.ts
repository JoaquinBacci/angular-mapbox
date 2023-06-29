import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoomRangePageComponent } from './zoom-range-page.component';

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
    expect(component.mapa).toBeDefined();
  });

  it('debería tener un nivel de zoom inicial de 10', () => {
    expect(component.zoomLevel).toEqual(10);
  });

  it('debería tener un centro inicial definido', () => {
    expect(component.center).toEqual([-63.24314235553986, -32.410705910563124]);
  });

  it('debería cambiar el nivel de zoom al llamar a zoomCambio', () => {
    const newZoom = '12';
    component.zoomCambio(newZoom);
    expect(component.zoomLevel).toEqual(Number(newZoom));
  });

  it('debería incrementar el nivel de zoom al llamar a zoomIn', () => {
    const initialZoom = component.zoomLevel;
    component.zoomIn();
    expect(component.zoomLevel).toEqual(initialZoom + 1);
  });

  it('debería decrementar el nivel de zoom al llamar a zoomOut', () => {
    const initialZoom = component.zoomLevel;
    component.zoomOut();
    expect(component.zoomLevel).toEqual(initialZoom - 1);
  });
});
