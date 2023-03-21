'use strict'

const form = document.querySelector('form')
const email = document.getElementById('email')
const password = document.getElementById('password')

const capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const num = "1234567890".split("")
const smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const special = "!@#\$%\^\&*\)\(+=._-".split('')

document.addEventListener('submit', (event) => {
    let errs = "";
    // console.log(password.value.length)
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



