let domande = [];
let indiceAttuale = 0;
let risposteDate = [];

// 1. Carichiamo i dati
fetch('domande.json')
    .then(response => response.json())
    .then(data => {
        domande = data;
        // Mettiamo il brano nella prima schermata
        document.getElementById('testo-pieno').innerText = domande[0].brano;
    })
    .catch(err => {
        document.getElementById('testo-pieno').innerHTML = "<span style='color:red'>Errore: Assicurati che il file domande.json sia caricato correttamente su GitHub.</span>";
    });

// 2. Passaggio alla fase quiz
function iniziaQuiz() {
    document.getElementById('schermata-lettura').classList.add('hidden');
    document.getElementById('schermata-quiz').classList.remove('hidden');
    mostraDomanda();
}

// 3. Mostra la domanda corrente
function mostraDomanda() {
    const d = domande[indiceAttuale];
    document.getElementById('box-brano').innerText = d.brano;
    document.getElementById('numero-domanda').innerText = `Domanda ${indiceAttuale + 1} di ${domande.length}`;
    document.getElementById('testo-domanda').innerText = d.testo;

    const contenitoreOpzioni = document.getElementById('lista-opzioni');
    contenitoreOpzioni.innerHTML = '';

    d.opzioni.forEach((opt, i) => {
        contenitoreOpzioni.innerHTML += `
            <div class="opzione-item">
                <input type="radio" name="scelta" id="opt${i}" value="${i}">
                <label for="opt${i}">${opt}</label>
            </div>
        `;
    });

    const controlli = document.getElementById('controlli');
    if (indiceAttuale === domande.length - 1) {
        controlli.innerHTML = `<button onclick="mostraRisultato()">CONCLUDI E VEDI PUNTEGGIO</button>`;
    } else {
        controlli.innerHTML = `<button onclick="prossima()">PROSSIMA DOMANDA</button>`;
    }
}

// 4. Salva risposta e vai avanti
function prossima() {
    salvaRisposta();
    indiceAttuale++;
    mostraDomanda();
}

function salvaRisposta() {
    const selezionata = document.querySelector('input[name="scelta"]:checked');
    if (selezionata) {
        risposteDate[indiceAttuale] = parseInt(selezionata.value);
    } else {
        risposteDate[indiceAttuale] = null;
    }
}

// 5. Calcolo finale
function mostraRisultato() {
    salvaRisposta();
    let punteggio = 0;
    domande.forEach((domanda, i) => {
        if (risposteDate[i] === domanda.corretta) {
            punteggio++;
        }
    });

    const app = document.getElementById('app-container');
    app.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <h1 style="color: #1a73e8;">Test Concluso!</h1>
            <p style="font-size: 24px;">Hai risposto correttamente a:</p>
            <div style="font-size: 60px; font-weight: bold; color: #34a853; margin: 20px 0;">
                ${punteggio} / ${domande.length}
            </div>
            <p style="font-size: 18px; color: #666;">Punteggio percentuale: ${(punteggio/domande.length)*100}%</p>
            <button onclick="location.reload()" style="margin-top: 30px;">RIPROVA IL TEST</button>
        </div>
    `;
}