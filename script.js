let myLibrary = [];
const bookColumns = ["title", "author", "pages", "read", "id", "remove"];
const removeBtnArray = new Array();
const readBtnArray = new Array();


const form = document.querySelector("form");
const dialog = document.querySelector("#dialog-box");

//Dummy entries
addBookToLibrary("alpha", "beta", "23", "not read");
addBookToLibrary("gamma", "delta", "90", "read");
addBookToLibrary("theta", "epsilon", "52", "not read");
 

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Use new!");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function(){
    if(this.read === "read"){
        this.read = "not read";
    }else if(this.read === "not read"){
        this.read = "read";
    }
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function showBooks() {
    const tableBody = document.querySelector(".t-body");
    if (!tableBody) return;

    // Clear existing rows so re-calling showBooks doesn't duplicate them
    tableBody.replaceChildren();

    for (const book of myLibrary) {
        const row = document.createElement("tr");

        for (const prop of bookColumns) {
            const cell = document.createElement("td");
            if(prop === "remove"){
                const removeBtn = document.createElement("button");
                removeBtn.style.width = "50px";
                removeBtn.style.height = "5px";
                removeBtn.style.padding = "5px";
                removeBtn.style.backgroundColor = "red";
                removeBtnArray.push(removeBtn);

                removeBtn.dataset.id = book.id;

                cell.insertAdjacentElement("afterbegin", removeBtn);
                row.appendChild(cell);
            }else if(prop === "read"){
                const toggleBtn = document.createElement("button");
                toggleBtn.style.width = "50px";
                toggleBtn.style.height = "5px";
                toggleBtn.style.padding = "5px";
                toggleBtn.style.backgroundColor = "blue";
                readBtnArray.push(toggleBtn);

                toggleBtn.dataset.id = book.id;
    
                cell.innerText = book.read;
                cell.insertAdjacentElement("beforeend", toggleBtn);
                row.appendChild(cell);
            }else{
                cell.innerText = book[prop]; // property, not a method; use bracket access
                row.appendChild(cell);
            }
        }
        
        tableBody.appendChild(row);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const bookData = Object.fromEntries(fd);

    addBookToLibrary(bookData["b-title"], bookData["b-author"], 
                    bookData["b-pages"], bookData["b-read"]); 

    showBooks();
    dialog.close();
});

showBooks();

for(btn of removeBtnArray){
    btn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id;

    myLibrary = myLibrary.filter( (book) => book.id != id);
    
    showBooks()
    });
}

for(btn of readBtnArray){
    btn.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    const id = e.currentTarget.dataset.id;

    console.log(id);

    for(book of myLibrary){
        if(book.id === id){
            console.log(book.read);
            book.changeReadStatus();
            console.log(book.read);
        }
    }
    
    showBooks()
    });
}

