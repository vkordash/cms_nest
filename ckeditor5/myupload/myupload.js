/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';
import MyUploadEditing from './myuploadediting';
import MyUploadUI from './myuploadui';

export default class MyUpload extends Plugin {
	static get requires() {
		return [ MyUploadEditing, MyUploadUI ];
	}
}