////////////////////////////////////////////////
//THE TEST SERVER IS RUNNING ON LOCALHOST:3000//
////////////////////////////////////////////////

// PROBLEM 1
/*
    In the index.html file in this folder there is a button with an id of 'say-hello-button'!

    Use querySelector to select that button and save it to a variable called sayHelloButton
*/

// CODE HERE
let sayHelloButton = document.querySelector('#say-hello-button')


// PROBLEM 2
/*
    Create a function that changes sayHelloButton's background color to black and its text color to white (you can use the .style object or create a CSS class and use classList.add)
    
    Attach a mouseover event to sayHelloButton that calls the function you wrote
*/

// CODE HERE
let changeBackgroundColor = () => {
    sayHelloButton.style.backgroundColor = 'black'
    sayHelloButton.style.color = 'white'
}

sayHelloButton.addEventListener('mouseover', changeBackgroundColor)


// PROBLEM 3
/*
    Now you can see that the button colors change, but they do not change back when we take the mouse off of the button.

    Write another function that changes the button back to its original colors. #EFEFEF for the background and black for the text.

    Attach another listener that fires your second function when the mouseout event occurs on the button
*/

// CODE HERE
let changeColorBack = () => {
    sayHelloButton.style.backgroundColor = '#EFEFEF'
    sayHelloButton.style.color = 'black'
}

sayHelloButton.addEventListener('mouseout', changeColorBack)


// PROBLEM 4
/*
    Now lets see if we can make a request to our server when we click the button

    Add a 3rd event listener to sayHelloButton and trigger the sayHello function when the button is clicked
*/

// DO NOT EDIT FUNCTION
const sayHello = () => {
    axios.get('http://localhost:3000/say-hello').then((res) => {
        let helloText = document.getElementById('hello-text');
        helloText.style.display = 'block';
        helloText.style.backgroundColor = 'green';
        helloText.textContent = res.data;
    })
}
// DO NOT EDIT FUNCTION

// CODE HERE
sayHelloButton.addEventListener('click', sayHello)


// PROBLEM 5 
/*
    Now that we have attached a few event listeners why dont we try adding a request? 
    
    Below you will find an event listener on a button. 
    
    Use axios inside the ohMy function to make a GET request to 'http://localhost:3000/animals' 
    
    Handle the promise that's returned with a .then, which you should pass a callback function to. Inside the callback function, console.log the response's data (in the intermediate instructions we'll come back to this function and add HTML).
*/ 

const ohMy = () => {
    // YOUR CODE HERE
    axios
    .get('http://localhost:3000/animals')
    .then((res)=>{
        let repeatText = document.getElementById('repeat-text')
        repeatText.style.display = 'block'
        repeatText.style.color = 'red'
        console.log(res.data)
        for(let i = 0; i<res.data.length; i++){
            let newElement = document.createElement('p')
            newElement.textContent = res.data[i]
            repeatText.append(newElement)
        }
    })
    .catch((err) => {
        console.error(err)
    })
}

document.getElementById('animals-button').addEventListener('click', ohMy)


// PROBLEM 6 
/*
    Now lets see if you can send a request param! inside repeatMyParam function below  make get request to 'http://localhost:3000/repeat/{SOMEPARAM}', but with a string instead of {SOMEPARAM}.  

    The function that runs when this request is made will return whatever parameter you sent 

    Handle the promise returned from the request with a .then, which will take in a callback -- the callback function should print the response.data.
    
    Outside of the function, select the button with the id "repeat-button" and add a click event listener that calls the repeatMyParam function.
    
    We'll be updating this function in the next problem.
*/

const repeatMyParam = () => {
    //YOUR CODE HERE
    axios
    .get('http://localhost:3000/repeat/cat')
    .then((res)=>{
        let repeatParam = document.getElementById('hello-text')
        repeatParam.textContent = res.data;
        repeatParam.style.display = 'block'
        repeatParam.style.color = 'blue'
        console.log(repeatParam.textContent)
    })
    .catch((err) => {
        console.error(err)
    })
}

document.getElementById('repeat-button').addEventListener('click', repeatMyParam)

// PROBLEM 7
/*
    Now that we have the response data, let's add it to our web page! 
    
    Inside the repeatMyParam function above, grab the element with the id of 'repeat-text' and set its textContent property equal to the response data.

    After setting the textContent, use the style method to change display to 'block'
*/

// Code in the repeatMyParam function above


// PROBLEM 8
/*
    Time to attach a query to our request!

    Write a function that makes a get request to 'http://localhost:3000/query-test', with a query of your choice on the end!

    Outside of your new function, select the button with the id "query-button" and add a click event listener that calls your function.
*/

// CODE HERE
let getRequest = () => {
    axios
    .get('http://localhost:3000/query-test/?animal=dog&flower=rose')
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.error(err)
    })
}

document.getElementById('query-button').addEventListener('click', getRequest)



////////////////
//INTERMEDIATE//
////////////////

// PROBLEM 9
/* 
    Back in the ohMy function on Problem 5, replace the console log in the promise's callback with a for loop that loops over res.data. 

    On each iteration of the loop, create a new p element. Set its textContent equal the string at the current index (i) and then append the new p element onto the document's body. 
*/

// Code in the ohMy function in Problem 5

// PROBLEM 10 
/*
    In the function that you wrote for Problem 8, change the URL to test a couple different scenarios. 

    1: Send no queries on the URL -- what happened?
    Answer: Received a console log saying, 'You sent an empty query!'

    2: Send more than 1 query on the URL -- what happened?
    Answer: Received a console log '{message: "You sent more than 1 query!", queries: {animal: "dog", flower: "rose"}}'
*/

// Edit code in Problem 8



////////////
//ADVANCED//
////////////

//PROBLEM 11
/*
    You are going to add the ability to POST to the server. You'll need to create a small form and write a function that makes a post request. Then you'll attach that function to the submit event on the form. We'll be creating a list of foods. 

    In the index.html file inside of the client folder, create a form with one text input field and a button. The input field should have a placeholder that tells the user to enter a food. And the button should indicate that it will add food into a list. 

    In this file (script.js), create a function called createFood. 
    
    Inside the function, select the input you just created in the HTML and save it to a variable called foodInput. 
    
    Next, create an object called body inside the function. It should have one key-value pair. The key should be newFood (make sure to match the case and spelling exactly) and the value should be the value of the food input. 

    Now make an axios post request to /food. Inside the parentheses where you passed the URL in, pass in body as the second argument. 

    Use a .then to handle the promise returned from the axios call. Pass a callback function to the .then. Inside that callback, console log the res.data. 

    Based on what we did earlier to display this type of data, write code that will display the response in your HTML document. 
*/

// CODE HERE

// Function to handle the form submit and make the POST request
const createFood = (event) => {
    event.preventDefault() // Prevent the default form submission behavior

    // Get the input element and its value
    let foodInput = document.querySelector('input')
    

    // Create the request body with the new food item
    let body = {
        newFood: foodInput.value
    };

    // Make the POST request using axios
    axios.post('http://localhost:3000/food', body)
        .then((res) => {
            console.log(res.data)
            // On successful response, update the list of foods
            let responseText = document.getElementById('repeat-text')
            responseText.style.display = 'block'
            responseText.style.color = 'blue'
            responseText.textContent = res.data.join(', ')
        })
        .catch((err) => {
            // Handle errors if any
            console.error(err)
        });
};

document.querySelector('form').addEventListener('submit', createFood)