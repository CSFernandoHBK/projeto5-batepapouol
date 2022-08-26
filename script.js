//declaração das variáveis globais
let mensagem;

//ao entrar, pergunta o nome do usuario
const nome = prompt("Qual seu nome?")

//entrada na sala
function entradaSala(){
    const objNome = {name: nome};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',objNome);
    promessa.then
}

entradaSala();

//array de objetos mensagens
let mensagensRecebidas = [];

//recebendo as mensagens do servidor
function receberMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarMensagensRecebidas);
}

function processarMensagensRecebidas(resposta) {
	mensagensRecebidas = resposta.data;
    renderizarMensagens(mensagensRecebidas);
}

receberMensagens();

setInterval(limparMensagens, 3000);
setInterval(receberMensagens, 3000);

//construção da mensagem no padrão chat - utilizada dentro de renderizarMensagens 
function construirMensagem(i){
    if(mensagensRecebidas[i].type === "status"){
        mensagem = `<li class="msg-status"><b class="hora">${mensagensRecebidas[i].time}</b><b>${mensagensRecebidas[i].from}</b> ${mensagensRecebidas[i].text}</li>`
    } else if(mensagensRecebidas[i].type === "message"){
        mensagem = `<li class="msg-normal"><b class="hora">${mensagensRecebidas[i].time}</b> <b>${mensagensRecebidas[i].from}</b> para <b>${mensagensRecebidas[i].to}</b>: ${mensagensRecebidas[i].text}</li>`
    } else {
        mensagem = `<li class="msg-reservada"><b class="hora">${mensagensRecebidas[i].time}</b> <b>${mensagensRecebidas[i].from}</b> reservadamente para <b>${mensagensRecebidas[i].to}</b>: ${mensagensRecebidas[i].text}</li>`
    }
    return mensagem;
}

//renderizar mensagens

function renderizarMensagens(mensagensRecebidas){
    const ul = document.querySelector(".ul-msg");
    console.log(ul.innerHTML);
    for(let i = 0; i<mensagensRecebidas.length;i++){
        let msgConstruida = construirMensagem(i);
        ul.innerHTML = ul.innerHTML + msgConstruida;
    }
}

//limpar mensagens anteriores

function limparMensagens(){
    msgsAnteriores = document.querySelector(".ul-msg");
    msgsAnteriores.innerHTML = "";
}
