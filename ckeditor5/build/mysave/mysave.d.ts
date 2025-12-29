export default class MySave extends Plugin {
    static get requires(): (typeof MySaveUI)[];
}
import { Plugin } from '@ckeditor/ckeditor5-core';
import MySaveUI from './mysaveui';
