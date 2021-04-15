/*----- Global Variables -----*/
// setting global variables 
let number1 = "", number2 = "", operator = "", blnEquals = false;

/*----- Selecting Elements from the DOM -----*/

// The querySelectorAll returns all the matches for the specified selectors

// This selects the collection of all number elements
var arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers);

// This selects the collection of all operator elements
var arrOperators = document.querySelectorAll(".operator");
// console.log(arrOperators);

// This querySelector method returns first element that matches the specified selectors

// This returns the first maths (answer) element
var objMaths = document.querySelector(".maths");
// console.log(objMaths);

// This returns the first preview element
var objPreview = document.querySelector(".preview");
// console.log(objPreview);

// This selects the first previous element
var objPrevious = document.querySelector(".previous");
// console.log(objPrevious);

// This selects the first clear element
var objClear = document.querySelector(".clear");
// console.log(objClear);

// This selects the first equal element
var objEqual = document.querySelector(".equal");
// console.log(objEquals);

// This selects the first error element
var objError = document.querySelector(".error");
// console.log(objError);

// This selects the decimal element
var objDecimal = document.querySelector(".decimal");
// console.log(objDecimal);


/*----- Event Listeners -----*/

// This loops through each iteration of the numbers elements and calls the preview function
for(var counter = 0; counter < arrNumbers.length; counter++) {
  // console.log(arrNumbers[counter]);
    objNumber = arrNumbers[counter];
    objNumber.addEventListener("click", preview); // added to each iteration
}

// This loops through each iteration of the operators elements and calls the preview fuction
for(var counter = 0; counter < arrOperators.length; counter++) {
    objNumber = arrOperators[counter];
    objNumber.addEventListener("click", preview); // added to each iteration
  // console.log(arrOperators[counter]);
}

// This calls the clear function
objClear.addEventListener("click", clear);

// This calls the equal function
objEqual.addEventListener("click", equal);

// This calls the preview function for demical object
objDecimal.addEventListener("click", preview);

/*----- Functions -----*/
// event is native JS

function preview(event) {
  // console.log(blnEquals);
  // console.log(event.target.innerHTML);

	// The currentItem variable is the innerHTML of the being pressed
    var currentItem = event.target.innerHTML;
    var dataType; // undefined variable
    var strMessage; // undefined variable

		// if an operator has been selected the dataType variable is set to operator. Default is set to a number
    switch(currentItem){
        case 'x':
        case '÷':
        case '-':
        case '+':
            dataType = 'operator';
        break;
        default:
            dataType = 'number';
        break;
  }

  // console.log(currentItem);
  // console.log(dataType);

	// if the data type equals operator
  if(dataType == 'operator'){
		blnEquals = false;
		// if there is a number2
		if(number2){
			// number1 is set to the calculator fuction arguments
			number1 = calculator(number1, number2, operator);

			// number2 variable is empty
			number2 = "";

			// the previous box is set to equal the preview box
			objPrevious.innerHTML = objPreview.innerHTML;

			// the maths box is empty
			objMaths.innerHTML = "";
		}

		// if there is a number1
    if(number1){
				// operator is what has been pressed
        operator = currentItem;

				// pass the message showing the value of number1 and the pressed operator
        strMessage = number1 + ' ' + operator;
    } else {
				// if no number has been selected pass the below message
        objError.innerHTML = 'You cannot set an operator without a number being set';
				// this ends the function
				return;
    }
  } else {
			// if equals was used recently, unset the equals boolean
			if(blnEquals){
				// number1 value will be empty
				number1 = "";
				// previous box will be empty
				objPrevious.innerHTML = "";
				// the program can then carry on running as usual
				blnEquals = false;
			}
			// if it is an operator
      if(operator){
				// if there is a number2
      	if(number2){
						// if the currentItem pressed is equal to decimal
						if(currentItem == '.'){
								// if the number2 doesn't have a decimal
								if(!hasDecimal(number2)){
									// then add decimal to the number2
									number2 += currentItem;
								}
							// otherwise add the currentItem pressed to number2
						} else {
            		number2 += currentItem;
						}
					// if there is no number2
				} else {
						// if the currentItem pressed is equal to decimal
						if(currentItem == '.'){
								// set number2 with a leading 0.
								number2 = '0.';
						} else {
								// set number2 equals to the currentItem
								number2 = currentItem;
						}
					}
					// set the strMessage equals to number1, the operator and number2
          strMessage = number1 + ' ' + operator + ' ' + number2;
					
					// variable sum is set to the calculator function passing through arguments 
					var sum = calculator(number1,number2,operator);
					
					// the maths box is set to the sum calculated.
  				objMaths.innerHTML = sum;
			// if it is not an operator
      } else {
					// if there is a number1
          if(number1){
						// if the currentItem pressed is equal to decimal
						if(currentItem == '.'){
							// if the number1 doesn't have a decimal
								if(!hasDecimal(number1)){
									// add the decimal to number1
									number1 += currentItem;
								}
							// otherwise add the currentItem to number1
						}	else {
              	number1 += currentItem;
          	}
						// if there is no number1
					} else {
								// if the curentItem pressed is equal to decimal
								if(currentItem == '.'){
										// set number1 with a leading 0.
										number1 = '0.';
									// otherwise set number1 equals to the currentItem selected
								} else {
										number1 = currentItem;
								}
					}
					// set the number1 value to the strMessage variable
          strMessage = number1;
      }
  }
	// the preview box displays the strMessage variable
  objPreview.innerHTML = strMessage
}

