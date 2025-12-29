import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { Editor } from 'tinymce';
import { ActivatedRoute } from '@angular/router';
import { IPage } from 'src/app/type';
import { SiteService } from '../../http.service';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-tinymce-editor',
  templateUrl: './tinymce-editor.component.html',
  styleUrls: ['./tinymce-editor.component.sass']
})
export class TinymceEditorComponent  implements OnInit, OnChanges {
  @Input() Page_id: number=0;
  @Input() Page_tp: number=0;
  @Input() Page_id_menu: number =0;

  @Output() contentChange = new EventEmitter<string>(); // Выходной ивент

  public Page: IPage = {'text':'','id':0,'head':'','title':'','date':''};

  public tinymceInit = {
    height: 800,
    min_height: 300,
    menubar: true,
    plugins: 'lists link image code media table',
    toolbar: 'customSave | undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | image | media customUpload subMenu | code',
    table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
   /*toolbar: [
    { name: 'history', items: [ 'undo', 'redo' ] },
    { name: 'styles', items: [ 'styles' ] },
    { name: 'formatting', items: [ 'bold', 'italic' ] },
    { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
    { name: 'indentation', items: [ 'outdent', 'indent' ] }
  ],*/
    
    paste_as_text: true, // ✅ Преобразование вставки в обычный текст
    //paste_filter_drop: true, // ✅ Фильтрует нежелательные стили
    paste_webkit_styles: 'none', // ✅ Убирает WebKit-стили
    //paste_retain_style_properties: '', // ✅ Очищает встроенные стили

    setup: (editor: Editor ) => {

      editor.ui.registry.addIcon('upload-Icon', `
      <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cloud-arrow-up"><path fill-rule="evenodd" d="M11.469 7.719a0.75 0.75 0 0 1 1.062 0l3 3a0.75 0.75 0 0 1 -1.062 1.062L12.75 10.06V15.75a0.75 0.75 0 0 1 -1.5 0V10.06L9.531 11.781a0.75 0.75 0 1 1 -1.062 -1.062z"/><path d="M6.609 5.013A8.295 8.295 0 0 1 12 3c4.035 0 7.385 3 7.749 6.868C22.137 10.206 24 12.206 24 14.659 24 17.354 21.753 19.5 19.03 19.5H5.671C2.562 19.5 0 17.049 0 13.977c0 -2.644 1.899 -4.835 4.413 -5.389 0.214 -1.294 1.047 -2.585 2.196 -3.575m0.98 1.135c-1.135 0.98 -1.73 2.16 -1.73 3.084v0.672l-0.667 0.074C3.096 10.207 1.5 11.928 1.5 13.977 1.5 16.178 3.345 18 5.671 18h13.359C20.97 18 22.5 16.482 22.5 14.659c0 -1.824 -1.53 -3.342 -3.47 -3.342h-0.75v-0.75C18.282 7.238 15.492 4.5 12 4.5a6.795 6.795 0 0 0 -4.412 1.65z"/></svg>
      `);

      editor.ui.registry.addIcon('sub-menu-Icon', `
        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M4 19h16v-2H4v2zm16-6H4v2h16v-2zM4 9v2h16V9H4zm16-4H4v2h16V5z"></path> </g> </g></svg>
      `);

      editor.ui.registry.addIcon('save-Icon', `
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#0F0F0F"></path> </g></svg>
      `);


      // 🔥 Добавляем кнопку "Загрузить документ"
      editor.ui.registry.addButton('subMenu', {
        //text: '📄 Загрузить документ',
        icon: 'sub-menu-Icon', // Используем нашу SVG-иконку      
        tooltip: 'Вставити вкладення',
        onAction: () => {
          const el = document.getElementById('CurrentPageIdMenu')?.textContent;
          const token = localStorage.getItem('token');
          const serv = this.siteService.getUrlServer();
          const _f = fetch(`${serv}/editor/submenu/?id_menu=`+ el,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }            
          })
            .then(response => response.json())
            .then(data => {
              console.log('Відповідь сервера:', data);
              editor.insertContent(data.data);
            })
            .catch(error => {
              console.error('Ошибка:', error);
              editor.notificationManager.open({
                text: 'Помилка завантаження субменю!',
                type: 'error',
                timeout: 3000
              });
            });       
        }
      });

