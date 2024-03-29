import { MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/datepicker';
import { MatHeaderRowDef } from '@angular/material/table';
import { AlienShot, Game, Sprite } from './../model/game';
export class GameController {

  private static TotalMatches = 3

  public game: Game
  private playedMatch: number = 0

  public doGameMove(left: boolean, right: boolean, fire: boolean): boolean {
    if (!this.game.active)
      return false
    if (left)
      this.moveShipLeft()
    if (right)
      this.moveShipRight()
    if (fire && !this.game.shipShot.active) {
      this.shoot()
    }
    if (this.game.shipShot.active)
      this.doShipFire()

    this.doAlienFire()

    if (this.game.shipShot.active)
      this.doShipFireCollide()
    this.doAlienFiresCollide()

    this.game.currentAlienTime--
    if (this.game.currentAlienTime == 0) {
      this.moveAliens()
      this.game.currentAlienTime = this.game.alienTime
      this.game.alienTime = this.game.alienTime < 20 ? 20 : this.game.alienTime - 1
    }
    this.game.score += 1
    return true
  }

  private isColliding(sprite1: Sprite, sprite2: Sprite) {
    let LE1 = sprite1.x - sprite1.width / 2
    let RE1 = sprite1.x + sprite1.width / 2
    let TE1 = sprite1.y - sprite1.height / 2
    let BE1 = sprite1.y + sprite1.height / 2

    let LE2 = sprite2.x - sprite2.width / 2
    let RE2 = sprite2.x + sprite2.width / 2
    let TE2 = sprite2.y - sprite2.height / 2
    let BE2 = sprite2.y + sprite2.height / 2

    let horizontal: boolean = (LE1 <= RE2 && RE1 >= LE2)
    let vertical: boolean = (BE1 >= TE2 && TE1 <= BE2)

    return vertical && horizontal
  }

  private isAligned(sprite1: Sprite, sprite2: Sprite) {
    let LE1 = sprite1.x - sprite1.width / 2
    let RE1 = sprite1.x + sprite1.width / 2
    let LE2 = sprite2.x - sprite2.width / 2
    let RE2 = sprite2.x + sprite2.width / 2

    return (LE1 <= RE2 && RE1 >= LE2)
  }

  private moveShipLeft() {
    if (this.game.ship.x > 0.1)
      this.game.ship.x -= this.game.ship.speed
  }

  private moveShipRight() {
    if (this.game.ship.x < 0.9)
      this.game.ship.x += this.game.ship.speed
  }

  private shoot() {
    this.game.shipShot.x = this.game.ship.x
    this.game.shipShot.y = this.game.ship.y
    this.game.shipShot.active = true
  }

  private doShipFire() {
    this.game.shipShot.y -= this.game.shipShot.shotSpeed
    if (this.game.shipShot.y < 0)
      this.game.shipShot.active = false
  }

  private doShipFireCollide() {
    this.game.aliens.forEach(alien => {
      if (this.isColliding(this.game.shipShot, alien)) {
        this.game.aliens.splice(this.game.aliens.indexOf(alien), 1)
        this.game.shipShot.active = false
        this.game.score += 100
      }
    })

    this.game.shields.forEach(shield => {
      if (this.isColliding(this.game.shipShot, shield)) {
        this.game.shields.splice(this.game.shields.indexOf(shield), 1)
        this.game.shipShot.active = false
      }
    })

    if (this.game.aliens.length == 0) {
      this.game.alienTime *= 2
      this.game.score += 5000
      this.game.restartLevel()
    }
  }

  private doAlienFire() {
    this.game.alienShots.forEach(shot => {
      if (shot.active)
        this.doAlienFireActive(shot)
      else
        this.doAlienNewFire(shot)
    })
  }

  private doAlienFiresCollide() {
    this.game.alienShots.forEach(alienShot => {
      this.game.shields.forEach(shield => {
        if (this.isColliding(alienShot, shield)) {
          this.game.shields.splice(this.game.shields.indexOf(shield), 1)
          alienShot.active = false
        }
      })
      if (this.isColliding(alienShot, this.game.ship))
        if (this.playedMatch < GameController.TotalMatches) {
          this.game.restartLevel()
          this.playedMatch ++
        } else
          this.game.active = false
    })
  }

  private doAlienFireActive(shot: AlienShot) {
    shot.y += shot.shotSpeed
    if (shot.y > 1)
      shot.active = false
  }

  private doAlienNewFire(shot: AlienShot) {
    this.game.aliens.forEach(alien => {
      if (!shot.active) {
        let willFire = Math.random()
        if (this.isAligned(alien, this.game.ship))
          willFire *= 0.01
        if (willFire < 0.05) {
          shot.x = alien.x
          shot.y = alien.y
          shot.active = true
        }
      }
    })
  }

  private moveAliens() {
    let revert: boolean = false

    let leftEnemy = 1
    let rightEnemy = 0
    this.game.aliens.forEach(alien => {
      if (alien.x < leftEnemy)
        leftEnemy = alien.x
      if (alien.x > rightEnemy)
        rightEnemy = alien.x
    })

    if ((rightEnemy > this.game.horizontalLimitRight) || (leftEnemy < this.game.horizontalLimitLeft)) {
      this.game.horizontalSpeed *= -1
      revert = true
    }
    //this.game.horizontalPosition += this.game.horizontalSpeed

    this.game.aliens.forEach(alien => {
      alien.x += this.game.horizontalSpeed
      alien.flipped *= -1
    })
    /*if (!revert) {
      this.game.aliens.forEach(alien => {
        alien.x += this.game.horizontalSpeed
        alien.flipped *= -1
      })
    } else {*/
    let ceilingZero: boolean = false
    if (revert) {
      this.game.aliens.forEach(alien => {
          alien.y += Game.verticalSpeed
          alien.flipped *= -1
          if (alien.y > 0.9) {
            ceilingZero = true
          }
          if (alien.y > 0.7) {
            this.game.shields = []
          }
        })
    }
    if (ceilingZero) {
      this.game.score -= 2500
      if (this.playedMatch < GameController.TotalMatches) {
        this.game.restartLevel()
        this.playedMatch ++
      } else
        this.game.active = false
    }
  }
}
