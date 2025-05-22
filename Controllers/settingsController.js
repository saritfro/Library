
const Settings = require("../Models/settingsModel");

async function getSettings(req, res)  {
  try {
console.log("get")
    
    // נניח שיש רק מסמך הגדרות אחד
    let settings = await Settings.findOne();
    console.log(settings)
    if (!settings) 
     res.status(500).json({ error: "There are settings already" });//להחליט האם  יש מצב של יצירה שיעביר לעדכון
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
}
async function postSettings(req, res)  {
  try {
console.log("post")
    // נניח שיש רק מסמך הגדרות אחד
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
     return res.status(500).json({ error: "There are settings already" });//להחליט האם  יש מצב של יצירה שיעביר לעדכון
    }

    await settings.save();
    return res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
}
async function putSettings(req, res)  {
  try {
    console.log("put")
    const  update  = req.body;
    console.log(update)
    
    // נניח שיש רק מסמך הגדרות אחד
    let settings = await Settings.findOneAndUpdate({}, { $set: update},{new :true});
    console.log(settings)
    if (!settings) 
     res.status(500).send({ error: "There are no settings to change" });//להחליט האם  יש מצב של יצירה שיעביר לעדכון
    await settings.save();
    res.status(200).send(settings);
  } catch (error) {
    res.status(500).send({ error: "Failed to update settings" });
  }
}
module.exports = { getSettings,postSettings, putSettings}
