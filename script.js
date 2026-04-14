let domande = [];
let indice = 0;

fetch('domande.json')
    .then(r => r.json())
    .then(data => {
        domande = data;
        mostra();
    });

function mostra() {
    const d = domande[indice];
    document.getElementById('brano').innerText = d.brano;
    document.getElementById('domanda').innerText = d.testo;
    const divOpt = document.getElementById('opzioni');
    divOpt.innerHTML = '';
    d.opzioni.forEach((o, i) => {
        divOpt.innerHTML += `<p><input type="radio" name="risp" value="${i}"> ${o}</p>`;
    });
}

function prossima() {
    if (indice < domande.length - 1) {
        indice++;
        mostra();
    } else {
        alert("Test completato!");
    }
}