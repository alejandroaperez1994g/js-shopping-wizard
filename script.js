const step1 = document.querySelector("#step_1");
const step2 = document.querySelector("#step_2");
const step3 = document.querySelector("#step_3");
const step4 = document.querySelector("#step_4");
const initialDate = new Date();
let shoppingData = {};
const buy_button = document.getElementById("buy_button");
let minutesCount = 0;
const popupInfo = document.querySelector(".popup");
let intervalPopup;
const allForms = document.querySelectorAll(".form");

const main_product_right = document.querySelector(".main_product_right");
const next_button_forms =
  main_product_right.querySelectorAll(".next_button_form");
const shippingSelectors = document.querySelectorAll('input[type="radio"]');

const product_picture = document.querySelector(".main_product_left");
const product_info = document.querySelector(".product_information");
const profile_form = document.querySelector(".profile-form");
const address_form = document.querySelector(".address-form ");
const shipping_form = document.querySelector(".shipping-form");
const finish_form = document.querySelector(".finish");

const imgFlavors = document.querySelectorAll(".products_flavors img");
const infoGallery = document.querySelectorAll(
  ".main_product_left_products img"
);

let currentProduct = document.querySelector(".main_product_left_product");
let style = window.getComputedStyle(currentProduct, false);
let srcCurrentProduct = style.backgroundImage.slice(4, -1).replace(/"/g, "");

const termsCheck = document.getElementById("terms");
const buyEnabled = document.getElementById("buyNow");

const giftCheck = document.getElementById("gift-check");
const giftText = document.getElementById("gift-message");
const imageButton = document.querySelector(".select-image");

giftCheck.onchange = function () {
  if (this.checked) {
    giftText.style.display = "block";
    imageButton.style.display = "block";
  } else {
    giftText.style.display = "none";
    imageButton.style.display = "none";
  }
};

termsCheck.onchange = function () {
  if (this.checked) {
    buyEnabled.disabled = false;
    (buyEnabled.style.backgroundColor = "#FFAAA7"),
      (buyEnabled.style.color = "#fff"),
      (buyEnabled.style.cursor = "pointer");
  } else {
    buyEnabled.disabled = true;
    (buyEnabled.style.backgroundColor = "#d3d3d3"),
      (buyEnabled.style.color = "#b8b8b8"),
      (buyEnabled.style.cursor = "default");
  }
};

buyEnabled.addEventListener("click", () => {
  getTimeOfRegistration();
  finishRegistration();
  stopInterval();
});

function finishRegistration() {
  const orderPrice = document.querySelector(".order_price_title");
  const buyButton = document.getElementById("buyNow");
  const termsConditions = document.querySelector(".terms_conditions");
  const completeOrder = document.querySelector(".complete_order");

  orderPrice.textContent = "Order details";
  buyButton.classList.add("hidden");
  termsConditions.classList.add("hidden");
  completeOrder.classList.remove("hidden");
}

Array.from(infoGallery).forEach((gallery) => {
  gallery.addEventListener("mouseover", (event) => {
    let srcInfo = event.target.src;
    let infoMain = document.querySelector(".main_product_left_product");
    infoMain.style.backgroundImage = `url(${srcInfo})`;
  });

  gallery.addEventListener("mouseout", (event) => {
    let infoMain = document.querySelector(".main_product_left_product");
    infoMain.style.backgroundImage = `url(${srcCurrentProduct})`;
  });
});

Array.from(imgFlavors).forEach((flavor) => {
  flavor.addEventListener("click", (event) => {
    let srcFlavor = event.target.src;
    srcCurrentProduct = srcFlavor;
    let imgMain = document.querySelector(".main_product_left_product");
    let nameFlavor = document.querySelector(".title_description");
    let priceFlavor = document.querySelector(".flavorPrice");
    imgMain.style.backgroundImage = `url(${srcFlavor})`;
    nameFlavor.innerHTML = event.target.name;
    priceFlavor.innerHTML = event.target.getAttribute("price");
  });
});

buy_button.addEventListener("click", (e) => {
  const currentPrice = document.querySelector(".flavorPrice");
  const productName = document.querySelector(".title_description");
  shoppingData["price"] = currentPrice.textContent.slice(0, -2);
  shoppingData["productName"] = productName.textContent;
  product_info.classList.add("hidden");
  profile_form.classList.remove("hidden");
  startInterval();
});

Array.from(allForms).forEach((button) => {
  button.addEventListener("submit", (event) => {
    next_form(event);
  });
});

function setShippingDays(event) {
  let days = parseInt(event.target.value);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
  };
  let shippingDay = new Date();
  shippingDay.setDate(shippingDay.getDate() + days);
  shippingDay.setHours(14);
  shippingDay.setMinutes(0);
  firstRangeOfDates = shippingDay.toLocaleDateString("en-US", options);
  shippingDay.setHours(20);
  shippingDay.setMinutes(0);
  secondRangeOfDates = shippingDay.toLocaleDateString("en-US", options);
  shoppingData["rangeOfDelivery"] = [firstRangeOfDates, secondRangeOfDates];
  return [firstRangeOfDates, secondRangeOfDates];
}

