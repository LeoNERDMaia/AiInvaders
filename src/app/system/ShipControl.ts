import { HostListener, Injectable } from "@angular/core"

export abstract class ShipControl {
  public left: boolean = false
  public right: boolean = false
  public fire: boolean = false
}
