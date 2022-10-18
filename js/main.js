// Setting up firebase
const firebaseConfig = {
    apiKey: "AIzaSyDMpoSlhWeeUiw4MX-fRH0CuLio_tLi-2w",
    authDomain: "spoints-app.firebaseapp.com",
    databaseURL: "https://spoints-app-default-rtdb.firebaseio.com",
    projectId: "spoints-app",
    storageBucket: "spoints-app.appspot.com",
    messagingSenderId: "185403952318",
    appId: "1:185403952318:web:3460ad5de244091e45e2ef"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}



if (window.location.search.replace("?", "").split("&")[0].split("=")[1]) {
    user = window.location.search.replace("?", "").split("&")[0].split("=")[1]
} else {
    window.location.replace("../login/");
}

document.getElementById("user").innerText = toTitleCase(user)

balanceRef = firebase.database().ref(`users/${user}/spoints`)
maxPoints = 31

balanceRef.on('value', (snapshot) => {
    document.getElementById("balance").innerHTML = `
    <h5 class="card-title">My SP Balance</h5>
    <p>Your total SP balance</p>
        <h2 class="float-right" id="balance-value">${snapshot.val()}</h2>
        <div class="progress" style="height: 10px;">
            <div class="progress-bar bg-green" role="progressbar" style="width: ${snapshot.val()/maxPoints*100}%" aria-valuenow="${snapshot.val}" aria-valuemin="0" aria-valuemax="${maxPoints}" style="color: #1DB954;"></div>
        </div>
    `
}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
}); 

function basicSupport() {
    balance = Number(document.getElementById("balance-value").innerText)
    if ((balance - 1) >= 0){
        firebase.database().ref(`users/${user}`).set({
            spoints: (balance - 1)
        });

        Swal.fire(
            'Purchase Successful!',
            'You have purchased Basic Technical Support. Please show this to Avner for proof',
            'success'
        )
    } else {
        Swal.fire(
            'Not Enough SP',
            'Sorry, you do not have enough SP to purchase this!',
            'error'
        )
    }
}

function premiumSupport() {
    balance = Number(document.getElementById("balance-value").innerText)
    if ((balance - 2) >= 0){
        firebase.database().ref(`users/${user}`).set({
            spoints: (balance - 2)
        });

        Swal.fire(
            'Purchase Success!',
            'You have purchased Premium Technical Support. Please show this to Avner for proof',
            'success'
        )
    } else {
        Swal.fire(
            'Not Enough SP',
            'Sorry, you do not have enough SP to purchase this!',
            'error'
        )
    }
    
}

function topUp(amount, price) {
    (async () => {
        const { value: password } = await Swal.fire({
            title: `Purchase ${amount} SP`,
            text: `Please give Avner ${price} and ask him to enter the secret password`,
            input: 'text',
            inputPlaceholder: 'Secret password'
        })
        
        if (password == "wasd") {
            balance = Number(document.getElementById("balance-value").innerText)
            firebase.database().ref(`users/${user}`).set({
                spoints: (balance + amount)
            });
            Swal.fire("Purchase Success", `${amount} SP has been credited to your account!`, "success")
        }
    })()
}