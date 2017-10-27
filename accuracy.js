/**
 * Created by aghumnar on 10/27/2017.
 */
function getAccuracy(net, testData) {
    var hits = 0;

    testData.forEach(function (datapoint) {
        const output = net.run(datapoint.input);
        const outputArray = [Math.round(output[0]), Math.round(output[1]), Math.round(output[2]), Math.round(output[3])];
        if (outputArray[0] === datapoint.output[0] &&
            outputArray[1] === datapoint.output[1] &&
            outputArray[2] === datapoint.output[2] &&
            outputArray[3] === datapoint.output[3]) {
            hits += 1;
        }
    });
    return hits / testData.length;
}

module.exports = getAccuracy;