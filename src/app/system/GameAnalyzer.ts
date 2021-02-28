import { Game, Sprite } from './../model/game';

export class GameAnalyzer {
  public game: Game

  public closestEnemyDistance(): number {
    let distanceX: number = 1
    let distanceY: number = 1
    this.game.aliens.forEach(alien => {
      if (this.game.ship.y - alien.y < distanceY) {
        distanceY = this.game.ship.y - alien.y
        if (this.game.ship.x - alien.x < Math.abs(distanceX))
          distanceX = this.game.ship.x - alien.x
      }
    })
    return distanceX
  }

  public protected(): number {
    return this.alignedAmong(this.game.shields)
  }

  public lineOfFire(): number {
    return this.alignedAmong(this.game.alienShots)
  }

  public enemyInSight(): number {
    return this.alignedAmong(this.game.aliens)
  }

  private alignedAmong(sprites: Sprite[]): number {
    let aligned = 0
    sprites.forEach(sprite => {
      if (this.aligned(sprite))
        aligned = 1
    })
    return aligned
  }

  private aligned(sprite: Sprite) {
    let LE1 = this.game.ship.x - this.game.ship.width / 2
    let RE1 = this.game.ship.x + this.game.ship.width / 2
    let LE2 = sprite.x - sprite.width / 2
    let RE2 = sprite.x + sprite.width / 2

    return (LE1 <= RE2 && RE1 >= LE2)
  }
}
