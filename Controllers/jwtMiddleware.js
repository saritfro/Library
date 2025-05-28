
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const settings = require("../Models/settingsModel"); // מודל למנהלות


// פונקציה לכניסת מנהלת 
async function loginAdministrator(req, res) {
    try {
        const { password } = req.query;

        if (!password) {
            return res.status(400).send("Name and password are required.");
        }

        const setting=await settings.findOne({}); 

        //  if (existingAdmin) {
        //      return res.status(400).send("An administrator already exists.");
        //  }
        // let user = await manager.findOne({ password:password}); 

        // if (!user) {
        //     return res.status(401).send("Invalid email or password.");
        // }

        // אם אין מנהלת, ניצור אחת חדשה
        // if (!existingManager) {
        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     const newAdmin = new manager({
        //         password: hashedPassword,
        //         role: "manager"
        //     });
        //     await newAdmin.save();
        //     res.status(201).send("Manager created successfully.");
        // }

        //השוואת ססמאות
        const isMatch =password=== setting.managerPass; 
        if (!isMatch ) {
            return res.status(401).send("Invalid name or password.\nNo access permission!");
        }


        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).send("Invalid email or password.");
        // }
        // const rle = user instanceof Administrators ? "Administrator" : "Member";

        // יצירת טוקן JWT עם פרטי המשתמש
        const token = jwt.sign({ id: existingManager.password }, process.env.SECRET, { expiresIn: "2h" });

        // החזרת תגובה עם טוקן ופרטי המנהל
        res.status(200).send({
            message: "Login successful!",
            token,
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Failed to log in.");
    }
}

// פונקציה לרענון טוקן
// async function refreshAccessToken(req, res) {
//     const { refreshToken } = req.body;

//     if (!refreshToken) return res.sendStatus(401);

//     // בדוק אם טוקן הרענון קיים
//     const existingManager = await manager.findOne({ refreshToken });
//     if (!existingManager) return res.sendStatus(403);

//     // אימות טוקן הרענון
//     jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);

//         // יצירת טוקן חדש
//         const newAccessToken = jwt.sign({ id: existingManager._id, role: existingManager.role }, process.env.SECRET, { expiresIn: "2h" });
//         res.json({ accessToken: newAccessToken });
//     });
// }

// פונקציה לאימות טוקן
function verifyToken(req, res, next) {
    try {
        const token = req.headers["authorization"].split(" ")[1]; // שולפים את הטוקן מה־Authorization header
        if (!token) return res.status(401).send("No token provided");

        const user = jwt.verify(token, process.env.SECRET);
        if (user.role !== "Administrator") {
            return res.status(403).send("Access denied. Admins only.");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}

module.exports = { loginAdministrator, verifyToken };
