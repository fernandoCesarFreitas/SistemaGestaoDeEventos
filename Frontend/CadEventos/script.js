const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let authorization = localStorage.getItem('authorization'); //busca o token do localStorage

if (!authorization) {
  window.location.href = 'login.html'; //se nao tiver volta para a atela de login
}


let nome = document.getElementById("name");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let time = document.getElementById("time");
let local = document.getElementById('location');
let description = document.getElementById('description');
let form = document.getElementById('eventForm');

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

    let payload = {
        nome: nome.value,
        dataInicio: startDate.value,
        dataFim: endDate.value,
        hora: time.value,
        local: local.value,
        descricao: description.value
    }
    console.log(payload);
    let url = 'http://localhost:3000/eventos';
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




document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('eventForm').reset();
});
