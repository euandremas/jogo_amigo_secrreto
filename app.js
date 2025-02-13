document.addEventListener('DOMContentLoaded', function() { // Espera o documento HTML carregar completamente antes de executar o código JavaScript.
    let listaDeAmigos = []; // Essa array armazena os nomes dos participantes.
    let amigosSecretos = []; // Acredito ser mais interessante armazenar os pares de amigos secretos sorteados para aparecer quem tirou quem

    function exibirListaAmigos() { // Função para exibir a lista de amigos na página.
        let lista = document.getElementById('listaAmigos'); // Obtém a referência do elemento <ul> com o id "listaAmigos".
        lista.innerHTML = ''; // Limpa o conteúdo atual da lista.
        listaDeAmigos.forEach(amigo => { // Itera sobre cada amigo na listaDeAmigos.
            let li = document.createElement('li'); // Cria um novo elemento <li> para cada amigo.
            li.textContent = amigo; // Define o texto do <li> como o nome do amigo.
            lista.appendChild(li); // Adiciona o <li> à lista no HTML.
        });
    }

    function adicionarAmigo() { // Função para adicionar um novo amigo à lista.
        let nome = document.getElementById('amigo').value.trim(); // O trim obtém o nome digitado no input e remove espaços em branco extras.
        if (nome === "") { // Verifica se o nome é válido (não vazio).
            alert('Por favor, insira um nome válido'); // Exibe um alerta se o nome for inválido.
            return; // Sai da função se o nome for inválido.
        }
        if (listaDeAmigos.includes(nome)) { // Verifica se o nome já existe na lista.
            alert('Este nome já foi adicionado!'); // Exibe um alerta se o nome já existir.
            return; // Sai da função se o nome já existir.
        }
        listaDeAmigos.push(nome); // Adiciona o nome à lista de amigos.
        exibirListaAmigos(); // Atualiza a lista exibida na página.
        document.getElementById('amigo').value = ''; // Limpa o campo de entrada de nome.
    }

    function sortearAmigo() { // Função para realizar o sorteio dos amigos secretos.
        if (listaDeAmigos.length < 2) { // Verifica se há pelo menos dois participantes.
            alert('É necessário pelo menos dois participantes para o sorteio.'); // Exibe um alerta se não houver participantes suficientes.
            return; // Sai da função se não houver participantes suficientes.
        }

        let embaralhado = false;
        let participantesEmbaralhados;
        
        while (!embaralhado) {
            participantesEmbaralhados = [...listaDeAmigos]; // Cria uma cópia da lista de amigos para embaralhar.
            
            // Embaralha a lista (algoritmo Fisher-Yates)
            for (let i = participantesEmbaralhados.length - 1; i > 0; i--) { // Loop para embaralhar a lista.
                let j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório.
                [participantesEmbaralhados[i], participantesEmbaralhados[j]] = [participantesEmbaralhados[j], participantesEmbaralhados[i]]; // Troca os elementos de posição.
            }

            // Verifica se ninguém tirou a si mesmo
            embaralhado = participantesEmbaralhados.every((amigo, index) => amigo !== listaDeAmigos[index]);
        }

        amigosSecretos = []; // Reinicia a lista de amigos secretos.
        for (let i = 0; i < listaDeAmigos.length; i++) { // Loop para criar os pares de amigos secretos.
            amigosSecretos.push({ // Cria um objeto com o participante e seu amigo secreto.
                participante: listaDeAmigos[i],
                amigoSecreto: participantesEmbaralhados[i]
            });
        }

        exibirResultado(); // Exibe o resultado do sorteio na página.
    }

    function exibirResultado() { // Função para exibir o resultado do sorteio na página.
        let resultadoHTML = ''; // Inicializa uma string para armazenar o HTML do resultado.
        amigosSecretos.forEach(par => { // Itera sobre cada par de amigos secretos.
            resultadoHTML += `<p>${par.participante} tirou ${par.amigoSecreto}</p>`; // Adiciona o par ao HTML do resultado.
        });
        document.getElementById('resultado').innerHTML = resultadoHTML; // Define o HTML do elemento <ul> com o id "resultado".
    }

    // Adiciona eventos aos botões
    document.querySelector('.button-add').addEventListener('click', adicionarAmigo); // Adiciona um evento de clique ao botão "Adicionar" para chamar a função adicionarAmigo.
    document.querySelector('.button-draw').addEventListener('click', sortearAmigo); // Adiciona um evento de clique ao botão "Sortear" para chamar a função sortearAmigo.

    // Fica mais interessante usar o enter e a barra de espaço para controlar o jogo
    document.addEventListener('keydown', function(event) { // Adiciona um evento de tecla pressionada ao documento.
        if (event.key === 'Enter') { // Verifica se a tecla pressionada foi "Enter".
            adicionarAmigo(); // Chama a função adicionarAmigo se a tecla for "Enter".
        } else if (event.key === ' ' && document.activeElement !== document.getElementById('amigo')) { // Verifica se a tecla pressionada foi "Espaço" e o foco não está no input.
            event.preventDefault(); // Previne o comportamento padrão da tecla "Espaço" (rolar a página).
            sortearAmigo(); // Chama a função sortearAmigo se a tecla for "Espaço".
        }
    });
});
