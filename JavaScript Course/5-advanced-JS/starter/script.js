// ***** Function constructor *****

// var john = {
// 	name: 'John',
// 	yearOfBirth: 1990,
// 	job: 'teacher'
// };

//console.table(john);

// var Person = function(name, yearOfBirth, job){
// 	this.name = name;
// 	this.yearOfBirth = yearOfBirth;
// 	this.job = job
// 	// this.calculateAge = function() {
// 	// 	console.log(2020 - this.yearOfBirth);
// 	// }
// };

// // Adding a method via prototype

// Person.prototype.calculateAge = function() {
// 	this.age = 2020 - this.yearOfBirth;
// 	console.log(this.age);
// };

// Person.prototype.lastName = 'Smith';

// var john = new Person('John', 1990, 'teacher'); // instansiation

// console.log(john);
// john.calculateAge();
// console.log(john.lastName);


// ***** Object.create *****

// var personProto = {
// 	calculateAge: function () {
// 		console.log(2020 - this.yearOfBirth);
// 	}
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
// 	name: {value: 'Jane'},
// 	yearOfBirth: {value: 1969},
// 	job: {value: 'designer'}
// });


// ***** Primitives vs Objects *****

// Primitives
// each variables here holds their own copy of the data
// console will be 46 then 23
// var a = 23;
// var b = a;
// a = 46;
// console.log(a);
// console.log(b);

// // Objects
// // objects are pointers. obj2 points to obj1, so any changes in obj1 will be reflected in obj2
// // console will log 30 and then 30
// var obj1 = {
// 	name: 'john',
// 	age: 26
// };

// var obj2 = obj1; // new reference points to same object in memory
// obj1.age = 30;

// console.log(obj1.age);
// console.log(obj2.age);

// // Functions
// var age = 27;
// var obj = {
// 	name: 'Jonas',
// 	city: 'Lisbon'
// };

// function change(a, b) {
// 	a = 30;
// 	b.city = 'San Francisco' // object data changed from within object, since b is a pointer to the object in memory
// }

// change(age, obj);

// console.log(age);
// console.log(obj.city);



// ***** Passing functions as arguments *****

// var years = [1990, 1965, 1937, 2005, 1998];

// // takes in an array and a function as argument. the function is then called later in code. any suitable function can be passed as an argument
// // this is a generic function that loops over an input array
// function arrayCalc(arr, fn) {
// 	var arrRes = [];
// 	console.log(arrRes);
// 	for (var i=0;i<arr.length;i++) {
// 		arrRes.push(fn(arr[i]));
// 		//arrRes[i] = fn(arr[i])
// 	}
// 	return arrRes;
// }

// function calculateAge(el) {
// 	return 2020-el;
// }	

// function isFullAge(el) {
// 	return el >= 18;
// }

// function maxHeartRate(el) {
// 	if (el >= 18 && el <= 81) {
// 		return Math.round(206.9 - (0.67*el));	
// 	}
// 	return -1;	
// }

// // calculateAge is now a callback function, becasue it is called later
// var ages = arrayCalc(years, calculateAge);
// console.log(ages)

// var fullAges = arrayCalc(ages, isFullAge);
// console.log(fullAges);

// var rates = arrayCalc(ages, maxHeartRate);
// console.log(rates);



// ***** Functions returning functions *****

// function interviewQuestion(job){
// 	if (job === 'designer') {
// 		return function(name) { // returning an anonymous function
// 			console.log(name + ', can you explain UX design.');
// 		}
// 	} else if (job === 'teacher') {
// 		return function(name) {
// 			console.log(name + ', what subject do you teach?');
// 		}
// 	} else {
// 		return function(name) {
// 			console.log(name + ', what do you do?');
// 		}
// 	}
// }

// // teacherQuestion will be a function
// var teacherQuestion = interviewQuestion('teacher');
// var designerQuestion = interviewQuestion('designer');

// // calling the function
// teacherQuestion('John');
// designerQuestion('John');
// interviewQuestion('teacher')('Mark'); // calling function immediately



// ***** IIFE *****

// using brackets to wrap the function JS will treat this as an expression, not a declaration
// (function () {
// 	var score = Math.random()*10;
// 	console.log(score >= 5);
// })(); // brackets at the end to call the function


// (function (goodluck) {
// 	var score = Math.random()*10;
// 	console.log(score >= 5-goodluck);
// })(5);



// ***** Closures *****


// generic retirement function
// function retirement(retirementAge) {
// 	var a = ' years left until retirement';
// 	return function (yearOfBirth) {
// 		var age = 2020 - yearOfBirth;
// 		console.log((retirementAge - age) + a);
// 	}
// }

