$(document).ready( () => {
    const img = document.querySelectorAll("img");
    const news = document.querySelector(".news");
    if(img[0].getAttribute("src")===""){
        img[0].setAttribute("src", "../images/sf.jpg");
    }
    if(img[1].getAttribute("src")==="brakstrz"){
        img[1].remove();
    }
    fetch( '/style', {
        method: "GET"
    }).then( (res) => {
        return res.json();
    }).then((data)=>{
        const news2 = data.newsnumber;
        let licznik = news2;
        while(licznik > news2-10 && licznik > 0){
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
            link.setAttribute("href", `/news.html/${a}`);
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
        const arch = document.createElement("a");
        arch.innerText = "Archiwum wiadomości";
        arch.setAttribute("href", "/arch.html");
        news.appendChild(arch);
    })
})