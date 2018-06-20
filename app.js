// Book constructor

function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI constructor - a set of prototype methods to do CRUD events
function UI() {}

// add the 'add book' method to our UI object
UI.prototype.addBookToList = function(book) {
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

UI.prototype.showAlert = function(message, className) {
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
// delete book

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// clear fields

UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''

}


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

  if(title === '' || author === '' || isbn === ""){
    // error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // Add book to list

    ui.addBookToList(book)
    // show success
    ui.showAlert('Book added!', 'success')
    ui.clearFields()

  }
  console.log(ui)
  e.preventDefault()
})

// event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI()
  ui.deleteBook(e.target)
  console.log(e.target)
  ui.showAlert('Book removed', 'success')
  e.preventDefault()
  
})

