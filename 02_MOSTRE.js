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

// PASSAGGI
// 1. fetch(): mi collego al .json e ne ottendo una "Promise"
// 2. then(): converte la Promise in un dato strutturale
// 3. then(): utilizza il dato ottenuro

// .json: metodo delle Promise che mi permette di convertirla in oggetto JS
// respons: parametro della callback che identifica la Promise
// data: parametro della collback che identifica il dato strutturale convertito 

// quindi:
// 1. fetch(link json).then((parametro Promise)=>converti Promise).then((Promise convertito)=>fai qualcosa ovvero tutta la logica per utilizzarlo)

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
        // array clone di data con solo categorie
        let categories = data.map((annuncio)=>annuncio.category);
        console.log(categories);
        
        // METODO PER EVITARE RIPETIZIONI
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
        if(categoria != `All`){
            let filtered = data.filter((annuncio)=> annuncio.category == categoria);
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
    let filtered = data.filter((annuncio)=> +annuncio.price <= priceInput.value);
    showCard(filtered);
}

    // EVENTO PER FILTRO PREZZO
    priceInput.addEventListener(`input`, ()=>{
        priceValue.innerHTML = priceInput.value;
        filterByPrice();
    })

        // FILTRO PER PAROLA
    function filterByWord(parola){
        let filtered = data.filter((annuncio)=>annuncio.name.toLowerCase().includes(parola.toLowerCase()));
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
    }

});






