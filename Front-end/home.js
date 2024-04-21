document.addEventListener('DOMContentLoaded', async () => {
    const booksContainer = document.getElementById('books-container');

    try {
        const response = await fetch('http://localhost:3000/api/getAllBooks');
        const booksData = await response.json();

        booksData.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            const titleElement = document.createElement('h2');
            titleElement.textContent = book.book_name;

            const bookNameElement = document.createElement('p');
            bookNameElement.textContent = `book name: ${book.book_name}`;

            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${book.author_first_name} ${book.author_last_name}`;

            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $${(book.book_price).toFixed(2)}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.setAttribute('data-book-id', book.book_ID);
            addToCartButton.classList.add('js-add-to-cart');

            bookElement.appendChild(titleElement);
            bookElement.appendChild(bookNameElement);
            bookElement.appendChild(authorElement);
            bookElement.appendChild(priceElement);
            bookElement.appendChild(addToCartButton);

            booksContainer.appendChild(bookElement);
        });

        // Add event listener for Add to Cart buttons
        document.querySelectorAll('.js-add-to-cart').forEach(button => {
            button.addEventListener('click', async () => {
                const bookId = button.getAttribute('data-book-id');

                try {
                    const response = await fetch('http://localhost:3000/addToCart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ bookId }) // Replace 'user_id_placeholder' with the actual user ID
                    });

                    if (response.ok) {
                        alert('Book added to cart successfully!');
                    } else {
                        const errorMessage = await response.text();
                        alert(`Error adding book to cart: ${errorMessage}`);
                    }
                } catch (error) {
                    console.error('Error adding book to cart:', error);
                    alert('Error adding book to cart. Please try again later.');
                }
            });
        });
    } catch (error) {
        console.error('Error fetching books data:', error);
        alert('Error fetching books data. Please try again later.');
    }
});
