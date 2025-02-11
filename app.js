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

    function sortearAmigo() {
        if (listaDeAmigos.length < 2) {
            alert('É necessário pelo menos dois participantes para o sorteio.');
            return;
        }

        let participantes = [...listaDeAmigos];
        let sorteados = [...listaDeAmigos]; // Lista dos sorteados
        let resultado = [];

        for (let i = 0; i < participantes.length; i++) {
            let possiveisSorteios = sorteados.filter(nome => nome !== participantes[i]);

            if (possiveisSorteios.length === 0) {
                // Se chegou a um ponto sem opções, reinicia o sorteio
                return sortearAmigo();
            }

            let indiceSorteado = Math.floor(Math.random() * possiveisSorteios.length);
            let amigoSorteado = possiveisSorteios[indiceSorteado];

            resultado.push({ participante: participantes[i], amigoSecreto: amigoSorteado });

            // Remove o sorteado da lista para não ser escolhido novamente
            sorteados.splice(sorteados.indexOf(amigoSorteado), 1);
        }

        exibirResultado(resultado);
    }

    function exibirResultado(resultado) {
        let listaResultado = document.getElementById('resultado');
        listaResultado.innerHTML = ''; // Limpa a lista antes de atualizar

        resultado.forEach(par => {
            let li = document.createElement('li');
            li.textContent = `${par.participante} → ${par.amigoSecreto}`;
            listaResultado.appendChild(li);
        });
    }

    // Adiciona eventos aos botões
    document.querySelector('.button-add').addEventListener('click', adicionarAmigo);
    document.querySelector('.button-draw').addEventListener('click', sortearAmigo);
});