      // 🔥 Добавляем кнопку "Загрузить документ"
      editor.ui.registry.addButton('customUpload', {
        //text: '📄 Загрузить документ',
        icon: 'upload-Icon', // Используем нашу SVG-иконку      
        tooltip: 'Завантажити файл',
        onAction: () => {
          this.uploadDocument(editor);
        }
      });

      // 🔥 Добавляем кнопку "Сохранить"
      editor.ui.registry.addButton('customSave', {
        //text: '📄 Загрузить документ',
        icon: 'save-Icon', // Используем нашу SVG-иконку      
        tooltip: 'Зберегти',
        onAction: () => {
          debugger;
          const elPage = document.getElementById('CurrentPageId');
          const elMenu = document.getElementById('CurrentPageIdMenu');
          const elPageTp = document.getElementById('CurrentPageTp');
          const content = editor.getContent(); // Получаем HTML-контент редактора

          const token = localStorage.getItem('token'); 
          const serv = this.siteService.getUrlServer();
        // Отправляем контент на сервер через POST-запрос
        fetch(`${serv}/editor/save`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             pageId: elPage?.textContent, 
             menuId: elMenu?.textContent, 
             pageTp: elPageTp?.textContent, 
             text: content })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Відповідь сервера:', data);
          if (data[0].id>0) {
            elPage!.textContent = String(data[0].id);
            editor.notificationManager.open({
              text: 'Збережено!',
              type: 'success',
              timeout: 3000
            });
          }            
          else {
            editor.notificationManager.open({
              text: 'Помилка PageId = 0 !',
              type: 'error',
              timeout: 3000
            });
          }          
        })
        .catch(error => {
          console.error('Помилка:', error);
          editor.notificationManager.open({
            text: 'Помилка збереження!',
            type: 'error',
            timeout: 3000
          });
        });
        }
      });
    },
    automatic_uploads: true, // Автозагрузка 
    file_picker_callback: (callback:any, value:any, meta:any) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
    
      input.onchange = function () {
        const file = (input as HTMLInputElement).files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = function () {
          const id = 'blobid' + new Date().getTime();
          const blobCache = (window as any).tinymce.activeEditor.editorUpload.blobCache;
          const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
    
          const blobInfo = blobCache.create(id, blob, file.name);
          blobCache.add(blobInfo);
    
          callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsArrayBuffer(file);
      };
    
      input.click();
    },      
    images_upload_handler: (blobInfo: any, progress: (percent: number) => void): Promise<string> => 
      new Promise((resolve, reject) => {
        
        console.log(blobInfo);
        
        const formData = new FormData();
        formData.append('file', (blobInfo as any).blob(), (blobInfo as any).filename().substr(6)); // ✅ Правильное использование методов BlobInfo

        const elPage = document.getElementById('CurrentPageId');
        const elMenu = document.getElementById('CurrentPageIdMenu');
        const elPageTp = document.getElementById('CurrentPageTp');
        formData.append('pageId', elPage?.textContent ?? '');
        formData.append('menuId', elMenu?.textContent ?? '');
        formData.append('pageTp', elPageTp?.textContent ?? '');

        const token = localStorage.getItem('token'); 
        const serv = this.siteService.getUrlServer();
        fetch(`${serv}/editor/uploadEditor/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`            
          },
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.location) {
              resolve(data.location); // Вставляем URL изображения в TinyMCE
            } else {
              reject('Помилка завантаження !');
            }
          })
          .catch((e) => reject('Помилка серверу !'+e));
      })
  };

 /* pasteFromWord(editor: Editor) {
    navigator.clipboard.readText().then((text) => {
      const cleanedText = this.cleanWordFormatting(text);
      editor.insertContent(cleanedText);
    }).catch(() => {
      alert('Ошибка: не удалось получить текст из буфера обмена.');
    });
  }

  cleanWordFormatting(text: string): string {
    return text
    .replace(/<!--[\s\S]*?-->/g, '') // Убираем комментарии
    .replace(/<o:p>\s*<\/o:p>/g, '') // Убираем MS Word теги
    .replace(/<\/?(span|div|font|o:p|style)[^>]*>/gi, '') // Удаляем ненужные теги
    .replace(/\s*mso-[^:]+:[^;"]+;?/gi, '') // Удаляем стили Word
    .replace(/\s*class="[^"]*"/gi, '') // Убираем классы
    .replace(/\s*style="\s*"/gi, '') // Убираем пустые style
    .replace(/\s*align="\s*(left|right|center)\s*"/gi, '') // Убираем атрибут align
    .replace(/<table[^>]*>/gi, '<table border="1" style="border-collapse: collapse; width: 100%;">') // ✅ Добавляем границы таблиц
    .replace(/(\r\n|\n|\r)/gm, '<br>'); // Переносы строк → <br>
  }*/

  uploadDocument(editor: Editor) {

    // Создаём input[type=file]
    const input = document.createElement('input');
    input.type = 'file';

    // 🔹 Разрешаем выбор нескольких файлов
    input.multiple = true;

    // 🔹 Допустимые типы файлов
    input.accept = '.pdf,.doc,.docx,.txt,.jpeg,.jpg,.gif';

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        return;
      }
     
      // 🔹 FormData для отправки файлов
      const formData = new FormData();

      // 🔹 Добавляем ВСЕ файлы с одинаковым именем поля
      Array.from(input.files).forEach(file => {
        formData.append('files', file);
      });

     
      const elPage = document.getElementById('CurrentPageId');
      const elMenu = document.getElementById('CurrentPageIdMenu');
      const elPageTp = document.getElementById('CurrentPageTp');
      formData.append('pageId', elPage?.textContent ?? '');
      formData.append('menuId', elMenu?.textContent ?? '');
      formData.append('pageTp', elPageTp?.textContent ?? '');

      // 🔹 JWT-токен
      const token = localStorage.getItem('token');
      
      try {
        const serv = this.siteService.getUrlServer();
        const response = await fetch(
          `${serv}/editor/uploadsEditor/`,
          {
            method: 'POST',
            headers: {
              // ❗ Content-Type НЕ УКАЗЫВАЕМ — браузер сделает сам
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        
        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();

        /**
         * Ожидаемый ответ от backend:
         * {
         *   files: [
         *     { location: 'https://site/.../file1.pdf', originalName: 'file1.pdf' }
         *   ]
         */
        if (data.files && Array.isArray(data.files)) {
          data.files.forEach((file: any) => {
            editor.insertContent(
              `<p class="page-upload-file"><a href="${file.location}" target="_blank">${file.originalName}</a></p>`,
            );
          });
        } else {
          alert('Помилка завантаження файлів');
        }
      } catch (error) {
        console.error(error);
        alert('Помилка сервера');
      }
    };

    // Открываем диалог выбора файлов
    input.click();
    /*const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.pdf,.doc,.docx,.txt,.jpeg,.jpg,.gif');

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('token'); 

      try {
        const response = await fetch(`${this.configService.apiBaseUrl}/editor/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: formData
        });
        debugger;
        const data = await response.json();

        if (data.location) {
          editor.insertContent(`<a href="${data.location}" target="_blank">${file.name}</a>`);
        } else {
          alert('Помилка завантаження файла');
        }
      } catch (error) {
        alert('Помилка сервера');
      }
    };

    input.click();*/
  }

  constructor(private route: ActivatedRoute,  private siteService : SiteService, private configService:AppConfigService)  { }

  ngOnInit() {
    if (this.Page_tp!=1)
      this.getDataPage(this.Page_id, this.Page_tp);     
    else
      this.getDataPage(this.Page_id, 0);            
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.Page_tp!=1)
      this.getDataPage(this.Page_id, this.Page_tp);     
    else
      this.getDataPage(this.Page_id, 0);   
  }

  getDataPage (id:number, typ:number){
    let s = this.siteService.getPage(id,typ).subscribe(page => {             
        this.Page = page;        
        s.unsubscribe(); 
    });   
  }
  
  onEditorChange(newContent: string) {
    this.contentChange.emit(newContent);
  }

}
