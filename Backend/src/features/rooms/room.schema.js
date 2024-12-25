import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      unique: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },

      zipCode: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{6}$/, "Please fill a valid 6-digit ZIP code"],
      },
    },

    rentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    roomType: {
      type: String,
      required: true,
      enum: ["single", "shared", "studio", "apartment", "house"],
    },

    numberOfRooms: {
      type: Number,
      required: true,
      min: 1,
    },

    numberOfBathrooms: {
      type: Number,
      required: true,
      min: 1,
    },

    // photos: {
    //   type: [String], // URLs to images
    //   default: [],
    // },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

RoomSchema.plugin(AutoIncrement, { inc_field: "roomNumber", start_seq: 1 });

RoomSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default RoomSchema;
