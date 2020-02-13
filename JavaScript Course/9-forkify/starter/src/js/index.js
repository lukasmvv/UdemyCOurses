// http://forkify-api.herokuapp.com/

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/shoppingView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Like recipes
*/
const state = {};


/*
* SEARCH CONTROLLER
*/
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput();

	if (query) {
		// 2. create new search object and add to state
		state.search = new Search(query);

		// 3. prepare ui for results (clear current search results)
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4. search for recipes - saves results in state object
			await state.search.getResults();

			// 5. render results on ui
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('error with search');
			clearLoader();
		}
		
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	// DOMElement.closest will find the handle event delegation when multiple elements can be clicked by a user
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});


/*
* RECIPE CONTROLLER
*/

const controlRecipe = async () => {
	// window.location is the full url. 

	// 1. Get ID from url
	const id = window.location.hash.replace('#','');
	
	if (id) {
		// 2. Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Highlight selected recipe
		if (state.search) {
			searchView.highlightSelected(id);
		}

		// 3. Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// 4. Get recipe data
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// 5. Calculate time and servings
			state.recipe.calcTime();
			state.recipe.calcServings();

			// 6. Render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		} catch (err) {
			alert('error processing recipe');
		}
		
	}
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



// Handle delete and update list events
elements.shopping.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid; // goes to the closest shopping item and returns the id from data attribute

	// handle delete button
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		// delete from state
		state.list.deleteItem(id);

		// delete from UI
		listView.deleteItem(id);

		// handle count update
	} else if (e.target.matches('.shopping__count-value')) {
		const val = parseFloat(e.target.value);
		state.list.updateCount(id, val);
	}
});

// Restore likes recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();
	state.likes.readStorage();
	likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
	state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {  // .btn-decrease * will match any child of btn-decrease
		if (state.recipe.servings>1) {
			state.recipe.updateServings('dec');	
			recipeView.updateServingsIngredients(state.recipe);
		}		
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn--add', '.recipe__btn--add *')) {
		// list controller
		controlList();
	} else if (e.target.matches('.recipe__love', '.recipe__love *')) {
		// like controller
		controlLikes();
	}
});


/*
* SHOPPING LIST CONTROLLER
*/
const controlList = () => {
	// create new list if it does not exist
	if (!state.list) {
		state.list = new List();
	}

	// add each ingredient to list and UI
	state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});

}

/*
* LIKE CONTROLLER
*/

const controlLikes = () => {
	if (!state.likes) {
		state.likes = new Likes();
	}

	const id = state.recipe.id;

	// user has not yet like recipe
	if (!state.likes.isLiked(id)) {

		// add like to state
		const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.author, state.recipe.img);
		//console.log(newLike);

		// toggle like button
		likesView.toggleLikeButton(true);

		// add like to ui list
		likesView.renderLike(newLike);

	// user has liked current recipe
	} else {

		// remove like from state
		state.likes.deleteLike(id);

		// toggle like button
		likesView.toggleLikeButton(false);

		// remove like from ui list
		likesView.deleteLike(id);
	}
	likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}