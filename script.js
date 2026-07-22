const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Column order matches the table headers (skip methods like info)
const bookColumns = ["title", "author", "pages", "read", "id"];

function showBooks() {
    const tableBody = document.querySelector(".t-body");
    if (!tableBody) return;

    // Clear existing rows so re-calling showBooks doesn't duplicate them
    tableBody.replaceChildren();

    for (const book of myLibrary) {
        const row = document.createElement("tr");

        for (const prop of bookColumns) {
            const cell = document.createElement("td");
            cell.innerText = book[prop]; // property, not a method; use bracket access
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}

//const sub = document.querySelector("#submit-button");
const form = document.querySelector("form");
const dialog = document.querySelector("#dialog-box");

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
