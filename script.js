const myLibrary = new Array();

/*const book1 = new Book("A", "Sis", "123", "not read");
const book2 = new Book("B", "Bro", "321", "read"); */

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


}

console.log(book1.id);