function getTimeOfRegistration() {
  const finalDate = new Date();
  const registrationTime = document.querySelector(".registration_time");
  const difMilliseconds = Math.abs(finalDate - initialDate);
  let totalTime = millisToMinutesAndSeconds(difMilliseconds);
  if (totalTime[0] === 0) {
    registrationTime.innerHTML = `Your registration took: <b>${totalTime[1]} seconds</b>`;
  } else {
    registrationTime.innerHTML = `Your registration took: <b>${totalTime[0]} minutes and ${totalTime[1]} seconds</b>`;
  }
  registrationTime.style.display = "block";
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return [minutes, seconds];
}

function resetAll() {
  window.location.reload();
}

function next_form(event) {
  event.preventDefault();
  const sectionForm = event.target.parentElement;
  sectionForm.classList.add("hidden");
  sectionForm.nextElementSibling.classList.remove("hidden");
  saveData(event);
}

function saveData(event) {
  let childs = event.target.children;
  Array.from(childs).forEach((child) => {
    Array.from(child.children).forEach((subChild) => {
      switch (subChild.nodeName) {
        case "INPUT":
          if (!subChild.nextElementSibling) {
            shoppingData[subChild.name] = subChild.value;
          } else if (subChild.name === "shipment") {
            getDaysOfShippment(subChild);
          } else if (subChild.id === "gift-check") {
            getGiftMessage(subChild);
          } else {
            shoppingData[
              subChild.nextElementSibling.textContent
                .toLowerCase()
                .replace(/ /g, "")
            ] = subChild.value;
          }
          break;
        case "SELECT":
          shoppingData[subChild.name] =
            subChild.options[subChild.selectedIndex].text;
          break;
        default:
          break;
      }
    });
  });
}

function getGiftMessage(element) {
  let fileSelected = document.getElementById("image");
  if (element.checked) {
    let textMessage = element.parentElement.nextElementSibling;
    shoppingData["giftMessage"] = textMessage.value;
  }
  if (fileSelected.files.length) {
    shoppingData["giftImageFile"] = {
      name: fileSelected.files[0].name,
      size: fileSelected.files[0].size,
      type: fileSelected.files[0].type,
    };
  }
}

function getDaysOfShippment(element) {
  if (element.checked === true) {
    shoppingData["shippingDays"] = element.value;
    shoppingData["typeOfShipping"] = element.getAttribute("shipping");
    shoppingData["priceofshipping"] = element.getAttribute("price");
  }
  setFinishData();
}

function setFinishData() {
  const nameOfProduct = document.querySelector(".nameOfProduct");
  const priceOfProduct = document.querySelector(".priceOfProduct");
  const rangeOfDelivery = document.querySelector(".rangeOfDelivery");

  const orderPrice = document.querySelector(".order_price_name");
  const orderShipping = document.querySelector(".order_price_shipping");
  const orderTotal = document.querySelector(".order_price_total");

  nameOfProduct.innerHTML = `${shoppingData.productName}`;
  priceOfProduct.innerHTML = `Price: ${shoppingData.price}`;
  rangeOfDelivery.innerHTML = `Between <b>${shoppingData.rangeOfDelivery[0]}</b> and <b>${shoppingData.rangeOfDelivery[1]}</b>`;
  orderPrice.innerHTML = `<b>${shoppingData.productName}:</b> ${shoppingData.price}`;
  orderShipping.innerHTML = `<b>${shoppingData.typeOfShipping}:</b> ${shoppingData.priceofshipping}`;
  orderTotal.innerHTML = `<b>Total:</b> ${
    parseFloat(shoppingData.price) + parseFloat(shoppingData.priceofshipping)
  }`;
}

function show_toast() {
  minutesCount += 1;
  if (minutesCount > 5) {
    stopInterval();
    resetAll();
  } else {
    const close_icon = document.querySelector(".close-icon");
    let textInfo = popupInfo.querySelector("span");
    textInfo.innerHTML = `You started registering <strong>${minutesCount} min ago.</strong>`;
    popupInfo.classList.remove("hide");

    close_icon.onclick = () => {
      popupInfo.classList.add("hide");
    };

    setTimeout(() => {
      console.log("time out");
      popupInfo.classList.add("hide");
    }, 5000);
  }
}

function startInterval() {
  intervalPopup = setInterval(() => {
    show_toast();
  }, 60000);
}
function stopInterval() {
  clearInterval(intervalPopup);
}

Array.from(shippingSelectors).forEach((selector) => {
  selector.addEventListener("click", (e) => {
    const rangeText = document.querySelector(".rangeOfShipping");
    const range = setShippingDays(e);
    rangeText.innerHTML = `<b>${range[0]}</b> and <b>${range[1]}</b>`;
    showEstimatedDates();
  });
});

function showEstimatedDates() {
  const estimatedDates = document.querySelectorAll(".shipping-paraf");
  Array.from(estimatedDates).forEach((elements) => {
    elements.classList.remove("hidden");
  });
}

step1.addEventListener("click", () => {
  console.log("step1");
  product_info.classList.add("hidden");
  profile_form.classList.remove("hidden");
});
step2.addEventListener("click", () => {
  console.log("step2");
  profile_form.classList.add("hidden");
  address_form.classList.remove("hidden");
  console.log(address_form.className);
});
step3.addEventListener("click", () => {
  console.log("step3");
  profile_form.classList.add("hidden");
  address_form.classList.add("hidden");
  shipping_form.classList.remove("hidden");
  finish_form.classList.add("hidden");
});
step4.addEventListener("click", () => {
  console.log("step4");
  profile_form.classList.add("hidden");
  address_form.classList.add("hidden");
  shipping_form.classList.add("hidden");
  finish_form.classList.remove("hidden");
});
