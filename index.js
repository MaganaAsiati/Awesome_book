/* eslint-disable max-classes-per-file */
import { constructContactPage, constructFormPage, constructListPage } from './modules/page.js';
import { DateTime } from './modules/luxon.js';
import Store from './modules/storage.js';
import Book from './modules/book.js';

const contactButton = document.getElementById('li-contact');
const liForm = document.getElementById('li-list');
const listAdd = document.getElementById('li-add');

contactButton.addEventListener('click', constructContactPage);
listAdd.addEventListener('click', constructFormPage);
liForm.addEventListener('click', constructListPage);

const dateElement = document.getElementById('date');

const date = DateTime.now();
dateElement.textContent = date.toLocaleString(DateTime.DATETIME_MED);

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