const mongo = require('mongodb');
const config = require('../config.js');
const client = new mongo.MongoClient(config.db, { useNewUrlParser: true });
const path = require('path');
const funkcja1 = async (par1) => {
    const db = client.db('sf');
    const users = db.collection('users');
    const main = db.collection('main');

    par1.post('/log', async (req, res) => {
        await client.connect();
        const user = {
            login: req.body.login2,
            password: req.body.password3
        }
        const userArr = await users.find(user).toArray();
        if (!userArr.length) {
            client.close();
            res.redirect('/error2.html');
        } else {
            req.session[`key${userArr[0].id2}`] = 1;
            client.close();
            res.redirect(`/admin.html?id=${userArr[0].id2}`);
        }
    })

    par1.get('/', async (req, res, next) => {
        if (req.cookies.b !== "zapisany") {
            res.cookie('b', 'zapisany');
            await client.connect();
            const visits = await main.find().toArray();
            const odw2 = visits[0].odwiedziny;
            main.updateOne({}, {
                $set: {
                    odwiedziny: odw2 + 1
                }
            })
            client.close();
        }
        next();
    })
    par1.get('/links.pug', async (req, res, next) => {
        await client.connect();
        const userArr = await users.find({ title: new RegExp(`^${req.query.fraza.trim()}`, "i") }).toArray();
        res.render('links', { userArr });
        client.close();
    })
    par1.get('/admin.html', (req, res, next) => {
        if (!req.session[`key${req.query.id}`]) {
            res.redirect('/');
            return;
        }
        next();
    })
    par1.get('/rozgrywki.html', (req, res, next) => {
        if (!req.session[`key${req.query.id}`]) {
            res.redirect('/');
            return;
        }
        next();
    })
    par1.get('/rozgrywki2.html', (req, res, next) => {
        if (!req.session[`key${req.query.id}`]) {
            res.redirect('/');
            return;
        }
        next();
    })
    par1.get('/start.html', (req, res, next) => {
        if (!req.session[`key${req.query.id}`]) {
            res.redirect('/');
            return;
        }
        next();
    })
    par1.post('/', async (req, res) => {
        await client.connect();
        const user = {
            login: req.body.login,
            password: req.body.password
        }
        const userArr = await users.find(user).toArray();
        const maxIdArr = await users.find().toArray();
        let maxId;
        if (!maxIdArr.length) {
            maxId = 0;
        } else {
            maxId = maxIdArr[maxIdArr.length - 1].id2;
        }
        if (!userArr.length) {
            await users.insertOne(user);
            await users.updateOne(user, {
                $set: {
                    mail: req.body.mail,
                    autor: "",
                    title: "",
                    logo: "",
                    tekst: "",
                    id2: maxId + 1,
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
                    //terminarz: "",
                    //wyniki: "",
                    //rewanze: 0,
                    //tabela: "",
                    odwiedziny: 0,
                    termnumber: 0,
                    ponumber: 0
                }
            })
            config.keySession.push(`key${maxId + 1}`);
            req.session[`key${maxId + 1}`] = 1;
            res.redirect(`/admin.html?id=${maxId + 1}`);
            client.close();
        } else {
            res.redirect(`/admin.html?id=${maxId + 1}`);
            client.close();
        }
    })
    par1.get('/main1', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        const liczba = parseInt(req.query.id);
        if (!data.length) {
            res.redirect("error.html");
            client.close();
        } else {
            if (req.cookies[`b${liczba}`] !== 'zapisany') {
                res.cookie(`b${liczba}`, 'zapisany');
                await client.connect();
                const data2 = await users.find({ id2: liczba }).toArray();
                const odw = data2[0].odwiedziny;
                await users.updateOne({ id2: liczba }, {
                    $set: {
                        odwiedziny: odw + 1
                    }
                })
            }
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
            client.close();
        }
    })
    par1.get('/main2', (req, res) => {
        req.session[`key${req.query.id}`] = null;
        res.redirect('/');
    })
    /*par1.get('/main/:id', async (req, res) => {
        const liczba = parseInt(req.params.id);
        client.connect(() => {
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
        })
    })*/
    par1.post('/admin.html', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        if (!data.length) {
            console.log("Błąd serwera");
            req.session.sesja = undefined;
            res.redirect('/error.html');
            client.close();
        }
        else {
            const entArr = Object.entries(req.body);
            console.log(entArr)
            const filArr = entArr.filter((param) => {
                return param[1];
            })
            const obj = {};
            filArr.forEach((param) => {
                obj[param[0]] = param[1];
            })
            await users.updateOne(data[0], {
                $set: obj
            })
            client.close();
            res.redirect('back');
        }
    })
    par1.post('/style', async (req, res, next) => {
        await client.connect();
        const userArr = await users.find({ id2: Number(req.body) }).toArray();
        res.send(userArr[0]);
        client.close();
    })
    par1.post('/news', async (req, res) => {
        let news;
        let news2;
        let news3;
        let news4;
        let news5;
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        news2 = data[0].newsnumber + 1;
        news = "newstitle" + news2.toString();
        news3 = "newsmain" + news2.toString();
        news4 = "newstext" + news2.toString();
        news5 = "komentarze" + news2.toString();
        await users.updateOne(data[0], {
            $set: {
                newsnumber: news2,
                [news]: req.body.newstitle,
                [news3]: req.body.newsmain,
                [news4]: req.body.news,
                [news5]: 0
            }
        })
        res.redirect('back');
        client.close();
    })
    par1.get('/news2', async (req, res, next) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        /*if(!data.length){
            res.redirect("error.html")
            return;
        }*/
        const licznik = req.query.news.charAt(4);
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
        client.close();
    })
    /*par1.get('/news.html/:wiad?', (req, res) => {
        res.sendFile('news.html', { root: 'public' });
    })*/
    par1.post('/news.html', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        if (!data.length) {
            res.redirect('/error.html');
        } else {
            const kom = req.query.news.charAt(4);
            const kom2 = "komentarze" + kom;
            let kom3;
            let kom4;
            let kom5;
            kom3 = data[0][kom2] + 1;
            kom4 = "nick" + kom + kom3.toString();
            kom5 = "koment" + kom + kom3.toString();
            await users.updateOne({ id2: Number(req.query.id) }, {
                $set: {
                    [kom2]: kom3,
                    [kom4]: req.body.nick,
                    [kom5]: req.body.koment
                }
            })
            client.close();
            res.redirect('back');
        }
    })
    par1.post('/terminarz', async (req, res) => {
        const terminarz = req.body;
        await client.connect();
        await users.updateOne({ id2: Number(req.query.id) }, {
            $set: {
                [`terminarz${Number(req.query.term)}`]: terminarz,
                [`tabela${Number(req.query.term)}`]: "",
                termnumber: Number(req.query.term)
            }
        })
        res.json(terminarz);
        //client.close();
    })
    par1.get('/terminarz2', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        const tz = [];
        tz[0] = data[0][`terminarz${Number(req.query.term)}`];
        tz[1] = data[0][`wyniki${Number(req.query.term)}`];
        //client.close();
        res.json(tz);
    })
    par1.post('/terminarz3', async (req, res) => {
        const wynik = req.body;
        await client.connect();
        await users.updateOne({ id2: Number(req.query.id) }, {
            $set: {
                [`wyniki${Number(req.query.term)}`]: wynik,
                [`rewanze${Number(req.query.term)}`]: 0
            }
        })
        //client.close();
        res.json(wynik);
    })
    par1.get('/terminarz4', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        const data2 = data[0];
        res.json(data2["wyniki" + req.query.term]);
        //client.close();
    })
    par1.post('/terminarz5', async (req, res) => {
        await client.connect();
        await users.updateOne({ id2: Number(req.query.id) }, {
            $set: {
                [`rewanze${Number(req.query.term)}`]: 1
            }
        })
        res.send("OK");
        //client.close();
    })
    par1.get('/terminarz5', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        res.json(data[0][`rewanze${Number(req.query.term)}`]);
        //client.close();
    })
    par1.post('/tabela', async (req, res) => {
        await client.connect();
        await users.updateOne({ id2: Number(req.query.id) }, {
            $set: {
                [`tabela${Number(req.query.term)}`]: req.body
            }
        })
        res.json(req.body);
        //client.close();
    })
    par1.get('/tabela', async (req, res) => {
        await client.connect();
        const data = await users.find({ id2: Number(req.query.id) }).toArray();
        res.json(data[0][`tabela${Number(req.query.term)}`]);
        //client.close();
    })
    /*par1.post('/wstep', async (req, res) => {
        await client.connect();
        console.log(req.body)
        const userArr = await users.find({ id2: Number(req.body) }).toArray();
        res.send(userArr[0]);
        client.close();
    })*/
    par1.get('/odw', async (req, res) => {
        await client.connect();
        const mainArr = await main.find().toArray();
        res.json(mainArr[0]);
        client.close();
    })
    par1.post('/rejestracja', async (req, res) => {
        await client.connect();
        const rejestracja = req.body;
        const regArr = await users.find(rejestracja).toArray();
        res.send(regArr);
        client.close();
    })
}
module.exports = funkcja1;
