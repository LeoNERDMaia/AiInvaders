import { MultiLayerPerceptron, MultiLayerPerceptronData } from './../model/neural-network';
import { GameAnalyzer } from './GameAnalyzer';
import { ShipControl } from './ShipControl';

export class AIController {

  private mlp: MultiLayerPerceptron

  constructor (private analyser: GameAnalyzer, private controller: ShipControl, public mlpData: MultiLayerPerceptronData) {
    this.mlp = new MultiLayerPerceptron()
    this.mlp.data = mlpData
  }

  public gameOver(): boolean {
    return !this.analyser.game.active
  }

  public doGame() {
    this.mlpData.score = this.analyser.game.score
    let inputs: number[] = [0.5 + this.analyser.closestEnemyDistance(),
                            0.5 + this.analyser.mostEnemies(),
                            this.analyser.enemyInSight(),
                            0.5 + this.analyser.lineOfFire(),
                            this.analyser.protected()]
    this.mlp.data.inputs = inputs
    this.mlp.propagate()
    if (this.mlp.data.outputs.length == 2) {
    this.controller.fire = this.mlp.data.outputs[0] > 0.8
    this.controller.left = this.mlp.data.outputs[1] > 0.5
    this.controller.right = this.mlp.data.outputs[1] < 0.5
    } else
    {
      this.controller.fire = this.mlp.data.outputs[0] > 0.8
      this.controller.left = this.mlp.data.outputs[1] > 0.8
      this.controller.right = this.mlp.data.outputs[2] > 0.8
    }
  }
}
