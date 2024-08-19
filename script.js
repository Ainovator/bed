//Динамические переменные
let Bed_Length = parseInt(document.getElementById('input-bed-length').value)/1000 || 0;
let Bed_Width = parseInt(document.getElementById('input-bed-width').value)/1000 || 0;
let Bed_Bold = parseInt(document.getElementById('input-bed-bold').value)/1000 || 0;
let Bed_Amount = parseInt(document.getElementById('input-bed-amount').value) || 0;
let TextileCost = parseInt(document.getElementById('input-textile-cost').value) || 0;
let Work_Amount = parseInt(document.getElementById('input-full-work').value) || 0;
let Head_Heigth = parseInt(document.getElementById('input-head-heigth').value)/1000 || 0;
let Head_Ledge = parseInt(document.getElementById('input-head-ledge').value)/1000 || 0;
let Head_Whole = parseInt(document.getElementById('input-whole').value) || 0;
let Head_Bold = parseInt(document.getElementById('input-head-bold').value)/1000 || 0;

let TotalTextileCost = 0;
let TextileWidth = 1.39;
let TextileLength = 0;
let TotalCost = 0;
let WorkCost = 0;
let ScaleUp = 0.02;
let OnBoard = 0.1;
let Oxford = 0;
let FoamCost = 0;

drawHeadboard()
TotalOutput();

// #region
//Динамическое отслеживание цельности
document.getElementById('input-whole').addEventListener('input', () => {
    Head_Whole = document.getElementById('input-whole').checked ? 1 : 0;
    console.log("Новое цельное: ", Head_Whole);
    TotalOutput();
    drawHeadboard();
});
//Динамическое отслеживание отступа
document.getElementById('input-head-ledge').addEventListener('input', () => {
    Head_Ledge = parseInt(document.getElementById('input-head-ledge').value)/1000 || 0;
    console.log("Новый отступ: ", Head_Ledge)
    TotalOutput();
    drawHeadboard()
});
//Динамическое отслеживание высоты изголовья
document.getElementById('input-head-heigth').addEventListener('input', () => {
    Head_Heigth = parseInt(document.getElementById('input-head-heigth').value)/1000 || 0;
    console.log("Новая высота: ", Head_Heigth)
    TotalOutput();
    drawHeadboard()
});
//Динамическое отслеживание толщины изголовья
document.getElementById('input-head-bold').addEventListener('input', () => {
    Head_Bold = parseInt(document.getElementById('input-head-bold').value)/1000 || 0;
    console.log("Новая толщина: ", Head_Bold)
    TotalOutput();
    drawHeadboard()
});
//Динамическое отслеживание ширины кровати
document.getElementById('input-bed-width').addEventListener('input', () => {
    Bed_Width = parseInt(document.getElementById('input-bed-width').value)/1000 || 0;
    console.log("Новая ширина: ", Bed_Width)
    TotalOutput();
});
//Динамическое отслеживание длины кровати
document.getElementById('input-bed-length').addEventListener('input', () => {
    Bed_Length = parseInt(document.getElementById('input-bed-length').value)/1000 || 0;
    console.log("Новая длина: ", Bed_Length)
    TotalOutput();
});
//Динамическое отслеживание толщины кровати
document.getElementById('input-bed-bold').addEventListener('input', () => {
    Bed_Bold = parseInt(document.getElementById('input-bed-bold').value)/1000 || 0;
    console.log("Новая толщина: ", Bed_Bold)
    TotalOutput();
});
//Динамическое отслеживание количество кроватей
document.getElementById('input-bed-amount').addEventListener('input', () => {
    Bed_Amount = parseInt(document.getElementById('input-bed-amount').value) || 0;
    console.log("Новое количество: ", Bed_Amount)
    TotalOutput();
});
//Динамическое отслеживание цены ткани
document.getElementById('input-textile-cost').addEventListener('input', () => {
    TextileCost = parseInt(document.getElementById('input-textile-cost').value) || 0;
    console.log("Новая цена: ", TextileCost)
    TotalOutput();
});
//Динамическое отслеживание количества работ
document.getElementById('input-full-work').addEventListener('input', () => {
    Work_Amount = parseInt(document.getElementById('input-full-work').value) || 0;
    WorkCost = Work_Amount*9;
    console.log("Новые работы: ", Work_Amount)
    TotalOutput();
});
// #endregion

