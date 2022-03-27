var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

var slider = document.getElementById("slider");
var color = document.getElementById("colorPicker");

var mode = "brush";
var init_pos_x = 0;
var init_pos_y = 0;

var imageSteps = [];
var undoCount = 0;

/*ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);*/

function init() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageSteps.push(imageData);
}

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect(); //getBoundingClientRect 取得物件完整座標資訊，包含寬高等
  return {x: event.clientX - rect.left, y: event.clientY - rect.top};  
};

function mouseMove(event) {
    var mousePos = getMousePosition(canvas, event);
    //透過getMousePos function 去取得滑鼠座標
    //mousePos 是一個物件，包含x和y的值
    ctx.lineWidth = slider.value;
    ctx.lineTo(mousePos.x, mousePos.y);
    //利用取回的值畫線
    if(mode == "brush") {
        ctx.strokeStyle = color.value;
        ctx.stroke();
    } else if(mode == "erase") {
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.stroke();
    } else if(mode == "circle") {
        ctx.strokeStyle = color.value;
        drawCircle(mousePos.x, mousePos.y);
    } else if(mode == "triangle") {
        ctx.strokeStyle = color.value;
        drawTriangle(mousePos.x, mousePos.y);
    } else if(mode == "rectangle") {
        ctx.strokeStyle = color.value;
        drawRectangle(mousePos.x, mousePos.y);
    } else if(mode == "line") {
        ctx.strokeStyle = color.value;
        drawLine(mousePos.x, mousePos.y);
    }
  };

canvas.addEventListener('mousedown', function(event) {
    var mousePos = getMousePosition(canvas, event);
    console.log(`${mousePos.x}, ${mousePos.y}`);
    if(mode == "brush" || mode == "erase") {
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        canvas.addEventListener('mousemove', mouseMove, false);
    } else if(mode == "text") {
        typeText(mousePos.x, mousePos.y);
    } else if(mode == "circle" || mode == "triangle" || mode == "rectangle" || mode == "line") {
        init_pos_x = mousePos.x;
        init_pos_y = mousePos.y;
        canvas.addEventListener('mousemove', mouseMove, false);
    }
})

canvas.addEventListener('mouseup', function() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageSteps.push(imageData);
    canvas.removeEventListener('mousemove', mouseMove, false);
  }, false);

function brush() {
    document.getElementById('myCanvas').style.cursor = 'url("src/brush_cursor.png") 0 30, auto';
    //alert('clicked');
    //ctx.strokeStyle = color.value;
    ctx.globalCompositeOperation = 'source-over';
    mode = "brush";
};

function erase() {
    document.getElementById('myCanvas').style.cursor = 'url("src/eraser_cursor.png") 10 23, auto';
    //ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    //alert('clicked');
    ctx.globalCompositeOperation = 'destination-out';
    mode = "erase";
};

function text() {
    document.getElementById('myCanvas').style.cursor = 'text';
    mode = "text";
}

function typeText(x, y) {
    var rect = canvas.getBoundingClientRect();
    var inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "inputText";
    inputText.style.position = "absolute";
    inputText.style.left = `${x + rect.left}px`;
    inputText.style.top = `${y + rect.top}px`;
    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.appendChild(inputText);
    inputText.addEventListener("keydown", function(e) {
        if(e.key == 'Enter') {
            canvasContainer.removeChild(inputText);
            var font_size = document.getElementById('font_size');
            var font_family = document.getElementById('font_family');
            ctx.font = `${font_size.value}px ${font_family.value}`;
            ctx.fillText(inputText.value, x, y);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            imageSteps.push(imageData);
        }
    })
}

function circle() {
    document.getElementById('myCanvas').style.cursor = 'url("src/circle_cursor.png") 12 12, auto';
    mode = 'circle';
}

function drawCircle(x, y) {
    var imageData = imageSteps[imageSteps.length - 1];
    ctx.putImageData(imageData, 0, 0);
    ctx.beginPath();
    var radius_x = x - init_pos_x;
    var radius_y = y - init_pos_y;
    ctx.arc(init_pos_x, init_pos_y, Math.sqrt(radius_x * radius_x + radius_y * radius_y), 0, 2 * Math.PI);
    ctx.stroke();
}

function triangle() {
    document.getElementById('myCanvas').style.cursor = 'url("src/triangle_cursor.png") 12 12, auto';
    mode = 'triangle';
}

function drawTriangle(x, y) {
    var imageData = imageSteps[imageSteps.length - 1];
    ctx.putImageData(imageData, 0, 0);
    ctx.beginPath();
    ctx.moveTo(init_pos_x, init_pos_y);
    ctx.lineTo(x, y);
    ctx.lineTo((init_pos_x - x) * 2 + x, y);
    ctx.lineTo(init_pos_x, init_pos_y);
    ctx.stroke();
}

function rectangle() {
    document.getElementById('myCanvas').style.cursor = 'url("src/rectangle_cursor.png") 12 12, auto';
    mode = 'rectangle';
}

function drawRectangle(x, y) {
    var imageData = imageSteps[imageSteps.length - 1];
    ctx.putImageData(imageData, 0, 0);
    ctx.beginPath();
    ctx.strokeRect(init_pos_x, init_pos_y, x - init_pos_x, y - init_pos_y);
}

var uploader = document.getElementById('uploader');
uploader.addEventListener('change', upload, false);

function upload() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.files[0])
    fileReader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
    }
}

function line() {
    document.getElementById('myCanvas').style.cursor = 'url("src/line_cursor.png") 12 12, auto';
    mode = 'line';
}

function drawLine(x, y) {
    var imageData = imageSteps[imageSteps.length - 1];
    ctx.putImageData(imageData, 0, 0);
    ctx.beginPath();
    ctx.moveTo(init_pos_x, init_pos_y);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoCount = 0;
    imageSteps = [];
}

function undo() {
    if(undoCount < imageSteps.length - 1) {
        undoCount += 1;
        var imageData = imageSteps[imageSteps.length - 1 - undoCount];
        ctx.putImageData(imageData, 0, 0);
    }
}

function redo() {
    if(undoCount > 0) {
        undoCount -= 1;
        var imageData = imageSteps[imageSteps.length - 1 - undoCount];
        ctx.putImageData(imageData, 0, 0);
    }

}