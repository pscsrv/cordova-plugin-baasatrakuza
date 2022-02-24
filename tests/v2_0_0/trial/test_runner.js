var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Trial Plan (0210)', function() {

        describe('RKZClient.setTenantKey', function() {
            it('正しいアクセストークンの場合、正常に接続できること', function(done) {
                RKZClient.setTenantKey(helper.LICENSE_KEY,
                    function() {
                        expect(true).toBeTruthy(); done();  // Success
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

        it('正しくユーザー情報が作成されること', function(done) {
            var user_name = "コルドバ太郎【新規登録】" + new Date();
            var user = {
                user_name: user_name,
                user_first_name : "太郎",
                user_last_name : "コルドバ",
                user_furigana : "コルドバタロウ",
                user_first_furigana : "タロウ",
                user_last_furigana : "コルドバカナ",
                sex_cd : "0001",
                age_config : "0005",
                business_class_cd : "0001",
                point : 0,
                state_cd : "0010",
                birth_day: '2016-01-01',
                attributes : {
                    user_password : "test"
                }
            };
            RKZClient.registUser(user,
                function(user) {
                    expect(user).toBeDefined();
                    // 以降のテストで利用するユーザー情報を保持する。
                    helper.userAccessToken = user.user_access_token;
                    helper.user = user;
                    done();
                }, function(error) {
                    expect(false).toBeTruthy(); done();  // Failed
                });
        }, TIMEOUT);

        require('./v2_0_0/trial/tests_news_favorite').suite(helper);
        require('./v2_0_0/trial/tests_user_detail').suite(helper);

    });

};
