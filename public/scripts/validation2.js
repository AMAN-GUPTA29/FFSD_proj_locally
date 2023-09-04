'use strict'

// const form = document.querySelector('form')
const email2 = document.getElementById('create-email')
const password2 = document.getElementById('create-password')

const email = document.getElementById('email')
const password = document.getElementById('password')



const capitalAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const num = "1234567890".split("")
const smallAlpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const special = "!@#\$%\^\&*\)\(+=._-".split('')


// function check(mail){
//     let flag = 0
//     mail = mail.split('')
//     // console.log(mail)
//     mail.forEach(element => {
//         if(element == '@'){
//             flag = 1
//         }else if(element == '.' && flag == 1){
//             // console.log(element + " " + flag)
//             flag = 2
//             // return true
//         }
//     });
//     if(flag == 2) return true;
//     else return false
// }


function check(mail) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}$');
    return regex.test(mail)
}

document.getElementById('f1').addEventListener('submit', (event) => {
    let errs = "";
    console.log(password2.value.length)
    if (!check(email2.value)){
        errs += "Email must be of format xyz@abc.pqr"
    }
    else if (password2.value.length <= 5 || password2.value.length >= 21) {
        errs += "Password Must Be At Least Of Length 6 and Max Length Can Be 20.\n"
    } else {
        let p = password2.value.split('');
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


document.getElementById('f2').addEventListener('submit', (event) => {
    let errs = "";
    console.log(password.value.length)
    if (!check(email.value)){
        errs += "Email must be of format xyz@abc.pqr"
    }
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



