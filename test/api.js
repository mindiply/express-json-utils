/**
 * Created by bongio on 12/10/2016.
 */
"use strict";

let expect = require('chai').expect
let { sendJSONResult, sendJSONError }  = require('../lib')

function createRes() {
    let data = {}
    return {
        setHeader : (header, value) => {
            data.headers = {[header] : value}
        },
        send : (send_data) => {
            data.json = send_data
        },
        data
    }
}

describe('api', () => {
    describe('sendJSONResult()', () => {
        it('should create the expected json object', () => {
            let res = createRes()
            let test_data = {
                first : 'first',
                second : 0,
                third : [1,2,3],
                fourth : {
                    a : 1,
                    b : 'Good lord',
                    c : 21.23
                }
            }

            sendJSONResult(res, test_data)
            let expected_data = Object.assign({}, test_data, {result : 'ok'})
            let parsed_data = JSON.parse(res.data.json)
            expect(parsed_data).to.deep.equal(expected_data)
            expect(res.data.headers).to.deep.equal({'Content-Type' : 'application/json'})
        })


        it('should keep my custom result field value', () => {
            let res = createRes()
            let test_data = {
                result : 'no',
                first : 'first',
                second : 0,
                third : [1,2,3],
                fourth : {
                    a : 1,
                    b : 'Good lord',
                    c : 21.23
                }
            }

            sendJSONResult(res, test_data)
            let expected_data = Object.assign({}, test_data)
            let parsed_data = JSON.parse(res.data.json)
            expect(parsed_data).to.deep.equal(expected_data)
            expect(res.data.headers).to.deep.equal({'Content-Type' : 'application/json'})
        })
    })

    describe('sendJSONError()', () => {
        it('should create the expected error object', () => {
            let res = createRes()
            let test_err = new Error('Test error')

            sendJSONError(res, test_err,'do we have a test error?')
            let expected_data = { err : test_err, msg : 'do we have a test error?', result : 'error' }
            let parsed_data = JSON.parse(res.data.json)
            expect(parsed_data).to.deep.equal(expected_data)
            expect(res.data.headers).to.deep.equal({'Content-Type' : 'application/json'})
        })
    })

})
