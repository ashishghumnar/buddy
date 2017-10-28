/**
 * Created by aghumnar on 9/28/2017.
 */
const nnTrainer = require('./ml/nn-trainer'),
    intentRequestHandler = require('./intent-request-handler');

function buddyDoctorRequestHandler(app, server) {
    nnTrainer.startTraining();

    app.post('/api.symtoms', function (req, res) {
        var requestBody = req.body;

        nnTrainer.getDisease([requestBody.cold, requestBody.temperature, requestBody.bodyPain,
            requestBody.throatPain, requestBody.headache, requestBody.vomiting, requestBody.diarrhea, requestBody.sweating]);
        res.send('Hi');
    });

    app.post('/api.symtoms.alexa', intentRequestHandler);
}

module.exports = buddyDoctorRequestHandler;