// decimal function
function hasDecimal(number){
	// returns true or false if the decimal point is present
	// retrieves the position of the decimal point in the string. This is zero based, when not found will be -1.
	// if not found (i.e. > -1), set error message and true
	// if not found return false
	// indexOf returns -1 if it cannot find the string passed to the argument
	if(number.indexOf('.') !== -1){
	// pass this message below if trying to pass a number with more than one decimal
		objError.innerHTML = 'You can only have one decimal place per number';
		return true;
	}
	return false;
	}

// clear function
function clear(event){
	// clears the global variables and the elements when the clear button has been pressed
  number1 = "";
  number2 = "";
  operator = "";
  objPreview.innerHTML = "";
  objMaths.innerHTML = "";
	objPrevious.innerHTML = "";
	objError.innerHTML= "";
}

// equals function
function equal(){
  var sum = calculator(number1,number2,operator);

	// if there is a sum
	if(sum){
			// the maths element box will be empty
			objMaths.innerHTML = "";
			// the previous box shows the calculation that was in preview
			objPrevious.innerHTML = objPreview.innerHTML;
			// the preview box will now contain the sum
			objPreview.innerHTML = sum;
			// equals has been pressed
			blnEquals = true;
			// number1 variable is set to the sum
			number1 = sum;
			// number2 and operator variable is now empty
			number2 = "";
			operator = "";
	}
	// no else is used as there are return values in the calculator function
}

// Adding a validation function for the numbers
function isValidNumber(number){
  //We are using a double negative as inNaN returns false on valid numbers
  	return !isNaN(number);
}

// calculator function
function calculator(number1,number2,operator){
  //if number1 is not a number
  if(!isValidNumber(number1)){
      // end the function here and pass the message below.
      objError.innerHTML = 'Number 1 must be set';
			return;
  }

	 // if the operator does not equal + - * / %
	 if(operator != '+' && operator != '-' && operator != 'x' && operator != '÷' && operator != '%'){
		// end the function here and pass the message below.
			objError.innerHTML = 'You need to set an arithmatic operator';
		return;
}
  // if number2 is not a number
  if(!isValidNumber(number2)){
      // end the function here and pass the message below.
      objError.innerHTML = 'Number 2 must be set';
			return;
  }

  // if all the validation has passed, we need to do maths
  var sum;
  // based on the operator passed in argument 3 we will do a different sum
  switch(operator){
      case '+':
          sum = parseFloat(number1) + parseFloat(number2);
      break;
      case '-':
          sum = number1 - number2;
      break;
      case 'x':
          sum = number1 * number2;
      break;
      case '÷':
          sum = number1 / number2;
      break;
      case '%':
          sum = number1 % number2;
      break;
  }
  // return the value of the sum
  return sum;
}