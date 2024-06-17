const span = document.querySelector("span");
const body = document.querySelector("body");
const div = document.querySelector("div");
const url = window.location.pathname;
const tab = url.split("/");
fetch(`/news2${document.location.search}`, {
    method: "get"
}).then((res) => {
    return res.json();
}).then((data) => {
    const article = document.querySelector("article");
    const header = document.querySelector("header")
    const node = document.createTextNode(data[1]);
    const node2 = document.createTextNode(data[0]);
    let licznik = 0;
    header.appendChild(node2);
    article.appendChild(node);
    span.innerText = data[2];
    while (licznik < data[2]) {
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        h2.innerText = data[2 * licznik + 3];
        p.innerText = data[2 * licznik + 4];
        div.appendChild(h2);
        div.appendChild(p);
        licznik++;
    }
})

