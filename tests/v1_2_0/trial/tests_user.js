var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for user.', function() {
        describe('RKZClient.registPushDeviceToken', function() {
            it('正常に登録できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var deviceToken = "CORDOVA_PLUGIN_TEST_TOKEN";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toBe("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });   // end of RKZClient.registPushDeviceToken

        describe('RKZClient.clearPushDeviceToken', function() {
            describe('userAccessToken', function() {
                it('==undefinedの場合エラーとなること', function(done) {
                    var userAccessToken;
                    RKZClient.clearPushDeviceToken(userAccessToken,
                        function(statusCode) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!=Stringの場合エラーとなること', function(done) {
                    var userAccessToken = 1234;
                    RKZClient.clearPushDeviceToken(userAccessToken,
                        function(statusCode) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('正常に初期化できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                RKZClient.clearPushDeviceToken(userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toBe("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });
    });   // end of Testing for user.
};
