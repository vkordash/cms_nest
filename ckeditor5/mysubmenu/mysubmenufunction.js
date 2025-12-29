module.exports.getData = function (pageId, ed){
    debugger;    	
    let xhr = new XMLHttpRequest();
    // 2. Настраиваем его: GET-запрос по URL /article/.../load
    xhr.open('GET', 'http://192.168.77.253:30021/getSubMenuEditor?id='+pageId,true);
    // 3. Отсылаем запрос
    xhr.send();
    console.log('sent');
    // 4. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function(ed) {
        if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
            alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
            editor.model.change(writer => {
                console.log(xhr.response);
                const viewFragment = editor.data.processor.toView(_subMenu);
                const modelFragment = editor.data.toModel(viewFragment);
                // Вставка HTML-кода в текущую позицию курсора
                editor.model.insertContent(modelFragment, editor.model.document.selection);
            });
        }
        //console.log('pageId');
            
        //return xhr.response
        console.log('onLoad');
        //return "<ul><li><a href='/page?id=27744&typ=1'>Розпорядження № 22 від 18.02.2019</a></li><li><a href='/page?id=27839&typ=1'>Розпорядження № 29 від 27.02.2019</a></li><li><a href='/page?id=28059&typ=1'>Розпорядження № 50 від 01.04.2019</a></li><li><a href='/page?id=28173&typ=1'>Розпорядження № 64 від 17.04.2019</a></li><li><a href='/page?id=28453&typ=1'>Розпорядження № 94 від 06.06.2019</a></li><li><a href='/page?id=28509&typ=1'>Розпорядження № 103 від 19.06.2019</a></li><li><a href='/page?id=28579&typ=1'>Розпорядження №111 від 02.07.2019</a></li><li><a href='/page?id=28634&typ=1'>Розпорядження №117 від  11.07.2019</a></li><li><a href='/page?id=29583&typ=1'>Розпорядження № 168 від 15.10.2019</a></li><li><a href='/page?id=29865&typ=1'>Розпорядження № 171 від 28.10.2019</a></li><li><a href='/page?id=30227&typ=1'>Розпорядження № 180, 181 від 13.11.2019</a></li><li><a href='/page?id=30241&typ=1'>Розпорядження № 182 від 14.11.2019</a></li><li><a href='/page?id=30417&typ=1'>Розпорядження № 195 від 09.12.2019</a></li><li><a href='/page?id=30418&typ=1'>Розпорядження № 196 від 09.12.2019</a></li><li><a href='/page?id=30436&typ=1'>Розпорядження № 200 від 12.12.2019</a></li><li><a href='/page?id=30493&typ=1'>Розпорядження № 206 від 21.12.2019</a></li><li><a href='/page?id=30525&typ=1'>Розпорядження № 210 від 28.12.2019</a></li><li><a href='/page?id=30924&typ=1'>Розпорядження №15 від 03.02.2020</a></li><li><a href='/page?id=30923&typ=1'>Розпорядження № 14 від 03.02.2020</a></li><li><a href='/page?id=31601&typ=1'>Розпорядження № 57, 56 від 17.04.2020</a></li><li><a href='/page?id=31666&typ=1'>Розпорядження № 64 від 28.04.2020</a></li><li><a href='/page?id=31925&typ=1'>Розпорядження № 78 від 03.06.2020</a></li><li><a href='/page?id=32157&typ=1'>Розпорядження № 99 від 15.07.2020</a></li><li><a href='/page?id=32402&typ=1'>Розпорядження № 110 від 12.08.2020</a></li><li><a href='/page?id=32450&typ=1'>Розпорядження № 116 від 19.08.2020</a></li><li><a href='/page?id=32709&typ=1'>Розпорядження № 131 від 15.09.2020</a></li><li><a href='/page?id=32784&typ=1'>Розпорядження № 143 від 01.10.2020</a></li><li><a href='/page?id=32806&typ=1'>Розпорядження № 152 від 08.10.2020</a></li><li><a href='/page?id=32826&typ=1'>Розпорядження № 161 від 15.10.2020</a></li><li><a href='/page?id=32871&typ=1'>Розпорядження № 167 від 27.10.2020</a></li><li><a href='/page?id=32939&typ=1'>Розпорядження № 174 від 10.11.2020</a></li><li><a href='/page?id=32979&typ=1'>Розпорядження № 182 від 24.11.2020</a></li><li><a href='/page?id=33183&typ=1'>Розпорядження № 199 від 17.12.2020</a></li><li><a href='/page?id=33269&typ=1'>Розпорядження № 214 від 28.12.2020</a></li><li><a href='/page?id=33622&typ=1'>Розпорядження № 29 від 04.02.2021</a></li></ul>"; 
    };
/*
    xhr.onprogress = function(event) {
    if (event.lengthComputable) {
        alert(`Получено ${event.loaded} из ${event.total} байт`);
    } else {
        alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    }

    };
*/
    xhr.onerror = function() {
        alert("Помилка запиту");
    };
}