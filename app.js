document.addEventListener('DOMContentLoaded', function() {
    let listaDeAmigos = [];
    let amigosSecretos = [];

    function exibirListaAmigos() {
        let lista = document.getElementById('listaAmigos');
        lista.innerHTML = ''; // Limpa a lista antes de adicionar os novos elementos
        listaDeAmigos.forEach(amigo => {
            let li = document.createElement('li');
            li.textContent = amigo;
            lista.appendChild(li);
        });
    }

    function adicionarAmigo() {
        let nome = document.getElementById('amigo').value.trim();
        if (nome === "") {
            alert('Por favor, insira um nome válido');
            return;
        }
        if (listaDeAmigos.includes(nome)) {
            alert('Este nome já foi adicionado!');
            return;
        }
        listaDeAmigos.push(nome);
        exibirListaAmigos();
        document.getElementById('amigo').value = '';
    }

    function sortearAmigo() {
        if (listaDeAmigos.length < 2) {
            alert('É necessário pelo menos dois participantes para o sorteio.');
            return;
        }

        let participantesEmbaralhados = [...listaDeAmigos];

        // Embaralha a lista (algoritmo Fisher-Yates)
        for (let i = participantesEmbaralhados.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [participantesEmbaralhados[i], participantesEmbaralhados[j]] = [participantesEmbaralhados[j], participantesEmbaralhados[i]];
        }

        amigosSecretos = [];
        for (let i = 0; i < listaDeAmigos.length; i++) {
            let amigoSecreto = participantesEmbaralhados[(i + 1) % participantesEmbaralhados.length];
            amigosSecretos.push({
                participante: listaDeAmigos[i],
                amigoSecreto: amigoSecreto
            });
        }

        exibirResultado();
    }

    function exibirResultado() {
        let resultadoHTML = '';
        amigosSecretos.forEach(par => {
            resultadoHTML += `<p>${par.participante} tirou ${par.amigoSecreto}</p>`;
        });
        document.getElementById('resultado').innerHTML = resultadoHTML;
    }

    // Adiciona eventos aos botões
    document.querySelector('.button-add').addEventListener('click', adicionarAmigo);
    document.querySelector('.button-draw').addEventListener('click', sortearAmigo);

    // Adiciona eventos para o teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
        } else if (event.key === ' ' && document.activeElement !== document.getElementById('amigo')) {
            event.preventDefault(); // Evita que a página role ao pressionar espaço
            sortearAmigo();
        }
    });
});