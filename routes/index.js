const mongo = require('mongodb');
const config = require('../config.js');
const client = new mongo.MongoClient(config.db, { useNewUrlParser: true });
const path = require('path');
const funkcja1 = async (par1) => {
    const db = client.db('sf');
    const users = db.collection('users');
    const main = db.collection('main');
    //await client.connect();
    //users.find().toArray((err, data) => {
    // console.log(data);
    //})
    let user = "";
    let id2;
    //client.connect(() => {
    users.find().toArray((err, data) => {
        id2 = data.length;
    })
    //})
    par1.post('/log', (req, res) => {
        //client.connect(() => {
        user = {
            login: req.body.login2,
            password: req.body.password3
        }
        users.find(user).toArray((err, data) => {
            if (!data.length) {
                res.redirect('/error2.html');
            } else {
                req.session.sesja = 1;
                res.redirect('/admin.html');
            }
        })
        //})
    })
    par1.get('/', (req, res, next) => {
        if (req.cookies.b !== "zapisany") {
            res.cookie('b', 'zapisany');
            //client.connect(() => {
            main.find().toArray((err, data) => {
                const odw2 = data[0].odwiedziny;
                main.updateOne({}, {
                    $set: {
                        odwiedziny: odw2 + 1
                    }
                })
            })
            //})
        }
        if (req.session.sesja) {
            res.redirect('/admin.html');
        } else {
            next();
        }
    })
    par1.get('/links.pug', (req, res, next) => {
        //client.connect(() => {
        users.find({ title: new RegExp(req.query.fraza.trim(), "i") }).toArray((err, data) => {
            res.render('links', { data });
        })
        //})
    })
    par1.get('/admin.html', (req, res, next) => {
        if (user === "") {
            console.log("Błąd serwera");
            req.session.sesja = undefined;
            res.redirect('/error.html');
            return;
        }
        if (!req.session.sesja) {
            console.log("OK");
            res.redirect('/');
            return;
        }
        next();
    })
    par1.post('/', (req, res) => {
        //client.connect((err) => {
        user = {
            login: req.body.login,
            password: req.body.password
        }
        users.find(user).toArray((err, data) => {
            if (!data.length) {
                users.insertOne(user);
                users.updateOne(user, {
                    $set: {
                        mail: req.body.mail,
                        autor: "",
                        title: "",
                        logo: "",
                        tekst: "",
                        id2: id2 + 1,
                        temat: "",
                        opis: "",
                        fontsize: 7,
                        fontcolor: "#000000",
                        fontsize2: 3,
                        fontsize3: 2,
                        fontcolor2: "#000000",
                        fontcolor3: "#000000",
                        fontstyle: "cursive",
                        fontstyle2: "cursive",
                        bgcolor: "#ffffff",
                        bgcolor2: "#ffffff",
                        strz: "../images/strz2.jpg",
                        newsnumber: 0,
                        terminarz: "",
                        wyniki: "",
                        rewanze: 0,
                        tabela: "",
                        odwiedziny: 0
                    }
                })
            }
        })
        //})
        req.session.sesja = 1;
        res.redirect('/admin.html');
    })
    par1.get('/main1', (req, res) => {
        if (user === "") {
            console.log("Błąd serwera");
            req.session.sesja = undefined;
            res.redirect('/error.html');
        }
        else {
            //client.connect(() => {
            users.find(user).toArray((err, data) => {
                res.render('main', {
                    a: data[0].title,
                    b: data[0].tekst,
                    c: data[0].temat,
                    d: data[0].opis,
                    e1: data[0].fontsize,
                    e2: data[0].fontcolor,
                    e3: data[0].fontstyle,
                    e4: data[0].fontsize2,
                    e5: data[0].fontcolor2,
                    e6: data[0].fontstyle2,
                    e7: data[0].fontsize3,
                    e8: data[0].fontcolor3,
                    e9: data[0].bgcolor,
                    e10: data[0].bgcolor2,
                    e11: data[0].strz,
                    f: data[0].autor,
                    f2: data[0].odwiedziny
                })
            })
            //})
        }
    })
    par1.get('/main2', (req, res) => {
        req.session.sesja = undefined;
        res.redirect('/');
    })
    par1.get('/main/:id', (req, res) => {
        const liczba = parseInt(req.params.id);
        console.log(req.cookies);
        //client.connect(() => {
        if (req.cookies[`b${liczba}`] !== 'zapisany') {
            res.cookie(`b${liczba}`, 'zapisany');
            users.find({ id2: liczba }).toArray((err, data) => {
                const odw = data[0].odwiedziny;
                users.updateOne({ id2: liczba }, {
                    $set: {
                        odwiedziny: odw + 1
                    }
                })
            })
        }
        users.find({ id2: liczba }).toArray((err, data) => {
            const a = data[0].title;
            const b = data[0].tekst;
            const c = data[0].temat;
            const d = data[0].opis;
            const e1 = data[0].fontsize;
            const e2 = data[0].fontcolor;
            const e3 = data[0].fontstyle;
            const e4 = data[0].fontsize2;
            const e5 = data[0].fontcolor2;
            const e6 = data[0].fontstyle2;
            const e7 = data[0].fontsize3;
            const e8 = data[0].fontcolor3;
            const e9 = data[0].bgcolor;
            const e10 = data[0].bgcolor2;
            const e11 = data[0].strz;
            const f = data[0].autor;
            const f2 = data[0].odwiedziny;
            res.render('main', { a, b, c, d, e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, f, f2 });

        })
        //})
    })
    par1.post('/admin.html', (req, res) => {
        if (user === "") {
            console.log("Błąd serwera");
            req.session.sesja = undefined;
            res.redirect('/error.html');
        }
        else {
            //client.connect(() => {
            for (const zm in req.body) {
                if (req.body[zm] !== "") {
                    users.updateOne(user, {
                        $set: {
                            [zm]: req.body[zm]
                        }
                    })
                }
            }
            res.redirect('back');
            //})
            // res.redirect('back');
        }
    })
    par1.get('/style', (req, res, next) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            res.send(data[0]);
        })
        //})
    })
    par1.post('/news', (req, res) => {
        let news;
        let news2;
        let news3;
        let news4;
        let news5;
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            news2 = data[0].newsnumber + 1;
            news = "newstitle" + news2.toString();
            news3 = "newsmain" + news2.toString();
            news4 = "newstext" + news2.toString();
            news5 = "komentarze" + news2.toString();
            users.updateOne(user, {
                $set: {
                    newsnumber: news2,
                    [news]: req.body.newstitle,
                    [news3]: req.body.newsmain,
                    [news4]: req.body.news,
                    [news5]: 0
                }
            })
        })
        //})
        res.redirect('back');
    })
    par1.get('/news/:wiad', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            const licznik = req.params.wiad.charAt(4);
            let licznik2 = 1;
            const tabnick = [];
            const tabkoment = [];
            const newstitle = "newstitle" + licznik;
            const newstext = "newstext" + licznik;
            const komentarze = "komentarze" + licznik;
            const o = [];
            while (licznik2 <= data[0][komentarze]) {
                tabnick[licznik2 - 1] = "nick" + licznik + licznik2;
                o[2 * licznik2 + 1] = data[0][tabnick[licznik2 - 1]];
                tabkoment[licznik2 - 1] = "koment" + licznik + licznik2;
                o[2 * licznik2 + 2] = data[0][tabkoment[licznik2 - 1]];
                licznik2++;
            }
            o[0] = data[0][newstitle];
            o[1] = data[0][newstext];
            o[2] = data[0][komentarze];
            res.send(o);
        })
        //})
    })
    par1.get('/news.html/:wiad?', (req, res) => {
        res.sendFile('news.html', { root: 'C:/users/gawy/onedrive/dokumenty/sf/public' });
    })
    par1.post('/news.html/:wiad', (req, res) => {
        if (user === "") {
            console.log("Błąd serwera");
            req.session.sesja = undefined;
            res.redirect('/error.html');
        } else {
            const kom = req.params.wiad.charAt(4);
            const kom2 = "komentarze" + kom;
            let kom3;
            let kom4;
            let kom5;
            //client.connect(() => {
            users.find(user).toArray((err, data) => {
                kom3 = data[0][kom2] + 1;
                kom4 = "nick" + kom + kom3.toString();
                kom5 = "koment" + kom + kom3.toString();
                users.updateOne(user, {
                    $set: {
                        [kom2]: kom3,
                        [kom4]: req.body.nick,
                        [kom5]: req.body.koment
                    }
                })
            })
            //})
            res.redirect('back');
        }
    })
    par1.post('/terminarz', (req, res) => {
        const terminarz = req.body;
        //client.connect(() => {
        users.updateOne(user, {
            $set: {
                terminarz: terminarz
            }
        })
        //})
    })
    par1.get('/terminarz2', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            const tz = [];
            tz[0] = data[0].terminarz;
            tz[1] = data[0].wyniki;
            res.json(tz);
        })
        //})
    })
    par1.post('/terminarz3', (req, res) => {
        const wynik = req.body;
        //client.connect(() => {
        users.updateOne(user, {
            $set: {
                wyniki: wynik,
                rewanze: 0
            }
        })
        //})
    })
    par1.get('/terminarz4', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            res.json(data[0].wyniki);
        })
        //})
    })
    par1.post('/terminarz5', (req, res) => {
        //client.connect(() => {
        users.updateOne(user, {
            $set: {
                rewanze: 1
            }
        })
        //})
    })
    par1.get('/terminarz5', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            res.json(data[0].rewanze);
        })
        //})
    })
    par1.post('/tabela', (req, res) => {
        //client.connect(() => {
        users.updateOne(user, {
            $set: {
                tabela: req.body
            }
        })
        //})
    })
    par1.get('/tabela', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            res.json(data[0].tabela);
        })
        //})
    })
    par1.get('/wstep', (req, res) => {
        //client.connect(() => {
        users.find(user).toArray((err, data) => {
            res.send(data[0]);
        })
        //})
    })
    par1.get('/odw', async (req, res) => {
        //client.connect(() => {
        // main.find().toArray((err, data) => {
        // res.json(data[0]);
        //})
        // })
        const c = await main.find().toArray();
        res.json(c[0]);
    })
    par1.post('/rejestracja', (req, res) => {
        //client.connect(() => {
        const rejestracja = req.body;
        users.find(rejestracja).toArray((err, data) => {
            res.send(data);
        })
        //})
    })
    //par1.use(express.static(path.join(__dirname, 'public')));
}
module.exports = funkcja1;
