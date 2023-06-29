import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { MarkersPageComponent } from './markers-page.component';
import { FullScreenPageComponent } from '../full-screen-page/full-screen-page.component';

describe('MarkersPageComponent', () => {
  let componentMarker: MarkersPageComponent;
  let fixtureMarker: ComponentFixture<MarkersPageComponent>;
  let componentFullScreen: FullScreenPageComponent;
  let fixtureFullScreen: ComponentFixture<FullScreenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkersPageComponent,FullScreenPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureMarker = TestBed.createComponent(MarkersPageComponent);
    componentMarker = fixtureMarker.componentInstance;
    fixtureMarker.detectChanges();

    fixtureFullScreen = TestBed.createComponent(FullScreenPageComponent);
    componentFullScreen = fixtureFullScreen.componentInstance;
    fixtureFullScreen.detectChanges();
  });

  it('deberia guardar y leer los marcadores desde el localStorage', () => {
    // Arrange
    const localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue(
        JSON.stringify([
          { color: 'red', lngLat: [1, 2] },
          { color: 'blue', lngLat: [3, 4] },
        ])
      ),
      setItem: jasmine.createSpy('setItem'),
    };
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    // Act
    componentMarker.ngAfterViewInit();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('plainMarkers');

    // se comprueba que los datos de inicializacion en el mock se almacenen en el componente 1
    expect(componentMarker.markers.length).toBe(2);
    expect(componentMarker.markers[0].color).toBe('red');
    expect(componentMarker.markers[0].marker.getLngLat().toArray()).toEqual([1, 2]);
    expect(componentMarker.markers[1].color).toBe('blue');
    expect(componentMarker.markers[1].marker.getLngLat().toArray()).toEqual([3, 4]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'plainMarkers',
      JSON.stringify([
        { color: 'red', lngLat: [1, 2] },
        { color: 'blue', lngLat: [3, 4] },
      ])
    );

    componentFullScreen.ngAfterViewInit();
    expect(localStorage.getItem).toHaveBeenCalledWith('plainMarkers');

    // se comprueba que los datos de inicializacion en el mock se almacenen en el componente 2
    expect(componentFullScreen.markers.length).toBe(2);
    expect(componentFullScreen.markers[0].color).toBe('red');
    expect(componentFullScreen.markers[0].marker.getLngLat().toArray()).toEqual([1, 2]);
    expect(componentFullScreen.markers[1].color).toBe('blue');
    expect(componentFullScreen.markers[1].marker.getLngLat().toArray()).toEqual([3, 4]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'plainMarkers',
      JSON.stringify([
        { color: 'red', lngLat: [1, 2] },
        { color: 'blue', lngLat: [3, 4] },
      ])
    );
  });
 
//   it('deberia guardar los marcadores en el localStorage', () => {
//     // Arrange
//     componentMarker.markers = [
//       {
//         color: 'green',
//         marker: { getLngLat: () => ({ toArray: () => [5, 6] }) } as any,
//       },
//     ];
//     const localStorageMock = {
//       getItem: jasmine.createSpy('getItem').and.returnValue('[]'),
//       setItem: jasmine.createSpy('setItem'),
//     };
//     spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
//     spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

//     // Act
//     componentMarker.saveToLocalStorage();

//     // Assert
//     expect(localStorage.getItem).toHaveBeenCalledWith('plainMarkers');
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       'plainMarkers',
//       JSON.stringify([{ color: 'green', lngLat: [5, 6] }])
//     );
//   });
});
