exports.suite = function(helper) {

    describe('BaaS@Rakuza for Cordova 結合テスト - v1.2.0 対応分', function() {
        // Trial plan
        require('./v1_2_0/trial/test_runner').suite(helper);
    });
};

