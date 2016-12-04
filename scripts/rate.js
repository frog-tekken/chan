var http = require('http');

function CurrencyRate() {
}

CurrencyRate.prototype.api_end_point = 'http://api.fixer.io/latest';

CurrencyRate.prototype.constructor = function (options) {
};

CurrencyRate.prototype.start = function (robot) {
  var _self = this;

  robot.respond(/(?:currency (\w\w\w) (\w\w\w))/, function (res) {
    var base = res.match[1].toUpperCase();
    var symbol = res.match[2].toUpperCase();

    res.send('調べてみるからちょっと待って');
    _self.fetch(base, symbol, function (message) {
      if (!message) {
        message = 'エラー起きとるやないかい！';
      }
      res.reply(message);
    })
  });
};

CurrencyRate.prototype.fetch = function (base, symbol, callback) {
  var _self = this;
  var url = this.get_fetch_url(base, symbol);

  this.http_get(url, function (res, responseText) {
    if (res.statusCode === 200) {
      try {
        var data = JSON.parse(responseText);
        var message = _self.make_message(data)
      } catch (error) {
        message = error;
      }
      callback(message);
    }
  });
};

CurrencyRate.prototype.http_get = function (url, callback) {
  http.get(url, function (res) {
    var responseText = '';

    res.on('data', function (v) {
      responseText += v;
    });
    res.on('end', function () {
      callback(res, responseText);
    });
  })
};

CurrencyRate.prototype.get_fetch_url = function (base, symbol) {
  return this.api_end_point + "?base=" + base + "&symbols=" + symbol;
};

CurrencyRate.prototype.make_message = function (data) {
  var symbol = Object.keys(data.rates)[0];
  if (symbol) {
    var rate = data.rates[symbol];
    var message = "1 " + data.base + " = " + rate + " " + symbol;
  } else {
    message = '聞いたことない通貨だってさ';
  }
  return message;
};

module.exports = function (robot) {
  var currency_rate = new CurrencyRate();
  currency_rate.start(robot);
};

module.exports.CurrencyRate = CurrencyRate;
