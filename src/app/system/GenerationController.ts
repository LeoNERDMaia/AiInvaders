import { MultiLayerPerceptron, MultiLayerPerceptronData } from './../model/neural-network';
export class GenerationController {

  public generation: number = 0

  private finishedMLPs: MultiLayerPerceptronData[] = []
  private newMLPs: MultiLayerPerceptronData[] = []

  constructor(public champion: MultiLayerPerceptronData,
              public best: MultiLayerPerceptronData,
              public generationSize: number,
              private mutationProbability: number = 0.005,
              private mutationFactor: number = 0.2) {
    this.generationSize += 1
  }

  buildChild(father: MultiLayerPerceptronData = this.champion, mother: MultiLayerPerceptronData = this.best): MultiLayerPerceptronData {
    const newData: MultiLayerPerceptronData = {...father}
    newData.weightValues = this.coupleArray(father.weightValues, mother.weightValues)
    if (Math.random() <= this.mutationProbability) {
      newData.bias += this.mutationFactor - this.mutationFactor / 2
    }
    newData.score = 0
    return newData
  }

  addMLPScore(data: MultiLayerPerceptronData) {
    this.finishedMLPs.push({...data})
  }

  computeGeneration() {
    if (this.generation == 0)
      this.computeFirstGeneration()
    else
      this.computeNextGeneration()
    this.generation ++
  }

  private computeFirstGeneration() {
    this.newMLPs = []
    this.newMLPs.push({...this.champion})
    this.newMLPs.push({...this.best})
    for (let i = 0; i < this.generationSize - 2; i ++)
      this.newMLPs.push(this.buildChild())
  }

  private computeNextGeneration() {
    this.best.score = 0
    let secondBest: MultiLayerPerceptronData = new MultiLayerPerceptronData()
    this.finishedMLPs.forEach(mlpData => {
      if (mlpData.score > this.champion.score)
        this.champion = {...mlpData}
      else if (mlpData.score > this.best.score) {
        secondBest = this.best
        this.best = {...mlpData}
      } else if (mlpData.score > secondBest.score)
        secondBest = {...mlpData}
    })
    this.finishedMLPs = []
    this.newMLPs = []
    // Add Champion to the new generation MLP
    this.newMLPs.push({...this.champion})

    // Add some champion-best children
    for (let i = 0; i < ((this.generationSize - 1) / 5); i ++)
      this.newMLPs.push(this.buildChild(this.champion, this.best))

    // Add some champion-second children
    for (let i = 0; i < ((this.generationSize - 1) / 5); i ++)
      this.newMLPs.push(this.buildChild(this.champion, secondBest))

    // Add some best-second children
    for (let i = 0; i < ((this.generationSize - 1) / 5); i ++)
      this.newMLPs.push(this.buildChild(this.best, secondBest))

    // Add some best-foreign children
    for (let i = 0; i < ((this.generationSize - 1) / 5); i ++) {
      let foreign: MultiLayerPerceptronData = MultiLayerPerceptron.buildRandomNetwork(this.champion.inputSize, this.champion.outputSize, this.champion.hiddenCount, this.champion.hiddenSize, 0)
      this.newMLPs.push(this.buildChild(this.best, foreign))
    }

    // Add some second-foreign children
    for (let i = 0; i < ((this.generationSize - 1) / 5); i ++) {
      let foreign: MultiLayerPerceptronData = MultiLayerPerceptron.buildRandomNetwork(this.champion.inputSize, this.champion.outputSize, this.champion.hiddenCount, this.champion.hiddenSize, 0)
      this.newMLPs.push(this.buildChild(secondBest, foreign))
    }
  }

  nextMLP(): MultiLayerPerceptronData {
    return this.newMLPs.shift()
  }

  buildForeign(): MultiLayerPerceptronData {
    let newData = MultiLayerPerceptron.buildRandomNetwork(this.champion.inputSize, this.champion.outputSize, this.champion.hiddenCount, this.champion.hiddenSize, this.champion.bias)
    return newData
  }

  private coupleArray(array1: number[], array2: number[]): number[] {
    const newArray: number[] = []

    array1.forEach((value, index) => {
      let newValue: number = 0
      if (Math.random() >= 0.5)
        newValue = array1[index]
      else
        newValue = array2[index]
      if (Math.random() <= this.mutationProbability) {
        newValue *= this.mutationFactor
      }
      newArray.push(newValue)
    })

    return newArray
  }
}
