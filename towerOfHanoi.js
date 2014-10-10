var readline = require('readline');

var reader = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

function HanoiGame() {
  this.stacks = [[1,2,3], [], []];
};

Array.prototype.compare = function (array) {
  if (array.length !== this.length) {
    return false;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== this[i]) {
      return false;
    }
  }
  return true;
};

HanoiGame.prototype.isWon = function() {
  if (this.stacks[2].compare([1,2,3])) {
    return true;
  }else if (this.stacks[1].compare([1,2,3])) {
    return true;
  }else {
    return false;
  }
}

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    return (this.stacks[startTowerIdx].length !== 0 &&
    (this.stacks[endTowerIdx].length === 0 ||
     this.stacks[startTowerIdx][0] < this.stacks[endTowerIdx][0]
    ));
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question("Enter start index ", function (srt) {
    reader.question("Enter end index ", function (ert) {
      callback(parseInt(srt), parseInt(ert));
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var game = this;
  this.promptMove( function (srt, ert) {
    if (game.isValidMove(srt, ert)) {
      temp = game.stacks[srt].shift();
      game.stacks[ert].unshift(temp);
      if (game.isWon()){
        game.print();
        completionCallback();
      }else{
        game.run(completionCallback);
      };

    }else {
      console.log("Invalid Move");
      game.run(completionCallback);
    };
  });
};

var game = new HanoiGame();

game.run(function () {
  console.log("you won!");
  reader.close();
});

