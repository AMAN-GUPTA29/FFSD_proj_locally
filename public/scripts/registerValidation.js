'use strict'

// const form = document.querySelector('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}/;

const capitalAlpha = /[A-Z]/
const num = /[0-9]/
const smallAlpha = /[a-z]/
const special = /[!@#\$%\^\&*\)\(+=._-]/

function checkEmail(email) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}$');
    let emailStatusDiv = document.getElementById("email-status");

    if (regex.test(email)) {
        emailStatusDiv.classList.add('hidden');

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let res = JSON.parse(xhr.response);
                if (res.isNotPresent) {
                    emailStatusDiv.innerText = "Email is already taken. Please choose another.";
                    emailStatusDiv.classList.remove('hidden');
                }

            }
        };

        xhr.open('GET', `http://localhost:8000/api/adminmail/${email}`);
        xhr.send();
        return true;
    } else {
        emailStatusDiv.innerText = "Please enter a valid email address.";
        emailStatusDiv.classList.remove('hidden');
        return false;
    }
}

function checksellermail(email) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}$');
    let emailStatusDiv = document.getElementById("email-status");

    if (regex.test(email)) {
        emailStatusDiv.classList.add('hidden');

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                let res = JSON.parse(xhr.response);
                if (!res.isNotPresent) {
                    emailStatusDiv.style.color = "red"
                    emailStatusDiv.innerText = "Email is already taken. Please choose another one.";
                    emailStatusDiv.classList.remove('hidden');
                }
                
            }
        };
        
        xhr.open('GET', `http://localhost:8000/api/sellermail/${email}`);
        xhr.send();
        return true;
    } else {
        emailStatusDiv.innerText = "Please enter a valid email address.";
        emailStatusDiv.classList.remove('hidden');
        return false;
    }
}

document.addEventListener('submit', (event) => {
    let errs = "";

    if (!checkEmail(email.value)) {
        errs += "Email must be of format xyz@abc.pqr\n";
    }

    if (password.value.length < 6 || password.value.length > 20) {
        errs += "Password must be between 6 and 20 characters in length.\n";
    } else if (!passwordRegex.test(password.value)) {
        errs += "Password Must Have Capital, Small, Numeric, and Special Characters (!@#$%^&*)(+=._-) only.\n";
    }

    if (errs !== "") {
        alert(errs);
        event.preventDefault();
    } else {
        const form = document.querySelector(".form");
        const submitButton = document.querySelector("#submitButton");

        event.preventDefault();
        const loading = document.querySelector("#loading");
        loading.classList.remove("d-none");
        const delay = 800; 
        setTimeout(function () {
            loading.classList.add("d-none");
            form.submit();
        }, delay);
    }
});




  
  