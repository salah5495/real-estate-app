import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
  {
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address: { type: String, maxLength: 255, required: true },
    bedrooms: Number,
    bathrooms: Number,
    landsize: String,
    carpack: Number,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [36.821945, -1.292066],
      },
    },
    title: {
      type: String,
      maxLength: 255,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {},
    postedBy: { type: ObjectId, ref: "User" },
    sold: { type: Boolean, default: false },
    googleMap: {},
    type: {
      type: "String",
      default: "Other",
    },
    action: {
      type: "String",
      default: "Sell",
    },
    views: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const Ad = model("Ad", schema);
schema.index({ location: "2dsphere" });

export default Ad;
