const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://xuanhaotan:${password}@cluster0.btr3mlg.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    name: String,
    Number: String,
});

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        console.log("Phonebook:");
        for (let each of result) {
            console.log(`${each.name} ${each.Number}`);
        }
        mongoose.connection.close();
    });
} else {
    const nameinput = process.argv[3];
    const numberinput = process.argv[4];

    const person = new Person({
        name: nameinput,
        Number: numberinput,
    });

    person.save().then((result) => {
        console.log(result);
        console.log(`added ${nameinput} number ${numberinput} to phonebook`);
        mongoose.connection.close();
    });
}
