export default class MySubMenu extends Plugin {
    static get requires(): (typeof MySubMenuEditing)[];
}
import { Plugin } from '@ckeditor/ckeditor5-core';
import MySubMenuEditing from './mysubmenuediting';
