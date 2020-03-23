let productsList = [];
function createButtonsForRow(index, vertical = true) {
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Usuń"));
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.onclick = e => {
        showAlert("Usunięto produkt: " + productsList[index].name);
        productsList.splice(index, 1);
        refreshProductsListTable();
    };
    let editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edytuj"));
    editButton.setAttribute("type", "button");
    editButton.classList.add("btn");
    editButton.classList.add("btn-warning");
    editButton.onclick = e => {
        document.getElementById("editProductButton").hidden = false;
        document.getElementById("editProductButton").onclick = e => editProduct(index);
        document.getElementById("addProductButton").hidden = true;
        $("#productName").val(productsList[index].name);
        $("#productCode").val(productsList[index].code);
        $("#productPrice").val(productsList[index].price);
        $("#productVat").val(productsList[index].Vat);
        $("#productPriceVat").val(productsList[index].priceVat);
        $("#productCategory").val(productsList[index].category);
        $("#productOptionals").val(productsList[index].optionals);
        switch (+productsList[index].rating) {
            case 1:
                document
                    .getElementById("productRating1")
                    .setAttribute("checked", "true");
                break;
            case 2:
                document
                    .getElementById("productRating2")
                    .setAttribute("checked", "true");
                break;
            case 3:
                document
                    .getElementById("productRating3")
                    .setAttribute("checked", "true");
                break;
            case 4:
                document
                    .getElementById("productRating4")
                    .setAttribute("checked", "true");
                break;
            case 5:
                document
                    .getElementById("productRating5")
                    .setAttribute("checked", "true");
                break;
            default:
                break;
        }
        $("#productImage").val(productsList[index].image);
    };
    let addToCartButton = document.createElement("button");
    addToCartButton.appendChild(document.createTextNode("Do koszyka"));
    addToCartButton.setAttribute("type", "button");
    addToCartButton.classList.add("btn");
    addToCartButton.classList.add("btn-success");
    addToCartButton.onclick = e => {
        let cart = JSON.parse(localStorage.getItem("cartProducts")) ?? [];
        if (cart.some(cartItem => cartItem.product.name == productsList[index].name)) {
            showAlert("Produkt już znajduje się w koszyku.");
        }
        else {
            cart.push(new CartItem(productsList[index]));
            showAlert("Dodano do koszyka.");
        }
        localStorage.setItem("cartProducts", JSON.stringify(cart));
        document.getElementById("cartItemsBadge").innerText = cart.length.toString();
    };
    let buttonGroupDiv = document.createElement("div");
    if (vertical)
        buttonGroupDiv.classList.add("btn-group-vertical");
    else
        buttonGroupDiv.classList.add("btn-group");
    buttonGroupDiv.classList.add("btn-group-sm");
    buttonGroupDiv.classList.add("ml-auto");
    buttonGroupDiv.setAttribute("role", "group");
    let flexDiv = document.createElement("div");
    flexDiv.classList.add("d-flex");
    flexDiv.classList.add("mx-auto");
    buttonGroupDiv.appendChild(addToCartButton);
    buttonGroupDiv.appendChild(editButton);
    buttonGroupDiv.appendChild(deleteButton);
    flexDiv.appendChild(buttonGroupDiv);
    return flexDiv;
}
function refreshProductsListTable() {
    $("#productsTableHTML tbody tr").remove();
    let tbody = document
        .getElementById("productsTableHTML")
        .getElementsByTagName("tbody")[0];
    productsList.forEach((product, i) => {
        let newRow = tbody.insertRow(-1);
        newRow.insertCell().appendChild(document.createTextNode(product.name));
        newRow.insertCell().appendChild(document.createTextNode(product.code));
        newRow
            .insertCell()
            .appendChild(document.createTextNode(product.price.toString()));
        newRow
            .insertCell()
            .appendChild(document.createTextNode(product.Vat.toString() + "%"));
        newRow
            .insertCell()
            .appendChild(document.createTextNode(product.priceVat.toString()));
        newRow.insertCell().appendChild(document.createTextNode(product.category));
        newRow
            .insertCell()
            .appendChild(document.createTextNode(product.optionals.reduce((acc, x) => acc + ", " + x)));
        newRow
            .insertCell()
            .appendChild(document.createTextNode(product.rating.toString()));
        newRow.insertCell().appendChild(createButtonsForRow(i));
    });
    $("#productsTableHTML").trigger("update");
    refreshProductGallery();
}
function sortProductsTable(column, order) {
    $("#productsTableHTML").trigger("sorton", [[[column, order]]]);
}
function exportProductsToJSON() {
    document.addEventListener("copy", (e) => {
        e.clipboardData.setData("text/plain", JSON.stringify(productsList));
        e.preventDefault();
        document.removeEventListener("copy", this.e);
    });
    document.execCommand("copy");
    showAlert("Skopiowano JSON do schowka");
}
function importProductsFromJSON() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onload = e => {
        let products = JSON.parse(xhhtp.responseText);
        productsList = products;
        refreshProductsListTable();
    };
    xhhtp.open("GET", "../productsList.json");
    xhhtp.send();
}
$(function () {
    $("#productsTableHTML thead")
        .find("th:contains(Kod)")
        .data("sorter", false);
    $("#productsTableHTML thead")
        .find("th:contains(VAT)")
        .data("sorter", false);
    $("#productsTableHTML thead")
        .find("th:contains(Kategoria)")
        .data("sorter", false);
    $("#productsTableHTML thead")
        .find("th:contains(opcje)")
        .data("sorter", false);
    $("#productsTableHTML thead")
        .find("th:contains(Opcje)")
        .data("sorter", false);
    $("#productsTableHTML").tablesorter({
        theme: "blue",
        widgets: ["uitheme", "zebra"],
        widgetOptions: {
            zebra: ["even", "odd"]
        }
    });
    let cart = JSON.parse(localStorage.getItem("cartProducts")) ?? [];
    document.getElementById("cartItemsBadge").innerText = cart.length.toString();
});
//# sourceMappingURL=product_table.js.map