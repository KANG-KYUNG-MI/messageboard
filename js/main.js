// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, onValue, ref, set, push, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: "https://testdemo-bcc4e-default-rtdb.europe-west1.firebasedatabase.app/",
    apiKey: "AIzaSyBaP-mpZ5qb9nVOUc0skqw1Qa_RFCdYut4",
    authDomain: "testdemo-bcc4e.firebaseapp.com",
    projectId: "testdemo-bcc4e",
    storageBucket: "testdemo-bcc4e.appspot.com",
    messagingSenderId: "473562919668",
    appId: "1:473562919668:web:0298d1bc67e073ea6764a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);


onValue(ref(db, "alrik"), (snapshot) => {
    let key = snapshot.key
    let data = snapshot.val()
    console.log(key, data);
    document.getElementsByClassName("items")[0].innerHTML = `<li> ${data} </li>`
}


);

onValue(ref(db, "/"), (snapshot) => {
    document.getElementsByClassName("items")[0].innerHTML = "" // clear

    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log("loop", childKey, childData)

        if (childData.name === "Alrik") { // matches the user on the browser
            const itemRow = createItem(childKey, childData.message, childData.name);
            items.appendChild(itemRow);

            /*
                            document.getElementsByClassName("items")[0].innerHTML +=
                            `<li class=""><div class="item"><span class="item_name">${childKey+" "+childData.name + ": " + childData.message}</span><button class="item_delete"><i class="fa-solid fa-trash-can"></i></button></div><div class="item_divider"></div></li>`
          */
        } else  // other ppls messages
            document.getElementsByClassName("items")[0].innerHTML +=
                `<li class="item_row"><div class="item"><span class="item_name">${childKey + " " + childData.name + ": " + childData.message}</span></div><div class="item_divider"></div></li>`
        // `<li> ${childData} </li>`

    });
});


const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addbtn = document.querySelector('.footer_button');

document.getElementById('btn').addEventListener('click', (event) => {
    let input = document.getElementById("inputName").value;
    console.log(input);
    push(ref(db, "/"), {
        message: input,
        name: "Alrik"
    });
});

function onAdd() {



    const text = input.value;
    console.log(text);

    if (text === '') {
        input.focus();
        return;
    }

    const itemRow = createItem(text);
    items.appendChild(itemRow);


    input.value = '';
    input.focus();
}

function createItem(key, text, name) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item_row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');


    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item_name');
    itemName.innerText = name + ": " + text;


    const itemDeleteBtn = document.createElement('button');
    itemDeleteBtn.setAttribute('class', 'item_delete');
    itemDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';


    itemDeleteBtn.addEventListener('click', () => {
        //items.removeChild(itemRow);
        // alert(key + " is removed")
        remove(ref(db, key))
        // removing yourself from db

    })

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item_divider');

    item.appendChild(itemName);
    item.appendChild(itemDeleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}


addbtn.addEventListener('click', () => {
    onAdd();
    console.log("add stuff");
}
);

input.addEventListener('keypress', (event) => {
    console.log(event.key);
    if (event.key == "Enter") {
        console.log("you pressed enter");
        onAdd()
    }
});
