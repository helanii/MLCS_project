function NeuralNetwork(input_x_hidden_weights, hidden_x_output_weights){
    this.activationFunction = function sigmoid(x) { //define sigmoid function
        return 1 / (1 + Math.exp(-x));
    }
    this.input_x_hidden_weights = math.matrix(input_x_hidden_weights); //assign matrices
    this.hidden_x_output_weights = math.matrix(hidden_x_output_weights);
}

NeuralNetwork.prototype.query = function(input_array){
    inputs = math.matrix(input_array); //get user input into an array

    hidden_layer_input = math.multiply(inputs, self.input_x_hidden_weights); //multiply input array
    hidden_layer_output = hidden_layer_input.map(x => this.activationFunction(x)); //map the hidden layer to the particular hidden_layer_input values to sigmoid function

    output_layer_input = math.multiply(hidden_layer_output, self.hidden_x_output_weights); //multiply given arrays
    output_layer_output = output_layer_input.map(x => this.activationFunction(x)); //map the value from output_layer_input's sigmoid to output_layer_output

    return output_layer_output; //return value
}