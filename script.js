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
        <div class="tela status">
            <div class="texto">
                <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
            </div>
        </div>    
        `
        }

        if(resposta.data[i].type=="message"){

        y.innerHTML+=`
        <div class="tela normal">
            <div class="texto">
                <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
            </div>
        </div>    
        `
        }

        if(resposta.data[i].type=="private_message"){

        y.innerHTML+=`
        <div class="tela reservada">
            <div class="texto">
                <span class="hora">${horario}</span> <span class="nome">${from}</span> <span>para</span> <span class="nome">${to}</span><span>: ${txt}</span>
            </div>
        </div>    
        `
        }
    }
    //document.querySelectorAll(".tela").scrollIntoView;
}

chat();