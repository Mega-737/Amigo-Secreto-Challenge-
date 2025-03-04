let participantes = [];
let sorteados = new Set();

// Função para formatar nome (primeira letra maiúscula)
function formatarNome(nome) {
    return nome.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());
}

// Função para verificar entrada e habilitar o botão
function verificarEntrada() {
    let nomeInput = document.getElementById("amigo");
    let botaoAdicionar = document.querySelector(".button-add");
    let nome = nomeInput.value.trim(); // Definição correta da variável nome

    // Valida apenas letras do alfabeto
    let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    botaoAdicionar.disabled = !regex.test(nome) || nome === "";
}

// Função para adicionar um participante
function adicionarAmigo() {
    let nomeInput = document.getElementById("amigo");
    let mensagemErro = document.getElementById("mensagemErro"); // Obtém o elemento de erro
    let nome = formatarNome(nomeInput.value.trim());

    // Verifica se o nome contém apenas letras e espaços
    if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)) {
        if (mensagemErro) {
            mensagemErro.textContent = "Digite um nome válido!";
        }
        console.log("Nome inválido! Digite um nome válido.");
        return;
    }
    if (participantes.includes(nome)) {          // Verifica se o nome já foi adicionado
        if (mensagemErro) {
           let mensagemErro = "Este nome já foi adicionado.";
           resultado.innerHTML = mensagemErro;
        falarTexto(mensagemErro); // Lendo a mensagem em voz alta
        }
        console.log("Este nome já foi adicionado!");
        return;
    }

    if (mensagemErro) {
        mensagemErro.textContent = ""; // Limpa mensagem de erro
    }
    participantes.push(nome);
    console.log(`Nome adicionado: ${nome}`);
    nomeInput.value = "";
    
    // Atualiza a lista na interface
    atualizarListaAmigos();
    verificarEntrada();   // Desabilita o botão após adicionar
}

// Função para atualizar a lista de amigos no console
function atualizarListaAmigos() {
    console.log("Lista de participantes atualizada:", participantes);
}

// Função para detectar gênero pelo nome
function detectarGenero(nome) {
    let sufixosFemininos = ["a", "e", "i"];
    return sufixosFemininos.includes(nome.slice(-1).toLowerCase()) ? "A amiga sorteada é" : "O amigo sorteado é";
}

// Função para fazer a leitura em voz alta
function falarTexto(texto) {
    let sintese = window.speechSynthesis;
    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    sintese.speak(fala);
}

// Função para sortear um participante
function sortearAmigo() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (participantes.length === 0) {
        let mensagem = "Nenhum nome na lista para sortear!";
        console.log(mensagem);
        resultado.innerHTML = mensagem;
        falarTexto(mensagem);
        return;
    }

    if (sorteados.size === participantes.length) {
        let mensagem = "Todos os participantes já foram sorteados!";
        console.log(mensagem);
        resultado.innerHTML = mensagem;
        falarTexto(mensagem); // Lendo a mensagem em voz alta
    
        // Exibir mensagem final após 5 segundos
        setTimeout(() => {
        let mensagemFinal = "Agradecemos a sua participação. Até a próxima!";
        console.log(mensagemFinal);
        resultado.innerHTML = mensagemFinal;
        falarTexto(mensagemFinal);
        }, 5000);
        return; // Mantemos este return para evitar que continue a execução desnecessária
    }


    let sorteado;
    do {
        let indice = Math.floor(Math.random() * participantes.length);
        sorteado = participantes[indice];
    } while (sorteados.has(sorteado));

    sorteados.add(sorteado);
    let mensagem = `${detectarGenero(sorteado)} ${sorteado}`;
    console.log(`Sorteado: ${sorteado}`);
    resultado.innerHTML = mensagem;
    falarTexto(mensagem);
}

// Adiciona evento para ativar botão apenas quando há entrada válida
document.getElementById("amigo").addEventListener("input", verificarEntrada);
document.querySelector(".button-add").disabled = true;