class Nota {
    constructor ({id, desc, data, checked = false}) {
        this.id = id
        this.desc = desc
        this.data = data
        this.checked = checked
    }
}

function inserir (nota) {
    var notas = JSON.parse (localStorage.getItem ("notas")) ?? [];
    notas.push (nota);
    localStorage.setItem ("notas", JSON.stringify (notas));
}

function lerDados () {
    return JSON.parse (localStorage.getItem ("notas")) ?? null;
}


function exibirDados () {
    let nodes = document.querySelector ('table').children;
    for (node of nodes) {
        if (node.tagName === 'TBODY') {
            node.remove ();
        }
    }

    let dados = lerDados ();
    let tbody = document.createElement ('tbody');

    if (dados === null) {
        let tr = document.createElement ('tr');
        let td = document.createElement ('td');
        td.setAttribute ('colspan','3');
        td.innerHTML = 'Sem dados armazenados';
        tr.appendChild (td);
        tbody.appendChild (tr);
        document.querySelector ('table').appendChild (tbody);
        return ;
    }

    dados.forEach ( nota => {
        let tr = document.createElement ('tr');
        let cb = document.createElement ('td');
        // let id = document.createElement ('td');
        let desc = document.createElement ('td');
        let data = document.createElement ('td');

        nota.checked ? tr.classList.add ('checked') : '';

        cb.innerHTML = '<input type="checkbox" '+ (nota.checked ? 'checked' : '') +' id="'+nota.id+'">'
        // id.innerHTML = nota.id
        desc.innerHTML = '<label for="'+nota.id+'">'+nota.desc+'</label>'
        data.innerHTML = nota.data.padStart(2,'0')

        tbody.appendChild (tr);
        tr.appendChild (cb)
        // tr.appendChild (id)
        tr.appendChild (desc)
        tr.appendChild (data)
    })
    document.querySelector ('table').appendChild (tbody);
}

exibirDados ();

document.querySelector ('header button').addEventListener ('click', () => {
    document.querySelector ('dialog').showModal ();
})

document.querySelector ("form").addEventListener ("submit", (e) => {
    e.preventDefault ();
    let nota = new Nota ({
        id : (Math.round (new Date () /1)).toString (16),
        desc : document.querySelector ('#desc').value,
        data : document.querySelector ('#data').value,
    })

    //console.log (nota)
    inserir (nota);

    location.reload ();
    // document.querySelector ("form").reset ();
    // exibirDados ();
    // document.querySelector ('dialog').close ()
})

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') {
        let notas = lerDados ();
        let boxes = document.querySelectorAll ('input[type="checkbox"]');
        boxes.forEach ((box, i) => {
            notas[i].checked = box.checked;
        })
        localStorage.clear ()
        localStorage.setItem ("notas", JSON.stringify(notas))
    }
});

document.querySelector ('dialog header button').addEventListener ('click', () => {
    document.querySelector ("form").reset ();
    document.querySelector ('dialog').close ();
})

boxes = document.querySelectorAll ('input[type="checkbox"]')
tr = document.querySelectorAll ('tbody tr')

boxes.forEach ( (box, i) => {
    box.addEventListener ('change', () => {
        if (box.checked) {
            tr[i].classList.add ('checked');
        } else {
            tr[i].classList.remove ('checked');
        }
    })
})

if ('serviceWorker' in navigator) {
    window.addEventListener ('load', () => {
        navigator.serviceWorker.register ('sw.js')
        .then (reg => {
            console.log ('registrado!')
            console.log (reg)
        })
        .catch (err => {
            console.log ('falha ao registrar')
            console.log (err)
        })

        navigator.serviceWorker.ready
        .then( registration => {
            registration.pushManager.getSubscription()
            // registration.pushManager.subscribe({
            //     userVisibleOnly: true //Set user to see every notification
            // })
            // .then(function (subscription) {
            //     toast('Subscribed successfully.');
            //     console.info('Push notification subscribed.');
            //     console.log(subscription);
            // })
            // .catch(function (error) {
            //     console.error('Push notification subscription error: ', error);
            // })

        })
        .catch (function (error) {
            console.error('Error occurred while enabling push ', error);
        });
    })
}

// const notificationButton = document.getElementById("enableNotifications");
// let swRegistration = null;

// initializeApp();

// function initializeApp() {
//   if ("serviceWorker" in navigator && "PushManager" in window) {
//     console.log("Service Worker and Push is supported");

//     //Register the service worker
//     navigator.serviceWorker
//       .register("sw.js")
//       .then(swReg => {
//         console.log("Service Worker is registered", swReg);

//         swRegistration = swReg;
//         initializeUi();
//       })
//       .catch(error => {
//         console.error("Service Worker Error", error);
//       });
//   } else {
//     console.warn("Push messaging is not supported");
//     notificationButton.textContent = "Push Not Supported";
//   }
// }

// function initializeUi() {
//   notificationButton.addEventListener("click", () => {
//     displayNotification();
//   });
// }

// function displayNotification() {
//   if (window.Notification && Notification.permission === "granted") {
//     notification();
//   }
//   // If the user hasn't told if he wants to be notified or not
//   // Note: because of Chrome, we are not sure the permission property
//   // is set, therefore it's unsafe to check for the "default" value.
//   else if (window.Notification && Notification.permission !== "denied") {
//     Notification.requestPermission(status => {
//       if (status === "granted") {
//         notification();
//       } else {
//         alert("You denied or dismissed permissions to notifications.");
//       }
//     });
//   } else {
//     // If the user refuses to get notified
//     alert(
//       "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
//     );
//   }
// }

// function notification() {
//   const options = {
//     body: "Testing Our Notification",
//     icon: "res/notas.png"
//   };
//   swRegistration.showNotification("PWA Notification!", options);
// }
