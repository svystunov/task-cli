const yaml = require('yaml');
const output = yaml.stringify({id: '00001', name: 'Test task', estimated_s: 0, estimated_t: 0});
console.log(JSON.stringify(output));
