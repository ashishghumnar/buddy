/**
 * Created by aghumnar on 10/27/2017.
 */
var intentRespose = require('./intent-response-constant');

function intentResponceRequestHandler(req, res) {
    return intentRespose.SIMPLE_JSON_RESPONSE;
}

module.exports = intentResponceRequestHandler;