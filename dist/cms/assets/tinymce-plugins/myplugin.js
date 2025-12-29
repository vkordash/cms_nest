(function () {
    tinymce.PluginManager.add('myplugin', function (editor, url) {
      // Добавляем кнопку
      editor.ui.registry.addButton('mybutton', {
        text: 'Вставить текст',
        onAction: function () {
          editor.insertContent('<p>Это вставленный текст!</p>');
        }
      });
  
      // Добавляем команду (можно вызвать вручную)
      editor.addCommand('insertCustomText', function () {
        editor.insertContent('<p>Командой вставленный текст!</p>');
      });
  
      return {
        getMetadata: function () {
          return {
            name: 'My Custom Plugin',
            url: 'https://example.com' // Ссылка на описание плагина
          };
        }
      };
    });
  })();