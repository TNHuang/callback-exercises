var Board = require("./board.js");

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.currentPlayer = "x";
};

Game.prototype.promptMove = function (callback) {
  this.board.display();
  var game = this;
  console.log("current player: " + this.currentPlayer);
  game.reader.question("Enter y coordinate ", function (y) {
    game.reader.question("Enter x coordinate ", function (x) {
      callback([parseInt(y), parseInt(x)]);
    });
  });
};

Game.prototype.play = function (completionCallback) {
  var game = this;
  this.promptMove( function(pos){
    if (!game.board.placeMark(pos, game.currentPlayer)){
      game.play(completionCallback);
    }else{
      // console.log("got to next turn")
     //  console.log()
      if (game.board.won()) {
        console.log("got to won!")
        game.board.display();
        completionCallback();
      }else
      {
        game.currentPlayer === "x" ? game.currentPlayer = "o" : game.currentPlayer = "x";
        game.play(completionCallback);
      };
    };

  });

};


module.exports = Game;

