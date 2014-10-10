function Clock() {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  var hours = this.timeNow.getHours();
  var minutes = this.timeNow.getMinutes() ;
  var seconds = this.timeNow.getSeconds();
  console.log( hours + ":" + minutes + ":" + seconds
  );
};

Clock.prototype.run = function () {
  this.timeNow = new Date();
  this.printTime();
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  this.timeNow = new Date(this.timeNow.valueOf() + Clock.TICK);
  console.log(this.timeNow);
  this.printTime();
};

//addNumbers

// clock = new Clock();
// clock.run();
var readline = require('readline');
// var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumber = function (sum, numsLeft, completionCallback) {

  if (numsLeft > 0) {
    reader.question("pick a number:", function (numString1){
      var num1 = parseInt(numString1);
      sum += num1;
      console.log(sum);
      addNumber(sum, numsLeft - 1, completionCallback);
    });

  }else{
    completionCallback(sum);
    reader.close();
  }
};

var completionCallback = function (sum){
  console.log("Total Sum: " + sum);
};

addNumber(0, 3, completionCallback);
