$(document).ready(() => {
    const span = document.querySelector("span");
    const button = document.querySelector("button");
    const input = document.querySelectorAll("input");
    const body = document.querySelector("body");
    const form = document.querySelectorAll("form");
    fetch('/odw').then((res)=> {
        return res.json();
    }).then((data) => {
        span.innerText = data.odwiedziny;  
    })
    const f1 = (par1) => {
        const p = document.createElement("p");
        $(p).addClass("uwaga");
        p.innerText = par1;
        body.appendChild(p);
        setTimeout(()=>{
            $(".uwaga").remove();
        }, 3000);
    }
    $(button).click( (event) => {
        if($(input[0]).val().length<5||$(input[1]).val().length<5){;
            event.preventDefault();
            f1("Login i hasło muszą mieć conajmniej pięć znaków!");
            return;
        }
        if(($(input[1]).val()!==$(input[2]).val())&&
        (!($(input[0]).val().length<5||$(input[1]).val().length<5))){
            event.preventDefault();
            f1("Hasła nie są identyczne!");
            return;
        }
        const rej = {
            login: $(input[0]).val(),
            password: $(input[1]).val()
        }
        const rej2 = JSON.stringify(rej);
        let ev = 1;
        fetch('/rejestracja', {
            method: 'POST',
            body: rej2,
            headers: {'Content-Type': 'application/json'}
        }).then( (res) => {
            return res.json();
        }).then( (data) => {
            if(data.length===1){
                f1("Login i hasło nieodpowiednie!");
            }else{
                $(form[0]).submit();
            }
        })
        event.preventDefault();
    })
})