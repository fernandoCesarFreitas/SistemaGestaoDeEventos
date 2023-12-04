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





 

    