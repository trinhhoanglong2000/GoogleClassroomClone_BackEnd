const jwt = require("jsonwebtoken");
const poolean = require("../../Database/index.js");
const validation = require("../../authentication/validation");
exports.getUserName = async (username) => {
  try {
    const classItem = await poolean.query(`
  SELECT * 
  FROM \"Account\"
  WHERE username = $1
  `, [username])
    return classItem
  } catch (err) {
    return null;
  }
};
exports.Login = (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.json({
    success: true,
    id: req.id,
    user: req.username,
    token: jwt.sign(
      {
        id: req.id,
        username: req.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    ),
  });
};
exports.LoginGoogle = async (req, res) => {
  var tokenid = req.query.tokenId;
  var Data = await validation.GGverify(tokenid)
  if (!Data) {
    res.json({ messenge: "Login fail" })
  } else {
    //# Lay du lieu theo email
    try {
      //# Kiem tra xem gg_id co trong db khong
      var Account = await poolean.query(`
    SELECT * 
    FROM \"Account\"
    WHERE gg_id = $1
    `, [Data.sub])
      //# neu khong co tra xem email  co trong db khong
      if (Account.rows.length == 0) {
        try {
          Account = await poolean.query(`
            SELECT * 
            FROM \"Account\"
            WHERE email = $1
            `, [Data.email])
          //Neu khong co thi tao 1 row moi roi tra ve thanh cong
          if (Account.rows.length == 0) {
            Account = await poolean.query(`
              INSERT INTO \"Account\" (id, username, password,img, dob, gender,email,phone,firstname,lastname,gg_id)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
              RETURNING *
              `, [uuidv4(), Data.email, null, Data.picture, null, null, Data.email, null, Data.given_name, Data.family_name, Data.sub])
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.json({
              success: true,
              id: Account.rows[0].id,
              user: Account.rows[0].username,
              token: jwt.sign(
                {
                  id: Account.rows[0].id,
                  username: req.username,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              ),
            });
          } else {
            // Neu  co thi them gg_id vao roi tra ve res co JWT
            await poolean.query(`
              UPDATE \"Account\"
              SET gg_id = $1
              WHERE email = $2
              `, [Data.sub, Data.email])
            res.header({ "Access-Control-Allow-Origin": "*" });
            res.json({
              success: true,
              id: Account.rows[0].id,
              user: Account.rows[0].username,
              token: jwt.sign(
                {
                  id: Account.rows[0].id,
                  username: req.username,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              ),
            });
          }

        } catch (err) {
          res.json({ messenge: "Error processing" })
        }
      } else {
        // Neu  co tra ve res co JWT
        res.header({ "Access-Control-Allow-Origin": "*" });
        res.json({
          success: true,
          id: Account.rows[0].id,
          user: Account.rows[0].username,
          token: jwt.sign(
            {
              id: Account.rows[0].id,
              username: req.username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          ),
        });
      }
    }
    catch (err) {
      res.json({ messenge: "Error processing" })
    }
  }
};
