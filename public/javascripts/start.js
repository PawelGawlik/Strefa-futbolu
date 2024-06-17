const body = document.getElementsByTagName("body");
fetch("/style", {
    method: "post",
    body: document.location.search.split("=")[1],
    headers: { 'Content-Type': 'text/plain' }
}).then((res) => {
    return res.json();
}).then((data) => {
    const f = (param1, param2) => {
        const a = [];
        let i;
        if (param1) {
            for (i = 1; i <= param1; i++) {
                a[i] = document.createElement("a");
                a[i].innerText = `Terminarz${i}`;
                a[i].setAttribute("href", `rozgrywki${param2}.html${document.location.search}&term=${i}`);
                body[0].appendChild(a[i]);
            }
        }
        const p = document.createElement("p");
        p.innerText = `Terminarz ${param1 + 1}`;
        body[0].appendChild(p);
        a[i + 1] = document.createElement("a");
        a[i + 1].innerText = "Utwórz";
        body[0].appendChild(a[i + 1]);
        a[i + 1].setAttribute("href", `/rozgrywki${param2}.html${document.location.search}&term=${param1 + 1}`);
    }
    const p1 = document.createElement("p");
    p1.innerText = "Grupy:";
    body[0].appendChild(p1);
    f(data.termnumber, "");
    const p2 = document.createElement("p");
    p2.innerText = "Playoffy:";
    body[0].appendChild(p2);
    f(data.ponumber, 2);
})