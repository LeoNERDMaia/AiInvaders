import { PlayerControllerComponent } from './PlayerController/PlayerController.component';
import { AlienShotComponent } from './AlienShot/AlienShot.component';
import { ShipShotComponent } from './ShipShot/ShipShot.component';
import { ShieldBatteryComponent } from './ShieldBattery/ShieldBattery.component';
import { AlienComponent } from './Alien/Alien.component';
import { GameComponent } from './Game/Game.component';
import { ShipComponent } from './Ship/Ship.component';
import { GameViewComponent } from './GameView/GameView.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameViewComponent,
    ShipComponent,
    AlienComponent,
    ShieldBatteryComponent,
    ShipShotComponent,
    AlienShotComponent,
    GameComponent,
    PlayerControllerComponent],
  exports: [
    GameComponent]
})
export class SpaceInvadersModule { }
