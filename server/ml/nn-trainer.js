var brain = require('brain'),
    accuracy = require('./accuracy'),
    shuffle = require('./shuffle'),
    _ = require('lodash'),
    medicineData = require('./data/disease-to-medicine'),

    coldData = require('./data/cold-data'),
    coughData = require('./data/cough-data'),
    feverData = require('./data/fever-data'),
    malariaData = require('./data/malaria-data'),
    typhoidData = require('./data/typhoid-data'),

    DATA = [].concat(coldData, coughData, feverData, malariaData, typhoidData),
    SPLIT = 21,
    shuffledData = shuffle(DATA),
    trainedData = DATA.slice(0, SPLIT),
    testData = DATA.slice(SPLIT + 1),
    diseases = ['Cold', 'Fever', 'Cough', 'Malaria', 'Typhoid'],
    newDeseases = [];

const net = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [8],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
});

function startTraining() {
    trainedData = [].concat(feverData, malariaData, coughData, coldData, typhoidData);
    net.train(trainedData);
}

function getDisease(input) {
    var inputParse = _.map(input, function (item) {
        return Number(item);
    });

    console.log(inputParse);

    const testSet = net.run(inputParse);

    var predicatedDiseasePercentage = _.max(testSet);
    var foundDiseaseIndex = testSet.indexOf(predicatedDiseasePercentage);
    var foundDisease = diseases[foundDiseaseIndex];

    console.log('Hi,you are suffering from %s %s', predicatedDiseasePercentage, testSet + ' ' + foundDisease +
        ' with ' + (predicatedDiseasePercentage * 100) + '% probability');

    var medication = medicineData[foundDisease],
        updateOutput = [];

    if ((predicatedDiseasePercentage * 100) < 60) {
        if (_.indexOf(newDeseases, foundDisease) < 0) {
            diseases.push('InfluenZa');
            newDeseases.push('InfluenZa');

            var diseaseLength = diseases.length - 1;

            _.forEach(diseases, function (item, index) {
                if (index === diseaseLength) {
                    updateOutput.push(1);
                } else {
                    updateOutput.push(0);
                }
            });

            _.forEach(trainedData, function (item) {
                var output = item.output;
                output.push(0);
            });
        } else {
            _.forEach(testSet, function (item, index) {
                if (foundDiseaseIndex === index) {
                    updateOutput.push(1);
                } else {
                    updateOutput.push(0);
                }
            });
        }

        retrainModel({
            input: inputParse,
            output: updateOutput
        });
    }

    return {'medication': medication, 'foundDisease': foundDisease};
}

function retrainModel(newDisease) {
    trainedData.push(newDisease);

    net.train(trainedData);
}

module.exports = {
    startTraining: startTraining,
    getDisease: getDisease
};