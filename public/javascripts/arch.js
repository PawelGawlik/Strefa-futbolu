$(document).ready( () => {
    const news = document.querySelector("div");
    const button = document.querySelectorAll("button");
    const input = document.querySelector("input");
    fetch( '/style', {
        method: "GET"
    }).then( (res) => {
        return res.json();
    }).then((data)=>{
        const news2 = data.newsnumber;
        let licznik = 1;
        let licznik2 = 1;
        while(licznik2 <= Math.ceil(news2/10)){
            while(licznik <= licznik2 * 10 && licznik <= news2){
                const suma = news2 + 1 - licznik;
                const a = "news" + suma;
                const b = "newstitle" + suma;
                const c = "newsmain" + suma;
                const header = document.createElement("header");
                const article = document.createElement("article");
                const div = document.createElement("div");
                $(div).addClass(`hidden${licznik2}`);
                $(div).hide();
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
                news.appendChild(div);
                licznik++;
            }
        licznik2++;
        }
        $(".hidden1").show();
        let licznik3 = 1;
        if(licznik3===Math.ceil(news2/10)){
            $(button[0]).hide();
        }
        if(licznik3===1){
            $(button[1]).hide();
        }
        $(button[0]).click(() => {
            if(licznik3<Math.ceil(news2/10)){
                $(`.hidden${licznik3}`).hide();
                $(`.hidden${licznik3+1}`).show();
                licznik3++;
            }
            if(licznik3===Math.ceil(news2/10)){
                $(button[0]).hide();
            }
            if(licznik3===2){
                $(button[1]).show();
            }
        })
        $(button[1]).click(() => {
            $(`.hidden${licznik3}`).hide();
            $(`.hidden${licznik3-1}`).show();
            licznik3--;
            if(licznik3===Math.ceil(news2/10)-1){
                $(button[0]).show();
            }
            if(licznik3===1){
                $(button[1]).hide();
            }
        })
    })
})