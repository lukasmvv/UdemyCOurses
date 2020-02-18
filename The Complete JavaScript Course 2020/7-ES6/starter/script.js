// ***** Let and Const *****

/*

// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';

//ES6
const name6 = 'Jane Smith';
let age6 = 23;


//ES5
function drivers5(passedTest) {
	if (passedTest) {
		var firstName = 'John';
		var yearOfBirth = 1990;

		// console.log(firstName + ', ' + yearOfBirth);
	}

	console.log(firstName + ', ' + yearOfBirth);
}
drivers5(true);

//ES6
function drivers6(passedTest) {
	if (passedTest) {
		let firstName = 'John';
		const yearOfBirth = 1990;

		// console.log(firstName + ', ' + yearOfBirth);	
	}
	//console.log(firstName + ', ' + yearOfBirth);
}
drivers6(true);

//ES6
let i = 23;

for (let i=0;i<5;i++) {
	console.log(i);
}
console.log(i);


// ***** Blocks and IIFEs *****

{
	let a = 1;
	let b = 2;
	console.log(a+b); // this will work
}
//console.log(a+b); // this will not work\



// ***** Strings *****

// Template literals
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
	return 2020 - year;
}

//ES5
console.log('This is the firstname ' + firstName + ' ' + lastName + ', ' + yearOfBirth+'. '+calcAge(yearOfBirth));

//ES6 - template literals
console.log(`This is ${firstName} ${lastName}, he was born in ${yearOfBirth} and is ${calcAge(yearOfBirth)} old`);

// New string methods
const n = `${firstName} ${lastName}`;

console.log(n.startsWith('J')); // return true/false
console.log(n.endsWith('h')); // return true/false
console.log(n.includes(' ')); // return true/false
console.log(firstName.repeat(5)); // repeats string


// ***** Arrow Functions *****

const years = [1990, 1965, 1982, 1937];

//ES5 - map method loops over array and returns into a new array
var ages5 = years.map(function(current, i, arr) {
	return 2020 - current;
});
console.log(ages5);

//ES6
const ages6 = years.map(current => 2020 - current);
console.log(ages6);
const ages6again = years.map((current, i, arr) => 2020 - current);
console.log(ages6again);
const ages6againagain = years.map((current, i, arr) => {
	let y = 2020 - current;
	return y;
});
console.log(ages6againagain);


// ***** Arrow Function: Lexical 'this' *****

//ES5
var box5 = {
	color: 'green',
	position: 1,
	clickMe: function() {  // in clickMe, we have access to color and position, because it is a method, and the this keyword points to the box5 object
		var self = this;
		document.querySelector('.green').addEventListener('click', function () { // in this function, the this keyword points to the global this, so we DO NOT have access to color and position. That is why we save the this in self and then use self
			var str = 'This is box number ' + self.position + ' and it is ' + self.color;
			alert(str);
		});
	}
}
box5.clickMe();

//ES6
const box6 = {
	color: 'green',
	position: 1,
	clickMe: function() {  
		document.querySelector('.green').addEventListener('click', () => { 
			let str = `This is box number ${this.position} and it is ${this.color}`;
			alert(str);
		});
	}
}
box6.clickMe();


function Person(name) {
	this.name = name;
}

//ES5
Person.prototype.myFriends5 = function (friends) {
	// here we have acces to this that points to object
	// var self = this;
	// we can set self to this, or we can use the bind method to copy the function and manually set the this keyword
	var arr = friends.map(function(curr, i, arr) {
		// here thsi will point to global this
		return this.name + ' is friends with ' + curr;
	}.bind(this));

	console.log(arr);
}


var friends5 = ['Bob', 'Jane', 'Marc'];
var john = new Person('john').myFriends5(friends5);

//ES6
Person.prototype.myFriends6 = function (friends) {
	let arr = friends.map((current, i, arr) => { // this arrow function has no this keyword, so when we call this it is the this keyword from myFriends6 function
		return `${this.name} is friends with ${current}`
	});
	console.log(arr);
}

const friends6 = ['Monica', 'Joey', 'Phoebe'];
let chandler = new Person('Chandler').myFriends6(friends6);






// ***** Destructuring *****

//ES5
var john5 = ['John', 26];
var name5 = john5[0];
var age5 = john5[1];

//ES6
const [name66, age66] = ['John', 26]; // this stores john and 26 into name6 and age6
console.log(name66);

// same applies to objects

const obj = {
	firstName: 'John',
	lastName: 'Smith'
};

// same variable names
const {firstName, lastName} = obj;

// different variable names
const {firstName: a, lastName: b} = obj;



function calcAgeRet(yearOfBirth) {
	var year = 2020;
	var age = year - yearOfBirth;
	return [age, 65 - age];
}

const [age, retirement] = calcAgeRet(1990);
console.log(age);
console.log(retirement);




// ***** Arrays in ES6 *****

const boxes = document.querySelectorAll('.box'); // returns a node list




//ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(curr, i, arr){
// 	curr.style.backgroundColor = 'dodgerblue';
// });


// for(var i=0;i<boxesArr5.length;i++) { 
// 	if (boxesArr5[i].className === 'box blue') {  // classname returns the class of an element
// 		continue;  // skips rest of code in function block and continues the array
// 	}
// 	boxesArr5[i].textContent = 'I changed to blue';

// }	



//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach((curr, i, arr) => {
	curr.style.backgroundColor = 'dodgerblue';
});

// Array.from(boxes).forEach((curr, i, arr) => {
// 	curr.style.backgroundColor = 'dodgerblue';
// });

for (const cur of boxesArr6) {
	if (cur.className === 'box blue') {
		continue;
	}
	cur.textContent = 'I changed to blue again';
}



//ES5
var ages = [12, 17, 8, 21, 14, 11, 22, 56, 6];
var full = ages.map(function(cur) {
	return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
console.log(ages.findIndex(cur => cur >= 18)); // callback function has access to cur, i, arr
console.log(ages.find(cur => cur >= 18));





// ***** Spread Operator *****

function addFourAges(a, b, c, d) {
	return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ages is in an array, how to easily send to function


//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages); // aplly takes the array and calls the function using the array elements are arguments
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages); // the spread operator (...) expands the array into its elements
console.log(sum3);

// another use case is to join arrays
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Anne'];

const bigFamily = [...familySmith,...familyMiller];
console.log(bigFamily);


// node list use case - spread also works on node lists
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(cur =>{
	cur.style.color = 'purple';
});





// ***** Rest Parameters ***** 

//ES5
function isFullAge5(limit){
	console.log(arguments); // arguments is a special variables we have access to in all functions

	// arguments is array type, not an array, so we have to convert
	var argsArr = Array.prototype.slice.call(arguments, 1); // starts slicing at position 1, since we dont want argument limit in argsArr

	argsArr.forEach(function(curr) {
		console.log((2016 - curr) >= limit);
	});
}

isFullAge5(21, 1998, 1999, 1965);


//ES6
function isFullAge6(limit, ...years){  // as soon as we call the function, the rest operator will create an array called years containing all arguments that we can use
	years.forEach((cur) => {
		console.log((2016 - cur) >= limit);
	});
}
isFullAge6(21, 1998, 1999, 1965);




// ***** Default Parameters *****

//ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

	lastName === undefined ? lastName = 'Smith' : lastName;
	nationality === undefined ? nationality = 'SA': nationality;

	this.firstName = firstName;
	this.yearOfBirth = yearOfBirth;
	this.lastName = lastName;
	this.nationality = nationality;
}

var john5 = new SmithPerson5('john', 1990); // JS allows us to call function without specifiying all arguments - will be set to undefined
console.log(john5);

//ES6
function SmithPerson6(firstName, yearOfBirth, lastName='Smith', nationality='SA') {
	this.firstName = firstName;
	this.yearOfBirth = yearOfBirth;
	this.lastName = lastName;
	this.nationality = nationality;
}

var john6 = new SmithPerson6('john', 1990); // JS allows us to call function without specifiying all arguments - will be set to undefined
console.log(john6);





// ****** Maps *****

const question = new Map(); // empty map

//setting data
question.set('question', 'name of latest major JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct');
question.set(false, 'wrong');

// getting data
console.log(question.get('question')); 

// map size
//console.log(question.size);

// deleting data (specify key)
//question.delete(4);

// checking map inclusion (specify key) and then deleting
// if (question.has(4)) {
// 	console.log('answer 4 is there');
// }

// delete all from map
//question.clear();


// looping over maps
// question.forEach((value, key, map) => {
// 	console.log(`This is ${key} and the value is ${value}`);
// });

// looping with for of
// using the entries() method returns all the key values pairs
// using destructuring we can save them seperatly
for (let [key, value] of question.entries()) {
	//console.log(`This is ${key} and the value is ${value}`);

	//printing questions
	if (typeof(key) === 'number') {
		console.log(`Answer ${key}: ${value}`);
	}
}

const ans = parseInt(prompt('Write correct answer.'));

// getting true/false when using terniary operator to compare input and correct index
// true/false value is then used as input for getting string output
// this is much simpler than writing a bunch of if/elses
console.log(question.get(ans === question.get('correct')));




// ***** Classes *****

//ES5
var Person5 = function(name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
};

Person5.prototype.calculateAge = function () {
	var age = new Date().getFullYear() - this.yearOfBirth;
	console.log(age);
};

var john5 = new Person5('john', 1990, 'teacher');
john5.calculateAge();

//ES6
class Person6 {
	constructor (name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	} // note no comma separators

	calculateAge() {
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}

	static greeting() {
		console.log('Hey there!');
	}
}

Person6.greeting();

const john6 = new Person6('john', 1990, 'teacher');
john6.calculateAge();




// ***** Classes With Subclasses *****

//ES5
var Person5 = function(name, yearOfBirth, job) {
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
};

Person5.prototype.calculateAge = function () {
	var age = new Date().getFullYear() - this.yearOfBirth;
	console.log(age);
};

var athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
	Person5.call(this, name, yearOfBirth, job);
	this.olympicGames = olympicGames;
	this.medals = medals;
}

athlete5.prototype = Object.create(Person5.prototype);  // this links up the prorotype chain

athlete5.prototype.wonMedal = function () {
	this.medals++;
	console.log(this.medals);
}

var johnAthlete5 = new athlete5('john', 1990, 'teacher', 3, 10);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//ES6
class Person6 {  // this is the superclass
	constructor (name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
	} // note no comma separators

	calculateAge() {
		var age = new Date().getFullYear() - this.yearOfBirth;
		console.log(age);
	}
}

class Athlete6 extends Person6 {
	constructor (name, yearOfBirth, job, olympicGames, medals) {
		super(name, yearOfBirth, job);
		this.olympicGames = olympicGames;
		this.medals = medals;
	}

	wonMedal() {
		this.medals++;
		console.log(this.medals);
	}
}

var johnAthlete6 = new athlete5('john', 1990, 'teacher', 3, 10);
johnAthlete6.calculateAge();
johnAthlete6.wonMedal();

*/


