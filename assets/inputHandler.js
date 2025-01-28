function readFile(file) {
    const reader = new FileReader();
    reader.onload = async function () {
        handleResult(reader.result);
    };
    reader.readAsText(file, 'UTF-8');
};

async function handleResult(txt) {
    const regex = new RegExp(/(\[\[)[a-zA-Z0-9\s]+(\]\])/g)
    let matches = txt.match(regex)
    txt = txt.replaceAll(regex,`<input type="text" class="inputText">`)
    txt = txt.replaceAll(/(?:\r\n|\r|\n)/g, "<br>");

    const idx = await new Promise((resolve) => {
        document.querySelector('#output').innerHTML = txt;
        resolve(matches);
    });
    document.querySelectorAll('.inputText').forEach((ele, i) => {
        ele.id = 'textInput_' + (i + 1);
        ele.placeholder = idx[i];
    });
};

document.querySelector('#fileInput').addEventListener('change', function(e) {
    if (e.target.files[0]) {
        document.querySelector('#welcome').style.display = 'none';
        document.querySelector('#interact').style.display = '';
        readFile(e.target.files[0])
    }
});

document.querySelector('#textInput').addEventListener('input', function(e) {
    document.querySelector('#welcome').style.display = 'none';
    document.querySelector('#interact').style.display = '';
    handleResult(e.target.value)
});