document.addEventListener('DOMContentLoaded', function () {
    let listaDeAmigos = [];

    function exibirListaAmigos() {
        let lista = document.getElementById('listaAmigos');
        lista.innerHTML = ''; // Limpa a lista antes de atualizar
        listaDeAmigos.forEach(amigo => {
            let li = document.createElement('li');
            li.textContent = amigo;
            lista.appendChild(li);
        });
    }

    function adicionarAmigo() {
        let nome = document.getElementById('amigo').value.trim();
        if (nome === "") {
            alert('Por favor, insira um nome válido.');
            return;
        }
        if (listaDeAmigos.includes(nome)) {
            alert('Este nome já foi adicionado!');
            return;
        }
        listaDeAmigos.push(nome);
        exibirListaAmigos();
        document.getElementById('amigo').value = ''; // Limpa o campo
    }

    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function sortearAmigo() {
        if (listaDeAmigos.length < 2) {
            alert('É necessário pelo menos dois participantes para o sorteio.');
            return;
        }

        let participantesEmbaralhados;
        let valido = false;

        // Tenta embaralhar até garantir que ninguém tirou a si mesmo
        while (!valido) {
            participantesEmbaralhados = [...listaDeAmigos];
            embaralhar(participantesEmbaralhados);

            valido = true;
            for (let i = 0; i < listaDeAmigos.length; i++) {
                if (listaDeAmigos[i] === participantesEmbaralhados[i]) {
                    valido = false;
                    break;
                }
            }
        }

        exibirResultado(participantesEmbaralhados);
    }

    function exibirResultado(participantesEmbaralhados) {
        let resultado = document.getElementById('resultado');
        resultado.innerHTML = ''; // Limpa a lista antes de atualizar

        for (let i = 0; i < listaDeAmigos.length; i++) {
            let li = document.createElement('li');
            li.textContent = `${listaDeAmigos[i]} → ${participantesEmbaralhados[i]}`;
            resultado.appendChild(li);
        }
    }

    // Adiciona eventos aos botões
    document.querySelector('.button-add').addEventListener('click', adicionarAmigo);
    document.querySelector('.button-draw').addEventListener('click', sortearAmigo);
});
