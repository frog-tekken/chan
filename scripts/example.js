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
};
