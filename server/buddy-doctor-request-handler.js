/**
 * Created by aghumnar on 9/28/2017.
 */
nnTrainer = require('./ml/nn-trainer');

function buddyDoctorRequestHandler(app, server) {
    app.post('/api.symtoms', function(req, res) {
		console.log(req.body);
		var requestBody = req.body;		
		nnTrainer.startTraining();
		nnTrainer.getDisease([requestBody.cold, requestBody.temperature, requestBody.bodyPain,
		requestBody.throatPain, requestBody.headache, requestBody.vomiting, requestBody.diarrhea, requestBody.sweating]);
		res.send('Hi');
	});
}

module.exports = buddyDoctorRequestHandler;