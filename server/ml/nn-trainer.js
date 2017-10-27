var brain = require('brain'),
    accuracy = require('./accuracy'),
    DATA = require('./dataset')();

const SPLIT = 3,
    trainData = DATA.slice(0, SPLIT),
    testData = DATA.slice(SPLIT + 1);
	
const net = new brain.NeuralNetwork();
	
function startTraining () {
var fever = [{
        input: [0, 1, 1, 0, 0, 0, 0, 0],
        output: [0, 1, 0, 0, 0]
        },
        {
            input: [0, 1, 1, 0, 1, 0, 0, 0],
            output: [0, 1, 0, 0, 0]
        },
        {
            input: [0, 1, 1, 0, 0, 1, 0, 0],
            output: [0, 1, 0, 0, 0]
        },
        {
            input: [0, 1, 1, 0, 0, 0, 0, 0],
            output: [0, 1, 0, 0, 0]
        },
        {
            input: [0, 1, 1, 0, 0, 0, 1, 0],
            output: [0, 1, 0, 0, 0]
        },
        {
            input: [0, 1, 1, 0, 0, 0, 0, 0],
            output: [0, 1, 0, 0, 0]
        }],
    malria = [
        {
            input: [0, 1, 1, 0, 1, 0, 0, 0],
            output: [0, 0, 0, 1, 0]
        },
        {
            input: [0, 1, 0, 0, 1, 0, 0, 0],
            output: [0, 0, 0, 1, 0]
        },

        {
            input: [0, 1, 0, 1, 1, 0, 0, 1],
            output: [0, 0, 0, 1, 0]
        },

        {
            input: [0, 1, 0, 0, 1, 0, 0, 0],
            output: [0, 0, 0, 1, 0]
        },
        {
            input: [0, 1, 0, 0, 1, 0, 0, 0],
            output: [0, 0, 0, 1, 0]
        },
        {
            input: [0, 1, 0, 0, 1, 0, 0, 0],
            output: [0, 0, 0, 1, 0]
        }
    ],
    cough = [
        {
            input: [1, 0, 0, 1, 0, 1, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 1, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 0, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 0, 0, 1, 0, 1, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 0, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 0, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0]
        },
        {
            input: [1, 0, 0, 1, 0, 0, 0, 0],
            output: [0, 0, 1, 0, 0]
        }],
    cold = [
        {
            input: [1, 0, 0, 0, 0, 0, 0, 1],
            output: [1, 0, 0, 0, 0]
        },
        {
            input: [1, 0, 0, 0, 0, 1, 0, 0],
            output: [1, 0, 0, 0, 0]
        }, {
            input: [1, 0, 0, 0, 0, 0, 0, 0],
            output: [1, 0, 0, 0, 0]
        }, {
            input: [1, 0, 0, 0, 0, 0, 0, 0],
            output: [1, 0, 0, 0, 0]
        },
        {
            input: [1, 0, 0, 0, 0, 1, 0, 0],
            output: [1, 0, 0, 0, 0]
        }, {
            input: [1, 0, 0, 0, 0, 0, 0, 0],
            output: [1, 0, 0, 0, 0]
        }
    ],
    typhoid = [
        {
            input: [0, 1, 1, 0, 1, 0, 1, 0],
            output: [0, 0, 0, 0, 1]
        },
        {
            input: [0, 1, 1, 0, 1, 0, 1, 0],
            output: [0, 0, 0, 0, 1]
        },
        {
            input: [0, 1, 1, 0, 1, 0, 1, 0],
            output: [0, 0, 0, 0, 1]
        },
        {
            input: [0, 1, 1, 0, 1, 0, 1, 0],
            output: [0, 0, 0, 0, 1]
        },
        {
            input: [0, 1, 1, 0, 1, 0, 1, 0],
            output: [0, 0, 0, 0, 1]
        }];

		net.train([].concat(fever, malria, cough, cold, typhoid));
}

function getDisease (input) {
	const sample = net.run(input);	
	console.log(input);
	console.log(sample);
	return sample;
}

module.exports = {
	startTraining: startTraining,
	getDisease: getDisease
};
