const express = require("express");
require("./db");
const ShortUrl = require("./models/shortUrl");

const app = express();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async(req, res) => {
    const shortUrls = await ShortUrl.find({});
    res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async(req, res) => {
    await ShortUrl.create({ fullUrl: req.body.fullUrl });

    res.redirect("/");
});
app.get("/:shortUrl", async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    if (!shortUrl) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.fullUrl);
});

app.listen(process.env.PORT || 5000);