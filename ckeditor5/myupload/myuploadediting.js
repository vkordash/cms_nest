
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from '@ckeditor/ckeditor5-core';

export default class MyUploadEditing extends Plugin {
	init() {
		this._defineSchema();
		this._defineConverters();
	}
	_defineSchema() {
		const schema = this.editor.model.schema;
debugger;
    	// Extend the text node's schema to accept the abbreviation attribute.
		schema.extend( '$text', {
			allowAttributes: [ 'myupload' ]
		} );
	}
	_defineConverters() {
		const conversion = this.editor.conversion;	
        // Conversion from a model attribute to a view element
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'myupload',

            // Callback function provides access to the model attribute value
			// and the DowncastWriter
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				debugger;
				return writer.createAttributeElement( 'a', {
					title: modelAttributeValue
				} );
			}
		} );

		// Conversion from a view element to a model attribute
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'a',
				attributes: [ 'href' ]
			},
			model: {
				key: 'myupload',

                // Callback function provides access to the view element
				value: viewElement => {
					const href = viewElement.getAttribute( 'href' );
					return href;
				}
			}
		} );
	}
}
