let listaDeAmigos = []; // Array para armazenar os nomes dos participantes do amigo secreto
let amigosSecretos = []; // Acredito ser mais interessante combinar os participantes então criei essa array para armazenar os pares de amigos secretos sorteados

// Função para exibir texto em elementos HTML
function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    }
    
// Função para adicionar um amigo à lista de participantes
function adicionarAmigo() { 

    // Pega o nome do amigo do campo de entrada e remove espaços em branco extras que poderiam causar duplicidade caso espaços forem inseridos antes ou depois do nome. Para isso inseri o .trim()
    let nome = document.getElementById('amigo').value.trim();
    console.log('click button');
    
    if (nome === "") {
    alert('Por favor, insira um nome válido');
    return;
}
listaDeAmigos.push(nome);
console.log(`Amigo adicionado: ${nome}`);
}

