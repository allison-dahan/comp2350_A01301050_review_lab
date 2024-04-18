const { get } = require("express/lib/response");

const database = include("/databaseConnection");

async function getItems() {
  let sqlQuery = `
        SELECT purchase_item_id, item_name, item_description, cost, quantity
        FROM purchase_item;
    `;

  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select restaurant table");
    console.log(err);
    return null;
  }
}

async function addItem(postData) {
  console.log("postData: ", postData);

  let sqlInsertRestaurant = `
        INSERT INTO purchase_item (item_name, item_description, cost, quantity)
        VALUES (?,?,?,?);
    `;

  let params = [postData.item_name, postData.item_description, postData.cost, postData.quantity];

  console.log(sqlInsertRestaurant);

  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.purchase_item_id;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteItem(purchase_item_id) {
  try {
    let sqlDeleteItem = `DELETE FROM purchase_item WHERE purchase_item_id = ?`;
    await database.query(sqlDeleteItem, [purchase_item_id]);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}




async function increaseItemQuantity(purchase_item_id) {
  let sqlUpdateItem = `
    UPDATE purchase_item
    SET quantity = quantity + 1
    WHERE purchase_item_id = ?;
  `;
  let params = [purchase_item_id];
  try {
    await database.query(sqlUpdateItem, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function decreaseItemQuantity(purchase_item_id) {
  let sqlUpdateItem = `
    UPDATE purchase_item
    SET quantity = quantity - 1
    WHERE purchase_item_id = ?;
  `;
  let params = [purchase_item_id];
  try {
    await database.query(sqlUpdateItem, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
 decreaseItemQuantity,
 increaseItemQuantity,
 getItems, addItem, deleteItem
};
