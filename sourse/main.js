$(window).on("scroll", function () {
  if ($(window).scrollTop() > 70) {
    $(".header").addClass("change-color");
  } else {
    $(".header").removeClass("change-color");
  }
});
$(document).ready(function () {
  $(".header-burger").click(function (event) {
    $(".header-burger,.navbar-menu").toggleClass("active");
    $("body").toggleClass("lock");
  });
});
$(document).ready(function () {
  $(".faq-title").click(function (event) {
    $(this).toggleClass("active").next().slideToggle(300);
  });
});
$(document).ready(function () {
  const d = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var hours = -d.getTimezoneOffset()/60;
  var date = document.getElementsByClassName("Date");
  for(let index = 0; index<date.length;index++){
  date[index].innerHTML = days[d.getDay()]+", " +months[d.getMonth()] + " " +d.getDate() +" "+ d.getFullYear() + " "+d.getUTCHours()+":"+d.getMinutes()+":"+d.getSeconds()+" "+"UTC ("+ hours +") ";
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        popupOpen(document.getElementById("thank-you"));
        form.reset();
        form.classList.remove("sending");
      } else {
        // alert("Message wasn`t sent");
        popupOpen(document.getElementById("error-message"));
        form.classList.remove("sending");
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("error");
    input.classList.remove("error");
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
;
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 400;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault;
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup-open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup-content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock"); // есть другой lock для бургера!!!

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
;