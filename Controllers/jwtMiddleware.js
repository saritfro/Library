
//אלישבע אוירבך
// const jwt = require("jsonwebtoken")


// // לjwt  יש 2 פונקציות מרכזיות שבהם נשתמש
// function createToken(req, res, next) {
//     //  ניצור טוקן, מחרוזת סודית בכל גלישה מחדש של המשתמש באתר
//     // נשלוף  את הפרטים של המשתמש
//     const token = jwt.sign({ password: req.body.password, email: req.body.userName}, process.env.SECRET)
//     req.token = token
//     // req.token = token
//     next();
// }

// // פונקציה זו תוודא שהטוקן שנשלח מהלקוח הוא חתום במחרוזת הסודית של האפליקציה
// // אם הוא חתום היא מחזירה את הפרטים של המשתמש
// // אם לא היא מחזירה הודעת שגיאה
// function verifyToken(req, res, next) {
//     try {
//         console.log(req.headers["Authorization"])
//         const token = req.headers["Authorization"].split(" ")[1]; // שולפים את הטוקן מה־Authorization header
//         console.log(token+"token")
//         if (!token) return res.status(401).send("No token provided");

//         const user = jwt.verify(token, process.env.SECRET);
//         if (user.role !== "Administrator") {
//             return res.status(403).send("Access denied. Admins only.");
//         }
//         req.user = user;
//         next();
//     } catch (err) {
//         res.status(400).send("Invalid token");
//     }
// }
// module.exports = { createToken, verifyToken }



// ma.bruk
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const manager = require("../Models/managerModel"); // מודל למנהלות


//פונקציה ליצירת מנהלת יחידה רק אם אין מנהלת
// לבדוק את הפונקציה הזו אם היא מתאימה ליצירת מנהלת יחידה
// async function createAdministrator(req, res) {
//     try {
//         const { password, name } = req.body;

//         // בדיקה אם כבר קיימת מנהלת
//         const existingAdmin = await manager.findOne({ rool: "Administrator" });
//         if (existingAdmin) {
//             return res.status(400).send("An administrator already exists.");
//         }
//         // יצירת מנהלת חדשה
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new manager({
//             email,
//             password: hashedPassword,
//             name,
//             role: "manager"
//         });
//         await newAdmin.save();
//         res.status(201).send("Administrator created successfully.");
//     }
//     catch (error) {
//         console.error("Error creating administrator:", error);
//         res.status(500).send("Failed to create administrator.");
//     }
// }
/////////////משתלב בפונקציה loginAdministrator

// פונקציה לכניסת מנהלת 
async function loginAdministrator(req, res) {
    try {
        const { name, password } = req.query;

        if (!name || !password) {
            return res.status(400).send("Name and password are required.");
        }

        // בדיקה אם כבר קיימת מנהלת
        const existingManager = await manager.findOne({ rool: "manager" });
        //  if (existingAdmin) {
        //      return res.status(400).send("An administrator already exists.");
        //  }
        // let user = await manager.findOne({ password:password}); 

        // if (!user) {
        //     return res.status(401).send("Invalid email or password.");
        // }

        // אם אין מנהלת, ניצור אחת חדשה
        if (!existingManager) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new manager({
                name,
                password: hashedPassword,
                role: "manager"
            });
            await newAdmin.save();
            res.status(201).send("Manager created successfully.");
        }

        // אם מנהלת קיימת, נבצע השוואת סיסמאות
        const isMatch = await bcrypt.compare(password, existingManager.password);
        if (!isMatch || existingManager.name !== name) {
            return res.status(401).send("Invalid name or password.\nNo access permission!");
        }


        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).send("Invalid email or password.");
        // }
        // const role = user instanceof Administrators ? "Administrator" : "Member";

        // יצירת טוקן JWT עם פרטי המשתמש
        const token = jwt.sign({ id: existingManager.password, role }, process.env.SECRET, { expiresIn: "2h" });

        // //לבדוק אולי נוותר על טוקן רענון
        // // יצירת טוקן רענון
        // const refreshToken = jwt.sign({ id: existingManager._id, role: existingManager.role }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        // // שמירה בטוקן רענון 
        // existingManager.refreshToken = refreshToken;
        // await existingManager.save();

        // החזרת תגובה עם טוקן ופרטי המנהל
        res.status(200).send({
            message: "Login successful!",
            token,
            // refreshToken,
            name: user.name,
            role:existingManager.role
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
