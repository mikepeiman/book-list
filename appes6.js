
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list')

    // create tr element
  
    const row = document.createElement('tr')
  
    // insert columns
  
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }

  showAlert(message, className) {
    // create a div
    const div = document.createElement('div')
    // add classname
    div.className = `alert ${className}`
    // add text
    div.appendChild(document.createTextNode(message))
    console.log(div)
    // get parent
    const container = document.querySelector('.container')
    const submitParent = document.getElementById('submit-parent')
    const submit = document.getElementById('submit')
    const submitAfter = document.getElementById('submit-after')

    submitParent.insertBefore(div, submitAfter)

    // set disappear timeout
    setTimeout(function() {
      setTimeout(function() {
        document.querySelector('.alert').remove()
      }, 505)
      document.querySelector('.alert').classList = 'alert hidden'
    }, 3000)
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  
  }
}

// implement local storage class

class Store {
  static getBooks() {
    let books
    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static displayBooks() {
    const books = Store.getBooks()
    const ui = new UI()
    books.forEach(book => {
      console.log(book)
      ui.addBookToList(book)
    });
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    console.log(isbn)
    const books = Store.getBooks()
    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))

    // some of my attempts at a solution before watching video
    
    // var exists = Object.keys(books).some(function(k) {
    //   console.log(books[k].value === isbn)
    //   localStorage.removeItem(books[k])
    // })
    // console.log(exists)

    // Object.keys(books).forEach(function(key) {
    //   if (books[key] === isbn)
    //   alert(books[key])
    // })

  //   books.forEach(book => {
  //     if(book.includes(isbn)) {
  //       localStorage.removeItem(book)
  //     }
  //   })
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event listener for add book

document.getElementById('book-form').addEventListener('submit', 
function(e) {
  // console.log('test event listener')

  // get form values
  let title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // console.log(title, author, isbn)

  let book = new Book(title, author, isbn)

  // instantiate UI

  const ui = new UI()
  console.log(ui)
  if(title === '' || author === '' || isbn === ""){
    // error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book)
    // add to localstorage
    Store.addBook(book)
    // show success
    ui.showAlert('Book added!', 'success')
    ui.clearFields()

  }

  e.preventDefault()
})

// event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI()
  
  console.log(e.target)
  ui.deleteBook(e.target)

  // remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)


  ui.showAlert('Book removed', 'success')
  e.preventDefault()
  
})