// ***** Coding Challenge 8 *****

// 3 parks, 4 streets
// all parks and streets have a name and build year


// create town elements class
class TownElement {
	constructor(name, buildYear) {
		this.name = name;
		this.buildYear = buildYear;
	}

	calculateAge() {
		return (new Date().getFullYear() - this.buildYear);
	}
}

// creating parks subclass
class Park extends TownElement {
	constructor(name, buildYear, area, numTrees) {
		super(name, buildYear);
		this.numTrees = numTrees;
		this.area = area;
	}

	getParkReport() {
		return `${this.name} has a tree density of ${this.numTrees/this.area} per square km.`;
	}
}

// creating streets subclass
class Street extends TownElement {
	constructor(name, buildYear, streetLength, streetSize=3) {
		super(name, buildYear);
		this.streetLength = streetLength;
		this.streetSize = streetSize;
	}

	getStreetReport() {
		const classification = new Map();
		classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

		return `${this.name}, built in ${this.buildYear}, is a ${classification.get(this.streetSize)} street.`;
	}
}

function calcAverage(arr) {
	// let sum = 0;

	// for(var i=0;i<arr.length;i++) {
	// 	sum += arr[i];
	// }
	// return [sum, sum/arr.length];


	const sum = arr.reduce((prev, cur, i) => {
		prev + cur;
	}, 0);
	return [sum, sum/arr.length];
}

function parkReport(parks) {
	console.log('-----PARKS REPORT-----');
	// parks average age - needs array of ages
	let ages = parks.map(el => el.calculateAge());
	let [totalAge, averageAge] = calcAverage(ages);
	console.log(`Our ${parks.length} parks have an average age of ${averageAge} years`);

	// park report for each park...
	parks.forEach(el => console.log(el.getParkReport()));

	// park with > 1000 trees - need array of trees - using map to get a new array, and then using findIndex on new array
	let trees = parks.map(el => el.numTrees);
	const i = trees.findIndex(el => el >= 1000);
	console.log(`${parks[i].name} has more than 1000 trees.`);

}

function streetReport(streets) {
	console.log('-----PARKS REPORT-----');

	// total and average lengths - need array of lengths
	let lengths = streets.map(el => el.streetLength);
	let [totalLength, averageLength] = calcAverage(lengths);
	console.log(`Our ${streets.length} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`);

	// each street report...
	streets.forEach(el => console.log(el.getStreetReport()));
}

// creating park instances
const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


// calling report functions
parkReport(allParks);
streetReport(allStreets);