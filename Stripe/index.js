require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

const app = express();
const port = process.env.PORT;

// setup view engine -> ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('index.ejs');
});

// checkout api for payment
app.post("/checkout", async (req, res) => {
    // create a checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Node.js and Express'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    });

    res.redirect(session.url);
});


app.get("/complete", async (req, res) => {

    // retrieve data from the session id is payment successful
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] });

    const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);

    console.log(session);
    console.log(lineItems);

    res.send("Your payment was successful");
});

app.get("/cancel", (req, res) => {
    res.redirect("/");
})


app.listen(port, () => console.log(`Server started at ${port}`));
