fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((usersObj) => console.log(usersObj))
  .catch((error) => console.log("catch block", error));

fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("Richiesta non valida");
      }
      if (response.status === 401) {
        throw new Error("Non autorizzato");
      }
      if (response.status === 403) {
        throw new Error("Vietato");
      }
      if (response.status === 404) {
        throw new Error("Non trovato");
      }
      throw new Error("Errore durante il recupero dei dati");
    }
  })
  .then((arrayOfBooks) => {
    const bookshelfRow = document.getElementById("bookshelf-row");

    arrayOfBooks.forEach((bookInTheArray) => {
      const bookBox = document.createElement("div");
      bookBox.className =
        "book-box col book d-flex col-6 col-sm-4 col-md-3 col-lg-2 g-3";

      const book = document.createElement("div");
      book.className = "card h-100";

      const bookInfo = document.createElement("div");
      bookInfo.className = "card-body";

      const buttonHide = document.createElement("button");
      buttonHide.className = "btn btn-outline-secondary";
      buttonHide.innerText = "Nascondi";
      buttonHide.id = "button-hide";
      buttonHide.addEventListener("click", hideCard);

      const buttonBuy = document.createElement("button");
      buttonBuy.className = "btn btn-success mt-1";
      buttonBuy.innerText = "Acquista";
      buttonBuy.id = "button-buy";

      if (bookInTheArray.img) {
        const img = document.createElement("img");
        img.src = bookInTheArray.img;
        img.className = "book-img h-100 object-fit-cover card-img-top";
        img.textContent = bookInTheArray.img;
        book.appendChild(img);
      }

      if (bookInTheArray.title) {
        const h3 = document.createElement("h5");
        h3.className = "book-title card-title my-0";
        h3.textContent = bookInTheArray.title;
        bookInfo.appendChild(h3);
      }

      if (bookInTheArray.price) {
        const price = document.createElement("p");
        price.className = "book-price card-text  my-0";
        price.textContent = bookInTheArray.price + "€";
        bookInfo.appendChild(price);
      }

      if (bookInTheArray.category) {
        const category = document.createElement("p");
        category.className = "book-category d-none";
        category.textContent = bookInTheArray.category;
        bookInfo.appendChild(category);
      }

      if (bookInTheArray.asin) {
        const asin = document.createElement("p");
        asin.className = "book-asin d-none";
        asin.textContent = "sin: " + bookInTheArray.asin;
        bookInfo.appendChild(asin);
      }

      bookshelfRow.appendChild(bookBox);
      bookBox.appendChild(book);
      book.appendChild(bookInfo);
      bookInfo.appendChild(buttonHide);
      bookInfo.appendChild(buttonBuy);
    });
  })
  .catch((error) => console.log("Blocco catch", error));

// * hide card

const buttonHide = document.getElementById("button-hide");

function hideCard() {
  const thisCard = this.closest(".book-box");
  thisCard.className = "d-none";
}

// * add book to cart

const cart = [];
let total = 0;

function addToCart(book) {
  cart.push(book);
  total += book.price;
  updateCartTotal();
}

buttonBuy.addEventListener("click", function () {
  const bookBox = this.closest(".book-box");
  const bookInfo = bookBox.querySelector(".book-info");

  const bookData = {
    title: document.querySelector(".book-title").textContent,
    price: parseFloat(document.querySelector(".book-price").textContent)
  };

  addToCart(bookData);
});

const cartTotal = document.createElement("span");
cartTotal.id = "cart-total";
updateCartTotal();
document.querySelector(".total").appendChild(cartTotal);
