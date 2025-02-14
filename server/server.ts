require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const md5 = require("md5");
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "./utils/mail-utils";
const userRoutes = require("./routes/user-routes");
import prisma from "./utils/prisma";
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://192.168.24.139:5174", // or where your web app is served from
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// io.on("connection", (socket) => {
//   io.emit("receiveMessage", "HELLO");
//   socket.on("disconnect", () => {});
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
interface UserRequestBody {
  password: string;
  email: string;
  name: string;
}
app.post(
  "/register",
  async (req: Request<{}, {}, UserRequestBody>, res: Response) => {
    const { password, email, name } = req.body;
    const existedUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existedUser) {
      return res.status(200).json({
        success: false,
        variant: "error",
        message: "This email is already registered",
      });
    }
    const user = await prisma.user.create({
      data: {
        password: md5(password),
        email: email,
        fullName: name,
        is_active: 2,
      },
    });
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const verificationLink = `${process.env.SERVER_URL}verifyAccount?token=${token}`;
    await sendMail(
      email,
      "Verification Link",
      `<div style="font-family: Arial, sans-serif; color:"black">
      <h2>Welcome to Our Service!</h2>
      <p>Click the button below to verify your account:</p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 24px; font-size: 16px; 
                color: #fff; background-color: #007BFF; text-decoration: none; 
                border-radius: 5px;">
        Verify My Account
      </a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-wrap: break-word;">${verificationLink}</p>
      <p>Thank you for joining us!</p>
    </div>`
    );
    return res.status(200).json({
      success: true,
      variant: "success",
      message: "Account created successfully!",
    });
  }
);
app.get("/verifyAccount", async (req: Request, res: Response) => {
  try {
    let userData = jwt.verify(req.query.token, process.env.JWT_SECRET);
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: {
        is_active: 1,
      },
    });
    if (process.env.APP_URL) res.redirect(process.env.APP_URL + "verified");
  } catch (e: unknown) {
    if (e instanceof jwt.JsonWebTokenError)
      res.redirect(process.env.APP_URL + "tokenexpired");
  }
});
app.get("/verify", async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      let userData = jwt.verify(token, process.env.JWT_SECRET);

      return res.status(200).json({ success: true, data: userData });
    } else {
      return res
        .status(400)
        .json({ success: false, variant: "error", message: "Token not found" });
    }
  } catch (e: unknown) {
    return res
      .status(400)
      .json({ success: false, variant: "error", message: "Technical Issue" });
  }
});

app.post("/sendAgain", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    if (user.is_active == 2) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const verificationLink = `${process.env.SERVER_URL}verifyAccount?token=${token}`;
      await sendMail(
        user.email,
        "Verification Link",
        `<div style="font-family: Arial, sans-serif; color:"black">
      <h2>Welcome to Our Service!</h2>
      <p>Click the button below to verify your account:</p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 24px; font-size: 16px; 
                color: #fff; background-color: #007BFF; text-decoration: none; 
                border-radius: 5px;">
        Verify My Account
      </a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-wrap: break-word;">${verificationLink}</p>
      <p>Thank you for joining us!</p>
    </div>`
      );
      return res.status(200).json({
        success: true,
        variant: "success",
        message: "Link sent successfully!",
      });
    }
    if (user.is_active == 1) {
      return res.status(200).json({
        success: true,
        variant: "success",
        message: "Account already verified!",
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      variant: "error",
      message: "Account doesn't exists!",
    });
  }
});
app.post("/login", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: md5(req.body.password),
    },
  });
  if (user) {
    if (user.is_active == 2) {
      return res.status(200).json({
        message: `
    Please activate your account from the activation link:
    <a href=/tokenExpired className="text-blue-500 font-bold underline">
      Activate Account
    </a>
  `,
        variant: "error",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: user.id.toString(),
        email: user.email,
        name: user.fullName,
        photo: user.profile,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      id: user.id,
      email: req.body.email,
      fullname: user.fullName,
      photo: user.profile,
      token,
      success: true,
    });
  } else {
    return res.status(400).json({
      success: false,
      variant: "warning",
      message: "Invalid Credentials",
    });
  }
});
app.use("/user", userRoutes);
// app.get("/verify", async (req: Request, res: Response) => {
//   const token = req.headers.authorization.split(" ")[1];
//   let userData = null;
//   try {
//     userData = jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({
//       success: true,
//       data: { ...userData, iat: null, exp: null },
//     });
//   } catch (error) {
//     res.status(405).json(error);
//     return;
//   }
// });

// app.use(
//   "/admin",
//   (req:Request, res, next) => {
//     req.io = io;
//     next();
//   },
//   adminRoutes
// );

// app.use(
//   "/manager",
//   (req:Request, res, next) => {
//     req.io = io;
//     next();
//   },
//   managerRoutes
// );

// app.use(
//   "/user",
//   (req:Request, res, next) => {
//     req.io = io;
//     next();
//   },
//   userRoutes
// );
// async function createCoumn(req:Request, res:Response) {
//   console.log("hii");

//   const column1 = new columnModel({
//     color: "#6b728066",
//     isActive: 1,
//     title: "To Do",
//   });
//   await column1.save();
//   const column2 = new columnModel({
//     color: "#eab30880",
//     isActive: 1,
//     title: "In Progress",
//   });
//   await column2.save();
//   const column3 = new columnModel({
//     color: "#22c55e99",
//     isActive: 1,
//     title: "Completed",
//   });
//   await column3.save();
// }

// createCoumn();
async function main() {
  const allUsers = await prisma.user.findMany();
  // console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
httpServer.listen(3000, () => {});
