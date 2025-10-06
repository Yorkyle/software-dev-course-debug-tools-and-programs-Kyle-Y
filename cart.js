const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: I removed <= and replaced it with <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration

      //The index should not be <= the length of cartItems, because if there are 3 cart items, the last item's index should be "2". I learned online how to use "watch values to get updates for different parts of the code, such as "i" for the index or the cart total, and I noticed that the "undefined" error appeared because the index of "3" was being searched for but did not exist. 
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (typeof total !== "number" || typeof discountRate !== "number") {//This is code that I added to make sure that the total and discount rate would be a number, to validate input.
    console.warn("Please input a number");
    return 0;
  }

  const sanitizedRate = Math.min(1, Math.max(0, discountRate));//this code is to make sure that the discount is never more than 1 (and if it is, substituted with 1), or less than zero (and if negative, is subsituted with zero)

  return total - total * sanitizedRate; // Bug: I replaced discountRate with sanitizedRate to validate the input

  // I used the console to check the answers I got for an empty cart, a cart with one item (the phone), and a changed discountRate, which is where I used numbers that were less than 0 and more than 1, which gave unexpected and undesirable results.
}

function generateReceipt(cartItems, total) {
  if (isNaN(total)){
    console.warn("Total is not a number as expected. Cancelling transaction");
    total = 0;// This code is meant to verify that the total after any discount is in fact a number before being passed into the .toFixed() method.
  }
    
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: This code to set the decimal to 2 places now works because the total has been pre-verified as a number

  // By passing a parameter that was NaN or undefined into the generateReceipt function, I received a TypeError, which is why I added the validating code toward the start of the function; now a warning is shown.
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;
