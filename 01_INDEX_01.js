let title = document.querySelector(".title");

// header loop orizzontale
title.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + title.innerHTML;
let x = 0;
    function anima() {
        x -= 3;
        if (Math.abs(x) >= title.scrollWidth / 2) {
            x = 0;
        }
        title.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(anima);
    }

    // LANCIO FUNZIONE
    anima();