function calculateTotalCost(){
    TotalCost = (TotalTextileCost + FoamCost + WorkCost)*1.2*1.6*1.3;
    console.log("Вся цена из: ", TotalTextileCost, FoamCost, WorkCost)
    return TotalCost;
}
// Функция пересчёта всех значений и вывода 
function TotalOutput(){
    calculateFoam();
    calculateTextileLength();
    calculateTextileCost();
    calculateTotalCost();

    document.getElementById('textile-length').textContent = `Длина отреза ткани: ${TextileLength.toFixed(2)} м`;
    document.getElementById('textile-cost').textContent = `Цена отреза ткани: ${TotalTextileCost.toFixed(2)} м`;
    document.getElementById('foam-cost').textContent = `Цена пены: ${FoamCost.toFixed(2)} Рублей`;
    document.getElementById('total-cost').textContent = `Цена изделия: ${TotalCost.toFixed(2)} Рублей`;

}
// Функция расчета длины отреза ткани
function calculateTextileLength() {
    let details = countDetails();
    let BF_Out = bestFit(TextileWidth, details);
    TextileLength = BF_Out.rollLength;
    return TextileLength;
   
}
// Функция расчета отреза ткани
function calculateTextileCost(){
    Oxford = ((Bed_Length+Bed_Length-OnBoard*2) * 109);
    TotalTextileCost = (TextileCost * TextileLength) + Oxford;
    console.log("Стоимость оксфорда: ", Oxford);
    return Oxford;
}
// Функция расчета пены
function calculateFoam(){
   if (Head_Whole === 1){
        FoamCost = ((Bed_Width-0.2) * (Bed_Length-0.1) * Bed_Bold * 23 * 410) + //Расчёт НПЭ подиума
                   ((Bed_Width-0.2)*(Bed_Bold)*0.1*30*572) + //Расчёт передней отбортовки подиума
                   ((Bed_Length*Bed_Bold*2*0.1*30*572))+ //Расчёт боковых отбортовок подиума

                   (((Head_Bold-0.05)*((Bed_Width+Head_Ledge-0.1)*(Head_Heigth-0.05)))*23*410)+ //Расчёт НПЭ изголовья
                   (((Head_Heigth-0.05)*(Head_Bold-0.05)*0.05)*2*30*572)+ //Расчёт боковых отбортовок изголовья
                   ((Bed_Width*Head_Bold*0.05*30*572))+ //Расчёт верхней отбортовки изголовья
                   ((Bed_Width*Head_Heigth*0.05*30*572)); //Расчёт передней отбортовки изголовья
                   console.log("Hui", Head_Bold, Bed_Width, Head_Ledge, Head_Heigth )

   } else {
        FoamCost = ((Bed_Width-0.2) * (Bed_Length-0.1) * Bed_Bold * 23 * 410) + //Расчёт НПЭ подиума
                   ((Bed_Width-0.2)*(Bed_Bold)*0.1*30*572) + //Расчёт передней отбортовки подиума
                   ((Bed_Length*Bed_Bold*2*0.1*30*572))+ //Расчёт боковых отбортовок подиума

                   ((((Head_Bold-0.05)*((Bed_Width/2)+Head_Ledge)*(Head_Heigth-0.05)))*2*23*410)+ //Расчёт НПЭ изголовья
                   (((Head_Heigth-0.05)*(Head_Bold-0.05)*0.05)*4*30*572)+ //Расчёт боковых отбортовок изголовья
                   (((Bed_Width/2+Head_Ledge)*Head_Bold*0.05*2*30*572))+ //Расчёт верхней отбортовки изголовья
                   (((Bed_Width/2+Head_Ledge)*Head_Heigth*0.05*2*30*572)); //Расчёт передней отбортовки изголовья

   }
    console.log("Стоимость пены: ", FoamCost)
    return FoamCost;

}


