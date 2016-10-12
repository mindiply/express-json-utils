"use strict";

function sendJSONResult(res, data) {
    try {
        let result_obj = Object.assign({}, data ? data : {}, {result: 'ok'})
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result_obj))
    } catch (err) {
        sendJSONError(res, err, 'Unable to send data result')
    }
}

function sendJSONError(res, err, msg) {
    let result_obj = null
    try {
        result_obj = Object.assign({}, { err : err ? err: 'No error msg', msg : msg ? msg : '', result : 'error'})
    } catch(err) {
        result_obj = { err, resut : 'error', msg : 'Unable to generate error message'}
    }

    // The function will throw if there are problems with either the res object sent in or
    // the JSON serialization sent in. The caller should handle that situation
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result_obj))
}

module.exports = {
    sendJSONResult,
    sendJSONError
}
