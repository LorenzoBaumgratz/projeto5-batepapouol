function chat(){
    const x=axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    x.then(respostaChat);
}

let y=document.querySelector('.conteudo');

function respostaChat(resposta){
    console.log(resposta);
    
    for(let i=0; i<resposta.data.length;i++){

        let horario=resposta.data[i].time;
        let from=resposta.data[i].from;
        let to=resposta.data[i].to;
        let txt=resposta.data[i].text;

        
        if(resposta.data[i].type=='status'){
    
        y.innerHTML+=`
        <div data-test="message" class="tela status">
            <div class="texto">
                <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
            </div>
        </div>    
        `
        }

        if(resposta.data[i].type=="message"){

        y.innerHTML+=`
        <div data-test="message" class="tela normal">
            <div class="texto">
                <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
            </div>
        </div>    
        `
        }

        if(resposta.data[i].type=="private_message"){
            if(MeuNomeprompt==from || MeuNomeprompt==to){
            y.innerHTML+=`
            <div data-test="message" class="tela reservada">
                <div class="texto">
                    <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
                </div>
            </div>    
            `
            }
        }
    }
    y.innerHTML+=`<div class="auxiliar"> </div>`
    document.querySelectorAll(".auxiliar").scrollIntoView();
}

function entrarSala(){
    const promise=axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',MeuNomeOBJ);
    promise.then(Continua);
    promise.catch(nomeExistente);
}

function Continua(resposta){
    setInterval(chat,3000);
    setInterval(ficarLogado,5000);
}

function ficarLogado(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',MeuNomeOBJ);
}

function nomeExistente(x){
    console.log(x);
    MeuNome=prompt("Nome existente,tente novamente");
    entrarSala();
}

function enviarMsg(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',)
}

const MeuNomeprompt=prompt('Qual o seu nome?');
const MeuNomeOBJ={name:MeuNomeprompt};

entrarSala();


