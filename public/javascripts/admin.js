$(document).ready(() => {
    const input = document.querySelectorAll("input[type='file']");
    const button = document.querySelectorAll("button");
    const textarea = document.querySelector("textarea[name='tekst']");
    const p = document.querySelectorAll("p");
    const input2 = document.querySelectorAll("input[type='color']");
    const input3 = document.querySelectorAll("input[type='number']");
    const strz = document.querySelector("input[name='strz']");
    const select = document.querySelectorAll("select");
    const textarea2 = document.querySelector("textarea[name='newsmain']");
    const textarea3 = document.querySelector("textarea[name='news']");
    const input4 = document.querySelector("input[name='newstitle']");
    const a = document.querySelectorAll("a");
    const form = document.querySelectorAll("form");
    form[1].setAttribute("action", `/news?id=${document.location.search.split("=")[1]}`);
    fetch('/style', {
        method: "post",
        body: document.location.search.split("=")[1],
        headers: { 'Content-Type': 'text/plain' }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        $(input3[0]).val(data.fontsize);
        $(input2[0]).val(data.fontcolor);
        $(select[0]).val(data.fontstyle);
        button[1].innerText = data.strz === "brakstrz" ? "Przywróć" : "Usuń"
        $(input3[1]).val(data.fontsize2);
        $(input2[3]).val(data.fontcolor2);
        $(select[1]).val(data.fontstyle2);
        $(input3[2]).val(data.fontsize3);
        $(input2[4]).val(data.fontcolor3);
        $(input2[1]).val(data.bgcolor);
        $(input2[2]).val(data.bgcolor2);
        p[0].innerText = "Witaj " + data.login + " !";
        a[0].setAttribute("href", `/main1?id=${data.id2}`);
        a[1].setAttribute("href", `/main2?id=${data.id2}`);
        a[2].setAttribute("href", `/start.html?id=${data.id2}`);
    })
    function printFile(file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
            $(textarea).val(evt.target.result);
        };
        reader.readAsDataURL(file);
    }
    $(button[0]).click((event) => {
        event.preventDefault();
        printFile(input[0].files[0]);
        $(button[0]).replaceWith("<p>ZROBIONE!</p>");
    })
    $(button[1]).click((event) => {
        event.preventDefault();
        if (button[1].innerText === "Usuń") {
            $(strz).val("brakstrz");
            button[1].innerText = "Przywróć";
        } else {
            $(strz).val("../images/strz2.jpg");
            button[1].innerText = "Usuń";
        }
    })
    $(button[3]).click((event) => {
        if ($(textarea2).val === "" || $(textarea3).val() === "" || $(input4).val() === "") {
            event.preventDefault();
        }
    })
    /*fetch('/wstep', {
        method: "post",
        body: document.location.search.split("=")[1],
        headers: { 'Content-Type': 'text/plain' }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        p[0].innerText = "Witaj " + data.login + " !";
    })*/
})
