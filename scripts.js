/*----- Variables -----*/
let number1 = "", number2 = "", operator = "", blnEquals = false;

/*----- Selecting Elements from the DOM -----*/

// This selects all the number elements
var arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers);

// This selects all the operator elements
var arrOperators = document.querySelectorAll(".operator");
// console.log(arrOperators);

// This selects the maths element
var objMaths = document.querySelector(".maths");
// console.log(objMaths);

// This selects the preview element
var objPreview = document.querySelector(".preview");
// console.log(objPreview);

var objPrevious = document.querySelector(".previous");
console.log(objPrevious);

// This selects the clear element
var objClear = document.querySelector(".clear");
//console.log(objClear);

//This selects the equal element
var objEqual = document.querySelector(".equal");
// console.log(objEquals);


/*----- Event Listeners -----*/
for(var counter = 0; counter < arrNumbers.length; counter++) {
  // console.log(arrNumbers[counter]);
    objNumber = arrNumbers[counter];
    objNumber.addEventListener("click", preview);
}

for(var counter = 0; counter < arrOperators.length; counter++) {
    objNumber = arrOperators[counter];
    objNumber.addEventListener("click", preview);
  // console.log(arrOperators[counter]);
}
objClear.addEventListener("click", clear);
objEqual.addEventListener("click", equal);

/*----- Functions -----*/
function preview(event) {
    console.log(blnEquals);
  // console.log(event.target.innerHTML);
    var currentItem = event.target.innerHTML;
    var dataType;
    var strMessage;
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
  console.log(dataType);
  if(dataType == 'operator'){
		if(blnEquals){
			blnEquals = false;
		}
		if(number2){
			number1 = calculator(number1, number2, operator);
			number2 = "";
			objMaths.innerHTML = "";
		}
    if(number1){
        operator = currentItem;
        strMessage = number1 + ' ' + operator;
    } else {
        console.log('You cannot set an operator without a number being set');
    }
  } else {
			if(blnEquals){
				number1 = "";
				blnEquals = false;
			}
      if(operator){
      	if(number2){
          	number2 += currentItem;
        } else {
            number2 = currentItem;
        }
          strMessage = number1 + ' ' + operator + ' ' + number2;
					var sum = calculator(number1,number2,operator);
  				objMaths.innerHTML = sum;
      } else {
          if(number1){
              number1 += currentItem;
          } else {
              number1 = currentItem;
          }
          strMessage = number1;
      }
  }
  objPreview.innerHTML = strMessage
}

function clear(event){
  number1 = "";
  number2 = "";
  operator = "";
  objPreview.innerHTML = "";
  objMaths.innerHTML = "";
}

function equal(){
  var sum = calculator(number1,number2,operator);
  objMaths.innerHTML = sum;
  blnEquals = true;
	number1 = sum;
	number2 = "";
	operator = "";
}

//Adding a validation function for the numbers
function isValidNumber(number){
  //We are using a double negative as inNaN returns false on valid numbers
  return !isNaN(number);
}
function calculator(number1,number2,operator){
  //if number1 is not a number
  if(!isValidNumber(number1)){
      //end the function here and pass the message below.
      return 'Argument 1 must be a number';
  }
  //if number 2 is not a number
  if(!isValidNumber(number2)){
      //end the function here and pass the message below.
      return 'Argument 2 must be a number';
  }
  // if the operator does not equal + - * / %
  if(operator != '+' && operator != '-' && operator != 'x' && operator != '÷' && operator != '%'){
      //end the function here and pass the message below.
      return 'Argument 3 must be an arithmatic operator';
  }
  //all fo the validation has passed so we need to do maths
  var sum;
  //based on the operator passed in argument 3 we will do a different sum
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
  //return the value of the sum
  return sum;
}