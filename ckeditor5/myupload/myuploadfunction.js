//const http = require('http');

module.exports.UploadFile = function (){
  
    debugger;
      var _uload = document.getElementById("fileUploadEditor");
      var filesUploads = [];
      
      _uload.onchange = function (e) {
        debugger;
        console.log(e);
        let files = _uload.files;
        var ret=[];
        for (var i = 0; i < files.length; i++)
        {         
           var _ret = uploadFile(files[i]);
           if (_ret.status='200') {
            ret.push({'filename':files[i]});
           }           
        }
        console.log(ret);
        filesUploads = ret;				
      };

    async function uploadFile(_file){
      debugger;
			const formData = new FormData();
			formData.append('filedata',_file);     
			try{
				/*const response = await fetch('http://192.168.77.253:30021/uploadFileEditor',{
					method:'POST',
					body:formData
				});*/
        const response = await fetch('http://192.168.77.253:30021/editor/upload',{
					method:'POST',
					body:formData
				});
				return response;
			}catch(e){
				console.log(e);

			}
		}

}