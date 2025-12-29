
//import { my_config } from './../url_config';
var my_config = require('./../my_config.json');
module.exports.SavePage = function (pageId,text){
    debugger;    	
    var data = JSON.stringify({ pageId: pageId, text: text });
    console.log(data); 
    const options  = 
    {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      };
      
    fetch(my_config.apiBaseUrl,options)
    .then(res => res.json())
    .then(res => console.log(res)); 
}

//'http://192.168.77.253:30021/editor/save'