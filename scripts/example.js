var CurrencyRate = require("./rate").CurrencyRate;
var currency_rate = new CurrencyRate();

module.exports = function (robot) {
  robot.hear(/こんにちは/i, function (res) {
    res.send("こんにちは！！");
  });

  robot.respond(/open the (.*) doors/i, function (res) {
    var doorType = res.match[1];

    if (doorType == "Hello") {
      res.reply("Hello!!");
    } else {
      res.reply("Opening " + doorType + " doors");
    }
  });

  robot.hear(/([0-9]+)\+([0-9]+)=\?/i, function (res) {
    var leftHand = res.match[1];
    var rightHand = res.match[2];

    var answer = parseInt(leftHand) + parseInt(rightHand);
    res.reply("答えは" + answer + "だろ！？");
  });

  robot.hear(/カナダドル.*レート/, function (res) {
    currency_rate.fetch("CAD", "JPY", function (message) {
      if (message) {
        var words = message.split(' ');
        message = words.join('');
        message = message.replace('=', "あたり");
        message = "ちなみに今のレートは" + message + "らしいぞ";
      } else {
        message = 'エラー起きとるやないかい！';
      }
      res.reply(message)
    })
  });
};
