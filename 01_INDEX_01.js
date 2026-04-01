let title = document.querySelector(".title");
let firstnumber = document.querySelector(`#firstnumber`);
let secondnumber = document.querySelector(`#secondnumber`);
let thirdnumber = document.querySelector(`#thirdnumber`);

let check = false;
let confirm = true;

// HEADER LOOP ORIZZONTALE
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

// CHIAMATE ASINCRONE
    // CREARE LOOP PER CONTEGGIO
        // createInterval()
    function createInterval(n, element, time){
        let counter = 0;

        // setInterval() e clearInterval()
        let interval = setInterval(()=>{
        if(counter < n){
        counter ++
        element.innerHTML = counter
        }else{
        clearInterval(interval);
        }
        }, time);

        // setTimeout()
        // per non far impazzire il conteggio
        // fammi tornare confirm true dopo 8 secondi 
        setTimeout(()=>{
        // il valore di confirm deve essere truty
            confirm = true;
            }, 8000)
        };

    // EVENTO - IntersectionObserver (fai scattare l'evento nel momento in cui vedo l'elemento)
            let observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                // inIntersecting - se hai incontrato l'elemento "entry" fa i scattare..
                // seconda condizione per non far scattare sempre la funzione
                if(entry.isIntersecting && confirm){
                    // lancia la funzione 
                    createInterval(100, firstnumber, 100);
                    createInterval(200, secondnumber, 50);
                    createInterval(300, thirdnumber, 30);
                    // confirm = false; il ciclo si ferma è falsy
                    confirm = false;
                }
            });
        });

        // metodo .observe() dell'oggetto observer creato con "IntersectionObserver" - 
        // Fa scattare nel momento in cui si incontra l'elemento.
        observer.observe(firstnumber);
