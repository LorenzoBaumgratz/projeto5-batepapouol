function chat(){
    const x=axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    x.then(respostaChat);
}

let y=document.querySelector('.conteudo');

function respostaChat(resposta){
    console.log(resposta);
    y.innerHTML='';
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

    y.innerHTML+=`<div class="auxiliar"> </div>`;
    document.querySelector(".auxiliar").scrollIntoView(true);
   
}

function entrarSala(){
    MeuNomeOBJ={name:MeuNomeprompt};
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
    axios.catch(recarregar);
}

function nomeExistente(x){
    MeuNomeprompt=prompt("Nome existente,tente novamente");
    entrarSala();
}

function recarregar(resposta){
    location.reload(true);
}

function enviarMsg(){
    let inputTXT=document.querySelector("input").value;
    console.log(inputTXT);
    let send={
        from: MeuNomeprompt,
        to: "Todos",
        text: inputTXT,
        type: "message" // ou "private_message" para o b??nus
    }
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',send)
}

let MeuNomeprompt=prompt('Qual o seu nome?');
let MeuNomeOBJ;

entrarSala();


