var readline = require('readline');

var reader = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

var T3 = require("./ttt");
var board = new T3.Board();
var game = new T3.Game(reader);
game.play(
  function () {
    console.log(game.board.winner + " has won!");
    game.reader.close();
  });
