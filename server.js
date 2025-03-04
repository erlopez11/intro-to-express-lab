const express = require('express');
const app = express();

//Routes

// 1) Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    res.send(`Greetings, ${req.params.username}! What a delight to see once more!`);
});

// 2) Rolling the Dice
app.get('/roll/:number', (req, res) => {
    let parameter = parseInt(req.params.number);

    if (isNaN(parameter)) {
        res.send('You must specify a number.');
    } else {
        let rolledNumber = Math.floor(Math.random() * parameter)
        res.send(`You rolled a ${rolledNumber}`);
    }
})

// 3) I Want That One
app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    let idx = req.params.index;

    if (collectibles[idx]) {
        res.send(`So you want the ${collectibles[idx].name} For ${collectibles[idx].price}, it can be yours!`);

    } else {
        res.send('This item is not yet in stock. Check back soon!');
    }

});

// 4) Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const type = req.query.type;



    function filterShoes(shoe) {
        if (minPrice) {
            return shoe.price > minPrice
        } else if (maxPrice) {
            return shoe.price < maxPrice
        } else if (type) {
            return shoe.type === type
        }
    }


    if (Object.keys(req.query).length === 0) {
        res.send(shoes);
    } else {
        const filteredShoes = shoes.filter(filterShoes);
        res.send(filteredShoes)
    }

});




//Listen 
app.listen(3000, () => {
    console.log('listening to port 3000');
});