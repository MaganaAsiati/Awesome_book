/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class showBooks {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => showBooks.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title} <b>by</b></td>
        <td>${book.author}</td>
        <td><button class="delete">Remove book</button></td>
      `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', showBooks.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  showBooks.addBookToList(book);
  Store.addBook(book);
  showBooks.clearFields();
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  showBooks.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
const bookListDiv = document.getElementById('table');
const formDiv = document.getElementById('form');
const contactDiv = document.getElementById('contact');
const contactButton = document.getElementById('li-contact');
const liForm = document.getElementById('li-list');
const listAdd = document.getElementById('li-add');

function constructListPage() {
  bookListDiv.style.display = 'block';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'none';
}

function constructFormPage() {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'block';
  contactDiv.style.display = 'none';
}

function constructContactPage() {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'block';
}

contactButton.addEventListener('click', constructContactPage);
listAdd.addEventListener('click', constructFormPage);
liForm.addEventListener('click', constructListPage);

const d = new Date('2015-03-25');
document.getElementById('demo').innerHTML = d;