// once we have returned a function from retirement, and retirement is done executing and removed from the stack, we can stil acces the variables 'a' and 
// 'retirementAge' eventhough the retirement function is out of the stack
// this is what is referred to as the Closure

// var retirementUS = retirement(66);


// var retirementGermany = retirement(65);


// var retirementIceland = retirement(67);

// var ageToTest = 1990;
// retirementUS(ageToTest);
// retirementGermany(ageToTest);
// retirementIceland(ageToTest);



// function interviewQuestion(job) {
// 	return function(name) {
// 		if (job === 'designer'){
// 			console.log(name + ', can you explain UX design.');
// 		} else if (job === 'teacher') {
// 			console.log(name + ', what subject do you teach?');
// 		} else {
// 			console.log(name + ', what do you do?');
// 		}
// 	}
// }

// interviewQuestion('teacher')('John');



// ***** Bind, Call and Apply *****

// var john = {
// 	name: 'John',
// 	age: 30,
// 	job: 'teacher',
// 	presentation: function(style, timeOfDay) {
// 		if (style === 'formal') {
// 			console.log('Good ' + timeOfDay + ' ladies and gentleman. I\'m ' + this.name + ', a '+ this.job + ', I am '+ this.age +' years old.');
// 		} else if (style === 'friendly') {
// 			console.log('Hi.');
// 		}
// 	}
// };


// // we can use the Call method to use the presentation method that we made in the john object
// var emily = {
// 	name: 'Emily',
// 	age: 35,
// 	job: 'designer'
// };

// john.presentation('formal', 'morning');

// // we can use the Call method to use the presentation method that we made in the john object
// // first argument is the this variable
// john.presentation.call(emily, 'formal', 'afternoon');

// // we can also use the apply method, which is very similar
// john.presentation.apply(emily, ['formal', 'afternoon']); // this should not work since presentation does not expect an array

// // bind method is alsi similar to Call method. The difference is it does not immediately call the function, but stores a copy (pointer?) for later use
// var emilyPresentation = john.presentation.bind(emily, 'formal', 'morning');
// var johnFormal = john.presentation.bind(john, 'formal');

// // this is called Couriering. Created function based on other functions, with some pre-defined arguments
// emilyPresentation();
// johnFormal('morning');





// ***** Coding Challenge 7 *****

// IIFE function for data security and function protection
(function () {
	// function constructor
	var Question = function(question, answers, correctAnswerIndex) {
		this.question = question; // string
		this.answers = answers; // array of string
		this.correctAnswerIndex = correctAnswerIndex; // index for array
	}

	// method to write question to console
	Question.prototype.writeToConsole = function () {
		console.log(this.question);
		for (var i=0;i<this.answers.length;i++) {
			console.log(i+': '+this.answers[i]);
		}
	};

	// method to check if given user answer is correct
	Question.prototype.isAnswerCorrect = function (userAnswer) {
		if (userAnswer === 'exit') {
			return;
		} else if (this.correctAnswerIndex === parseInt(userAnswer)) {
			console.log('That is correct!');
			// userScore += 1;
			displayScore(keepScore(true));
		} else {
			console.log('That is not correct.');
			displayScore(keepScore(false));
		}
		displayRandomQuestion();
	};

	function score() {
		var sc = 0;
		return function(correct) {
			if (correct) {
				sc++;
			}
			return sc;
		}
	}

	// sc gets defines since we call score()
	// then the returned function has sc as a variable and we can just use that to increment sc
	var keepScore = score();

	function displayScore(x) {
		console.log('Current score: '+x+'\n');
	}

	function displayRandomQuestion() {

		// display score
		// console.log('Current score is: '+userScore);

		// choosing a random question
		var j = Math.floor(Math.random()*questionsArr.length); // number will be between 0 and 2. Math.random() returns a number between 0 and 1
		questionsArr[j].writeToConsole();

		// asking user for input
		var userAnswer = prompt('What is your answer?');

		// add input validation here somewhere
		questionsArr[j].isAnswerCorrect(userAnswer);
	}

	// var userScore = 0;

	// creating new questions
	var q1 = new Question('What is the best programming language?', ['JavaScript', 'Python', 'Java', 'C#'], 0);
	var q2 = new Question('What is the teachers name?', ['Lukas', 'Jonas', 'Chris'], 1);
	var q3 = new Question('What is the answer to life, the universe and everything?', ['What?', 'No-one knows', '42'], 2);

	var questionsArr = [q1, q2, q3];

	displayRandomQuestion();	

})();

