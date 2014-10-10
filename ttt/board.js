function Board() {
  this.grid = [["_", "_", "_"],["_", "_", "_"],[ "_", "_", "_"]];
  this.winningPos = [ [[0 ,0], [0 ,1], [0 ,2]],
                      [[1, 0], [1, 1], [1, 2]],
                      [[2 ,0], [2 ,1], [2 ,2]],

                      [[0 ,0], [1 ,0], [2 ,0]],
                      [[0 ,1], [1 ,1], [2 ,1]],
                      [[0 ,2], [1 ,2], [2 ,2]],

                      [[0 ,0], [1 ,1], [2 ,2]],
                      [[0 ,2], [1 ,1], [2 ,0]]];
 this.winner = "no one";
};


Board.prototype.extractRow = function (positions) {
  var outputArray = [];
  var board = this;
  positions.forEach(function (pos) {
    outputArray.push( board.grid[pos[0]][pos[1]]);
  })
  return outputArray;
};

Board.prototype.won = function () {
  var board = this;
  var rows = function (positions) {
    var row = board.extractRow(positions).join("");
    if (row === "xxx") {
      board.winner = "x";
      return true;
    }else if (row === "ooo"){
      board.winner = "o";
      return true;
    }else {
      return false;
    }
  };

  var isWon = false;

  this.winningPos.forEach(function(positions){
     if (rows(positions)){
       isWon = true;
     }

  });
  return isWon;
};

Board.prototype.winner = function () {
  return this.winner;
};

Board.prototype.empty = function (pos) {
  if (this.grid[pos[0]][pos[1]] === "_"){
    return true;
  }else {
    return false;
  }
};

Board.prototype.placeMark = function (pos, mark) {
  //assume user will never place
  if (pos[0] >= 0 && pos[0] < 3 && pos[1] >= 0 && pos[1] < 3 && this.empty(pos)){
    this.grid[pos[0]][pos[1]] = mark;
    return mark;
  }else{
    console.log("Invalid move");
    return null;
  };
};

Board.prototype.display = function () {
  for (var i = 0; i < this.grid.length; i++) {
    console.log(this.grid[i]);
  }
};


module.exports = Board;
