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

// Chiamata asincrona che permette di accedere ad un determinato database di oggetti che possiamo prelevare e utilizzarli

// .json - javascript object notification - formato per contenere dati complessi convertito in scringa. Quindi dobbiamo prendere il contenuto di .json e convertirlo in un oggetto

// CHIAMATA ASINCRONA
// fetch(): collega il .json e da esso estrarne il dato sotto forma di "promis".
// .then(): metodo che permette di convertire la "promis" nel dato strutturale (oggetto) e di poterlo utilizzare come tale su JS. 
// un .then() lo converte e il secondo punto .then() lo utilizza

// Possiamo collegarci anche a .json online attraverso API (chiavi che ci permettono di raggiungere un .json online)

// PASSAGGI
// 1. fetch(): mi collego al .json e ne ottendo una "Promise"
// 2. then(): converte la Promise in un dato strutturale
// 3. then(): utilizza il dato ottenuro

// .json: metodo delle Promise che mi permette di convertirla in oggetto JS
// respons: parametro della callback che identifica la Promise
// data: parametro della collback che identifica il dato strutturale convertito 

// quindi:
// 1. fetch(link json).then((parametro Promise)=>converti Promise).then((Promise convertito)=>fai qualcosa ovvero tutta la logica per utilizzarlo)
// Consideriamo che all'interno di fetch siamo un uno scope locale

