import { account } from './user.js';

// Değişkenler ve değerler
var balance = 0;
const balance1 = account.balance1;
const balance2 = account.balance2;
const balance3 = account.balance3;
const user = account.name;
let recieveroption = "";
let attempt = 0;
var timeleft = 120;

// Hoşgeldiniz Mesajı
var a = document.querySelector(
    'h4'
).textContent = `Hoşgeldiniz, ${user}`;

//Gönderici ve Alıcı Hesap seçimi doğrulaması
let submit = document.querySelector('button');
let isDisabled = () => {
    if (amount.value && recieveroption) {
        if (recieveroption === "Seçiniz..") {
            submit.disabled = true
        }
        // Hesap bakiyesi kontrolü
        else if (balance >= amount.value) {
            submit.disabled = false
            document.getElementById("alert").textContent = ""
        }
        else {
            submit.disabled = true;
            document.getElementById("alert").textContent = "Yetersiz bakiye."
        }
    }
};
//Gönderilecek tutarın alınması
let amount = document.querySelector('input[type=number]');
amount.addEventListener('change', () => {
    isDisabled();
})
//Alıcı hesabın alınması
let reciever = document.querySelector('#recieverselector');
reciever.addEventListener('change', (e) => {
    recieveroption = e.target.value;
    isDisabled();
})

//Gönderilen tutarın miktarını kontrol
const submitHandler = (e) => {
    e.preventDefault();
    if (amount.value < 500) {
        alert("Başarılı, Anasayfaya yönlendiriliyorsunuz.")
        location.reload();
    }
    else if (amount.value >= 500) {
        var dogrulama = prompt("Telefonunuza gelen 4 haneli şifreyi giriniz:")
        if (dogrulama === "1234") {
            alert("Başarılı, Anasayfaya yönlendiriliyorsunuz.")
            location.reload();
        }
        else {
            dogrulama = alert("Şifre yanlış.")
            attempt++;
            if (attempt === 3) {
                alert("Hesabınız bloke oldu.")
                location.reload();
            }
        }
    }
};

let submitter = document.querySelector('.form')
submitter.addEventListener('submit', submitHandler)

//Gönderici hesabın seçimi ile bakiye gösterimi
let sender = document.querySelector('#senderselector');
sender.addEventListener('change', (e) => {
    if (e.target.value === 'Vadesiz TL') {
        balance = balance1;
        isDisabled();
        document.querySelector('#balance').textContent = `Bakiye: ${balance1} TL`;
    }
    else if (e.target.value === 'Vadeli TL') {
        balance = balance2;
        isDisabled();
        document.querySelector('#balance').textContent = `Bakiye: ${balance2} TL`;
    }
    else if (e.target.value === 'Vadesiz Dolar') {
        balance = balance3;
        isDisabled();
        document.querySelector('#balance').textContent = `Bakiye: ${balance3} $`;
    }
    else if (e.target.value === 'Seçiniz..') {
        balance = 0;
        isDisabled();
        document.querySelector('#balance').textContent = "Hesap Seçiniz..";
    }
})

//Sayaç
var reloadTimer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(reloadTimer);
        location.reload();
        alert('Oturumunuz sonlandırılmıştır');
    }
    document.getElementById("timer").textContent = `${timeleft} içinde oturum sonlanacak`
    timeleft -= 1;
}, 1000);