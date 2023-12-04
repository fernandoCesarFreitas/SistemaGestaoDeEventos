let count = 1;

document.getElementById("radio1").checked = true;

setInterval (function() {
    nextImage();
}, 5000)

function nextImage() {
    count ++;
    if(count > 5) {
        count = 1;
    }

document.getElementById("radio" + count).checked = true;
}

$(document).ready(function(){
    // Configurações para o carrossel
    $('#carouselExample').carousel({
        interval: 2000, // Intervalo de 2 segundos entre os slides
        pause: 'hover', // Pausar quando o mouse estiver sobre o carrossel
        wrap: true // Retornar ao primeiro slide após o último
    });
});



const storedUser = JSON.parse(localStorage.getItem('usuario'));
console.log(storedUser);

document.addEventListener('DOMContentLoaded', async function () {
    // Aqui você pode adicionar o código para obter o usuário do localStorage
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    // Verificar se o usuário está logado e se é um administrador
    if (user && user.admin) {
      // Mostrar o botão Config
      document.getElementById('configButtonContainer').style.display = 'block';
  
      // Adicionar um evento de clique ao botão Config (opcional)
      document.getElementById('configButton').addEventListener('click', function () {
        // Adicione aqui o código que você deseja executar quando o botão Config é clicado
        alert('Configurações!');
      });
    }
  });

 

    