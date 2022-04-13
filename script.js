const step1 = document.querySelector("#step_1");
const step2 = document.querySelector("#step_2");
const step3 = document.querySelector("#step_3");
const step4 = document.querySelector("#step_4");
const buy_button = document.getElementById("buy_button");
let minutesCount = 0;
const popupInfo = document.querySelector(".popup");
let intervalPopup;

const main_product_right = document.querySelector(".main_product_right");
const next_button_forms =
  main_product_right.querySelectorAll(".next_button_form");

const product_picture = document.querySelector(".main_product_left");
const product_info = document.querySelector(".product_information");
const profile_form = document.querySelector(".profile-form");
const address_form = document.querySelector(".address-form ");
const shipping_form = document.querySelector(".shipping-form");
const finish_form = document.querySelector(".finish");

const imgFlavors = document.querySelectorAll(".products_flavors img");

Array.from(imgFlavors).forEach((flavor) => {
  flavor.addEventListener("click", (event) => {
    let srcFlavor = event.target.src;
    let imgMain = document.querySelector(".main_product_left_product");
    let nameFlavor = document.querySelector(".title_description");
    let priceFlavor = document.querySelector(".flavorPrice");
    imgMain.style.backgroundImage = `url(${srcFlavor})`;
    nameFlavor.innerHTML = event.target.name;
    priceFlavor.innerHTML = event.target.getAttribute("price");
  });
});

buy_button.addEventListener("click", (e) => {
  product_info.classList.add("hidden");
  profile_form.classList.remove("hidden");
  startInterval();
});

Array.from(next_button_forms).forEach((button) => {
  button.addEventListener("click", (event) => {
    next_form(event);
  });
});

function next_form(event) {
  const sectionForm = event.target.parentElement.parentElement;
  sectionForm.classList.add("hidden");
  sectionForm.nextElementSibling.classList.remove("hidden");
}

const show_toast = (e) => {
  minutesCount += 1;
  // if (minutesCount > 5) {
  //   stopInterval();
  // } else {
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
  // }
};

function startInterval() {
  intervalPopup = setInterval(() => {
    show_toast();
  }, 60000);
}
function stopInterval() {
  clearInterval(intervalPopup);
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
