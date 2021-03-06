import { MultiLayerPerceptronData } from './neural-network';
export class Project {
  // Horizontal direction of the closest enemy
  // Most of enemies direction
  // Enemy in sight
  // Line of fire
  // Behind barrier
  public static inputSize = 5

  // Left / Right
  // Right
  // Fire
  public static outputSize = 2
  name: string
  generations: number = 0
  children: number = 20
  mutationProbability: number = 0.05
  mutationFactor: number = 0.2

  mlpChampion: MultiLayerPerceptronData
  mlpBest: MultiLayerPerceptronData
}
