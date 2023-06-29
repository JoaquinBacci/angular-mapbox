import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { MarkersPageComponent } from './markers-page.component';

describe('MarkersPageComponent', () => {
  let component: MarkersPageComponent;
  let fixture: ComponentFixture<MarkersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkersPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should save and read markers from localStorage', () => {
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
    component.ngAfterViewInit();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('plainMarkers');
    
    // se comprueba que los datos de inicializacion en el mock se almacenen en el componente
    expect(component.markers.length).toBe(2);
    expect(component.markers[0].color).toBe('red');
    expect(component.markers[0].marker.getLngLat().toArray()).toEqual([1, 2]);
    expect(component.markers[1].color).toBe('blue');
    expect(component.markers[1].marker.getLngLat().toArray()).toEqual([3, 4]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'plainMarkers',
      JSON.stringify([
        { color: 'red', lngLat: [1, 2] },
        { color: 'blue', lngLat: [3, 4] },
      ])
    );
  });

  it('should save markers to localStorage', () => {
    // Arrange
    component.markers = [
      {
        color: 'green',
        marker: { getLngLat: () => ({ toArray: () => [5, 6] }) } as any,
      },
    ];
    const localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue('[]'),
      setItem: jasmine.createSpy('setItem'),
    };
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    // Act
    component.saveToLocalStorage();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('plainMarkers');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'plainMarkers',
      JSON.stringify([{ color: 'green', lngLat: [5, 6] }])
    );
  });
});
