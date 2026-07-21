const myLibrary = new Array();

let tableBody = document.querySelector(".t-body");

function Book(title, author, pages, read){
    if(!new.target){
        throw Error("Use new!")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function(){
        console.log(this.title + " by " + this.author +
                    ", " + this.pages + ", " + this.read); 
        return(this.title + " by " + this.author +
                ", " + this.pages + ", " + this.read);
    }
} 

function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


addBookToLibrary("alpha", "beta", "23", "not read");
addBookToLibrary("gamma", "delta", "90", "read");
addBookToLibrary("theta", "epsilon", "52", "not read");

function showBooks(){
    for(let book of myLibrary){
        let row = tableBody.insertRow();
        for(let j = 0; j < 5; j ++ ){
            let cell = row.insertCell(j);
            cell = book.title;
        }
    }
}

showBooks();