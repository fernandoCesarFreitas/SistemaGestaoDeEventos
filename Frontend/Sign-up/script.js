const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let authorization = localStorage.getItem('authorization'); //busca o token do localStorage

if (!authorization) {
  window.location.href = 'login.html'; //se nao tiver volta para a atela de login
}


let nome = document.getElementById("nome");
let cpf = document.getElementById("cpf");
let genero = getSelectedGender();
let dataNascimento = document.getElementById("dataNascimento");
let email = document.getElementById("email");
let endereco = document.getElementById('endereco');
let numero = document.getElementById('numero');
let bairro = document.getElementById('bairro');
let cidade = document.getElementById('cidade');
let estado = document.getElementById('estado');
let complemento = document.getElementById('complemento');
let telefone = document.getElementById('telefone');
let senha = document.getElementById('senha');
let senhaConfirmada = document.getElementById('senhaConfirmada');
let form = document.getElementById('formulario');


// async function buscarDados(){
//     let resposta = await fetch('http://localhost:3000/usuarios/'+id,{
//         headers: {
//             'Content-Type': 'application/json', //o que esta enviando
//             'Accept': 'application/json', //o que ira aceitar receber
//             'Authorization': authorization, // passamos o authorization junto com o header
//           },
//     });
//     if(resposta.ok){
//         let usuario = await resposta.json();
//         nome.value =  usuario.nome;
//         email.value = usuario.email;
//         senha.value = usuario.senha;
//     }else if(resposta.status===422){
//         let e = await resposta.json();
//         alert(e.error);
//     }else {
//         alert('Ops! algo deu errado');
//     }
// }

// if(id){
//     buscarDados();
// }

form.addEventListener('submit', async (event) => {
    event.stopPropagation();//para nao recarregar a pagina
    event.preventDefault();

    if(senha.value !== senhaConfirmada.value){
        alert('As senhas não conferem');
        return;
    }

    let payload = {
        nome: nome.value,
        cpf: cpf.value,
         genero : await getSelectedGender(),
        dataNascimento: dataNascimento.value,
        email: email.value,
        endereco: endereco.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        complemento: complemento.value,
        telefone: telefone.value,
        senha: senha.value,
        
    }
    console.log(payload);
    let url = 'http://localhost:3000/usuarios';
    let method = 'post';

    if(id) {
        url+='/'+id;
        method = 'put';
    }

    let resposta = await fetch(url, {
        method,//pode ser maiusculo ou minusculo
        headers: {
            'Content-Type': 'application/json',//o que esta enviando
            'Accept': 'application/json',//o que ira aceitar receber
            'Authorization': authorization,
        },
        body: JSON.stringify(payload)//converte o Json para texto
    });

    if (resposta.ok) {// .ok 
        alert('Usuário salvo com sucesso!')
        window.location.href = 'index.html' //redireciona á pagina principal
    } else {
        alert('Ops, algo deu errado');
    }
});

function getSelectedGender() {
    // Retorna o valor do gênero do radio button selecionado
    let radios = document.getElementsByName('genero');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            return radios[i].value;
        }
    }
    return null; // Retorna null se nenhum radio button estiver selecionado
}



// document.getElementById('cancelBtn').addEventListener('click', function() {
//     document.getElementById('eventForm').reset();
// });
