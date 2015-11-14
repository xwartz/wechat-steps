'use strict';

let request = require('superagent');
let config = require('./config').config;


if(!config.steps || !config.uid) {
  console.log('请输入步数或者ID');
  return;
}

const maxSteps = 98800;

let formatDate = () => {
  let date = new Date;
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  m = m < 10 ? '0' + m : m;
  let now = y + '-' + m + '-' + d + ' 00:00:00';

  return  Date.parse(new Date(now)) / 1000;
}

let steps = config.steps < maxSteps ? config.steps : maxSteps;

const list = [{
  'date': formatDate(),
  'calories': 0,
  'activeValue': 225,
  'pm2d5': 0,
  'duration': 0,
  'distance': 0,
  'report': '[]',
  'steps': steps
}]

let values = {
  'pc': '0b8e1458c8495be3b276105ed907938e249f91d6',
  'v': '5.5 ios',
  'vc': '540 ios',
  'action': 'profile',
  'cmd': 'updatedaily',
  'uid': config.uid
}

values.list = JSON.stringify(list);

request.post('http://pl.api.ledongli.cn/xq/io.ashx')
  .set({
    'User-Agent': 'le dong li/5.5 (iPhone; iOS 9.1; Scale/2.00)',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Encoding': 'gzip'
  })
  .type('form')
  .send(values)
  .end(function (err, res) {
    if(err) {
      console.log(err)
    } else {
      console.log(res.text)
    }
});
