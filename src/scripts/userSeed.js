import User from "../models/User.js"
import mongoose from "mongoose"
import "dotenv/config"

const users = [
  {
    email: "james.hartwell@gmail.com",
    password: "Sparrow#42",
    firstName: "James",
    lastName: "Hartwell",
    location: { address: "14 Birchwood Lane", city: "Manchester", postCode: "M14 5QR" }
  },
  {
    email: "sofia.reyes@hotmail.com",
    password: "sunshine@07",
    firstName: "Sofia",
    lastName: "Reyes",
    location: { address: "82 Crestview Avenue", city: "Birmingham", postCode: "B3 2HQ" }
  },
  {
    email: "oliver.nkemelu@outlook.com",
    password: "Admin!2024",
    firstName: "Oliver",
    lastName: "Nkemelu",
    location: { address: "7 Ashford Road", city: "Leeds", postCode: "LS1 4AP" }
  },
  {
    email: "priya.chandrasekaran@gmail.com",
    password: "mango#1234",
    firstName: "Priya",
    lastName: "Chandrasekaran",
    location: { address: "33 Elmwood Close", city: "Edinburgh", postCode: "EH6 7TR" }
  },
  {
    email: "liam.oconnor@yahoo.com",
    password: "clover!99",
    firstName: "Liam",
    lastName: "OConnor",
    location: { address: "55 Rosemount Terrace", city: "Dublin", postCode: "D04 XY12" }
  },
  {
    email: "amara.diallo@gmail.com",
    password: "Daisy456!",
    firstName: "Amara",
    lastName: "Diallo",
    location: { address: "19 Foxglove Street", city: "London", postCode: "E1 6RF" }
  },
  {
    email: "henrik.larsson@gmail.com",
    password: "Secure#77",
    firstName: "Henrik",
    lastName: "Larsson",
    location: { address: "4 Storgatan", city: "Stockholm", postCode: "11122" }
  },
  {
    email: "chloe.beaumont@outlook.com",
    password: "Paris2023!",
    firstName: "Chloe",
    lastName: "Beaumont",
    location: { address: "27 Rue des Lilas", city: "Lyon", postCode: "69003" }
  },
  {
    email: "devraj.patel@hotmail.com",
    password: "cricket!88",
    firstName: "Devraj",
    lastName: "Patel",
    location: { address: "88 Ladypool Road", city: "Birmingham", postCode: "B12 8JS" }
  },
  {
    email: "natalia.wojcik@gmail.com",
    password: "Warsaw!55",
    firstName: "Natalia",
    lastName: "Wojcik",
    location: { address: "12 Ulica Lipowa", city: "Warsaw", postCode: "00-014" }
  },
  {
    email: "ethan.mcallister@yahoo.com",
    password: "thistle$99",
    firstName: "Ethan",
    lastName: "McAllister",
    location: { address: "3 Thistle Drive", city: "Glasgow", postCode: "G41 2RN" }
  },
  {
    email: "yuki.tanaka@gmail.com",
    password: "Sakura#21",
    firstName: "Yuki",
    lastName: "Tanaka",
    location: { address: "9 Kensington Gardens", city: "London", postCode: "W2 4BH" }
  },
  {
    email: "fatima.al-rashid@outlook.com",
    password: "desert!123",
    firstName: "Fatima",
    lastName: "AlRashid",
    location: { address: "61 Queensway", city: "London", postCode: "W2 3RY" }
  },
  {
    email: "marco.esposito@gmail.com",
    password: "Napoli!10",
    firstName: "Marco",
    lastName: "Esposito",
    location: { address: "Via Roma 14", city: "Naples", postCode: "80121" }
  },
  {
    email: "isabella.santos@hotmail.com",
    password: "flores22!",
    firstName: "Isabella",
    lastName: "Santos",
    location: { address: "Rua das Flores 22", city: "Porto", postCode: "4050-262" }
  },
  {
    email: "aleksei.volkov@gmail.com",
    password: "vodka!333",
    firstName: "Aleksei",
    lastName: "Volkov",
    location: { address: "Nevsky Prospekt 45", city: "Saint Petersburg", postCode: "191025" }
  },
  {
    email: "grace.oduya@yahoo.com",
    password: "Lagos!2024",
    firstName: "Grace",
    lastName: "Oduya",
    location: { address: "48 Victoria Island", city: "Lagos", postCode: "101241" }
  },
  {
    email: "noah.zimmermann@gmail.com",
    password: "Berlin#88",
    firstName: "Noah",
    lastName: "Zimmermann",
    location: { address: "Hauptstrasse 7", city: "Berlin", postCode: "10115" }
  },
  {
    email: "mei.lin.chen@outlook.com",
    password: "orchid#456",
    firstName: "Mei",
    lastName: "Chen",
    location: { address: "18 Orchard Road", city: "Singapore", postCode: "238829" }
  },
  {
    email: "tobias.eriksson@gmail.com",
    password: "fjord!007",
    firstName: "Tobias",
    lastName: "Eriksson",
    location: { address: "Bergsgatan 3", city: "Gothenburg", postCode: "41104" }
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // replace with your DB URI
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Cleared existing users");

    await User.insertMany(users);
    console.log("20 users seeded successfully");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

seed();