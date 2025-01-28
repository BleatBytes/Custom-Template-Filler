document.querySelector('#copyOutput').addEventListener('click', handleOutput);

async function handleOutput() {
    const ele = document.querySelector('#output');

    let result = document.createElement('div');
    result.id = 'result';
    result.style.display = 'none';
    result.innerHTML = ele.innerHTML;
    ele.append(result);

    const inputEles = Array.from(document.querySelectorAll('#output .inputText'));

    const txt = await new Promise((resolve) => {
        document.querySelectorAll('#result .inputText').forEach((input, i) => {
            input.insertAdjacentText('afterend', inputEles[i].value);
            input.parentElement.removeChild(input);
        });
        document.querySelectorAll('#result br').forEach(br => {
            br.insertAdjacentText('afterend', '\n');
            br.parentElement.removeChild(br);
        });

        resolve(result.textContent || result.innerText);
    });

    navigator.clipboard.writeText(txt);
    ele.removeChild(result);
};