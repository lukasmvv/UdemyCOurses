// console.log('Hello world again');
// //alert('Hello World!');
// var bla = prompt('Tell me something');
// console.log(bla);




/*******************
Coding Challenge 1
*/
// var johnHeight = 1.78;
// var johnWeight = 80;
// var johnBMI = johnWeight/(johnHeight)^2;

// var markHeight = 1.5;
// var markWeight = 120;
// var markBMI = markWeight/(markHeight)^2;

// var markHigherBMI = markBMI > johnBMI;

// console.log('Does Mark ('+markBMI+') have a greater BMI than John ('+johnBMI+')? ' + markHigherBMI);




/*******************
Coding Challenge 2
*/

// var johnTeamAve = (89 + 120 + 103)/3;
// var markTeamAve = (116 + 94 + 123)/3;
// var maryTeamAve = (97 + 134 + 105)/3;

// var winnerText;

// switch (true) {
// 	case johnTeamAve > markTeamAve && johnTeamAve > maryTeamAve:
// 		winnerText = 'Johns team had an average of ' + johnTeamAve + ' points.';
// 		break;
// 	case markTeamAve > johnTeamAve && markTeamAve > maryTeamAve:
// 		winnerText = 'Marks team had an average of ' + markTeamAve + ' points.';
// 		break; 
// 	case maryTeamAve > johnTeamAve && maryTeamAve > markTeamAve:
// 		winnerText = 'Marks team had an average of ' + markTeamAve + ' points.';
// 		break;
// 	default:
// 		winnerText = 'There was a draw';
// }

// console.log(winnerText);




/*******************
Coding Challenge 3
*/

// function calculateTip(amount){
// 	if (amount < 50){
// 		return amount*0.2;
// 	} else if (amount > 200) {
// 		return amount*0.1;
// 	} else {
// 		return amount*0.15;
// 	}
// }

// var bills = [124, 48, 268];
// var tips = [calculateTip(bills[0]), 
// 			calculateTip(bills[1]), 
// 			calculateTip(bills[2])];
// var totals = [bills[0] + tips[0], 
// 				bills[1] + tips[1], 
// 				bills[2] + tips[2]];

// console.log(tips);
// console.log(totals);




/*******************
Coding Challenge 4
*/

// var john = {
// 	name: 'John',
// 	mass: 80,
// 	height: 1.78,
// 	calcBMI: function(){
// 		this.bmi = this.mass/(this.height^2);
// 		return this.bmi;
// 	}
// };

// var mark = {
// 	name: 'Mark',
// 	mass: 130,
// 	height: 1.4,
// 	calcBMI: function(){
// 		this.bmi = this.mass/(this.height^2);
// 		return this.bmi;
// 	}
// };

// john.calcBMI();
// mark.calcBMI();
// console.log(john, mark);

// if (john.bmi > mark.bmi) {
// 	console.log('John has the higher BMI: ' + john.bmi);
// } else if (mark.bmi > john.bmi) {
// 	console.log('Mark has the higher BMI: ' + mark.bmi);
// } else {
// 	console.log('They have the same BMI');
// }



/*******************
Coding Challenge 5
*/

function tipAverage(tips){
	var sum = 0;
	for (var i=0;i<tips.length;i++) {
		sum += tips[i];
	}
	return sum/tips.length;
}


var john = {
	name: 'John', 
	res: [124, 48, 268, 180, 42],
	tips: [],
	totals: [],
	calcTips: function(){
		for (var i = 0;i<this.res.length;i++) {  // 2 dots, precendence is left to right [this.res].length
			
			var bill = this.res[i];
			var perc = 0;

			if (bill < 50){
				perc = 0.2;
			} else if (bill > 200) {
				perc = 0.1;
			} else {
				perc = 0.15;
			}

			this.tips[i] = bill*perc;
			this.totals[i] = this.tips[i] + bill;
		}

		this.average = tipAverage(this.tips);

		return [this.tips, this.totals]
	}
};

var mark = {
	name: 'Mark',
	res: [77, 375, 110, 45],
	tips: [],
	totals: [],
	calcTips: function(){
		for (var i = 0;i<this.res.length;i++) {
			
			var bill = this.res[i];
			var perc = 0;
			
			if (bill < 100){
				perc = 0.2;
			} else if (bill > 300) {
				perc = 0.25;
			} else {
				perc = 0.1;
			}

			this.tips[i] = bill*perc;
			this.totals[i] = this.tips[i] + bill;
		}

		this.average = tipAverage(this.tips);

		return [this.tips, this.totals]
	}
};

var johnArrs = john.calcTips();
var markArrs = mark.calcTips();
console.log(john, mark);

if (john.average > mark.average){
	console.log(john.name + ' had a higher tip average: ' + john.average);
} else if (mark.average > john.average){
	console.log(mark.name + ' had a higher tip average: ' + mark.average);
} else {
	console.log('They had the same: ' + john.average + ' - ' + mark.average);
}