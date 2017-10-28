/**
 * Created by aghumnar on 10/27/2017.
 */
var intentRespose = require('./intent-response-constant'),
    nnTrainer = require('./ml/nn-trainer');

var featureMapper = {
    'cold': 0,
    'temperature': 1,
    'body pain': 2,
    'throat pain': 3,
    'headache': 4,
    'vomiting': 5,
    'diarrhea': 6,
    'sweating': 7
};

function intentResponceRequestHandler(req, res) {
    const intent = req.body.request ? getIntend(req.body.request) : '',
        isLaunchRequest = req.body.request.type === 'LaunchRequest',
        isSessionEndedRequest = req.body.request.type === 'SessionEndedRequest';


    if (isLaunchRequest) {
        var RESPONSE_LAUNCH_REQ = JSON.parse(JSON.stringify(intentRespose.SIMPLE_JSON_RESPONSE));

        RESPONSE_LAUNCH_REQ.response.outputSpeech.text = 'Welcome to buddy doctor , How can I help you?';

        RESPONSE_LAUNCH_REQ.response.reprompt = {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Can I help you with anything else?"
            }
        };

        RESPONSE_LAUNCH_REQ.response.shouldEndSession = false;

        try {
            res.send(RESPONSE_LAUNCH_REQ);
        } catch (err) {

        }
    } else if (isSessionEndedRequest) {
        var RESPONSE_REQ_END = JSON.parse(JSON.stringify(intentRespose.SIMPLE_JSON_RESPONSE));

        RESPONSE_REQ_END.response.outputSpeech.text = 'Thank You..!';
        RESPONSE_REQ_END.response.shouldEndSession = true;

        try {
            res.send(RESPONSE_REQ_END);
        } catch (err) {

        }
    }

    if (intent === 'NotFeelingWellInetnt') {
        intentRespose.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "May I know what happened ?";

        return res.send(intentRespose.SIMPLE_JSON_RESPONSE);

    } else if (intent === 'SymptopmsIntent') {
        var input = [];
        var intentSolts = req.body.request.intent.slots;
        var symptoms = intentSolts.symptoms.value.split(' ');

        _.forEach(featureMapper, function (item, index) {
            if (symptoms.indexOf(item) > 0) {
                input.push(1);
            } else {
                input.push(0);
            }
        });

        var disease = nnTrainer.getDisease(input);

        intentRespose.SIMPLE_JSON_RESPONSE.response.outputSpeech.text = "You are suffering from " + disease;
        return res.send(intentRespose.SIMPLE_JSON_RESPONSE);
    }
}

function getIntend(request) {
    return request && request.intent && request.intent.name ? request.intent.name : '';
}

module.exports = intentResponceRequestHandler;