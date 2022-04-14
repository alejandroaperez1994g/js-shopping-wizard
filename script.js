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
const infoGallery = document.querySelectorAll(
  ".main_product_left_products img"
);

let currentProduct = document.querySelector(".main_product_left_product");
let style = window.getComputedStyle(currentProduct, false);
let srcCurrentProduct = style.backgroundImage.slice(4, -1).replace(/"/g, "");
console.log(srcCurrentProduct);

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

//PROFILE FORM VALIDATION
const username = document.querySelector('#uname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const rpassword = document.querySelector('#rpassword');
const form1 = document.querySelector('#form1');

form1.addEventListener('focusout', () => {
    validateInputs();
});

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const rPasswordValue = rpassword.value.trim();

    //username
    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else if(usernameValue.length < 5){
        setError(username, 'Username is too short');
    } else if(usernameValue.length > 20){
        setError(username, 'Username is too long');
    }else {
        setSuccess(username);
    }

    //email
    if(emailValue === ''){
        setError(email, 'Email is required');
    }else if(!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email address');
    }else if((!isValidEmail(emailValue)) || (emailValue.length > 50)){
        setError(email, 'Provide a valid email address');
    }else{
        setSuccess(email);
    }

    //password
    if(passwordValue === ''){
        setError(password, 'Password is required');
    }else if(passwordValue.length < 8){
        setError(password, 'Password must be at least 8 characters');
    }else if(!isValidPassword(passwordValue)){
        setError(password, 'Password require one number, one uppercase character, one lowercase character, and one special character');
    }else{
        setSuccess(password);
    }

    //repeat password
    if(rPasswordValue === ''){
        setError(rpassword, 'Please confirm your password');
    }else if(rpassword !== password){
        setError(rpassword, "Passwords doesn't match");
    }else{
        setSuccess(rpassword);
    }

}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidPassword = password => {
    const decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return decimal.test(String(password));
}

const setError = (element, message) => {
    const inputText = element.parentElement;
    const errorDisplay = inputText.querySelector('.error');

    errorDisplay.innerText = message;
    inputText.classList.add('error');
    inputText.classList.remove('success');
}

const setSuccess = element => {
    const inputText = element.parentElement;
    const errorDisplay = inputText.querySelector('.error');

    errorDisplay.innerText = '';
    inputText.classList.add('success');
    inputText.classList.remove('error');
}
