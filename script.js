//declaração das variáveis globais
let mensagem;

//funcao global: mostrar retorno da requisicao
function mostrarRetorno(resposta){
    console.log(resposta.status);
}

//ao entrar, pergunta o nome do usuario
const nome = prompt("Qual seu nome?");
const objNome = {name: nome};

//entrada na sala
function entradaSala(){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',objNome);
    promessa.catch(tratarErroNome);
}

//tratar erro de entrada
function tratarErroNome(){
    alert("Nome inválido! Por favor, insira outro nome");
    window.location.reload();
}

entradaSala();

//manter conexão
function manterConexao(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',objNome);
}

setInterval(manterConexao, 5000);

//tratar erro geral
function tratarErroGeral(){
    alert("Erro! Favor, recarregue a página!");
    window.location.reload();
}

//array de objetos mensagens
let mensagensRecebidas = [];

//recebendo as mensagens do servidor
function receberMensagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarMensagensRecebidas);
    promessa.catch(tratarErroGeral);
}

function processarMensagensRecebidas(resposta) {
    limparMensagens();
	mensagensRecebidas = resposta.data;
    renderizarMensagens(mensagensRecebidas);
}

setInterval(receberMensagens, 3000)

//construção da mensagem no padrão chat - utilizada dentro de renderizarMensagens 
function construirMensagem(i){
    if(mensagensRecebidas[i].type === "status"){
        mensagem = `<li class="msg-status msg${i}">
        <b class="hora">${mensagensRecebidas[i].time}</b>
        <b>${mensagensRecebidas[i].from}</b>
        ${mensagensRecebidas[i].text}
        </li>`
    } else if(mensagensRecebidas[i].type === "message"){
        mensagem = `<li class="msg-normal msg${i}">
        <b class="hora">${mensagensRecebidas[i].time}</b>
        <b>${mensagensRecebidas[i].from}</b>
         para 
         <b>${mensagensRecebidas[i].to}</b>: 
         ${mensagensRecebidas[i].text}
         </li>`
    } else {
        mensagem = `<li class="msg-reservada msg${i}">
        <b class="hora">${mensagensRecebidas[i].time}</b> 
        <b>${mensagensRecebidas[i].from}</b>
         reservadamente para 
        <b>${mensagensRecebidas[i].to}</b>: 
        ${mensagensRecebidas[i].text}</li>`
    }
    return mensagem;
}

//renderizar mensagens
function renderizarMensagens(mensagensRecebidas){
    const ul = document.querySelector(".ul-msg");
    for(let i = 0; i<mensagensRecebidas.length;i++){
        let msgConstruida = construirMensagem(i);
        ul.innerHTML = ul.innerHTML + msgConstruida;
    }
    const ultimoElemento = document.querySelector(".msg99")
    ultimoElemento.scrollIntoView();
    ultimoElemento.classList.remove("msg99")
}

//limpar mensagens anteriores
function limparMensagens(){
    msgsAnteriores = document.querySelector(".ul-msg");
    msgsAnteriores.innerHTML = "";
}

//enviar mensagem
function enviarMensagem(){
    let msgEscrita = document.querySelector(".texto-mensagem").value;
    const objMsg = {
        from: nome,
        to: "Todos",
        text: msgEscrita,
        type: "message"
    }
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',objMsg);
    promessa.catch(tratarErroGeral);
    document.querySelector(".texto-mensagem").value = "";
}

//abrir menu lateral
function abrirMenu(){
    let aba = document.querySelector(".lateral-geral")
    aba.classList.toggle("escondido");
    aba.classList.toggle("emcima");
}