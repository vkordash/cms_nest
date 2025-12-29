/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import MySubMenuEditing from './mysubmenuediting';
import MySubMenuUI from './mysubmenuui';

export default class MySubMenu extends Plugin {
	static get requires() {
		return [ MySubMenuEditing, MySubMenuUI ];
	}
}