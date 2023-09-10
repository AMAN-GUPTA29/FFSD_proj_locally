'use strict'

// const form = document.querySelector('form')
const email = document.getElementById('email')
const password = document.getElementById('password')

const capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const num = "1234567890".split("")
const smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const special = "!@#\$%\^\&*\)\(+=._-".split('')


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
                //  else {
                //     emailStatusDiv.innerText = "Email is available.";                    
                //     emailStatusDiv.classList.remove('hidden');
                // }
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
                //  else {
                //     emailStatusDiv.innerText = "Email is available.";                    
                //     emailStatusDiv.classList.remove('hidden');
                // }
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
    console.log(password.value.length)
    if (!checkEmail(email.value)){
        errs += "Email must be of format xyz@abc.pqr"
    }
    else 
    if (password.value.length <= 5 || password.value.length >= 21) {
        errs += "Password Must Be At Least Of Length 6 and Max Length Can Be 20.\n"
    } else {
        let p = password.value.split('');
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let final = 1;
        p.forEach(alpha => {
            if (capitalAlpha.includes(alpha)) a++;
            else if (num.includes(alpha)) b++;
            else if (smallAlpha.includes(alpha)) c++;
            else if (special.includes(alpha)) d++;
            else final = 0;
        });

        if(a*b*c*d*final == 0) errs += "Password Must Have Capital, Small, Numeric and Special Characters (!@#\$%\^\&*\)\(+=._-) only.\n"
    }


    if (errs != "") {
        alert(errs)
        event.preventDefault();
    }
});