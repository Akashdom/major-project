const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'], // Assuming 'Point' is a valid value for the type field
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) { await Review.deleteMany({ _id: { $in: listing.reviews } }) };
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;