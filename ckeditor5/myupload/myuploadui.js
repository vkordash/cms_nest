
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import MyuploadIcon from './theme/icons/myuploadIcon.svg';
const Upload = require('./myuploadfunction');

export default class MyUploadUI extends Plugin {
	init() {
		const editor = this.editor;

        // Register the button in the editor's UI component factory.
		editor.ui.componentFactory.add( 'myupload', () => {
			const button = new ButtonView();
			
			button.label = 'Завантажити файл';
			button.tooltip = true;
			//button.withText = true;
			button.icon = MyuploadIcon;
			const fileUpLoad=document.getElementById("fileUploadEditor");

			async function uploadFile(_file){
				debugger;
					  const formData = new FormData();
					  formData.append('filedata',_file);     
					  try{
						  const response = await fetch('http://192.168.77.253:30021/editor/upload',{
							  method:'POST',
							  body:formData
						  } );
						  //const result = await response.json();
						  return response;
					  }catch(e){
						  console.log(e);
		  
					  }
				  }
			
				  fileUpLoad.onchange = function (e) {
        			debugger;
        			console.log(e);
					
					let files = fileUpLoad.files;
					var ret=[];
					for (var i = 0; i < files.length; i++)
					{         
						var _ret = uploadFile(files[i]);
						if (_ret.status='200') {
														
							if (files[i].type.indexOf('image')==-1) {
								var viewFragment = editor.data.processor.toView("<a href='http://192.168.77.253:30021/uploads/"+files[i].name+"'>"+files[i].name+"</a>");
							}
							else {
								var viewFragment = editor.data.processor.toView("<img src='http://192.168.77.253:30021/uploads/"+files[i].name+"'>");
							}
							var modelFragment = editor.data.toModel(viewFragment);
							editor.model.insertContent(modelFragment, editor.model.document.selection);
						}           
					}
					console.log(ret);							
				};

			this.listenTo( button, 'execute', () => {					
				fileUpLoad.click();				
			} );

			return button;
		} );
	}
}
