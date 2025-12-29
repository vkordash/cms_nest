
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import MySubMenuIcon from './theme/icons/mysubmenuicon.svg';
//const MySubMenu = require ('./mysubmenufunction')



export default class MySubMenuUI extends Plugin {
	init() {
		const editor = this.editor;

        // Register the button in the editor's UI component factory.
		editor.ui.componentFactory.add( 'mysubmenu', () => {
			const button = new ButtonView();
			
			button.label = 'Вставити субменю';
			
			button.tooltip = true;
			button.icon = MySubMenuIcon;

			this.listenTo( button, 'execute', () => {

					let el = document.getElementById('CurrentPageIdMenu');

					fetch('http://192.168.77.253:30021/editor/getSubMenu?id='+el.textContent)
						.then(response => response.json())
  						.then(result => {
							editor.model.change(writer => {
								console.log(result);
								const viewFragment = editor.data.processor.toView(result.data);
								const modelFragment = editor.data.toModel(viewFragment);
								// Вставка HTML-кода в текущую позицию курсора
								editor.model.insertContent(modelFragment, editor.model.document.selection);
							});							
						})
					//var _subMenu = MySubMenu.getData(el.textContent, editor);		
				//	console.log(_subMenu);			
			//	if (_subMenu){
					

					//editor.execute( 'htmlEmbed', '<b>Initial content.</b>' );
					/*editor.model.change( writer => {
						const viewFragment = editor.data.processor.toView('<b>Initial content.</b>');
                		const modelFragment = editor.data.toModel(viewFragment);
						editor.model.insertContent(modelFragment, editor.model.document.selection);
						/* const link = writer.createText('DOWNLOAD', {
							linkHref: 'https://dominio.com/file.pdf'
						  });
						  
						  var selection = editor.model.document.selection;
						  const position = selection.getFirstPosition();
						  editor.model.insertContent(link, position);	*/					  
					//});				
				//}							
			} );

			return button;
		} );
	}
}
