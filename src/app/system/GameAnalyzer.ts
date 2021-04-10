import { Game, Sprite } from './../model/game';

export class GameAnalyzer {
  public game: Game

  public closestEnemyDistance(): number {
    let distanceX: number = 1
    let distanceY: number = 1
    this.game.aliens.forEach(alien => {
      if (1 - alien.y <= distanceY) {
        distanceY = 1 - alien.y
        if (Math.abs(this.game.ship.x - alien.x) < Math.abs(distanceX))
          distanceX = this.game.ship.x - alien.x
      }
    })
    return distanceX
  }

  public enemyHeight(): number {
    let height: number = 0
    this.game.aliens.forEach(alien => {
      if (alien.y > height)
        height = alien.y
    })
    return height
  }

  public mostEnemies(): number {
    let mostOfEnemies: number = 0
    this.game.aliens.forEach(alien => {
      mostOfEnemies += (alien.x - this.game.ship.x) / this.game.aliens.length
    })
    return mostOfEnemies
  }

  public protected(): number {
    return this.closestAmong(this.game.shields)
  }

  public lineOfFire(): number {
    return this.closestAmong(this.game.alienShots)
  }

  public enemyInSight(): number {
    return this.closestAmong(this.game.aliens)
  }

  private alignedAmong(sprites: Sprite[]): number {
    let aligned = 0
    sprites.forEach(sprite => {
      if (this.aligned(sprite))
        aligned = 1
    })
    return aligned
  }

  private closest(sprites: Sprite[]): number {
    let distance = 1
    sprites.forEach(sprite => {
      let distanceSprite = Math.sqrt(Math.pow(sprite.x - this.game.ship.x, 2) + Math.pow(sprite.y - this.game.ship.y, 2))
      if (distanceSprite < distance)
        distance = distanceSprite
    })
    return distance
  }

  private aligned(sprite: Sprite) {
    let LE1 = this.game.ship.x - this.game.ship.width / 2
    let RE1 = this.game.ship.x + this.game.ship.width / 2
    let LE2 = sprite.x - sprite.width / 2
    let RE2 = sprite.x + sprite.width / 2

    return (LE1 <= RE2 && RE1 >= LE2)
  }

  private closestAmong(sprites: Sprite[]): number {
    if (sprites.length == 0)
      return 0
    let aligned = 1
    sprites.forEach(sprite => {
        let a = this.ammountAlligned(sprite)
        if (Math.abs(a) < Math.abs(aligned))
          aligned = a
    })
    return aligned * 2
  }

  private ammountAlligned(sprite: Sprite) {
    return sprite.x - this.game.ship.x
  }
}
