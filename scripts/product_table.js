let productsList = [];
function refreshProductsListTable() {
    $("#productsTableHTML tbody tr").remove();
    let tbody = document
        .getElementById("productsTableHTML")
        .getElementsByTagName("tbody")[0];
    productsList.forEach(product => {
        let newRow = tbody.insertRow(-1);
        newRow.insertCell(0).appendChild(document.createTextNode(product.name));
        newRow.insertCell(1).appendChild(document.createTextNode(product.code));
        newRow
            .insertCell(2)
            .appendChild(document.createTextNode(product.price.toString()));
        newRow
            .insertCell(3)
            .appendChild(document.createTextNode(product.Vat.toString() + "%"));
        newRow
            .insertCell(4)
            .appendChild(document.createTextNode(product.priceVat.toString()));
        newRow.insertCell(5).appendChild(document.createTextNode(product.category));
        newRow
            .insertCell(6)
            .appendChild(document.createTextNode(product.optionals.reduce((acc, x) => acc + ", " + x)));
        newRow
            .insertCell(7)
            .appendChild(document.createTextNode(product.rating.toString()));
    });
    $("#productsTableHTML").trigger("update");
}
function sortProductsTable(column, order) {
    $("#productsTableHTML").trigger("sorton", [[[column, order]]]);
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
    $("#productsTableHTML").tablesorter({
        theme: "blue",
        widgets: ["uitheme", "zebra"],
        widgetOptions: {
            zebra: ["even", "odd"]
        }
    });
});
//# sourceMappingURL=product_table.js.map