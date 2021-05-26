//Selectors
const addNewBookBtn = document.querySelector('#add-new-book');
const addNewBookForm = document.querySelector('#add-new-book-form');
const closeFormBtn = document.querySelector('#close-form');
const books = document.querySelector('#books');

const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const pagesInput = document.querySelector('input[name="pages"]');
const readStatusInput = document.querySelector('input[name="read-status"]');
const addBookBtn = document.querySelector('#add-book');

let library = [];

function Book(title, author, pages, readStatus) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = readStatus
}

Book.prototype.toggleStatus = function() {
    if(this.read == 'Read') this.read = 'Not read';
    else this.read = 'Read';
}

function addBookToLibrary(book) {
    library.push(book);
}

function createBook() {
    const bookTitle = titleInput.value;
    const bookAuthor = authorInput.value;
    const bookPages = pagesInput.value;
    const bookReadStatus = readStatusInput.value;
    
    const book = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
    addBookToLibrary(book);
}

function render() {
    for (let i = 0; i < library.length; i++) {
        createCard(i);
    }
}

function createCard(index) {
    const book = document.createElement('div');
    book.classList.add('book');

    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.textContent = 'X';
    deleteBookBtn.classList.add('delete-book');
    book.appendChild(deleteBookBtn);
    deleteBookBtn.addEventListener('click', () => {
        deleteBook(index);
    });

    const title = document.createElement('p');
    title.textContent = library[index].title;
    book.appendChild(title);

    const author = document.createElement('p');
    author.textContent = library[index].author;
    book.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = library[index].pages + ' pages';
    book.appendChild(pages);

    const readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'button');
    readStatus.value = library[index].read;
    if (readStatus.value == 'Read') {
        readStatus.style.backgroundColor = '#10B981';
    } else {
        readStatus.style.backgroundColor = '#EF4444';
    }
    book.appendChild(readStatus);
    readStatus.classList.add('read-status');
    readStatus.addEventListener('click', () => {
        library[index].toggleStatus();
        clear();
        render();
    })

    books.appendChild(book);
}

function toggleReadStatus() {
    if (readStatusInput.value == 'Read') readStatusInput.value = 'Not read';
    else readStatusInput.value = 'Read';
}

function clear() {
    books.innerHTML = "";
}

function deleteBook(index) {
   library.splice(index, 1);
   clear();
   render();
}

function clearInput() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readStatusInput.value = "Read";
}

function checkField() {
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        alert('Fill all the fields!');
        return false;
    } else {
        return true;
    }
}

addNewBookBtn.addEventListener('click', e => {
    addNewBookForm.style.display = 'flex';
    books.style.display = 'none';
});

readStatusInput.addEventListener('click', toggleReadStatus);

closeFormBtn.addEventListener('click', e => {
    e.preventDefault();
    addNewBookForm.style.display = 'none';
    books.style.display = 'grid';
    clearInput();
})

addBookBtn.addEventListener('click', e => {
    e.preventDefault();
    if(!checkField()) return;
    addNewBookForm.style.display = 'none';
    books.style.display = 'grid';
    createBook();
    clear();
    render();
    clearInput();
});