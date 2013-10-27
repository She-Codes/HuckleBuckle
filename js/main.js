var computerPick = Math.floor(Math.random()*100 + 1);
var guesses = [];
var prevGuess = '';
var userGuess = '';
var ps = $('.percent').find('span');
var spanWidth = '';
var feedback = $('.feedback');
console.log(computerPick);

//start game when submit button is clicked
var submit = $('#submit');
submit.on('click', round);

//reset all variables when the reset button is clicked and have the computer pick a new number
//reenable the text field and submit button
$('#reset').on('click', function(){
	computerPick = Math.floor(Math.random()*100 + 1);
	guesses = [];
	prevGuess = '';
	userGuess = '';
	console.log(computerPick);
	document.getElementsByName('textField')[0].disabled = false;
	document.getElementsByName('submit')[0].disabled = false;
	$('.history ul').empty();
	$('.odometer').removeClass('red');
	$('.odometer').html(0);
	spanWidth = {
				width: '100%'
				};
			ps.animate(spanWidth);
});

//start game when enter is pressed
var textField =  $('.textField');
textField.on('keydown', function (e) {
	if(e.which ==  13){
		//Execute the function
		round();
		}
});

function round(){
	//get the number entered in the text field 
	userGuess = Number(document.getElementsByName('textField')[0].value);

	if (userGuess !== NaN && (userGuess > 0 && userGuess <= 100)){ //make sure number is valid
		guesses.push(userGuess); //add the numbers to the guesses array
		prevGuess = guesses[guesses.length - 2];
		$('.history ul').append('<li>' + userGuess + '</li>');
		document.getElementsByName('textField')[0].value = ''; //clear the text input

		//show number guessed
		$('.odometer').html(userGuess);

		//add bar graph code here
			if (userGuess <= computerPick){
			var w = 100 - (100 * (userGuess / computerPick));
				spanWidth = {
				width: w+'%'
				}; 
			}else{
					spanWidth = {
					width: '100%'
					};
			};
			
			ps.animate(spanWidth);
			
		

		//do this for the 1st guess
		if (guesses.length == 1){
			switch (true){
			
			case computerPick > userGuess && userGuess > (computerPick - 20):
			console.log('You\'re warm already!');
			feedback.html('<p>You\'re warm already!</p>');
			break;

			case userGuess > computerPick:
			console.log('Too high');
			feedback.html('<p>Too high</p>');
			break;

			case userGuess < computerPick:
			console.log('Too low');
			feedback.html('<p>Too low</p>');
			break;

			case userGuess == computerPick:
			console.log('You hit the nail on the head - you win!');
			feedback.html('<p>You hit the nail on the head - you win!</p>');
			//deactivate the submit button and text field after the winning guess
			document.getElementsByName('submit')[0].disabled = true;
			document.getElementsByName('textField')[0].disabled = true;
			$('.odometer').addClass('red');
			//document.getElementsByName('textField')[0].className = "done";
			}//end switch
		// do this for any additional guesses
		} else if (guesses.length > 1) {
			switch (true){

			case userGuess > prevGuess && userGuess < computerPick:
			feedback.html('<p>Getting warmer</p>');
			break;

			//higher than the previous guess and higher than the computer guess
			case userGuess > prevGuess && userGuess > computerPick:
			feedback.html('<p>Too high</p>');
			break;

			//less than the previous guess but higher than the computer guess
			case userGuess < prevGuess && userGuess > computerPick:
			feedback.html('<p>Still too high</p>');
			break;

			//less than the previous guess but still within 20 of less than the number
			case userGuess < prevGuess && (userGuess > (computerPick - 20) && userGuess < computerPick):
			feedback.html('<p>Go higher</p>');
			break;

			case userGuess < prevGuess && userGuess < computerPick:
			feedback.html('<p>Getting colder</p>');
			break;

			case userGuess == computerPick:
			feedback.html('<p>You hit the nail on the head - you win!');
			//deactivate the submit button and text field after the winning guess
			document.getElementsByName('submit')[0].disabled = true; 
			document.getElementsByName('textField')[0].disabled = true;
			$('.odometer').addClass('red');
			} //end switch
		}	//end else if
} else {
	feedback.html('<p>Please enter a valid number between 1 and 100</p>');
} //end if else to test if valid number

}; // end round function
