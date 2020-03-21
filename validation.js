function _makeValid(field) {
    field.removeClass("is-invalid");
    field.addClass("is-valid");
}
function _makeInvalid(field) {
    field.removeClass("is-valid");
    field.addClass("is-invalid");
}
function validateProductName() {
    let productNameObject = $("#productName");
    let productName = productNameObject.val();
    let isValid = true;
    if (productName.length == 0)
        isValid = false;
    if (productName.length > 10)
        isValid = false;
    isValid ? _makeValid(productNameObject) : _makeInvalid(productNameObject);
    return isValid;
}
function validateProductCode() {
    let productCodeObject = $("#productCode");
    let productCode = productCodeObject.val();
    let isValid = true;
    if (productCode.length == 0)
        isValid = false;
    if (!new RegExp("^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$").test(productCode))
        isValid = false;
    isValid ? _makeValid(productCodeObject) : _makeInvalid(productCodeObject);
    return isValid;
}
function _calculateProductPriceVat() {
    let productPriceVatObject = $("#productPriceVat");
    let isValid = $("#productPrice").hasClass("is-valid") &&
        $("#productVat").hasClass("is-valid");
    isValid
        ? _makeValid(productPriceVatObject)
        : _makeInvalid(productPriceVatObject);
    if (isValid) {
        let productPrice = $("#productPrice").val();
        let productVat = $("#productVat").val();
        let productPriceVat = parseFloat((productPrice * (productVat / 100)).toFixed(2) + +productPrice).toFixed(2);
        productPriceVatObject.val(productPriceVat);
    }
    else {
        productPriceVatObject.val("");
    }
}
function validateProductPrice() {
    let productPriceObject = $("#productPrice");
    let productPrice = productPriceObject.val();
    let isValid = true;
    if (productPrice.length == 0)
        isValid = false;
    isValid ? _makeValid(productPriceObject) : _makeInvalid(productPriceObject);
    if (productPrice.indexOf(".") == -1 && isValid == true)
        productPriceObject.val(productPrice + ".00");
    _calculateProductPriceVat();
    return isValid;
}
function validateProductVat() {
    let productVatObject = $("#productVat");
    let productVat = productVatObject.val();
    let isValid = true;
    if (productVat.length == 0)
        isValid = false;
    isValid ? _makeValid(productVatObject) : _makeInvalid(productVatObject);
    _calculateProductPriceVat();
    return isValid;
}
function validateProductCategory() {
    let productCategoryObject = $("#productCategory");
    let productCategory = productCategoryObject.val();
    let isValid = true;
    if (productCategory == null || productCategory.length == 0)
        isValid = false;
    isValid
        ? _makeValid(productCategoryObject)
        : _makeInvalid(productCategoryObject);
    return isValid;
}
function validateProductOptionals() {
    let productOptionalsObject = $("#productOptionals");
    let productOptionals = productOptionalsObject.val();
    let isValid = true;
    if (productOptionals.length != 2)
        isValid = false;
    isValid
        ? _makeValid(productOptionalsObject)
        : _makeInvalid(productOptionalsObject);
    return isValid;
}
function validateProductRating() {
    let productRatingObject = $("#productRating");
    let productRating = productRatingObject.val();
    let isValid = true;
    if (productRating == undefined)
        isValid = false;
    isValid ? _makeValid(productRatingObject) : _makeInvalid(productRatingObject);
    //TODO: Fix validation on radio buttons.
    return isValid;
}
function validateProductPhoto() {
    let productImageObject = $("#productImage");
    let productImage = productImageObject.val();
    let isValid = true;
    if (productImage.length == 0)
        isValid = false;
    isValid ? _makeValid(productImageObject) : _makeInvalid(productImageObject);
    return isValid;
}
function validateForm() {
    let isProductNameValid = validateProductName(), isProductCodeValid = validateProductCode(), isProductPriceValid = validateProductPrice(), isProductVatValid = validateProductVat(), isProductCategoryValid = validateProductCategory(), isProductOptionalsValid = validateProductOptionals(), isProductRatingValid = validateProductRating(), isProductPhotoValid = validateProductPhoto();
    return (isProductNameValid &&
        isProductCodeValid &&
        isProductPriceValid &&
        isProductVatValid &&
        isProductCategoryValid &&
        isProductOptionalsValid &&
        isProductRatingValid &&
        isProductPhotoValid);
}
function onSubmitFormClick() {
    alert(validateForm());
}
//# sourceMappingURL=validation.js.map