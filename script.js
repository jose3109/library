
//Constructor function for creating a book object with relevant details
function Book(title, author, pages, id, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Array to store Book objects in the order they were added
const myLibrary = [];

//Function to create a Book object with a UUID and push it to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
 const id = crypto.randomUUID();
 const book = new Book(title, author, pages, id, read);
 myLibrary.push(book);
}

const mainContainer = document.querySelector('.container');
const dialog = document.querySelector('dialog');
const openDialog = document.querySelector('.open-dialog');
const closeDialog = document.querySelector('.close');
const addBtn = document.querySelector('.addBtn');

//Opens the dialog modal when the "openDialog" button is clicked
openDialog.addEventListener('click', () => {
    dialog.showModal();
});

//Form input elements 
  const inputTitle = document.querySelector('#title');
  const inputAuthor = document.querySelector('#author');
  const inputPages = document.querySelector('#pages');
  const inputCheck = document.querySelector('#read');

  //Add a read status on the Book container and syncs it with the read property
  Book.prototype.readStatus = function(bookContainer) {
    const readContainer = document.createElement('div');
            readContainer.classList.add('check-box');

    const readBtn = document.createElement('button');  
        readBtn.textContent =  this.read ?  'Read the book Congrats!' : 'Not read';
        readContainer.appendChild(readBtn);

    bookContainer.appendChild(readContainer);
   
    readBtn.addEventListener('click', () => {

        this.read = !this.read;
        readBtn.textContent =  this.read ?  'Read the book Congrats!' : 'Not read';
    });
};


//Clear the input data from the form
function clearInput () {
 inputTitle.value = '';
 inputAuthor.value = '';
 inputPages.value = '';
 inputCheck.checked = false;
}

//Close the dialog after the "close" button gets clicked
closeDialog.addEventListener('click', () => {
    dialog.close();
    clearInput();
});
// Targets the book on the UI and array to remove 
function targetBook (deleteBtn) {
         deleteBtn.addEventListener('click', (e) => {
    const currentBook = e.target.closest('[data-id]')
    for(let i = 0; i < myLibrary.length; i++){
       if ( currentBook.dataset.id === myLibrary[i].id ) {
         myLibrary.splice(i, 1)
         currentBook.remove();
         break;
       }

    }
});
} 
//Creates the delete button to erase the book from the UI and array
function deleteBtn (bookContainer) {
     const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete';
             deleteBtn.classList.add('delete-btn');
                 bookContainer.appendChild(deleteBtn);
                 targetBook (deleteBtn);

};

//Create the elements for the input data and combine them into the book container
function createBook() {
    const latestBook = myLibrary[myLibrary.length - 1];
    const uniqueId = latestBook.id;
    const bookContainer = document.createElement('div')
        bookContainer.classList.add('card');
          bookContainer.setAttribute('data-id', uniqueId)
             mainContainer.appendChild(bookContainer);

    const title = document.createElement('p')
        title.textContent = `Title: ${latestBook.title}`;
            bookContainer.appendChild(title);
    const author = document.createElement('p');
         author.textContent = `Author: ${latestBook.author}`;
            bookContainer.appendChild(author);
    const pages = document.createElement('p')
        pages.textContent = `Pages: ${latestBook.pages}`;
            bookContainer.appendChild(pages);                    
   
    latestBook.readStatus(bookContainer);
    deleteBtn(bookContainer);
    
};

//Handles the add button inside the dialog: validates inputs, add book to the library, update UI, close dialog, and clears form 
addBtn.addEventListener("click", (event) => {
     if (!inputAuthor.value || !inputTitle.value || !inputPages.value) return;
         event.preventDefault();
            addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputCheck.checked);
         createBook();
         dialog.close();
         clearInput();
});



