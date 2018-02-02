var RKZMessages = (function() {

    var _errorMessages = new Array();
    var _infoMessages = new Array();

    _errorMessages["en"] = {
        "CDVE0001": "Type of {0} is not correct.",
        "CDVE0002": "Failed to start beacon detection.",
        "CDVE0003": "Missing argument count {0} but {1}."
    };

    var RKZMessages = function() {};

    RKZMessages.prototype = {
        error: function(code) {
            var _message = _errorMessages["en"][code] || "";
            for (var i = 1 ; i <= arguments.length ; i++){
                var str = "{" + (i - 1) + "}";
                _message = _message.replace(str, arguments[i]);
            }
            return { status_code: code, message: _message };
        }
    };

    return RKZMessages;
})();

module.exports = new RKZMessages();
