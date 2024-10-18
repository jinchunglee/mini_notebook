// 初始化 Quill 編輯器
var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar-container'
    }
});

// 支援複製貼上圖片功能
document.querySelector('#editor-container').addEventListener('paste', function (e) {
    if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = function (event) {
                    const base64Image = event.target.result;
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', base64Image);
                };
                reader.readAsDataURL(blob);
            }
        }
    }
});

// 匯出 PDF 功能
document.getElementById('export-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const content = document.querySelector('#editor-container').innerHTML;
    
    doc.text(content, 10, 10);
    doc.save('memo.pdf');
});

// 拖拉功能
const editorBox = document.getElementById("editor-box");
let isDragging = false;
let offsetX, offsetY;

editorBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - editorBox.offsetLeft;
    offsetY = e.clientY - editorBox.offsetTop;
    editorBox.style.cursor = "move";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        editorBox.style.left = `${e.clientX - offsetX}px`;
        editorBox.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    editorBox.style.cursor = "default";
});
