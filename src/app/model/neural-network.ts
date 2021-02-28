export class MultiLayerPerceptronData {
  inputSize: number
  inputs: number[] = []
  hiddenCount: number
  hiddenSize: number
  weightValues: number[] = []
  layerValues: number[] = []
  layerSizes: number[] = []
  bias: number = 0
  outputSize: number
  outputs: number[] = []
}

export class MultiLayerPerceptron {
  data: MultiLayerPerceptronData = new MultiLayerPerceptronData()

  constructor() {}

  static buildRandomNetwork(inputSize: number, outputSize: number, hiddenCount: number, hiddenSize: number, defaultBias: number): MultiLayerPerceptronData {
    const data = new MultiLayerPerceptronData()
    data.bias = defaultBias
    data.layerSizes = []
    data.layerValues = new Array<number>((hiddenCount + 2) * hiddenSize).fill(0)
    data.weightValues = new Array<number>((hiddenCount + 1) * hiddenSize * hiddenSize).fill(0)
    data.inputs = new Array<number>(inputSize).fill(0)
    data.outputs = new Array<number>(outputSize).fill(0)
    data.inputSize = inputSize
    data.outputSize = outputSize
    data.hiddenCount = hiddenCount
    data.hiddenSize = hiddenSize

    // Set a random weight for the layer 0 (input layer) to layer 1
    data.layerSizes.push(inputSize)
    for (let j = 0; j < hiddenSize; j++) {
      for (let k = 0; k < inputSize; k++) {
        data.weightValues[this.calcWeightPosition(data, 0, j, k)] = Math.random() * 2 - 1
      }
    }

    // Iterate every hidden layer configuration (the ammount of neuron in each layer) to create the structure
    for (let i = 1; i < hiddenCount; i++) {
      data.layerSizes.push(hiddenSize)
      // Iterates for every neuron configured for the current hidden layer (hidden param inside forEach)
      for (let j = 0; j < hiddenSize; j++) {// j represents the current neuron of the 'hidden'th layer

        // Iterates for every neuron (layerValues length) in the last layer (i, since the first layer will be the input one)
        for (let k = 0; k < hiddenSize; k++) {
          data.weightValues[this.calcWeightPosition(data, i, j, k)] = Math.random() * 2 - 1 // Set a random value at the specified neuron weight
        }
      }
    }
    data.layerSizes.push(hiddenSize)

    // Set a random weight for the layer 'hiddenCount'th pus 2 (input layer) to layer 1
    data.layerSizes.push(outputSize)
    for (let j = 0; j < outputSize; j++) {
      for (let k = 0; k < hiddenSize; k++) {
        data.weightValues[this.calcWeightPosition(data, hiddenCount, j, k)] = Math.random() * 2 - 1
      }
    }
    return data
  }

  static calcNeuronPosition(data: MultiLayerPerceptronData, layer: number, position: number): number {
    return position + layer * data.hiddenSize;
  }

  static calcWeightPosition(data: MultiLayerPerceptronData, layer: number, position: number, weight: number) {
    return (weight + (position * data.hiddenSize) + (layer * data.hiddenSize * data.hiddenSize));
  }

  propagate() {
    // load the inputs into the first layer values
    this.data.inputs.forEach((value: number, index: number) => {
      this.data.layerValues[MultiLayerPerceptron.calcNeuronPosition(this.data, 0, index)] = value
    })

    // Iterates from the second layer to propagate the values with the weights starting from the second layer (input layer 0 has to be filled before this function to be called)
    for (let layer = 1; layer < this.data.hiddenCount + 2; layer++)
      this.propagateLayer(layer)

    // load the last layer values to the output layer
    this.data.outputs.forEach((value: number, index: number) => {
      this.data.layerValues[MultiLayerPerceptron.calcNeuronPosition(this.data, this.data.hiddenCount + 1, index)] = value
    })
  }

  private propagateLayer(layer: number) {
    // Iterates for every neuron in the neuron weight structures of the previous layer
    for (let neuronIndex = 0; neuronIndex < this.data.layerSizes[layer]; neuronIndex++) {
      let sum: number = 0
      for (let weightIndex = 0; weightIndex < this.data.layerSizes[layer - 1]; weightIndex++) {
        let weight: number = this.data.weightValues[MultiLayerPerceptron.calcWeightPosition(this.data, layer - 1, neuronIndex, weightIndex)]
        sum += weight * this.data.layerValues[MultiLayerPerceptron.calcNeuronPosition(this.data, layer - 1, weightIndex)] // Accumulates the the weight for the input value on that neuron (from the previous layer)
      }
      this.data.layerValues[MultiLayerPerceptron.calcNeuronPosition(this.data, layer, neuronIndex)] = this.activation(sum + this.data.bias) // pass the sum plus bias to the activation and set the current neuron value
    }
    // by the end, we'll have the current layer values updated with the weights connected to them
  }

  // Activation function.  In this case, sigmoid
  private activation(value: number): number {
    return 1 / (1 + Math.exp(-value))
  }
}
