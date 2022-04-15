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

const termsCheck = document.getElementById("terms");
const buyEnabled = document.getElementById("buyNow");

const giftCheck = document.getElementById('gift-check');
const giftText = document.getElementById('gift-message');
const imageButton = document.querySelector('.select-image');

giftCheck.onchange = function() {
    if (this.checked) {
        giftText.style.display = 'block'
        imageButton.style.display = 'block'
    } else {
        giftText.style.display = 'none'
        imageButton.style.display = 'none'
    }
}

termsCheck.onchange = function() {
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
});

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
  shoppingData["price"] = currentPrice.textContent.slice(0, -2);
  product_info.classList.add("hidden");
  profile_form.classList.remove("hidden");
  startInterval();
});

Array.from(next_button_forms).forEach((button) => {
  button.addEventListener("click", (event) => {
    next_form(event);
  });
});

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

function next_form(event) {
  const sectionForm = event.target.parentElement.parentElement;
  sectionForm.classList.add("hidden");
  sectionForm.nextElementSibling.classList.remove("hidden");
  saveData(event);
}

function saveData(event) {
  let childs = event.target.parentElement.children;
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
              subChild.nextElementSibling.textContent.toLowerCase()
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
  }
}

const show_toast = (e) => {
  minutesCount += 1;
  if (minutesCount > 5) {
    stopInterval();
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

form1.addEventListener('focusout', event => {
    event.preventDefault();

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
    }else if(passwordValue.length > 20){
        setError(password, 'Password must be less than 20 characters');
    }else if(!isValidPassword(passwordValue)){
        setError(password, 'Password require one number, one uppercase character, one lowercase character, and one special character');
    }else{
        setSuccess(password);
    }

    //repeat password
    if(rPasswordValue === ''){
        setError(rpassword, 'Please confirm your password');
    }else if(rPasswordValue !== passwordValue){
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

const setError2 = (element, message) => {
    const inputText = element.parentElement;
    const errorDisplay = inputText.querySelector('.error2');

    errorDisplay.innerText = message; //to access to div content
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

const setSuccess2 = element => {
    const inputText = element.parentElement;
    const errorDisplay = inputText.querySelector('.error2');

    errorDisplay.innerText = '';
    inputText.classList.add('success');
    inputText.classList.remove('error');
}

//ADDRESS FORM
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const birthday = document.querySelector('#bday');
const address1 = document.querySelector('#address1');
const address2 = document.querySelector('#address2');
const posCode = document.querySelector('#posCode');
const country = document.querySelector('#country');
const phCode = document.querySelector('#phCode');
const ph = document.querySelector('#ph');
const form2 = document.querySelector('#form2');

form2.addEventListener('focusout', event => {
    event.preventDefault(); //remove

    validateInputs2();
});

const validateInputs2 = () => {
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const address1Value = address1.value.trim();
    const address2Value = address2.value.trim();
    const posCodeValue = posCode.value.trim();
    const countryValue = country.options[country.selectedIndex].text;
    const phValue = ph.value.trim();


    if(fnameValue === ''){
        setError(fname, 'First name is required');
    }else if(fnameValue.length > 20){
        setError(fname, 'First name is too long');
    }else{
        setSuccess(fname);
    }

    if(lnameValue === ''){
        setError(lname, 'Last name is required');
    }else if(lnameValue.length > 20){
        setError(lname, 'Last name is too long');
    }else{
        setSuccess(lname);
    }
    
    if(birthday.value === ''){
        setError(birthday, 'Cannot be empty');
    }else{
        setSuccess(birthday);
    }

    if(address1Value === ''){
        setError(address1, 'Cannot be empty');
    }else if(address1Value.length > 50){
        setError(address1, 'Address is too long');
    }else{
        setSuccess(address1);
    }

    if(address2Value.length > 50){
        setError(address2, 'Address is too long');
    }else{
        setSuccess(address2);
    }

    if(posCodeValue === ''){
        setError(posCode, 'Please add your postal code');
    }else if(posCodeValue.length > 5){
        setError(posCode, 'Postal code should be less than 5 digits');
    }else{
        setSuccess(posCode);
    }
    
    if(countryValue === 'Select country...'){
        setError2(country, 'Please select your country');
    }else{
        setSuccess2(country); 
    }
    
    if(phValue == ''){
        setError2(ph, 'Phone number is required');
    }else if(phValue.length > 9){
        setError2(ph, 'Phone number is too long');
    }else{
        setSuccess2(ph);
    }

}

document.querySelector("#country").onchange = function(){
    document.querySelector("#phCode").value = this.value;
};

//testing
/**/
document.querySelector('.h2').addEventListener('click', () => {
    console.log(fname.value);
    console.log(lname.value);
    console.log(birthday.value);
    console.log(address1.value);
    console.log(address2.value);
    console.log(posCode.value);
    console.log(country.value);
    console.log('tel: ' + phCode.options[phCode.selectedIndex].value + ' ' + ph.value);
});