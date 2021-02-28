import { MultiLayerPerceptronData } from './neural-network';
export class Project {
  // Horizontal direction of the closest enemy
  // Enemy in sight
  // Line of fire
  // Behind barrier
  public static inputSize = 4

  // Left
  // Right
  // Fire
  public static outputSize = 3
  name: string

  mlpLow: MultiLayerPerceptronData
}