//Раскладка деталей матраса исходя из размеров
function countDetails() {
    let details = [];
    if (Head_Whole === 1){
        for (let i = 0; i < Bed_Amount * 2; i++) {
            details.push([Bed_Width + Bed_Bold*2 + ScaleUp*2, Bed_Bold + OnBoard + ScaleUp*2]);
            details.push([Bed_Bold + OnBoard + ScaleUp*2, Bed_Length + Bed_Bold*2 + ScaleUp*2, ]);
            details.push([Bed_Width+Head_Ledge*2+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([Head_Bold+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([Bed_Width+Head_Ledge*2+ScaleUp*2, Head_Bold+ScaleUp*2]);
            console.log("Детали 1", details)
        }
    } else {
        for (let i = 0; i < Bed_Amount * 2; i++){
            details.push([Bed_Width + Bed_Bold*2 + ScaleUp*2, Bed_Bold + OnBoard + ScaleUp*2]);
            details.push([Bed_Bold + OnBoard + ScaleUp*2, Bed_Length + Bed_Bold*2 + ScaleUp*2, ]);
            details.push([(Bed_Width/2+Head_Ledge)+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([Head_Bold+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([(Bed_Width/2+Head_Ledge)+ScaleUp*2, Head_Bold+ScaleUp*2]);
            details.push([(Bed_Width/2+Head_Ledge)+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([Head_Bold+ScaleUp*2, Head_Heigth+ScaleUp*2]);
            details.push([(Bed_Width/2+Head_Ledge)+ScaleUp*2, Head_Bold+ScaleUp*2]);
            console.log("Детали 2",details)
        }
    }
    
    return details;
}
//Раскладка деталей на рулоне
function bestFit(width, parts) {
    let minRollLength = Infinity;
    let bestArrangement = [];

    class Node {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.used = false;
            this.right = null;
            this.down = null;
        }

        insert(partWidth, partHeight) {
            if (this.used) {
                return this.right.insert(partWidth, partHeight) || this.down.insert(partWidth, partHeight);
            } else if (partWidth <= this.width && partHeight <= this.height) {
                this.used = true;
                this.right = new Node(this.x + partWidth, this.y, this.width - partWidth, partHeight);
                this.down = new Node(this.x, this.y + partHeight, this.width, this.height - partHeight);
                return this;
            } else {
                return null;
            }
        }
    }

    function fit(parts, width) {
        const root = new Node(0, 0, width, Infinity);
        let maxY = 0;

        parts.sort((a, b) => b[1] - a[1]); // Сортируем по высоте

        for (let part of parts) {
            let node = root.insert(part[0], part[1]);
            if (!node) {
                node = root.insert(part[1], part[0]); // Пробуем повернуть деталь на 90 градусов
                if (node) {
                    [part[0], part[1]] = [part[1], part[0]]; // Меняем местами ширину и высоту
                }
            }
            if (node) {
                part.x = node.x;
                part.y = node.y;
                maxY = Math.max(maxY, node.y + part[1]);
            } else {
                return Infinity;
            }
        }
        return maxY;
    }

    const rollLength = fit(parts, width);

    if (rollLength < minRollLength) {
        minRollLength = rollLength;
        bestArrangement = parts.map(part => ({
            x: part.x,
            y: part.y,
            width: part[0],
            height: part[1]
        }));
    }

    return {
        details: bestArrangement,
        rollLength: minRollLength
    };
}
//Копирование текста в буфер обмена
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`Скопировано в буфер обмена: ${text}`);
}
// #region <Декоративные обработки>
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,  // 'True' заменено на 'true'
    "progressBar": true,
    "positionClass": "toast-top-center",  // Позиция сверху по центру
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
// #endregion <Декоративные обработки>


//Визулаизация деталей на странице
function visualize() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Генерируем детали с учетом введенных пользователем данных
    const details = countDetails();
    const { details: detailPositions } = bestFit(TextileWidth, details);

    // Масштабирование для лучшего отображения
    const scale = 1; // Масштаб 1:1 для отображения в миллиметрах

    // Настраиваем размеры холста
    canvas.width = TextileWidth * 1000 * scale; // Переводим ширину текстиля в миллиметры
    canvas.height = detailPositions.reduce((max, pos) => Math.max(max, pos.y + pos.height), 0) * 1000 * scale + 20;

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Настройки сетки
    const gridSize = 10;
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;

    // Рисуем координатную сетку
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Массив для цветов и объект для хранения цветов одинаковых размеров
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2', '#FF4500', '#DAA520'];
    const sizeToColorMap = {};
    let colorIndex = 0;

    // Рисуем детали
    detailPositions.forEach(({ x, y, width, height }) => {
        const sizeKey = `${width}x${height}`;

        if (!sizeToColorMap[sizeKey]) {
            sizeToColorMap[sizeKey] = colors[colorIndex % colors.length];
            colorIndex++;
        }

        const color = sizeToColorMap[sizeKey];
        ctx.fillStyle = color;

        // Переводим все размеры в миллиметры
        const x_mm = x * 1000 * scale;
        const y_mm = y * 1000 * scale;
        const width_mm = width * 1000 * scale;
        const height_mm = height * 1000 * scale;

        ctx.fillRect(x_mm, y_mm, width_mm, height_mm);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x_mm, y_mm, width_mm, height_mm);

        // Определяем, где писать текст (по длинной стороне)
        ctx.fillStyle = '#000';
        ctx.font = '36px Arial';

        if (width_mm >= height_mm) {
            // Пишем текст горизонтально по ширине и центрируем по высоте и ширине
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${(width * 1000).toFixed(0)} мм x ${(height * 1000).toFixed(0)} мм`, x_mm + width_mm / 2, y_mm + height_mm / 2);
        } else {
            // Пишем текст вертикально по высоте и центрируем по высоте и ширине
            ctx.save();
            ctx.translate(x_mm + width_mm / 2, y_mm + height_mm / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${(width * 1000).toFixed(0)} мм x ${(height * 1000).toFixed(0)} мм`, 0, 0);
            ctx.restore();
        }
    });
}
//Визулаизация изголовья
function drawHeadboard() {
    const canvas = document.getElementById('canvas-2');
    const ctx = canvas.getContext('2d');

    const bedWidth = parseInt(document.getElementById('input-bed-width').value) || 0;
    const headLedge = parseInt(document.getElementById('input-head-ledge').value) || 0;
    const headHeight = parseInt(document.getElementById('input-head-heigth').value) || 0;
    const bedThickness = parseInt(document.getElementById('input-bed-bold').value) || 0;
    const isWhole = document.getElementById('input-whole').checked;

    // Ширина и высота основного прямоугольника (изголовье)
    const rectWidth = bedWidth + headLedge * 2;
    const rectHeight = headHeight;

    // Ширина и высота дополнительного прямоугольника (основание кровати)
    const bedRectWidth = bedWidth;
    const bedRectHeight = bedThickness;

    // Ширина экрана
    const screenWidth = window.innerWidth - 20; // Учитываем отступы

    // Определяем масштаб
    const scale = rectWidth > screenWidth ? screenWidth / rectWidth : 1;

    // Настройка размеров холста
    canvas.width = rectWidth * scale;
    canvas.height = (rectHeight + 100) * scale + 100; // Добавляем место для текста под холстом и отступ сверху

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Масштабируем контекст рисования
    ctx.scale(scale, scale);

    // Отступ сверху
    const topOffset = 100;

    // Рисуем основной прямоугольник (изголовье)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2 / scale; // Чтобы линия оставалась четкой после масштабирования
    ctx.strokeRect(0, topOffset, rectWidth, rectHeight);

    // Если цельное не отмечено, рисуем центральную линию
    if (!isWhole) {
        ctx.beginPath();
        ctx.moveTo(rectWidth / 2, topOffset);
        ctx.lineTo(rectWidth / 2, topOffset + rectHeight - bedThickness);
        ctx.stroke();

        // Вставляем текст "Изголовье-1" и "Изголовье-2" в центр прямоугольников
        ctx.fillStyle = 'black';
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Изголовье-1', rectWidth / 4, topOffset + headHeight / 2);

        ctx.fillText('Изголовье-2', rectWidth - rectWidth / 4, topOffset + headHeight / 2);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Изголовье', rectWidth / 2, topOffset + headHeight / 2);
    }

    // Рисуем контур дополнительного прямоугольника (основание кровати) снизу изголовья и по центру
    const bedRectX = (rectWidth - bedRectWidth) / 2; // Центрируем по горизонтали
    const bedRectY = topOffset + rectHeight - bedRectHeight; // Располагаем снизу внутри изголовья
    ctx.strokeRect(bedRectX, bedRectY, bedRectWidth, bedRectHeight); // Рисуем рамку прямоугольника

    // Вставляем текст "Подиум" в центр дополнительного прямоугольника
    ctx.fillStyle = 'black';
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Подиум', bedRectX + bedRectWidth / 2, bedRectY + bedRectHeight / 2);

    // Добавляем размеры
    ctx.fillStyle = 'black';
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';

    // Ширина кровати (внизу второго прямоугольника)
    ctx.fillText(`${bedWidth} мм`, bedRectX + bedRectWidth / 2, topOffset + rectHeight - 20);

    // Ширина изголовья (внутри прямоугольника, по центру)
    ctx.fillText(`${rectWidth} мм`, rectWidth / 2, topOffset - 20);

    // Высота изголовья (внутри прямоугольника, по центру)
    ctx.save();
    ctx.translate(25, topOffset + rectHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(`${rectHeight} мм`, 0, 0);
    ctx.restore();
}










