
var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('BaaS@Rakuza for Cordova 結合テスト - Trial Plan (0210)', function() {

        describe('RKZClient.setTenantKey', function() {
            it('不正なアクセストークンの場合、エラーになること', function(done) {
                RKZClient.setTenantKey("不正なテナントID",
                    function() {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        done();
                    });
            }, TIMEOUT);
            it('正しいアクセストークンの場合、正常に接続できること', function(done) {
                RKZClient.setTenantKey(helper.LICENSE_KEY,
                    function() {
                        expect(true).toBeTruthy(); done();  // Success
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

        require('./trial_plan/tests_user').suite(helper);
        require('./trial_plan/tests_application').suite(helper);

        describe('locale=jaの場合', function() {
            // 以降のテストは全て'ja'前提で行うため、ここで'ja'を設定しておく
            // it形式で書かないと、同期実行してくれないためit形式で記述
            // it形式にすると、expectで検証しないとワーニングが出るのでexpectします。
            it('RKZClient.setLocale', function(done) {
                RKZClient.setLocale(helper.userAccessToken, "ja",
                    function(locale) {
                        expect(locale).toEqual("ja");
                        done();
                    }, function(error) { expect(false).toBeTruthy(); done(); });
            });

            require('./trial_plan/tests_object_data').suite(helper);
            require('./trial_plan/tests_news').suite(helper);
            require('./trial_plan/tests_point').suite(helper);
            require('./trial_plan/tests_coupon').suite(helper);
            require('./trial_plan/tests_spot').suite(helper);
            require('./trial_plan/tests_stamp_rally').suite(helper);
            require('./trial_plan/tests_contact').suite(helper);
            require('./trial_plan/tests_beacon').suite(helper);
            require('./trial_plan/tests_push').suite(helper);
        });

    });

};
