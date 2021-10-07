const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB');
const fruitsScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']},
    rating: {
    type: Number,
    min: 1,
    max: 10
    },
    review: String
});

const personsScheme = new mongoose.Schema({
    name: String,
    age: Number,
    favoritefruit: fruitsScheme
});

const Fruit = mongoose.model("Fruit", fruitsScheme);
const Person = mongoose.model("Person", personsScheme);
console.log(Person)
const apple = new Fruit ({
    name:'Apple',
    rating: 8,
    review: 'Pretty solid as a fruit'
});

const mango = new Fruit ({
    name:'Mango',
    rating: 6,
    review: 'Too sugary'
});

mango.save();
const person = new Person ({
    name:'John',
    age: 37,
    favoritefruit: mango
});
person.save();
const peach = new Fruit ({
    name:'Peach',
    rating: 8,
    review: "Mind Blowing"
});
// peach.save();

const kiwi = new Fruit ({
    name: 'Kiwi',
    rating: 10,
    review: 'Amazing'
});


const orange = new Fruit ({
    name: 'Orange',
    rating: 6,
    review: 'ok'
});

const banana = new Fruit ({
    name: 'Banana',
    rating: 7,
    review: 'required'
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err){
//         console.log('Error');
//     }
//     else{
//         console.log('Successfully created');
//     }

// })

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }
    else{
        // mongoose.connection.close();
        // console.log(fruits)
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        })
    }
})

// // create is basically insertOne
// Fruit.create(peach, function(err){
//     if (err){
//         console.log('Error');
//     }
//     else{
//         console.log('Successfully added Peach');
//     }

// })

Fruit.updateOne({name:"Peach"}, {review: "New review. its excellent"}, function(err){
    if (err){
        console.log(err);
    }
    else {
        
        console.log('Review for peach successfully updated');
        // mongoose.connection.close();
    }
})

// Fruit.deleteOne({name:"Apple"}, function(err){
//     if (err){
//         console.log(err);
//     }
//     else {
        
//         console.log('one apple deleted');
//         // mongoose.connection.close();
//     }
// })
