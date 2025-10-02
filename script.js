

function Book(title, author, pages, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
}

const myLibrary = [];

function addBookToLibrary(title, author, pages) {
 const id = crypto.randomUUID();
 const book = new Book(title, author, pages, id);
 myLibrary.push(book);
}
const container = document.querySelector('.container');

const dialog = document.querySelector('dialog');
const popUp = document.querySelector('.open-button')
const close = document.querySelector('.close')
const addBtn = document.querySelector('.addBtn')
popUp.addEventListener('click', (event) => {
    dialog.showModal();
});
   const inputTitle = document.querySelector('#title');
  const inputAuthor = document.querySelector('#author');
  const inputPages = document.querySelector('#pages');
close.addEventListener('click', () => {
    dialog.close();
    inputTitle.value = '';
 inputAuthor.value = '';
 inputPages.value = '';
})

addBtn.addEventListener("click", (event) => {
     if (!inputAuthor.value || !inputTitle.value || !inputPages.value) {
    } else {
    
 event.preventDefault();

  addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value);

  const latestBook = myLibrary[myLibrary.length - 1];
 const unique = latestBook.id;
      const div = document.createElement('div')
      
    const title = document.createElement('p')
    const author = document.createElement('p')
     const pages = document.createElement('p')
    div.classList.add('card');
    div.setAttribute('data-id', unique)
    container.appendChild(div);
    title.textContent = `Title: ${latestBook.title}`;
    div.appendChild(title);
     author.textContent = `Author: ${latestBook.author}`;
    div.appendChild(author);
     pages.textContent = `Pages: ${latestBook.pages}`;
    div.appendChild(pages);
     dialog.close();
 inputTitle.value = '';
 inputAuthor.value = '';
 inputPages.value = '';
 const deleteBtn = document.createElement('button')
 deleteBtn.textContent = 'Delete';
 deleteBtn.classList.add('delete-btn');
 div.appendChild(deleteBtn);
   console.log(myLibrary);
deleteBtn.addEventListener('click', (e) => {
    const unique = e.target.closest('[data-id]')
    for(let i = 0; i < myLibrary.length; i++){
       if ( unique.dataset.id === myLibrary[i].id ) {
         myLibrary.splice(i, 1)
         console.log(myLibrary);
         unique.remove();
         break;
       }

    }


})

    }
});

  