# SFII-Word-Guess

Street Fighter II themed game where user must guess a randomly selected word (fighter name). Similar to the hangman game. Access the deployed app [here](https://ckernan.github.io/SFII-Word-Guess/).

## How It Works

The game will display a gameboard with a number of blank underlined areas representing the name of a randomly selected Street Fighter II character. The object of the game is to guess what that fighter name is by pressing different letter keys. For each word, the player will have 10 chances to guess all of the correct letters. The game begins when the first letter key is pressed. Within an onkeyup method the game will first use the keyCode property to ensure that the user has typed a letter. If the letter is part of the character name it will be diplayed in the corresponding spot(s) on the gameboard, pushed into a correct letters array and the player will retain all of their 10 turns. If the letter is not in the name, it will be pushed into an attempts array and displayed in the "Guessed Letters" section of the game. The player will also lose one of their turns. If the player cannot guess the character's name after 10 turns a "YOU LOSE" message will appear at the top of the screen, losses will be incremented by 1 and another fighter name will populate the gameboard. If the player is able to complete the name, a "YOU WIN" message along with a picture of the fighter will be shown at the top of the screen, player wins will be incremented by 1 and another name will appear on the gameboard.

## Preview 

![Word Guess GIF](/assets/images/StreetFighterHangman.gif)

## Built With

* HTML
* CSS
* [Bootstrap](https://getbootstrap.com/)
* [Javascript](https://www.javascript.com/)