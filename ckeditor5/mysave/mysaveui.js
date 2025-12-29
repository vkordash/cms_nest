
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import MySaveIcon from './theme/icons/mysaveicon.svg';
//import { SavePage } from './mysavefunction';
const Save = require('./mysavefunction');

export default class MySaveUI extends Plugin {
	init() {
		const editor = this.editor;

        // Register the button in the editor's UI component factory.
		editor.ui.componentFactory.add( 'mysave', () => {
			const button = new ButtonView();
			
			button.label = 'Зберегти сторінку';
			button.tooltip = true;
			//button.withText = true;
			button.icon = MySaveIcon;

			this.listenTo( button, 'execute', () => {
				let el = document.getElementById('CurrentPageId');
				let data = editor.getData();
				Save.SavePage(el.textContent, data);								
			} );

			return button;
		} );
	}
}
