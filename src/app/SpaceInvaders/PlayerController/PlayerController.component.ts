import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ShipControl } from 'src/app/system/ShipControl';

@Component({
  selector: 'app-PlayerController',
  template: ''
})
export class PlayerControllerComponent implements OnInit {

  @Input() shipControl: ShipControl

  constructor() { }

  ngOnInit() {
  }



  @HostListener('window:keydown', ['$event'])
  keyDown($event) {
    let key: string = $event.key
    key = key.toLowerCase()
    switch (key) {
      case "a": {
        this.shipControl.left = true
        break
      }
      case "d": {
        this.shipControl.right = true
        break
      }
      case " ": {
        this.shipControl.fire = true
        break
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUp($event) {
    let key: string = $event.key
    key = key.toLowerCase()
    switch (key) {
      case "a": {
        this.shipControl.left = false
        break
      }
      case "d": {
        this.shipControl.right = false
        break
      }
      case " ": {
        this.shipControl.fire = false
        break
      }
    }
  }
}
