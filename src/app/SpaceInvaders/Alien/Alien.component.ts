import { Component, Input, OnInit } from '@angular/core';
import { Alien } from 'src/app/model/game';

@Component({
  selector: 'app-alien, [comp-alien]',
  templateUrl: './Alien.component.svg',
  styleUrls: ['./Alien.component.scss']
})
export class AlienComponent implements OnInit {
  @Input() alien: Alien = new Alien()
  constructor() { }

  ngOnInit() {
  }

  ngDestroy() {
  }

}
