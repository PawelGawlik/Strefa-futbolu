$(document).ready(() => {
    const img = document.querySelectorAll("img");
    const news = document.querySelector(".news");
    const tabela = document.querySelector(".tabela");
    if (img[0].getAttribute("src") === "") {
        img[0].setAttribute("src", "../images/sf.jpg");
    }
    if (img[1].getAttribute("src") === "brakstrz") {
        img[1].remove();
    }
    fetch('/style', {
        method: "post",
        body: document.location.search.split("=")[1],
        headers: { 'Content-Type': 'text/plain' }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        const news2 = data.newsnumber;
        let licznik = news2;
        while (licznik > news2 - 10 && licznik > 0) {
            const a = "news" + licznik;
            const b = "newstitle" + licznik;
            const c = "newsmain" + licznik;
            const header = document.createElement("header");
            const article = document.createElement("article");
            const div = document.createElement("div");
            const hr = document.createElement("hr");
            const node1 = document.createTextNode(data[b]);
            const node2 = document.createTextNode(data[c]);
            const link = document.createElement("a");
            link.setAttribute("href", `/news.html?id=${document.location.search.split("=")[1]}&news=${a}`);
            const node3 = document.createTextNode("Więcej");
            header.appendChild(node1);
            article.appendChild(node2);
            link.appendChild(node3);
            div.appendChild(header);
            div.appendChild(article);
            div.appendChild(link);
            div.appendChild(hr);
            $(div).addClass("danawiad");
            news.appendChild(div);
            licznik--;
        }
        const table = document.createElement("table");
        const f = () => {
            const termArr = [];
            for (let i = 0; i < data.termnumber; i++) {
                termArr.push(data[`terminarz${i + 1}`]);
            }
            const term = Math.floor((Math.random() * termArr.length) + 1);
            const teams = data[`terminarz${term}`] ? data[`tabela${term}`].length : 0;
            for (let i = 0; i < teams; i++) {
                const tr = document.createElement("tr");
                const t = [];
                for (let k = 0; k < 6; k++) {
                    t[k] = document.createElement("td");
                }
                tr.appendChild(t[0]);
                t[0].innerText = data[`tabela${term}`] ? data[`tabela${term}`][i].miejsce : i + 1;
                tr.appendChild(t[1]);
                t[1].innerText = data[`tabela${term}`][i].druzyna;
                tr.appendChild(t[2]);
                t[2].innerText = data[`tabela${term}`] ? data[`tabela${term}`][i].mecze : 0;
                tr.appendChild(t[3]);
                t[3].innerText = data[`tabela${term}`] ? data[`tabela${term}`][i].punkty : 0;
                tr.appendChild(t[4]);
                t[4].innerText = data[`tabela${term}`] ? data[`tabela${term}`][i].strzelone : 0;
                tr.appendChild(t[5]);
                t[5].innerText = data[`tabela${term}`] ? data[`tabela${term}`][i].stracone : 0;
                table.appendChild(tr);
                tabela.appendChild(table);
            }
            if (data.termnumber) {
                const a = document.createElement("a");
                a.setAttribute("href", `/terminarz.html${document.location.search}&term=${term}`);
                a.innerText = "Więcej";
                tabela.appendChild(a);
            }
        }
        f();
        const arch = document.createElement("a");
        arch.innerText = "Archiwum wiadomości";
        arch.setAttribute("href", `/arch.html?id=${document.location.search.split("=")[1]}`);
        news.appendChild(arch);
    })
})