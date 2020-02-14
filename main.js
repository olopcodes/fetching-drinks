// adding a scroll event
window.addEventListener('scroll', ()=> {
    document.querySelector('.box-scroll').classList.add('show');
})




//  put eventlisteners on the parent
const btnsWrapper = document.querySelector('#btns');
// console.log(btnsWrapper)

// add click event on all buttons in the wrapper
btnsWrapper.addEventListener('click', async (e) =>{
    // since you put the event listener on the wrapper
    // user might click something with no id
    const type = e.target.id;
    if (type) {
        const displayedDrinks = document.querySelectorAll('.drink');
        if (displayedDrinks.length > 0) {
            clearDrinks(displayedDrinks);
        };
        
        await showDrinks(type);
    } 
})




// ALL functions ****************************************8

// function that gets the types of drinks selected
const getDrinks = async (type) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`;
    // waiting the response from the server
    // nothing runs until this is done
    const res = await fetch(url);
    // converting info from server to useable data
    // the data returned is an obj called drinks with
    //  arrays inside
    const data = await res.json();
    // to get the drinks in the obj
    const drinks = data.drinks;
    // console.log(drinks);
    return drinks;
}


// function that shows drinks on the page
const showDrinks = async (type) => {
    let searchValue;
    // made this an async an await
    // to store the value in the variable
    const drinks = await getDrinks(type);
    // console.log(drinks);

    // loop through the array and add to the page
    for(let drink of drinks) {
        const drinkImg = drink.strDrinkThumb;
        // console.log(drinkImg);
        const drinkName = drink.strDrink;
        // console.log(drinkName);

        // create elements to add
        const div = document.createElement('div');
        div.classList.add('drink');
        div.classList.add('open')
        div.id = drinkName;
        const img = document.createElement('img');
        img.src = drinkImg;
        const h3 = document.createElement('h3');
        h3.textContent = drinkName;

        // add drink details to the div
        div.appendChild(img);
        div.appendChild(h3);

        // add the div to the webpage
        document.querySelector('#drinks-wrapper').append(div);
        
        // adding an event listener that prints the id of the parent 
        div.addEventListener('click', (e) =>{
            const value = e.target.parentNode.id;
            showPopup(value);
        })
    }
}



// this will search the drink and return drink info
const searchDrink = async (searchValue) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    // using array to access the info returned
    const drinkInfo = data.drinks[0];
    const array = [];
    const drinkObj = {
        name: drinkInfo.strDrink,
        img: drinkInfo.strDrinkThumb,
        ingredient1: drinkInfo.strIngredient1,
        ingredient2: drinkInfo.strIngredient2,
        ingredient3: drinkInfo.strIngredient3,
        ingredient4: drinkInfo.strIngredient4,
        ingredient5: drinkInfo.strIngredient5,
        ingredient6: drinkInfo.strIngredient6,
        ingredient7: drinkInfo.strIngredient7,
        ingredient8: drinkInfo.strIngredient8,
        ingredient9: drinkInfo.strIngredient9,
        ingredient10: drinkInfo.strIngredient10,
        ingredient11: drinkInfo.strIngredient11,
        ingredient12: drinkInfo.strIngredient12,
        ingredient13: drinkInfo.strIngredient13,
        ingredient14: drinkInfo.strIngredient14,
        ingredient15: drinkInfo.strIngredient15,
        instructions: drinkInfo.strInstructions
    }

    // filling the array with valid info
    for(let info in drinkObj) {
        if(drinkObj[info]){
            array.push(drinkObj[info])
        }
    }
    const name = array[0];
    const img = array[1];
    const instructions = array[array.length-1];
    // this is to get all the ingreeients 
    const spliceEnd = array.length-3;
    // joining the array into a string
    const ingredients = array.splice(2, spliceEnd).join(', ');
    
    return {
        name,
        img,
        ingredients,
        instructions
    }

}




// populate the popup with info from search drink
const showPopup = async (searchValue) => {
    // function returns an obj with values
    const drinkInfo = await searchDrink(searchValue);
    const name = drinkInfo.name;
    const img = drinkInfo.img;
    const ingredients = drinkInfo.ingredients;
    const instructions = drinkInfo.instructions;
    console.log(name);
    console.log(img);
    console.log(ingredients);
    console.log(instructions);

    popupHtml(name, img, ingredients, instructions);
}


// popHTML
function popupHtml (name, img, ing, inst) {

    const popup = document.createElement('div');
    popup.classList.add('popup');

    const wrapper = document.createElement('div');
    wrapper.classList.add('popup-wrapper')
    popup.append(wrapper)

    const pic = document.createElement('img');
    pic.src = img;
    wrapper.append(pic);

    const h3 = document.createElement('h3');
    h3.innerText = name
    wrapper.append(h3);

    const info = document.createElement('p');
    info.innerText = ing;
    wrapper.append(info);

    const make = document.createElement('p');
    make.innerHTML = `<span style="color: tan">Instructions:</span> ${inst}`;
    wrapper.append(make);

    // add close btn
    const close = document.createElement('div');
    close.classList.add('close-btn');
    close.innerText = 'Close';
    // inserting the close btn before wrapper 
    // inside of the popoup
    popup.insertBefore(close, wrapper);

    popup.classList.add('active');
    document.querySelector('body').append(popup);


    // add a close btn and the js required
   removePopup(close);
   removePopup(popup);
}


function removePopup (el) {
    el.addEventListener('click', ()=> {
        // removing popups already there
        if(document.querySelector('.popup')){
            document.querySelector('.popup').remove()
        }
        popup.classList.remove('active')
    })
}


// clear the page if drinks are already there
function clearDrinks (displayedDrinks) {
    for(let drink of displayedDrinks) {
        drink.remove();
    }
}

