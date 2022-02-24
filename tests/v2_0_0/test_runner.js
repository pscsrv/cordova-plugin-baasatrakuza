exports.suite = function(helper) {

    describe('BaaS@Rakuza for Cordova 結合テスト - v2.0.0 対応分', function() {
        // Trial plan
        require('./v2_0_0/trial/test_runner').suite(helper);
    });
};
