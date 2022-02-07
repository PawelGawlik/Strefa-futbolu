$(document).ready( () => {
    const terminarz = document.querySelector(".terminarz");
    const button = document.querySelector("button");
    const table = document.querySelector("table");
    const f1 = (par) => {
    fetch('/terminarz2').then((res) => {
        return res.json();
    }).then( (data) => {
        let licznik2 = 1;
        const div = [];
        const span1 = [];
        const span2 = [];
        const p = [];
        while(licznik2<=data[0].teams.length-1){
            p[licznik2-1] = document.createElement("p");
            p[licznik2-1].innerText = `kolejka${licznik2}`;
            terminarz.appendChild(p[licznik2-1]);
            div[licznik2-1] = [];
            span1[licznik2-1] = [];
            span2[licznik2-1] = [];
            let licznik = 0;
            while(licznik<data[0].teams.length/2){
                div[licznik2-1][licznik] = document.createElement("div");
                span1[licznik2-1][licznik] = document.createElement("span");
                span2[licznik2-1][licznik] = document.createElement("span");
                terminarz.appendChild(div[licznik2-1][licznik]);
                div[licznik2-1][licznik].innerHTML = data[0][`kolejka${licznik2}`][licznik][0]+" "+`<span class=span1-${licznik2}-${licznik}></span>`+":"+`<span class=span2-${licznik2}-${licznik}></span>`+" "+data[0][`kolejka${licznik2}`][licznik][1];
                licznik++;
            }
            licznik2++;
        }
        const f2 = (par) => {
        fetch('/terminarz4').then((res) => {
            return res.json();
        }).then((data2) => {
            if(data2!==""){
            for(let l1 = 1; l1<=data[0].teams.length; l1++){
                for(let l2 = 1; l2<=data[0].teams.length; l2++){
                    if(l1!==l2){
                        for(let l3 = 1; l3<=data[0].teams.length-1; l3++){
                            for(let l4 = 0; l4<data[0].teams.length/2; l4++){
                                if(!par){
                                if(data2[`wynik${l1}${l2}`][0]===data[0][`kolejka${l3}`][l4][0]&&data2[`wynik${l1}${l2}`][3]===data[0][`kolejka${l3}`][l4][1]){
                                    $(`.span1-${l3}-${l4}`).text(data2[`wynik${l1}${l2}`][1]);
                                    $(`.span2-${l3}-${l4}`).text(data2[`wynik${l1}${l2}`][2]);
                                }
                                }else{
                                if(data2[`wynik${l1}${l2}`][0]===data[0][`kolejka${l3}`][l4][1]&&data2[`wynik${l1}${l2}`][3]===data[0][`kolejka${l3}`][l4][0]){
                                    $(`.span3-${l3}-${l4}`).text(data2[`wynik${l1}${l2}`][1]);
                                    $(`.span4-${l3}-${l4}`).text(data2[`wynik${l1}${l2}`][2]);
                                } 
                                }
                            }
                        }
                    }
                }
            }
            }
        })
        }
        f2(0);
        if(par===1){
            while(licznik2<=2*(data[0].teams.length-1)){
                p[licznik2-data[0].teams.length].innerText = `kolejka${licznik2}`;
                licznik2++;
            }
            licznik2 = 1;
            while(licznik2<=data[0].teams.length-1){
                licznik = 0;
                while(licznik<data[0].teams.length/2){
                    div[licznik2-1][licznik].innerHTML = data[0][`kolejka${licznik2}`][licznik][1]+" "+`<span class=span3-${licznik2}-${licznik}></span>`+":"+`<span class=span4-${licznik2}-${licznik}></span>`+" "+data[0][`kolejka${licznik2}`][licznik][0];
                    licznik++;
                }
                licznik2++;
            }
        f2(1);
        }
    })
    }
    f1(0);
    $(button).click( () => {
        f1(1);
        $(button).hide();
        fetch('/terminarz5', {
            method: 'POST'
        })
    })
    fetch('/terminarz5').then((res) => {
        return res.json();
    }).then((data) => {
        if(data===1){
            $(button).trigger('click');
        }
    })
    fetch('/tabela').then((res) => {
        return res.json();
    }).then((data) => {
        if(data !== ""){
            const tr = [];
            for(let licznik3 = 0; licznik3<data.length; licznik3++){
                tr[licznik3] = document.createElement("tr");
                table.appendChild(tr[licznik3]);
                for(const a in data[licznik3]){
                    const td = document.createElement("td");
                    td.innerText = data[licznik3][a];
                    tr[licznik3].appendChild(td);
                }
            }
        }
    })
})