function refershCartTable() {
  $("#cartTable tbody tr").remove();

  let cart =
    (JSON.parse(localStorage.getItem("cartProducts")) as CartItem[]) ?? [];
  let tbody = document
    .getElementById("cartTable")
    .getElementsByTagName("tbody")[0];

  cart.forEach((cartItem, index) => {
    let newRow = tbody.insertRow(-1);

    newRow
      .insertCell()
      .appendChild(document.createTextNode(cartItem.product.name));

    newRow
      .insertCell()
      .appendChild(document.createTextNode(cartItem.product.priceVat + "zł"));

    let quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("max", "10");
    quantityInput.setAttribute("step", "1");
    quantityInput.setAttribute("value", "1");
    quantityInput.id = "quantityInput" + index;
    quantityInput.classList.add("form-control-sm");
    quantityInput.onchange = e => {
      cartItem.quantity = parseInt(
        $("#quantityInput" + index)
          .val()
          .toString()
      );

      localStorage.setItem("cartProducts", JSON.stringify(cart));

      calculateFinalPrice();
    };

    newRow.insertCell().appendChild(quantityInput);
    calculateFinalPrice();
  });
}

function calculateFinalPrice() {
  let cart =
    (JSON.parse(localStorage.getItem("cartProducts")) as CartItem[]) ?? [];

  let finalPrice = 0;

  cart.forEach(
    cartItem => (finalPrice += cartItem.product.priceVat * cartItem.quantity)
  );

  finalPrice += parseFloat(
    (document.getElementById("deliveryOption") as HTMLSelectElement).value
  );

  (document.getElementById("finalPriceInput") as HTMLInputElement).value =
    finalPrice.toFixed(2) + "zł";
}

function heBought() {
  localStorage.removeItem("cartProducts");
  refershCartTable();
  calculateFinalPrice();

  showAlert("Dziękujemy za zakup :)");
}

function showAlert(msg: string) {
  document.getElementById("alertMsg").innerText = msg;
  $("#alertModal")
    .modal()
    .show();
}

$(function() {
  refershCartTable();
});
