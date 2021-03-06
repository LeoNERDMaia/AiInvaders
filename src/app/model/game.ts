export class Game {
  public static rows: number = 5
  public static columns: number = 10
  public static spacing: number = 0.1
  public static shieldPositionY: number = 0.75
  public static verticalSpeed: number = 0.05
  public static alienStartTime: number = 100
  public static maxAlienFire: number = 2

  public ship: Ship = new Ship()
  public shipShot: ShipShot = new ShipShot()
  public aliens: Alien[]
  public alienShots: AlienShot[] = []
  public verticalPosition: number = 0.1
  public horizontalSpeed: number = 0.02
  public horizontalPosition: number = 0.1
  public alienTime = Game.alienStartTime
  public currentAlienTime = Game.alienStartTime
  public shields: ShieldBattery[] = []
  public horizontalLimitLeft: number = 0.07
  public horizontalLimitRight: number = 0.95

  public active: boolean = true
  public score: number = 0

  constructor () {
    this.buildGame()
  }

  public restartLevel() {
    this.buildGame()
  }

  private buildGame() {
    this.aliens = []
    let rowPosition: number = 0.1
    this.buildRow(rowPosition, "brain", 1)
    rowPosition += Game.spacing
    this.buildRow(rowPosition, "tongue")
    rowPosition += Game.spacing * 2
    this.buildRow(rowPosition, "octopus")

    this.verticalPosition = 0.1
    this.horizontalPosition = 0.1
    this.horizontalSpeed = 0.02
    this.alienShots = []
    this.buildAlienShots()

    this.shields = []
    this.buildShield(0.175)
    this.buildShield(0.375)
    this.buildShield(0.575)
    this.buildShield(0.775)
  }

  private buildRow(startY: number, alienType: string, rows: number = 2) {
    let rowPosition: number = startY
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < Game.columns; j++) {
        let alien: Alien = new Alien()
        alien.type = alienType
        alien.x = j / (Game.columns + 2) + 0.075
        alien.y = rowPosition
        this.aliens.push(alien)
      }
      rowPosition += Game.spacing
    }
  }

  private buildShield(positionX: number) {
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 2; i++) {
        let shield: ShieldBattery = new ShieldBattery()
        shield.x = positionX + i / 18
        shield.y = Game.shieldPositionY + j / 30
        this.shields.push(shield)
      }
    }
  }

  private buildAlienShots() {
    for (let i = 0; i < Game.maxAlienFire; i++)
      this.alienShots.push(new AlienShot())
  }
}

export abstract class Sprite {
  public x: number = 0.5
  public y: number = 0.5
  public width: number = 0.05
  public height: number = 0.05
}

export class Ship extends Sprite {
  public speed: number = 0.01

  constructor() {
    super()
    this.x = 0.5
    this.y = 0.95
  }
}

export class Alien extends Sprite {
  public type: string = "octopus"
  public speed: number = 0.05
  public flipTime: number = 2000
  public flipped: number = 1

  constructor() {
    super()
    this.width = 0.03
  }
}

export class ShieldBattery extends Sprite {
  constructor() {
    super()
    this.width = 0.05
  }
}

export class ShipShot extends Sprite {
  public active: boolean = false
  public shotSpeed: number = 0.005
}

export class AlienShot extends Sprite {
  public active: boolean = false
  public shotSpeed: number = 0.005
}
