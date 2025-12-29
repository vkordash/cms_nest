/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import MySaveEditing from './mysaveediting';
import MySaveUI from './mysaveui';

export default class MySave extends Plugin {
	static get requires() {
		return [ MySaveEditing, MySaveUI ];
	}
}