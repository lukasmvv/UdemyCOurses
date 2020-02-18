import {elements} from './base';

export const getInput = () => elements.searchInput.value; // single line arrow function does not need a return

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	elements.searchResultList.innerHTML = ''; // clearing html
	elements.searchResPages.innerHTML = '';
};

export const highlightSelected = (id) => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
	document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active'); // css selector - attribute with a certain Hash id
}

export const limitRecipeTitle = (title, limit=17) => {
	const newTitle = [];
	if (title.length>limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur);
			}
			return acc + cur.length;
		}, 0); // initial accumulator of 0

		return `${newTitle.join(' ')} ...`;
	}
	return title;
};


const renderRecipe = (recipe) => {
	const title = limitRecipeTitle(recipe.title);
	const markup = `
				<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt=${recipe.title}>
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
	`;

	// Adding html to document
	elements.searchResultList.insertAdjacentHTML('beforeend', markup);

};

const createButton = (page, type) => {
	return `
				<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
                    <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
                    </svg>                    
                </button>
    `;
}

const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults/resPerPage);

	let button;
	if (page===1 && pages > 1) {
		// button to go to next page
		button = createButton(page, 'next');
	} else if (page===pages && pages > 1) {
		// last page so button to go previous page
		button = createButton(page, 'prev');
	} else if (page < pages) {
		// both buttons
		button = `${createButton(page, 'prev')} ${createButton(page, 'next')}`; 
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page=1, resPerPage=10) => {
	
	// redner results
	const start = (page-1)*resPerPage;
	const end = start+resPerPage;

	recipes.slice(start, end).forEach(renderRecipe); // for each will autopmatically pass the c, i, arr values into the callback function

	// render buttons
	renderButtons(page, recipes.length, resPerPage);

};

