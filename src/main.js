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
        td.setAttribute ('colspan','4');
        td.innerHTML = 'Sem dados armazenados';
        tr.appendChild (td);
        tbody.appendChild (tr);
        document.querySelector ('table').appendChild (tbody);
        return ;
    }

    dados.forEach ( nota => {
        let tr = document.createElement ('tr');
        let cb = document.createElement ('td');
        let id = document.createElement ('td');
        let desc = document.createElement ('td');
        let data = document.createElement ('td');

        cb.innerHTML = '<input type="checkbox" '+ (nota.checked ? 'checked' : '') +' id="'+nota.id+'">'
        id.innerHTML = nota.id
        desc.innerHTML = nota.desc
        data.innerHTML = nota.data.padStart(2,'0')

        tbody.appendChild (tr);
        tr.appendChild (cb)
        tr.appendChild (id)
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
    document.querySelector ("form").reset ();
    exibirDados ();
    document.querySelector ('dialog').close ()
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
