var TIMEOUT = 30000;

exports.suite = function(helper) {

    var _user_no = null;
    var _user_no_2 = null;
    var _user_no_3 = null;
    var _model_change_code_1 = null;
    var _model_change_code_2 = null;
    var _model_change_code_3 = null;
    var _user_access_token_2 = null;
    var _user_access_token_3 = null;

    describe('ユーザー関連API', function() {
        describe('新規登録する場合', function() {
            it('日付に Date() を指定しても、正しく登録されること', function(done) {
                var now = new Date();
                var user = {
                    user_name: "【日付確認】" + new Date(),
                    sex_cd : "0001",
                    birth_day : now
                };
                RKZClient.registUser(user,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"sex_cd" : "0001"}));
                        expect(user).toEqual(jasmine.objectContaining({"birth_day" : helper.dateFormat.format(now, 'yyyy-MM-dd 00:00:00+0900')}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('日付に "yyyy-MM-dd" を指定しても、正しく登録されること', function(done) {
                var user = {
                    user_name: "【日付確認】" + new Date(),
                    sex_cd: "0002",
                    birth_day: "2016-08-25"
                };
                RKZClient.registUser(user,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"sex_cd" : "0002"}));
                        expect(user).toEqual(jasmine.objectContaining({"birth_day" : '2016-08-25 00:00:00+0900'}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

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
                        expect(Object.keys(user).length).toEqual(19);
                        expect(user.user_access_token).not.toBeNull();  // 変動値のため Not nullかのテストとする
                        expect(user.user_id).toMatch(/^21004[0-9]{10}$/);
                        expect(user.user_no).toMatch(/^APP[0-9]{5}$/);
                        expect(user).toEqual(jasmine.objectContaining({"sex_cd" : "0001"}));
                        expect(user).toEqual(jasmine.objectContaining({"state_cd" : "0010"}));
                        expect(user).toEqual(jasmine.objectContaining({"age_config" : "0005"}));
                        expect(user).toEqual(jasmine.objectContaining({"business_class_cd" : "0001"}));
                        expect(user.login_id).toMatch(/^APP[0-9]{5}$/);
                        expect(user).toEqual(jasmine.objectContaining({"user_name" : "コルドバ太郎"}));
                        expect(user).toEqual(jasmine.objectContaining({"user_first_name" : "太郎"}));
                        expect(user).toEqual(jasmine.objectContaining({"user_last_name" : "コルドバ"}));
                        expect(user.join_dte).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(user).toEqual(jasmine.objectContaining({"user_furigana" : "コルドバカナタロウ"}));
                        expect(user).toEqual(jasmine.objectContaining({"user_first_furigana" : "タロウ"}));
                        expect(user).toEqual(jasmine.objectContaining({"user_last_furigana" : "コルドバカナ"}));
                        expect(user).toEqual(jasmine.objectContaining({"birth_day" : "2016-01-01 00:00:00+0900"}));
                        expect(user).toEqual(jasmine.objectContaining({"point" : 0}));
                        expect(user.last_update_dte).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);

                        expect(Object.keys(user.attributes).length).toEqual(17);
                        expect(user.attributes).toEqual(jasmine.objectContaining({"user_roman_name" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"user_roman_first_name" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"user_roman_last_name" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"address_1" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"address_2" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"address_3" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"tel_no_1" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"tel_no_2" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"mail_address_1" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"mail_address_2" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"nick_name" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"guardian_name" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"activity_area_cd" : null}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"sex_cd_name" : "男性"}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"age_config_name" : "50代"}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"state_cd_name" : "群馬県"}));
                        expect(user.attributes).toEqual(jasmine.objectContaining({"business_class_cd_name" : "会社員"}));

                        // 以降のテストで利用するユーザー情報を保持する。
                        helper.userAccessToken = user.user_access_token;
                        _user_no = user.user_no;
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy();  // Failed
                        done();
                    });
            }, TIMEOUT);
        });  // end of 新規登録する場合

        describe('検索をする場合', function() {
            it('ユーザーアクセストークンが空だと検索エラーになること', function(done) {
                var userAccessToken;   // undefined
                RKZClient.getUser(userAccessToken,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ユーザアクセストークンがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('存在しないユーザーアクセストークンだと検索結果はエラーで返ってくること', function(done) {
                var userAccessToken = "test";
                RKZClient.getUser(userAccessToken,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "システムエラー : 不正なパラメータです。"}));
                        done();
                    });
            }, TIMEOUT);

            it('正しいユーザアクセストークンだと正しく結果を取得できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                RKZClient.getUser(userAccessToken,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"user_no" : _user_no}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of 検索をする場合

        describe('編集をする場合', function() {
            it('user=Undefinedの場合、エラーが復帰されること', function(done) {
                var user;
                RKZClient.editUser(user,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of user is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('user!=="Object"でない場合、エラーが復帰されること', function(done) {
                var user = "user data";
                RKZClient.editUser(user,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of user is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('userAccessToken=Undefinedの場合、エラーが復帰されること', function(done) {
                var user = {};
                RKZClient.editUser(user,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ユーザアクセストークンがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            describe('事前にデータを抽出した場合', function() {
                var _user;
                beforeEach(function(done) {
                    // 更新日時の問題があるため、一旦データを抜く
                    var userAccessToken = helper.userAccessToken;
                    RKZClient.getUser(userAccessToken,
                        function(user) {
                            _user = user;
                            _user.user_access_token = helper.userAccessToken;
                            done();
                        },
                        function(error) {
                            // Failed
                        });
                }, TIMEOUT);

                it('正しく編集されること', function(done) {
                    // 抜き取ったデータを使って、更新処理を実施
                    _user.user_first_name = _user.user_first_name + "【修正】";
                    RKZClient.editUser(_user,
                        function(user) {
                            expect(user).toBeDefined();
                            expect(user.user_name).toEqual(_user.user_last_name + _user.user_first_name);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });

        });  // end of 編集をする場合

        describe('デバイストークンを登録する場合', function() {
            it('ユーザアクセストークン=undefinedの場合、エラーになること', function(done) {
                var userAccessToken;
                var deviceToken = "test";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('デバイストークン=undefinedの場合、未指定のエラーとなること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var deviceToken;
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of deviceToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ユーザアクセストークン!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = { userAccessToken: "NG" };
                var deviceToken = "test";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('デバイストークン!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var deviceToken = { deviceToken: "NG" };
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of deviceToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、正常に登録できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var deviceToken = "CORDOVA_PLUGIN_TEST_TOKEN";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toBe("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('ユーザアクセストークンが空の場合、エラーが返ってくること', function(done) {
                var userAccessToken = "";
                var deviceToken = "CORDOVA_PLUGIN_TEST_TOKEN";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ユーザアクセストークンがありません。"})); }
                        done();
                    });
            }, TIMEOUT);
        });  // end of デバイストークンを登録する場合

        describe('パスワードを変更する場合', function() {
            it('ユーザーアクセストークン=undefinedの場合、未指定のエラーになること', function(done) {
                var userAccessToken;   // undefined
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ユーザーアクセストークンが空の場合、エラーになること', function(done) {
                var userAccessToken = "";
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ユーザアクセストークンがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ユーザアクセストークン!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = { userAccessToken: "NG" };
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('存在しないユーザーアクセストークンだと検索結果はエラーで返ってくること', function(done) {
                var userAccessToken = "test";
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "システムエラー : 不正なパラメータです。"}));
                        done();
                    });
            }, TIMEOUT);

            it('現在のパスワード=undefinedの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword;   // undefined
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of nowPassword is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('現在のパスワードが空の場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = "";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : 現在のパスワードの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "現在のパスワードがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('現在のパスワード!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = { nowPassword: "NG" };
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of nowPassword is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('新パスワード=undefinedの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = "test";
                var newPassword;   // undefined
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of newPassword is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('新パスワードが空の場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = "test";
                var newPassword = "";
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : 新しいパスワードの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "新パスワードがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('新パスワード!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = "test";
                var newPassword = { newPassword: "NG" };
                RKZClient.editPassword(userAccessToken,nowPassword,newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of newPassword is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('正しいパラメータの場合、正しく結果を取得できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken, nowPassword, newPassword,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toBe("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of パスワードを変更する場合

        describe('機種変更認証コードを発行する場合', function() {
            it('ユーザーアクセストークン=undefinedの場合、エラーになること', function(done) {
                var userAccessToken;   // undefined
                var param = {};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ユーザーアクセストークンが空の場合、エラーになること', function(done) {
                var userAccessToken = "";
                var param = {};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ユーザアクセストークンがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ユーザアクセストークン!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = { userAccessToken: "NG" };
                var param = { limit_code : 10, limit_minute : 0};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('存在しないユーザーアクセストークンはエラーで返ってくること', function(done) {
                var userAccessToken = "test";
                var param = {};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "システムエラー : 不正なパラメータです。"}));
                        done();
                    });
            }, TIMEOUT);

            it('パスワード!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var param = { password : 123, limit_code : 10, limit_minute : 10};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of params.password is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('桁数!==数値の場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var param = { password : "test", limit_code : "abc", limit_minute : 0};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of params.limit_code is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('有効時間!==数値の場合、エラーになること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var param = { password : "test", limit_code : 10, limit_minute : "abc"};
                RKZClient.registModelChangeCode(userAccessToken,param,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of params.limit_minute is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('正しいパラメータ(必須項目のみ)の場合、正しく結果を取得できること', function(done) {
                var userAccessToken = helper.userAccessToken;
                var param = {};
                RKZClient.registModelChangeCode(userAccessToken, null,
                    function(modelChangeCode) {
                        expect(modelChangeCode).toBeDefined();
                                expect(Object.keys(modelChangeCode).length).toEqual(2);
                        expect(modelChangeCode.model_change_code.length).toEqual(5);    //デフォルト値の桁数が5
                        done();
                        _model_change_code_1 = modelChangeCode.model_change_code;
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('正しいパラメータ(必須項目のみ)の場合、正しく結果を取得できること', function(done) {
                var user_name = "コルドバ花子【認証コード発行１】" + new Date();
                var user = {
                    user_name: user_name,
                    sex_cd: "0002",
                    birth_day: '2016-01-01',
                    user_password: 'test'
                };
                RKZClient.registUser(user,
                    function(userinfo) {
                        _user_no_2 = userinfo.user_no;
                        var userAccessToken = userinfo.user_access_token;
                        var param = {};
                        RKZClient.registModelChangeCode(userAccessToken,param,
                            function(modelChangeCode) {
                                expect(modelChangeCode).toBeDefined();
                                expect(Object.keys(modelChangeCode).length).toEqual(2);
                                expect(modelChangeCode.model_change_code.length).toEqual(5);    //デフォルト値の桁数が5
                                done();
                                _model_change_code_2 = modelChangeCode.model_change_code;
                                _user_access_token_2 = userAccessToken;
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('正しいパラメータ(必須項目＋任意項目)の場合、正しく結果を取得できること', function(done) {
                var user_name = "コルドバ花子【認証コード発行2】" + new Date();
                var user = {
                    user_name: user_name,
                    sex_cd: "0002",
                    birth_day: '2016-01-02',
                    user_password: 'test'
                };
                RKZClient.registUser(user,
                    function(userinfo) {
                        _user_no_3 = userinfo.user_no;
                        var userAccessToken = userinfo.user_access_token;
                        var param = { password : "test", limit_code : 10, limit_minute : 30};
                        RKZClient.registModelChangeCode(userAccessToken,param,
                            function(modelChangeCode) {
                                expect(modelChangeCode).toBeDefined();
                                expect(Object.keys(modelChangeCode).length).toEqual(2);
                                expect(modelChangeCode.model_change_code.length).toEqual(10);   //指定した桁数と同じであること
                                done();
                                _model_change_code_3 = modelChangeCode.model_change_code;
                                _user_access_token_3 = userAccessToken;
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of 機種変更認証コードを発行する場合

        describe('機種変更の認証を行う場合', function() {
            it('機種変更認証コード=undefinedの場合、エラーになること', function(done) {
                var modelChangeCode;   // undefined
                var password = "";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of modelChangeCode is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('機種変更認証コードが空の場合、エラーになること', function(done) {
                var modelChangeCode = "";
                var password = "";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : 認証コードの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "認証コードがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('機種変更認証コード!==Stringの場合、エラーになること', function(done) {
                var modelChangeCode = { modelChangeCode: "NG" };
                var password = "";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of modelChangeCode is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('存在しない機種変更認証コードはエラーで返ってくること', function(done) {
                var modelChangeCode = "testtest";
                var password = "";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                        // プラットフォームごとにメッセージの出力方法が違うため、コメントアウト
                        // expect(error).toEqual(jasmine.objectContaining({message: "バリデーションエラー : 無効な認証コードです。"}));
                        done();
                    });
            }, TIMEOUT);

            it('機種変更認証コードが５桁以下の場合はエラーで返ってくること', function(done) {
                var modelChangeCode = "test";
                var password = "";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                        // プラットフォームごとにメッセージの出力方法が違うため、コメントアウト
                        // expect(error).toEqual(jasmine.objectContaining({message: "バリデーションエラー : 認証コード は最低 5 文字以上でご入力ください。"}));
                        done();
                    });
            }, TIMEOUT);

            it('パスワード!==Stringの場合、エラーになること', function(done) {
                var modelChangeCode = _model_change_code_1;
                var password = { password: "NG" };
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of password is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('正しいパラメータ(必須項目のみ)の場合、正しく結果を取得できること', function(done) {
                var modelChangeCode = _model_change_code_1;
                var password = null;

                RKZClient.authModelChange(modelChangeCode, password,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).not.toEqual(jasmine.objectContaining({"user_access_token" : helper.userAccessToken}));
                        helper.userAccessToken = user.user_access_token;
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('正しいパラメータ(必須項目のみ)の場合、正しく結果を取得できること', function(done) {
                var modelChangeCode = _model_change_code_2;
                var password = null;
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"user_no" : _user_no_2}));
                        expect(user).not.toEqual(jasmine.objectContaining({"user_access_token" : _user_access_token_2}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('正しいパラメータ(必須項目＋任意項目)の場合、正しく結果を取得できること', function(done) {
                var modelChangeCode = _model_change_code_3;
                var password = "test";
                RKZClient.authModelChange(modelChangeCode,password,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"user_no" : _user_no_3}));
                        expect(user).not.toEqual(jasmine.objectContaining({"user_access_token" : _user_access_token_3}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

        });  // end of 機種変更認証コードを発行する場合

        describe('ログインする場合', function() {
            it('ログインID=undefinedの場合、エラーになること', function(done) {
                var loginId;   // undefined
                var password = "test2";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of loginId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ログインIDが空の場合、エラーになること', function(done) {
                var loginId = "";
                var password = "test2";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ログインIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ログインIDがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ログインID!==Stringの場合、エラーになること', function(done) {
                var loginId = { loginId: "NG" };
                var password = "test2";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of loginId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('存在しないログインIDの場合、検索結果はエラーで返ってくること', function(done) {
                var loginId = "test";
                var password = "test2";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    }, function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                        // プラットフォームごとにメッセージの出力方法が違うため、コメントアウト
                        // expect(error).toEqual(jasmine.objectContaining({message: "バリデーションエラー : 顧客番号、またはパスワードが不正です。"}));
                        done();
                    });
            }, TIMEOUT);

            it('パスワード=undefinedの場合、エラーになること', function(done) {
                var loginId = _user_no;
                var password;
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of password is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パスワードが空の場合、エラーになること', function(done) {
                var loginId = _user_no;
                var password = "";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : パスワードの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "パスワードがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('パスワード!==Stringの場合、エラーになること', function(done) {
                var loginId = _user_no;
                var password = { password: "NG" };
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of password is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('誤ったパスワードの場合、エラーになること', function(done) {
                var loginId = _user_no;
                var password = "abcabc";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(false).toBeTruthy();  done();  // Failed
                    },
                    function(error) {
                        expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                        // expect(error).toEqual(jasmine.objectContaining({message: "バリデーションエラー : 顧客番号、またはパスワードが不正です。"}));
                        done();
                    });
            }, TIMEOUT);

            it('正しいパラメータの場合、正しく結果を取得できること', function(done) {
                var loginId = _user_no;
                var password = "test2";
                RKZClient.userAuth(loginId,password,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(user).toEqual(jasmine.objectContaining({"user_no" : _user_no}));
                        expect(user).not.toEqual(jasmine.objectContaining({"user_access_token" : helper.userAccessToken}));
                        helper.userAccessToken = user.user_access_token;
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of ログインする場合

        describe('ユーザーアクセストークン更新', function() {
            var oldUserAccessToken = '';
            var baseUserAccessToken = '';

            it('事前にトークン更新用のユーザーを生成しておく', function(done) {
                var user = {
                    user_name: "UpdateUserAccessToken"
                };
                RKZClient.registUser(user,
                    function(user) {
                        expect(user).toBeDefined();
                        expect(Object.keys(user).length).toEqual(19);
                        expect(user.user_access_token).not.toBeNull();

                        // 以降の処理で利用するため保持する
                        baseUserAccessToken = user.user_access_token;

                        done();
                    }, function(error) {
                        expect(false).toBeTruthy();  // Failed
                        done();
                    });
            }, TIMEOUT);
            describe('RKZClient.updateUserAccessToken', function() {
                describe('パラメータ:userAccessToken', function() {
                    it('= undefined の場合、エラーになること', function(done) {
                        var _userAccessToken;
                        RKZClient.updateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                    it('= null の場合、エラーになること', function(done) {
                        var _userAccessToken = null;
                        RKZClient.updateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                    it('!== String の場合、エラーになること', function(done) {
                        var _userAccessToken = 1;
                        RKZClient.updateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                    it('に、存在しないトークンを指定した場合、エラーになること', function(done) {
                        var _userAccessToken = "1";
                        RKZClient.updateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                                done();
                            })
                    }, TIMEOUT);
                    describe('に、正しいトークンを指定した場合', function() {
                        it('正常に更新されること', function(done) {
                            var _userAccessToken = baseUserAccessToken;
                            RKZClient.updateUserAccessToken(_userAccessToken,
                                function(newUserAccessToken) {
                                    expect(newUserAccessToken).not.toBeNull();
                                    // 次の処理のために保持する
                                    oldUserAccessToken = baseUserAccessToken;
                                    baseUserAccessToken = newUserAccessToken;
                                    done();
                                }, function(error) {
                                    expect(false).toBeTruthy(); done();  // Failed
                                })
                        }, TIMEOUT);
                        it('更新後は新しいトークンでアクセス可能であること', function(done) {
                            RKZClient.getUser(baseUserAccessToken,
                                function(user) {
                                    expect(user).toBeDefined();
                                    done();
                                }, function(error) {
                                    expect(false).toBeTruthy(); done();  // Failed
                                });
                        }, TIMEOUT);
                        it('更新後は古いトークンではアクセス不可であること', function(done) {
                            RKZClient.getUser(oldUserAccessToken,
                                function(user) {
                                    expect(false).toBeTruthy(); done();  // Failed
                                }, function(error) {
                                    expect(error).toBeDefined();
                                    done();
                                });
                        }, TIMEOUT);
                    });
                });
            });
            describe('RKZClient.beginUpdateUserAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var _userAccessToken;
                    RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('= null の場合、エラーになること', function(done) {
                    var _userAccessToken = null;
                    RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var _userAccessToken = 1;
                    RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('に、存在しないトークンを指定した場合、エラーになること', function(done) {
                    var _userAccessToken = "1";
                    RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                            done();
                        })
                }, TIMEOUT);
                describe('に、正しいトークンを指定した場合', function() {
                    it('正常に仮発行されること', function(done) {
                        var _userAccessToken = baseUserAccessToken;
                        RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(newUserAccessToken).not.toBeNull();
                                // 次の処理のために保持する
                                oldUserAccessToken = baseUserAccessToken;
                                baseUserAccessToken = newUserAccessToken;
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            })
                    }, TIMEOUT);
                    it('仮発行後は新しいトークンではアクセス不可であること', function(done) {
                        RKZClient.getUser(baseUserAccessToken,
                            function(user) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                done();
                            });
                    }, TIMEOUT);
                    it('仮発行後は古いトークンではアクセス可能であること', function(done) {
                        RKZClient.getUser(oldUserAccessToken,
                            function(user) {
                                expect(user).toBeDefined();
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                });
            });
            describe('RKZClient.commitUpdateUserAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var _userAccessToken;
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('= null の場合、エラーになること', function(done) {
                    var _userAccessToken = null;
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var _userAccessToken = 1;
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('に、存在しないトークンを指定した場合、エラーになること', function(done) {
                    var _userAccessToken = "1";
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                            done();
                        })
                }, TIMEOUT);
                describe('に、正しいトークンを指定した場合', function() {
                    it('正常に確定されること', function(done) {
                        var _userAccessToken = oldUserAccessToken;
                        RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                            function(newUserAccessToken) {
                                expect(newUserAccessToken).not.toBeNull();
                                expect(newUserAccessToken).toEqual(baseUserAccessToken);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('確定後は新しいトークンでアクセス可能であること', function(done) {
                        RKZClient.getUser(baseUserAccessToken,
                            function(user) {
                                expect(user).toBeDefined();
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('確定後は古いトークンではアクセス不可であること', function(done) {
                        RKZClient.getUser(oldUserAccessToken,
                            function(user) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                done();
                            });
                    }, TIMEOUT);
                });
                it('beginUpdateUserAccessToken を読んでいないトークンを指定した場合、エラーになること', function(done) {
                    var _userAccessToken = baseUserAccessToken;
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                            done();
                        })
                }, TIMEOUT);
            });
        });  // end of ユーザーアクセストークン更新

    });  // end of ユーザー関連API

};
