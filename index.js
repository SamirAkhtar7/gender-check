const { default: axios } = require("axios");
const path = require("path");
const express = require("express");

const app = express();

// Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "app.html"));
});

app.post("/", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const URL = `https://gender-api.com/get?name=${name}&key=a9f7f39a09143cba609ea7d019678fff2dcd7773177cad877c26811add6174f9`;
  axios
    .get(URL)
    .then((resp) => {
      const gender = resp.data.gender;
      const accuracy = resp.data.accuracy;
      res.send(`<h1 style="padding:100px 50px 0 50px ;
  font-size: 3rem;
  font-family: Georgia;
  color: #2c2c2c;">${name} is ${gender} with ${accuracy}% accuracy</h1>`);
    })
    .catch((err) => {
      console.log("same err:", err);
    });
});

app.listen(4000, () => {
  console.log("Server is running at port 4000");
});

// https://gender-api.com/get?name=elizabeth&key=a9f7f39a09143cba609ea7d019678fff2dcd7773177cad877c26811add6174f9
