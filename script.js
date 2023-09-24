const heading = document.getElementById("show-modal");
const modal = document.getElementById("modal-1");
const closeModal = document.querySelector("#close-modal");
const bookmarkForm = document.getElementById("bookmark-form");

var bookName = document.getElementById("book-name");
const authorName = document.getElementById("author-Name");
const pages = document.getElementById("pages");

const container = document.getElementById("bookmark-container");

let bookmark=[]; 

function modalShow() {
    modal.classList.add('show-modal')
}
// SHOW FORM
heading.addEventListener("click", modalShow);
// CLose Form
closeModal.addEventListener("click" , () => modal.classList.remove("show-modal"));
// Close form
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false))

// Build BookLibrary DOM Function

function buildLibrary() {
    container.innerHTML = "";

    bookmark.forEach((bookmarks) =>{
        const{ Name, author, amount, status } = bookmarks;
        console.log(Name, author, amount, status );
    
        // library

        const libook = document.createElement("div");
        libook.classList.add("library");
    //  p (book-name)
        const secHeadind = document.createElement("p");
        secHeadind.classList.add("book-name");
        secHeadind.textContent = Name;
    // p (author-name)
        const forHeading = document.createElement("p");
        forHeading.classList.add("author-name");
        forHeading.textContent = author;
    // span
         const span = document.createElement("span");
    // Status
         const readUnread  = document.createElement("p");
         readUnread.classList.add("type");
         readUnread.textContent = `status : ${status}`;
    //  Number of pages
         const numberOfPages  = document.createElement("p");
         numberOfPages.classList.add("pages");
         numberOfPages.textContent = `Pages : ${amount}`;
    // Remove
        const remove = document.createElement("small");
        remove.classList.add("remove");
        remove.textContent = "Remove Book"
    // appending childs
         span.append(readUnread, numberOfPages,);
         libook.append(secHeadind, forHeading, span, remove);
         container.appendChild(libook)
    
    } )
}

// Fetch bookLibrary from local storage

function fetchBooks() {
    if (localStorage.getItem("bookLibrary")) {
        bookmark = JSON.parse(localStorage.getItem("bookLibrary"));
    }
    localStorage.setItem("bookLibrary", JSON.stringify(bookmark));
    console.log(bookmark);
    buildLibrary();
}

// DATA FROM FORM 

function storeBookMark(e) {
    // Dealing with the input form Data
    e.preventDefault();
    const bName = bookName.value;
    const aName  = authorName.value;
    const pNumber = pages.value;
    if (bookName.value.length < 5 || authorName.value.length <  5) {
        alert("Title and Author name must be greater than 5 characters ")
        return false;
    }
    else if (bName.length > 15 ) {
        bookName.fontSize = "22px";
    }
    let type 
    const read = document.getElementById("read");
    const unread = document.getElementById("unread");
   if(read.checked){
    type= read.value
   }
   else if(unread.checked){
    type= unread.value
   }
    // Store in Object
    const bookmarks ={
        Name: bName,
        author: aName,
        amount: pNumber,
        status: type
    }
    // Push object in bookmark array
    bookmark.push(bookmarks)
    localStorage.setItem("bookLibrary", JSON.stringify(bookmark));
    fetchBooks();
    bookmarkForm.reset();
    modal.classList.remove('show-modal')
}



// Delete book from Library Function
container.addEventListener("click", function (e) {
    if (e.target.tagName === "SMALL"){
      // get the book name and author name of the deleted element
      let bookName = e.target.parentElement.querySelector(".book-name").textContent;
      let authorName = e.target.parentElement.querySelector(".author-name").textContent;
      // find the index of the item that matches the book name and author name
      let index = bookmark.findIndex(item => item.Name === bookName && item.author === authorName);
      // remove the item from the bookmark array
      bookmark.splice(index, 1);
      // remove the element from the DOM
      e.target.parentElement.remove();
      // update the local storage
      localStorage.setItem("bookLibrary", JSON.stringify(bookmark));
    }
   
})


bookmarkForm.addEventListener("submit", storeBookMark);
fetchBooks();
