import { MultiLayerPerceptronData } from './neural-network';
export class Project {
  // Horizontal direction of the closest enemy
  // Ship X position
  // Most of enemies direction
  // Enemy in sight
  // Line of fire
  // Behind barrier
  public static inputSize = 6

  name: string
  generations: number = 0
  children: number = 40
  mutationProbability: number = 0.05
  mutationFactor: number = 0.2
  outputSize: number = 2

  mlpChampion: MultiLayerPerceptronData
  mlpBest: MultiLayerPerceptronData
}
