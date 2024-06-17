$(document).ready(function () {
    let l1 = 0;
    const l4 = document.querySelector(".mecze");
    const l5 = document.querySelector(".mecze2");
    const button = document.querySelector("button");
    const wyniki = document.querySelector(".wyniki");
    const a = document.querySelector("a");
    a.setAttribute("href", `terminarz.html${document.location.search}`);
    let teams2;
    $(wyniki).hide();

    while (l1 < 24) {
        const l2 = document.createElement("div");
        const l3 = document.createElement("input");
        $(l2).addClass("mecz");
        $(l3).addClass("mecz");
        $(l3).addClass("mecz2");
        $(l2).addClass(`drużyna${l1}`);
        $(l3).addClass(`drużyna-${l1}`);
        l4.appendChild(l2);
        l5.appendChild(l3);
        l1++;
    }
    l1 = 0;
    const mecz1 = [];
    const druzyna = function (l1) {
        $(`.drużyna-${l1}`).keyup(function () {
            mecz1[l1] = $(this).val();
            $(`.drużyna${l1}`).text(mecz1[l1]);
        })
    }
    while (l1 < 24) {
        druzyna(l1);
        l1++;
    }
    fetch(`/terminarz2${document.location.search}`).then((res) => {
        return res.json();
    }).then((data) => {
        const teamArr = data[0].teams.filter((param) => {
            return param !== "pauza";
        })
        const teams = teamArr.length;
        if (data[0]) {
            const tablica = document.querySelector(".tablica");
            const table = document.createElement("table");
            tablica.appendChild(table);
            let l6 = 0;
            const tr = [];
            while (l6 <= teams) {
                tr[l6] = document.createElement("tr");
                let l7 = 0;
                const td = [];
                while (l7 <= teams) {
                    td[l7] = document.createElement("td");
                    $(td[l7]).addClass(`wynik${l6}${l7}`);
                    tr[l6].appendChild(td[l7]);
                    if (!l6 && l7) {
                        td[l7].innerText = teamArr[l7 - 1];
                    }
                    if (l6 && !l7) {
                        td[l7].innerText = teamArr[l6 - 1];
                    }
                    if (l6 && l7 && l6 !== l7) {
                        td[l7].innerHTML = '<input>' + ":" + '<input>'
                    }
                    l7++;
                }
                table.appendChild(tr[l6]);
                l6++;
            }
            $(wyniki).show();
            teams2 = teamArr;
        }
        if (data[1]) {
            for (let l8 = 1; l8 <= teamArr.length; l8++) {
                for (let l9 = 1; l9 <= teamArr.length; l9++) {
                    if (l8 !== l9) {
                        $(`.wynik${l8}${l9}>input:first`).val(data[1][`wynik${l8}${l9}`][1]);
                        $(`.wynik${l8}${l9}>input:last`).val(data[1][`wynik${l8}${l9}`][2]);
                    }
                }
            }
        }
    })
    let iloscDruzyn;
    const tablica2 = [];
    const funkcja1 = function () {
        let licznik1 = 0;
        iloscDruzyn = tabpar.length;
        while (licznik1 < tabpar.length) {
            let licznik2 = 1;
            while (licznik2 < tabpar.length) {
                const a = tabpar[licznik1] + "-" + tabpar[licznik1 + licznik2];
                if (a.indexOf("undefined") === -1) {
                    tablica2.push(a);
                }
                licznik2++;
            }
            licznik1++;
        }
    }
    l1 = 0;
    const tabpar = [];
    $(button).click(function () {
        fetch(`/terminarz3${document.location.search}`, {
            method: 'POST',
            body: "",
            headers: { 'Content-Type': "text/plain" }
        }).then(() => {
            while (l1 < 24) {
                if ($(`.drużyna${l1}`).text() !== "") {
                    tabpar.push($(`.drużyna${l1}`).text());
                }
                l1++;
            }
            if (tabpar.length % 2 !== 0) {
                tabpar.unshift("pauza");
            }
            funkcja1(tabpar);
            let licznik3 = 0;
            while (licznik3 < tablica2.length) {
                tablica2[licznik3] = tablica2[licznik3].split("-");
                licznik3++;
            }
            licznik3 = 0;
            while (licznik3 < tablica2.length) {
                if (licznik3 % 2 === 1 && tablica2[licznik3].indexOf("pauza") === -1) {
                    tablica2[licznik3].reverse();
                }
                licznik3++;
            }
            const kreatorTablic = function () {
                const tablica = [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]];
                return tablica;
            }
            const tab = [""];
            licznik3 = 1;
            while (licznik3 <= tablica2.length / (0.5 * iloscDruzyn)) {
                tab[licznik3] = kreatorTablic();
                licznik3++;
            }
            const porownanie = function (mecz1, mecz2) {
                let zmienna1 = (mecz1[0] === mecz2[0] || mecz1[0] === mecz2[1] || mecz1[1] === mecz2[0] || mecz1[1] === mecz2[1]);
                return zmienna1;
            }
            const kolejnePorownanie = function (mecz3, mecz4) {
                let zmienna2 = porownanie(mecz3[0], mecz4) || porownanie(mecz3[1], mecz4) || porownanie(mecz3[2], mecz4) || porownanie(mecz3[3], mecz4) || porownanie(mecz3[4], mecz4) || porownanie(mecz3[5], mecz4) || porownanie(mecz3[6], mecz4) || porownanie(mecz3[7], mecz4) || porownanie(mecz3[8], mecz4) || porownanie(mecz3[9], mecz4) || porownanie(mecz3[10], mecz4) || porownanie(mecz3[11], mecz4);
                if (!zmienna2) {
                    mecz3.unshift(mecz4);
                    mecz3.splice(12, 1);
                    return 1;
                } else {
                    return 0;
                }
            }
            const ik = tablica2.length / (0.5 * iloscDruzyn);
            const funkcja2 = function () {
                while (licznik3 < tablica2.length) {
                    let licznik4 = 1;
                    while (licznik4 <= ik) {
                        let zmienna3 = kolejnePorownanie(tab[licznik4], tablica2[licznik3]);
                        if (zmienna3 === 1) {
                            break;
                        }
                        licznik4++;
                    }
                    licznik3++;
                }
            }
            const funkcja3 = function (parametr) {
                while (licznik3 < ik + licznik5 * (ik - 2) - x[licznik5] + parametr) {
                    let licznik4 = 1;
                    while (licznik4 <= ik) {
                        let zmienna3 = kolejnePorownanie(tab[licznik4], tablica2[licznik3]);
                        if (zmienna3 === 1) {
                            break;
                        }
                        licznik4++;
                    }
                    licznik3++;
                }
            }
            licznik3 = 0;
            const x = [0];
            let licznik5 = 0;
            while (licznik5 < 23) {
                x[licznik5 + 1] = x[licznik5] + licznik5;
                licznik5++;
            }
            licznik5 = 0;
            if (iloscDruzyn > 2 * licznik5) {
                while (licznik5 < 23) {
                    while (licznik3 < ik + licznik5 * (ik - 2) - x[licznik5]) {
                        tab[licznik3 - licznik5 * ik + x[licznik5 + 2]].unshift(tablica2[licznik3])
                        tab[licznik3 - licznik5 * ik + x[licznik5 + 2]].splice(12, 1);
                        licznik3++;
                    }
                    funkcja3(licznik5);
                    if (iloscDruzyn === 2 * licznik5 + 2) {
                        funkcja2();
                    }
                    licznik5++;
                }
            }
            const kolejki = {};
            licznik3 = 1;
            while (licznik3 <= tablica2.length / (0.5 * iloscDruzyn)) {
                kolejki[`kolejka${licznik3}`] = tab[licznik3];
                licznik3++;
            }
            kolejki.teams = tabpar;
            const kolejki2 = JSON.stringify(kolejki);
            fetch(`/terminarz${document.location.search}`, {
                method: 'POST',
                body: kolejki2,
                headers: { 'Content-Type': 'application/json' }
            })
            window.location.reload(true);
        })
    })
    $(wyniki).click(() => {
        const wynik = {};
        let licznik6 = 1;
        while (licznik6 <= teams2.length) {
            let licznik7 = 1;
            while (licznik7 <= teams2.length) {
                if (licznik6 !== licznik7) {
                    wynik[`wynik${licznik6}${licznik7}`] = [$(`.wynik${licznik6}0`).text(), $(`.wynik${licznik6}${licznik7}>input:first`).val(), $(`.wynik${licznik6}${licznik7}>input:last`).val(), $(`.wynik0${licznik7}`).text()];
                }
                licznik7++;
            }
            licznik6++;
        }
        licznik6 = 0;
        const mecze = [];
        const punkty = [];
        const punkty2 = [];
        const strzelone = [];
        const stracone = [];
        const roznica = [];
        while (licznik6 < teams2.length) {
            punkty[licznik6] = 0;
            punkty2[licznik6] = 0;
            mecze[licznik6] = 0;
            strzelone[licznik6] = 0;
            stracone[licznik6] = 0;
            for (const a in wynik) {
                if (wynik[a][1] !== "" && wynik[a][2] !== "") {
                    if (wynik[a][0] === teams2[licznik6] && wynik[a][1] > wynik[a][2] || wynik[a][3] === teams2[licznik6] && wynik[a][1] < wynik[a][2]) {
                        punkty[licznik6] = punkty[licznik6] + 3;
                        punkty2[licznik6] = punkty2[licznik6] + 3;
                    }
                    if (wynik[a][0] === teams2[licznik6] && wynik[a][1] === wynik[a][2] || wynik[a][3] === teams2[licznik6] && wynik[a][1] === wynik[a][2]) {
                        punkty[licznik6] = punkty[licznik6] + 1;
                        punkty2[licznik6] = punkty2[licznik6] + 1;
                    }
                    if (wynik[a][0] === teams2[licznik6] || wynik[a][3] === teams2[licznik6]) {
                        mecze[licznik6]++;
                    }
                    if (wynik[a][0] === teams2[licznik6]) {
                        strzelone[licznik6] = strzelone[licznik6] + parseInt(wynik[a][1]);
                        stracone[licznik6] = stracone[licznik6] + parseInt(wynik[a][2]);
                    }
                    if (wynik[a][3] === teams2[licznik6]) {
                        strzelone[licznik6] = strzelone[licznik6] + parseInt(wynik[a][2])
                        stracone[licznik6] = stracone[licznik6] + parseInt(wynik[a][1]);
                    }
                }
            }
            roznica[licznik6] = strzelone[licznik6] - stracone[licznik6];
            licznik6++;
        }
        licznik6 = 0;
        console.log(punkty2);
        const tabela = [];
        const punkty3 = [];
        while (licznik6 < teams2.length) {
            const max = Math.max(...punkty2);
            let licznik7 = 0;
            while (licznik7 < teams2.length) {
                if (punkty2[licznik7] === max) {
                    punkty2.splice(licznik7, 1, "");
                    punkty3.push(max);
                    tabela.push(licznik7);
                }
                licznik7++;
            }
            licznik6++;
        }
        licznik6 = 0;
        while (licznik6 < punkty3.length) {
            let licznik7 = 0;
            while (licznik7 < punkty3.length) {
                if (licznik6 < licznik7 && punkty3[licznik6] === punkty3[licznik7]) {
                    if (roznica[tabela[licznik6]] < roznica[tabela[licznik7]]) {
                        const oldIndex = tabela[licznik6];
                        tabela[licznik6] = tabela[licznik7];
                        tabela[licznik7] = oldIndex;
                    }
                    if (roznica[tabela[licznik6]] === roznica[tabela[licznik7]]) {
                        if (strzelone[tabela[licznik6]] < strzelone[tabela[licznik7]]) {
                            const oldIndex = tabela[licznik6];
                            tabela[licznik6] = tabela[licznik7];
                            tabela[licznik7] = oldIndex;
                        }
                    }
                }
                licznik7++;
            }
            licznik6++;
        }
        licznik6 = 0;
        const tabela2 = [];
        while (licznik6 < tabela.length) {
            tabela2[licznik6] = {};
            tabela2[licznik6].miejsce = licznik6 + 1;
            tabela2[licznik6].druzyna = teams2[tabela[licznik6]];
            tabela2[licznik6].mecze = mecze[tabela[licznik6]];
            tabela2[licznik6].punkty = punkty[tabela[licznik6]];
            tabela2[licznik6].strzelone = strzelone[tabela[licznik6]];
            tabela2[licznik6].stracone = stracone[tabela[licznik6]];
            tabela2[licznik6].roznica = roznica[tabela[licznik6]];
            licznik6++;
        }
        const tabela3 = JSON.stringify(tabela2);
        fetch(`/tabela${document.location.search}`, {
            method: 'POST',
            body: tabela3,
            headers: { 'Content-Type': "application/json" }
        })
        const wynik2 = JSON.stringify(wynik);
        fetch(`/terminarz3${document.location.search}`, {
            method: 'POST',
            body: wynik2,
            headers: { 'Content-Type': "application/json" }
        })
        $(wyniki).replaceWith("<p>ZROBIONE!</p>");
    })
})
