function changeProductListType(type) {
    if (type === "gallery") {
        document.getElementById("sortDropdown").hidden = true;
        document.getElementById("productsTableHTML").hidden = true;
        document.getElementById("productsGalleryHTML").hidden = false;
    }
    else {
        document.getElementById("sortDropdown").hidden = false;
        document.getElementById("productsTableHTML").hidden = false;
        document.getElementById("productsGalleryHTML").hidden = true;
    }
}
function _generateProductCard(product, index) {
    let imgTop = document.createElement("img");
    imgTop.classList.add("card-img-top");
    imgTop.src = "images/" + product.image;
    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = product.name;
    let subtitle = document.createElement("p");
    subtitle.classList.add("card-text");
    subtitle.innerText =
        "Cena: " + product.price + "zł (" + product.priceVat + "zł)";
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    cardBody.appendChild(createButtonsForRow(index, false));
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("my-2");
    card.appendChild(imgTop);
    card.appendChild(cardBody);
    return card;
}
function refreshProductGallery() {
    let row = document.createElement("div");
    row.classList.add("row");
    productsList.forEach((product, i) => {
        let col = document.createElement("div");
        col.classList.add("col-3");
        if (i % 4 == 0 && i != 0) {
            let page_breaker = document.createElement("div");
            page_breaker.classList.add("w-100");
            row.appendChild(page_breaker);
        }
        col.appendChild(_generateProductCard(product, i));
        row.appendChild(col);
    });
    let productGallery = document.getElementById("productsGalleryHTML");
    $("#productsGalleryHTML").empty();
    productGallery.appendChild(row);
}
$(function () {
    refreshProductGallery();
});
//# sourceMappingURL=product_gallery.js.map