import express from "express";
import bodyParser from "body-parser";
const app = express();

let items = [];
let works = [];


//body parser
app.use(bodyParser.urlencoded({extended: true}))
// making use of static engine
app.use(express.static('public'));

//setting the ejs view engine
app.set('view engine', 'ejs');

// routing
app.get('/', (req, res) => {
    let today = new Date();

    // definig a specific date format
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options)

    res.render("list", {listTitle: day, newListItems: items});
});

app.post('/', (req, res) => {
    let item = req.body.newItem;
    
    // Determining the post route
    if (req.body.list === 'Work') {
        works.push(item);
        res.redirect('/work')
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newListItems: works});
});

// Server
app.listen(3000, () => console.log("Server started on port 3000"));