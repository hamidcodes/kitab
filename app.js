
class Book{
    constructor(title, author, date){
        this.title = title;
        this.author = author;
        this.date = date;
    }
}

class UI {
    static displayBooks(){
       
    const books = Store.getBooks();

        books.forEach((book) => UI.addBook(book));

    }

    static addBook(book) {

        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.date}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>

        
        `;
        list.appendChild(row);

    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }


    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#date').value = '';
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
        

    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(date){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.date === date){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const date = document.querySelector('#date').value;


    if(title === '' || author === ''){
        UI.showAlert('Please fill in all fields', 'danger');
    }else{
        const book = new Book(title, author, date);
    
        UI.addBook(book);

        Store.addBook(book);

        
    
        UI.clearFields();

    }
});

document.querySelector('#book-list').addEventListener('click', (e) =>{

    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})