fetch(`./annunci.json`).then((response)=> response.json()).then((data)=>{
     console.log(data);

    //  annunci in ordine di prezzo
    data.sort((a, b) => a.price - b.price);

    let radioWrapper = document.querySelector(`#radiowrapper`);
    let cardWrapper = document.querySelector(`#cardWrapper`);
    let priceInput =document.querySelector(`#priceInput`);
    let priceValue =document.querySelector(`#priceValue`);
    let wordInput =document.querySelector(`#wordInput`);
   
// CREARE LE CATEGORIE   
    function radioCreate(){
        // array clone di data con solo catgorie
        let categories = data.map((annuncio)=>annuncio.category);
        console.log(categories);
        
        // METODO 1 PER EVITARE RIPETIZIONI
        // variabile con un array senza ripetizione di annunci
        // let uniqueCategories = [];
        // per ogni categoria dell'array clone se non è presente in uniqueCategories inseriscilo. Nel momento in cui incontra una categoria simili capisce che è già presente perché inserito prima.
        // categories.forEach(category => {
            // se non include la categoria
        // if( !uniqueCategories.includes(category) ){
        // uniqueCategories.push(category)
        //     }
        // });
        
        // set(): classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set che contiene solo valori univoci
        
        // la variabile uniqueCategories contiene un Set (non un array) derivante dall'Array clone con valori univoci
        
        // essendo un Set e non un Array non posso sfruttare i suoi metodi tipo forEach. Quindi devo convertirlo in Array con Array.from()
        
        let uniqueCategories = Array.from(new Set(categories));
        console.log(uniqueCategories);

        uniqueCategories.forEach((category)=>{
            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
                ${category};
            </label>`;
            radioWrapper.appendChild(div);
        });
    }

    // LANCIO FUNZIONE
    radioCreate();

    // CREARE LE CARD
    // non lavora su data ma su un array che sceglie nel momento dell'utilizzo:
    // all'apertura della pagina lavori su data
    function showCard(array){
        cardWrapper.innerHTML = ``;
        array.forEach((annuncio, i)=>{
            let div = document.createElement(`div`);
            div.classList.add(`cardcustom`);
            div.innerHTML = `
                <img src="https://picsum.photos/${300 + i}" class="img-card">
                <p class="h2" title="${annuncio.name}">${troncateWords(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>`;
            cardWrapper.appendChild(div);
        });
    }

    // LANCIO FUNZIONE
    // Al caricamento della pagina è data l'array di riferimento
    showCard(data);


    // FUNZIONE PER TRONCARE PAROLE TROPPO LUNGHE
    function troncateWords(string){
        // se la strinfa ha caratteri maggiori di 15
        if(string.length > 15){
            // ritorna una stringa con solo la prima parola ovvero quella in posizione 0
            return string.split(` `)[0] + `...`;
        } else{
            // altrimenti restituisci tutta la stringa
            return string;
        }
    }

    // FUNZIONE FILTRO PER CATEGORIA
    function filterByCategory(categoria){
        // array clone di data ma con elemento nel suo interno dovranno soddisfrare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione

        // con filter passi in questo array clone gli array filtrati con gli annunci con la categoria che ho scelto

        // per far funzionare anche il tasto "tutte le categorie" IF categoria è diversa da id "All" passami l'array con i filtri altrimenti mostrami l'array data principale
        if(categoria != `All`){
            // .filter e non .map perché con .filter mi seleziona solo determinati elementi dell'array con quella caterogia mentre .map non può essere selettivo ma trasforma ogni elemento
        let filtered = data.filter((annuncio)=> annuncio.category == categoria);
            // lanciami la funzione di showCard dentro filtered
            // prima però svuotare il wrapper e poi mi fai il foreach
            // ma qui invece l'array di riferimento è filtered
        // LANCIO FUNZIONE INTERNA ALLA FUNZIONE PERCHE' NON AL CARICAMENTO DELLA PAGINA MA QUANDO ATTIVO LA FUNZIONE
        showCard(filtered);
        }else{
            showCard(data);
        }
    }

    // EVENTO FILTRO PER CATEGORIA  
    let radioButtons = document.querySelectorAll(`.form-check-input`);

    // lavorando con un array foreach
    radioButtons.forEach((button)=>{
        button.addEventListener(`click`, ()=>{
            // prendimi al click di button solo gli "id" di riferimento del bottone
            filterByCategory(button.id);
        })
    })  

    // FILTRO PER PREZZO
        // SETTAGGIO INPUT
    function setPriceInput(){
        // Dopo aver catturato l'input range voglio settare come proprietà max dello stesso il valore più altro tra i price di ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi (ecco perché utilizziamo .map perché si lavora su tutti gli elementi senza apportare modifiche al loro numero). A quel punto lo ordino in maniera decrescente e prendermi l'elemento l'elemento con il valore più alto.
        // array con solo prezzi ma sono stringhe. Per convertire in numeri basta inserire un + (lezione 2 di js) o Number(annuncio.price)
        let prices = data.map((annuncio)=> +annuncio.price);
        // ordiniamo in ordine crescente
        prices.sort((a, b)=> a - b);
        // prendiamo ultimo elemento per settarlo massimo
        // metodo pop - prendi l'ultimo elemento dell'array e lo salviamo in una variabile. Match.ceil - per arrotondare
        let maxPrice = Math.ceil(prices.pop());
        // il valore di max di priceInput dovrà essere come maxPrice
        priceInput.max = maxPrice;
        // modifichiamo anche il value - al caricamento della pagina fammi vedere tutto
        priceInput.value = maxPrice;
        // al caricamento della pagina dai valore maxPrice al nostro paragrafo
        priceValue.innerHTML = maxPrice;
    }

    setPriceInput();

        // FILTRO PREZZO IN BASE AL VALUE DEL RANGE
    function filterByPrice(){
    // fai un array da data filtrato con tutti gli annunci con price minore o uguale al value di priceInput (mi raccomando al + )
    let filtered = data.filter((annuncio)=> +annuncio.price <= priceInput.value);
    // a quel punto mostrami filtered 
    showCard(filtered);
}

    // EVENTO PER FILTRO PREZZO
    // utilizziamo evento input lanciamo filterByPrice
    priceInput.addEventListener(`input`, ()=>{
        priceValue.innerHTML = priceInput.value;
        filterByPrice();
    })

        // FILTRO PER PAROLA
    function filterByWord(parola){
        // filtra gli elementi di data in modo tale che nel loro name sia incluso la parola che stiamo passando "includes" 

        // filtra gli annunci con la parola indicata nell'evento
        let filtered = data.filter((annuncio)=>annuncio.name.toLowerCase().includes(parola.toLowerCase()));
        // fatto questo lanciami 
        showCard(filtered);
    }
    
    // EVENTO PER FILTRO PAROLA
    wordInput.addEventListener(`input`, ()=>{
        filterByWord(wordInput.value)
    })

    // EVENTI CONCATENATI
    // Ad ogni evento scatti tutti e 3 le funzioni di filtro ma non siano applicate sull'array DATA bensi siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente. Creiamo una funzione

    function globalFilter(){
        let filteredByCategory = filterByCategory();
        // senza return è undefined. Quindi le funzioni dei filtri non devono invocare più showCards ma devono invocare l'array filtered per poterlo sfruttare nella funzione global
    }

});






