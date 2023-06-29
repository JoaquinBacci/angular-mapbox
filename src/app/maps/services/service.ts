import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readFromLocalStorageCallbacks: (() => void)[] = [];

  addReadFromLocalStorageCallback(callback: () => void) {
    this.readFromLocalStorageCallbacks.push(callback);
  }

  triggerReadFromLocalStorageCallbacks() {
    this.readFromLocalStorageCallbacks.forEach(callback => callback());
  }
}
