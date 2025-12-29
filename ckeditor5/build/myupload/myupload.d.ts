export default class MyUpload extends Plugin {
    static get requires(): (typeof MyUploadUI)[];
}
import { Plugin } from '@ckeditor/ckeditor5-core';
import MyUploadUI from './myuploadui';
