import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		// using shorthand to add item to object with same name 
		const item = {
			id: uniqid(),
			count, 
			unit, 
			ingredient
		}

		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex(el => el.id === id); // returns elements where condition is matched
		this.items.splice(index, 1); // splice(startIndex, numElements) mutates array and returns requested items. slice(startIndex, endIndex) does not mutate but copies requested array portion
	}

	updateCount(id, newCount) {
		// arr.find() returns element where condition is matched
		this.items.find(el => el.id === id).count = newCount; 
	}
}