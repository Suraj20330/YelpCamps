const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

const Campground = require("../models/campground");

//checking that db is connected or not
//our db is yelpCamp
mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("Error, MONGO CONNECTION!!!!");
    console.log(err);
  });

//this fn deltes all and add purple field into our db yelpCamp
// const seedDB = async () => {
//   await Campground.deleteMany({});
//   const c = new Campground({ title: "purple field" });
//   await c.save();
// };

//Returning random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  //deletes every thing in our db
  await Campground.deleteMany({});

  //now replacing with new campgrounds
  for (let i = 0; i < 300; ++i) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: "64f08fbf2258ea57d626183b",
      location: `${cities[random1000].city},${cities[random1000].state}`,

      //the title are taken from seedHelpers file
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente esse omnis quidem ea corrupti aliquid, debitis vel quibusdam ducimus temporibus sunt blanditiis dolore inventore maiores, qui cupiditate? Temporibus, qui nobis.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgcpiet3c/image/upload/v1693597667/YelpCamp/r6zgpachegxio4z9kcsr.jpg",
          filename: "YelpCamp/r6zgpachegxio4z9kcsr",
        },
        {
          url: "https://res.cloudinary.com/dgcpiet3c/image/upload/v1693597670/YelpCamp/lir8fwy8snzjaxsezcsz.jpg",
          filename: "YelpCamp/lir8fwy8snzjaxsezcsz",
        },
      ],
    });
    await camp.save();
  }
};

//this will close the mongoose connection
seedDB().then(() => {
  mongoose.connection.close();
});
