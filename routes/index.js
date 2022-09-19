const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "<h1 style='font-weight:900; text-transform:uppercase;font-family:poppins'><center>Cercle sportif backend</h1> <p>use <strong>/api/playground</strong> to access <em>Playgrounds</em></center></p>"
  );
});
module.exports = router;
