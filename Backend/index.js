import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToMongoose from "./src/config/mongoose.config.js";
import cors from "cors";
import userRouter from "./src/features/users/user.route.js";
import roomRouter from "./src/features/rooms/room.route.js";
import historyRouter from "./src/features/history/history.route.js";
import favouriteRouter from "./src/features/favourite/favourite.route.js";
import requestRouter from "./src/features/request/request.router.js";
import relationshipRouter from "./src/features/relationship/relationship.router.js";
dotenv.config();

const app = express();
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins =
      "https://renters-f2njf0efr-renters-projects.vercel.app";
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow the origin
      callback(null, true);
    } else {
      // Reject the origin
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("This is renter application!");
});

//Middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/history", historyRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/request", requestRouter);
app.use("/api/relationship", relationshipRouter);

app.listen(port, () => {
  connectToMongoose();
  console.log("Server is up at the port ", port);
});
