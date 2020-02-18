
// ***** BUDGET CONTROLLER *****
// this is a module pattern using the IIFE concept
// it will return any variables/functions/objects we want to make public to other modules
var budgetController = (function() {

	// we need a data model for incomes and expenses
	// we know that the data will have a description and value. We want to add ID as well
	// we will use function constructors

	// Expense contructor
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function (totalIncome) {
		if (totalIncome > 0) {
			this.percentage = Math.round(100*this.value/totalIncome);	
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function () {
		return this.percentage;
	};

	// Income constructor
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	/// calculating total of income/expenses arrays
	var calculateTotal = function(type) {
		
		var sum = 0;

		// looping over income/expenses 
		data.allItems[type].forEach(function(cur, i, arr){
			sum += cur.value
		});

		// saving to data object
		data.totals[type] = sum;
	}

	// Data object
	var data = { 
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};


	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			// ID must be last ID + 1
			// getting last value of all inc/exp and then adding 1 to that value
			if (data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;	
			} else {
				ID = 0;
			}
			

			// creating new item based on type input
			if (type === 'exp'){
				newItem = new Expense(ID, des, val);	
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);  // this works since type input is inc or exp, and we define inc and exp as object keys
			//data.totals[type] += val;
			
			// returning newly created item
			return newItem;  
		}, 

		deleteItem: function (type, id) {
			var ids, index;

			// getting a new array of just the ids
			ids = data.allItems[type].map(function(cur, i, arr) {
				return cur.id;
			});

			// looking for id in newly created array and finding the index 
			index = ids.indexOf(id);  // returns -1 if not found

			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},

		calculateBudget: function() {
			// get total income get total expense - write new function for this
			calculateTotal('inc');
			calculateTotal('exp');

			// calculate budget (income - expenses)
			data.budget = data.totals.inc - data.totals.exp;

			// calculate percentage of income spent
			if (data.totals.inc>0) {
				data.percentage = Math.round(100*data.totals.exp/data.totals.inc);
			} else {
				data.percentage = -1;
			}
			
		},

		calculatePercentages: function() {
			// looping over all expenses and calculating percentages
			data.allItems.exp.forEach(function(cur, i, arr) {
				cur.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function () {
			var allPercs = data.allItems.exp.map(function(cur, i, arr) {
				return cur.getPercentage();
			});
			return allPercs;
		},

		getBudget: function() {
			return {
				budget: data.budget,
				totalIncome: data.totals.inc,
				totalExpenses: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function(){
			console.log(data);
		}
	};


})();
// we are storing the returned object into budgetController, that is why budgetController.publicTest(5) works


// ***** UI CONTROLLER *****
var UIController = (function() {
	
	var DOMStrings = {
		inputType: '.add__type',
		inputDes: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	};

	var formatNumber = function(num, type) {

			var numSplit, dec, int, sign;

			// +/- before number

			// exactly 2 decimal points

			// comma seperating 1000s

			if (num !== 0) {
				if (type === 'exp') {
					sign = '-';
				} else if (type === 'inc') {
					sign = '+';
				}
			} else {
				sign = '';
			}

			num = Math.abs(num);

			num = num.toFixed(2);

			numSplit = num.split('.');
			int = numSplit[0];
			dec = numSplit[1];

			if (int.length>3) {
				int = int.substring(0, int.length-3) + ', ' + int.substring(int.length-3, int.length);
			}

			return sign + ' ' + int + '.' + dec;

		}

	// function that is used to loop over each nodelist element
	var nodeListForEach = function(list, callback) {
		for (var i=0;i<list.length;i++) {
			callback(list[i], i, list);
		}
	};

	return {
		getInput: function() {
			// we have 3 input - input type (+/-), input description, input value

			return { // returning input object
				type: document.querySelector(DOMStrings.inputType).value, // will be inc or exp
				description: document.querySelector(DOMStrings.inputDes).value,
				value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
			};
			
		}, 

		addListItem: function(obj, type){
			var html, newHtml, element;

			// 1. Creating HTML string with placeholder text

			if (type === 'inc') {
				element = DOMStrings.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%">  \
					<div class="item__description">%description%</div> \
					<div class="right clearfix"><div class="item__value">%value%</div> \
					<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				} else if (type === 'exp') {
					element = DOMStrings.expenseContainer;
					html = '<div class="item clearfix" id="exp-%id%"> \
                    <div class="item__description">%description%</div><div class="right clearfix"> \
                    <div class="item__value">%value%</div><div class="item__percentage">21%</div> \
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
				}
			

			// 2. Replace placeholder text with data

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// 3. Insert HTML into DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  // inserting as the last child of container

		},

		deleteListItem: function(id) {
			var childToDelete = document.getElementById(id);
			childToDelete.parentNode.removeChild(childToDelete);
		},

		clearFields: function() {
			var fields, fieldsArray;

			fields = document.querySelectorAll(DOMStrings.inputDes + ', ' + DOMStrings.inputValue); // getting multiple elements. Uses CSS concatenation

			fieldsArray = Array.prototype.slice.call(fields);  // converting fields return type list to an array

			// looping over each element in array
			fieldsArray.forEach(function(cur, i, arr) { // this callback function has access to cuurent value of array, index number and entire array
				cur.value = '';
			}); 

			// setting focus back to first element
			fieldsArray[0].focus();
		},

		displayBudget: function(obj){

			obj.budget > 0 ? type = 'inc': type = 'exp';

			document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
			document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
			

			if (obj.percentage>0){
				document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage+'%';
			} else {
				document.querySelector(DOMStrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percs) {

			var fields = document.querySelectorAll(DOMStrings.expensesPercLabel); // return a node list

			nodeListForEach(fields, function(cur, i, arr) {
				if (percs[i] > 0) {
					cur.textContent = percs[i] + '%';
				} else {
					cur.textContent = '---';
				}				
			});
		},

		displayMonth: function() {
			var now, year, month, months;

			now = new Date();

			year = now.getFullYear();
			month = now.getMonth();
			months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' +year;
		},

		changeType: function () {
			// style manipulations for input fields

			var fields = document.querySelectorAll(DOMStrings.inputType + ', ' + DOMStrings.inputDes + ',' + DOMStrings.inputValue);

			nodeListForEach(fields, function(cur, i, arr) {
				cur.classList.toggle('red-focus');				
			});

			document.querySelector(DOMStrings.inputButton).classList.toggle('red');
		},

		getDOMStrings: function() {
			return DOMStrings;
		}
	}

})();


// ***** GLOBAL APP CONTROLLER *****
// we will pass the other modules to this module as arguments
var controller = (function(budgetCtrl, UICtrl) {

	function setupEventListeners() {

		var DOM = UICtrl.getDOMStrings();

		// Set up event listener for add button on click event
		document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

		// NOTE! When mouse is hovering over the add button and enter is pressed, both events will trigger. This must still be handled
		document.addEventListener('keypress', function(event) {

			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}

		});

		// Setting up delete listener - the event is automatically available in the callback fuction
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
	}

	var updatePercentages = function() {
		
		// 1. calculate percentages
		budgetCtrl.calculatePercentages();

		// 2. read percentages from budget controller
		var percentages = budgetCtrl.getPercentages();
		// console.log(percentages);

		// 3. update UI with new percentages
		UICtrl.displayPercentages(percentages);
	};

	var updateBudget = function (){
		
		// 1. calculate budget
		budgetCtrl.calculateBudget();

		// 2. return budget
		var budget = budgetCtrl.getBudget();

		// 3. display budget UI
		UICtrl.displayBudget(budget);

	};
	

	var ctrlAddItem = function() {
		// What to do when add button is clicked

		var input, newItem;

		// 1. get field input data
		input = UICtrl.getInput(); // will be an object of 3 inputs.
		//console.log(input);

		// testing input to make sure we do not add empty values to data
		if (input.description !== "" && !isNaN(input.value) && input.value>0) {

			// 2. add item to budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. add item to UI
			UICtrl.addListItem(newItem, input.type);

			// 4. clear fields
			UICtrl.clearFields();	

			// 5. calculate and update budget
			updateBudget();

			// 6. update percentages
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function(event) {

		var itemID, splitID, type, id;
		
		// getting id of element to delete by DOM traversal from event target
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {

			splitID = itemID.split('-');  // return an array of the split stirngs
			type = splitID[0];
			id = parseInt(splitID[1]);

			// 1. delete item from data structure
			budgetCtrl.deleteItem(type, id);

			// 2. delete item from UI
			UICtrl.deleteListItem(itemID);

			// 3. update and show new budget
			updateBudget();

			// 4. update percentages
			updatePercentages();
		}
	};

	return {
		init: function() {
			console.log('app has started');
			UICtrl.displayBudget({
				budget:0, 
				totalIncome:0, 
				totalExpenses:0, 
				percentage:-1});
			setupEventListeners();
			UICtrl.displayMonth();
		}
	};

	

})(budgetController, UIController);


 controller.init();