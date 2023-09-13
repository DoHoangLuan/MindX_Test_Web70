const express = require("express");
const { connectToDb, db } = require("./db");
const { SECRET_KEY } = require("./utils");
const jwt = require('jsonwebtoken');
const { authMiddleware } = require("./middleware");

const app = express();
app.use(express.json());


connectToDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("App is running at 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });


// Câu 2
app.get('/products', authMiddleware, (req, res) => {
  ; (async () => {
    const products = await db.inventories.find().toArray();
    return res.status(200).json({
      message: "thanh cong roi",
      data: products ? products : []
    })
  })()
});
// Câu 3
app.get('/products-less-than-100', authMiddleware, (req, res) => {
  (async () => {
    try {
      const products = await db.inventories.find({
        instock: {
          $lt: 100
        }
      }).toArray();
      res.status(200).json({
        message: "thanh cong roi",
        data: products || []
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra"
      });
    }
  })();
});

// Câu 4 
app.post('/login', (req, res) => {
  (async () => {
    try {
      const { username, password } = req.body
      const user = await db.users.findOne({
        username,
        password
      })
      if (!!user) {
        const token = jwt.sign(user, SECRET_KEY, {
          expiresIn: '1h',
        })
        res.status(400).json({ token })
      } else {
        throw new Error("Sai ten dang nhap hoac tai khoan")
      }
    } catch (err) {
      res.status(401).json({
        message: err?.message || "Tai khoan khong ton tai"
      })
    }
  })()
})

// Câu 6
app.get('/order-info', authMiddleware, (req, res) => {
  (async () => {
    const pipeline = [
      {
        $lookup: {
          from: "orders",
          localField: "sku",
          foreignField: "item",
          as: "orderInfo"
        }
      },
      {
        $unwind: "$orderInfo"
      },
    ];
    try {
      const products = await db.inventories.aggregate(pipeline).toArray();
      res.status(200).json({
        message: "thanh cong roi",
        data: products || []
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra"
      });
    }
  })();

})
