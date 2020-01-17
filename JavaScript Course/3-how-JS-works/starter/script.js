///////////////////////////////////////
// Lecture: Hoisting


// Hoisting with function declarations
// Using a function before it is declared - this is possible thanks to hoisting
calcAge(1965);

function calcAge(year) {
    console.log(2020-year);
}

// Using function after declaring it
calcAge(1990);


// Hoisting with funtcion expressions

//retirement(1965);

var retirement = function(year) {
    console.log(65 - (2020 - year));
}

retirement(1990);


// variables
console.log(age);
var age = 23;
console.log(age);











///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









