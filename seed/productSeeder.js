var mongoose = require('mongoose');
var Product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping');
var products = [new Product({
    imagePath: 'images/pic1.jpg',
    title: 'naru 5',
    description: '5narutos story' ,
    price: 12
}), new Product({
    imagePath: 'images/pic2.jpg',
    title: 'naru 6',
    description: '6narutos story' ,
    price: 22
}), new Product({
    imagePath: 'images/pic3.jpg',
    title: 'naru 7',
    description: '7narutos story' ,
    price: 32
}), new Product({
    imagePath: 'images/pic4.jpg',
    title: 'naru 8',
    description: '8narutos story' ,
    price: 42
}), new Product({
    imagePath: 'images/pic1.jpg',
    title: 'naru 9',
    description: '9narutos story' ,
    price: 52
})];

var done = 0;
for (var i=0; i<products.length; i++){
    products[i].save(function(err, result){
        done++;
        if (done == products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};
