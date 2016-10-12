# express-json-utils
Use standard result field in data and error objects returned from an 
express application

The API consists of 2 functions:

* **sendJSONResult(res, data)** which sends an object of the format: { 
  result : 'ok', data_field_1 : data_field_1_value, ...} back via res.send
 
* **sendJSONError(res, err, msg)** which sends and object of the format: 
  { result : 'error', msg : msg, err : err } via res.send
  

# License

Apache 2.0