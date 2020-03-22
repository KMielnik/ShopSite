function _makeValid(field: JQuery) {
  field.removeClass("is-invalid");
  field.addClass("is-valid");
}

function _makeInvalid(field: JQuery) {
  field.removeClass("is-valid");
  field.addClass("is-invalid");
}

function validateProductName(): boolean {
  let productNameObject = $("#productName") as JQuery<HTMLInputElement>;
  let productName = productNameObject.val() as string;

  let isValid = true;

  if (productName.length == 0) isValid = false;

  if (productName.length > 10) isValid = false;

  isValid ? _makeValid(productNameObject) : _makeInvalid(productNameObject);

  return isValid;
}

function validateProductCode(): boolean {
  let productCodeObject = $("#productCode") as JQuery<HTMLInputElement>;
  let productCode = productCodeObject.val() as string;

  let isValid = true;

  if (productCode.length == 0) isValid = false;

  if (!new RegExp("^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$").test(productCode))
    isValid = false;

  isValid ? _makeValid(productCodeObject) : _makeInvalid(productCodeObject);

  return isValid;
}

function _calculateProductPriceVat() {
  let productPriceVatObject = $("#productPriceVat") as JQuery<HTMLInputElement>;

  let isValid =
    $("#productPrice").hasClass("is-valid") &&
    $("#productVat").hasClass("is-valid");

  isValid
    ? _makeValid(productPriceVatObject)
    : _makeInvalid(productPriceVatObject);

  if (isValid) {
    let productPrice = $("#productPrice").val() as number;
    let productVat = $("#productVat").val() as number;

    let productPriceVat = (
      parseFloat((productPrice * (productVat / 100)).toFixed(2)) + +productPrice
    ).toFixed(2);

    productPriceVatObject.val(productPriceVat);
  } else {
    productPriceVatObject.val("");
  }
}

function validateProductPrice(): boolean {
  let productPriceObject = $("#productPrice") as JQuery<HTMLInputElement>;
  let productPrice = productPriceObject.val() as string;

  let isValid = true;

  if (productPrice.length == 0) isValid = false;

  isValid ? _makeValid(productPriceObject) : _makeInvalid(productPriceObject);

  if (productPrice.indexOf(".") == -1 && isValid == true)
    productPriceObject.val(productPrice + ".00");

  _calculateProductPriceVat();

  return isValid;
}

function validateProductVat(): boolean {
  let productVatObject = $("#productVat") as JQuery<HTMLInputElement>;
  let productVat = productVatObject.val() as string;

  let isValid = true;

  if (productVat.length == 0) isValid = false;

  isValid ? _makeValid(productVatObject) : _makeInvalid(productVatObject);

  _calculateProductPriceVat();

  return isValid;
}

function validateProductCategory(): boolean {
  let productCategoryObject = $("#productCategory") as JQuery<
    HTMLSelectElement
  >;
  let productCategory = productCategoryObject.val() as string;

  let isValid = true;

  if (productCategory == null || productCategory.length == 0) isValid = false;

  isValid
    ? _makeValid(productCategoryObject)
    : _makeInvalid(productCategoryObject);

  return isValid;
}

function validateProductOptionals(): boolean {
  let productOptionalsObject = $("#productOptionals") as JQuery<
    HTMLSelectElement
  >;
  let productOptionals = productOptionalsObject.val() as string[];

  let isValid = true;

  if (productOptionals.length != 2) isValid = false;

  isValid
    ? _makeValid(productOptionalsObject)
    : _makeInvalid(productOptionalsObject);

  return isValid;
}

function validateProductRating(): boolean {
  let productRatingObject = $("input[name=productRating]:checked") as JQuery<
    HTMLInputElement
  >;
  let productRating = productRatingObject.val();

  let isValid = true;

  if (productRating == undefined) isValid = false;

  isValid ? _makeValid(productRatingObject) : _makeInvalid(productRatingObject);
  //TODO: Fix validation on radio buttons.

  return isValid;
}

function validateProductPhoto(): boolean {
  let productImageObject = $("#productImage") as JQuery<HTMLInputElement>;
  let productImage = productImageObject.val() as string;

  let isValid = true;

  if (productImage.length == 0) isValid = false;

  isValid ? _makeValid(productImageObject) : _makeInvalid(productImageObject);

  return isValid;
}

function validateForm(): boolean {
  let isProductNameValid = validateProductName(),
    isProductCodeValid = validateProductCode(),
    isProductPriceValid = validateProductPrice(),
    isProductVatValid = validateProductVat(),
    isProductCategoryValid = validateProductCategory(),
    isProductOptionalsValid = validateProductOptionals(),
    isProductRatingValid = validateProductRating(),
    isProductPhotoValid = validateProductPhoto();

  return (
    isProductNameValid &&
    isProductCodeValid &&
    isProductPriceValid &&
    isProductVatValid &&
    isProductCategoryValid &&
    isProductOptionalsValid &&
    isProductRatingValid &&
    isProductPhotoValid
  );
}

function _clearValidation() {
  $("#productName").removeClass("is-valid");
  $("#productCode").removeClass("is-valid");
  $("#productPrice").removeClass("is-valid");
  $("#productVat").removeClass("is-valid");
  $("#productPriceVat").removeClass("is-valid");
  $("#productCategory").removeClass("is-valid");
  $("#productOptionals").removeClass("is-valid");
  $("input[name=productRating]:checked").removeClass("is-valid");
  document.getElementById("productRating1").removeAttribute("checked");
  document.getElementById("productRating2").removeAttribute("checked");
  document.getElementById("productRating3").removeAttribute("checked");
  document.getElementById("productRating4").removeAttribute("checked");
  document.getElementById("productRating5").removeAttribute("checked");
  $("#productImage").removeClass("is-valid");
}

function onSubmitFormClick() {
  if (validateForm()) {
    if (productsList.some(product => product.name == $("#productName").val())) {
      showAlert("Ten produkt już istnieje!");
    } else {
      let product = new Product(
        $("#productName").val() as string,
        $("#productCode").val() as string,
        $("#productPrice").val() as number,
        $("#productVat").val() as number,
        $("#productPriceVat").val() as number,
        $("#productCategory").val() as string,
        $("#productOptionals").val() as string[],
        $("input[name=productRating]:checked").val() as number,
        $("#productImage").val() as string
      );

      productsList.push(product);
      refreshProductsListTable();
      (document.getElementById("productsForm") as HTMLFormElement).reset();

      _clearValidation();
    }
  }
}

function editProduct(index: number) {
  if (validateForm()) {
    document.getElementById("editProductButton").hidden = true;
    document.getElementById("addProductButton").hidden = false;

    productsList[index].name = $("#productName").val() as string;
    productsList[index].code = $("#productCode").val() as string;
    productsList[index].price = $("#productPrice").val() as number;
    productsList[index].Vat = $("#productVat").val() as number;
    productsList[index].priceVat = $("#productPriceVat").val() as number;
    productsList[index].category = $("#productCategory").val() as string;
    productsList[index].optionals = $("#productOptionals").val() as string[];
    productsList[index].rating = $(
      "input[name=productRating]:checked"
    ).val() as number;
    productsList[index].image = $("#productImage").val() as string;

    refreshProductsListTable();
    (document.getElementById("productsForm") as HTMLFormElement).reset();

    _clearValidation();
  }
}
