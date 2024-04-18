const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");

router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getItems();
    res.render("index", { restaurant: result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/addItem", async (req, res) => {
  console.log("form submit", req.body);
  console.log(req.body);
  try {
    const success = await dbModel.addItem(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/deleteItem", async (req, res) => {
  console.log("delete user");
  console.log(req.query);
  let restaurantID = req.query.id;
  if (restaurantID) {
    const success = await dbModel.deleteItem(restaurantID);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});


router.get("/increaseQuantity", async (req, res) => {
  const itemId = req.query.id;
  try {
    const success = await dbModel.increaseItemQuantity(itemId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error updating item quantity" });
      console.log("Error updating item quantity");
    }
  } catch (err) {
    res.render("error", { message: "Error updating item quantity" });
    console.log("Error updating item quantity");
    console.log(err);
  }
});

router.get("/decreaseQuantity", async (req, res) => {
  const itemId = req.query.id;
  try {
    const success = await dbModel.decreaseItemQuantity(itemId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error updating item quantity" });
      console.log("Error updating item quantity");
    }
  } catch (err) {
    res.render("error", { message: "Error updating item quantity" });
    console.log("Error updating item quantity");
    console.log(err);
  }
});


router.get("/deleteReview", async (req, res) => {
  let restaurantID = req.query.id;
  if (restaurantID) {
    const success = await dbModel.deleteReview(restaurantID);
    console.log("DELETE PLEASE")
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});



router.post("/addReview", async (req, res) => {
  try {
    console.log(req.body)
    const success = await dbModel.addReview(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

module.exports = router;
