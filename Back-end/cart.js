import { bookscard } from "./books.js";
export let cart = JSON.parse(localStorage.getItem("cart"));;
if(!cart)
{
cart=[
  {
    id: 1,
    quantity: 9,
    deliveryOptionId: "1",
  },
  {
    id: 2,
    quantity: 2,
    deliveryOptionId: "2",
  },
];}

fetch("http://localhost:3004/api/sendAllBooks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bookscard),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return response.json();
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function fetchDataAndUpdateLocalStorage() {
  fetch("http://localhost:3004/api/getCartItems")
    .then((response) => response.json())
    .then((data) => {
      if (Object.keys(data).length !== 0) {
       cart.forEach(item => {
        let matching;
        if (item.id==data.id)
        {
          matching=item;
        }
       })
       if(matching)
       {
        matching.quantity += data.quantity;
       }
       else{
        cart.push(data)
       }
        saveToStorage();
      }
    })
    .catch((error) => console.error("Error:", error));
}
export { fetchDataAndUpdateLocalStorage };


fetchDataAndUpdateLocalStorage();


export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}



export function deleteItem() {
  let delete_buttons = document.querySelectorAll(".js-delete-item");
  delete_buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const newCart = [];
      let bookid = button.dataset.bookId;
      console.log(bookid);
      cart.map((item) => {
        if (bookid != item.id) {
          newCart.push(item);
          console.log(item);
        }
        else {
        const container=document.getElementById( 'product-id-'+item.id)
        container.remove();
        }
      });
      cart = newCart;
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

