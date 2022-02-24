var TIMEOUT = 30000;

//
// タイムアウトのテスト
//   タイムアウトのテストを行う場合、サーバー側のロジックを修正する必要があるため、単独での実行は不可能。
//   該当テナントの API_CONTROL の先頭に setTimeout() で10秒のインターバルを必ず行うように
//   設定する必要がある。
//
//      呼び出し方
//          とりあえず tests.jsの exports.defineAutoTests = function () 部分に、
//          description('Testing for API timeout');
//          をコピりましょう。
//          ※ 他のテストケースはコメント化しておく方が望ましい。
//
//      USER_ACCESS_TOKEN はなんとか準備する。
//
exports.suite = function(helper) {

    var USER_ACCESS_TOKEN = "JFAkQjl2cERzdWtxeExmdFhzNXFPYUh3S01HT0wveHlnLg--";

    describe('Testing for API timeout', function() {
        var _edit_user_data;
        var _edit_object_data;
        var _model_change_code;
        var _model_change_user_access_token;
        var _user_auth_user_no;
        var _two_phase_commit_user_access_token;

        it('RKZClientの初期化', function(done) {
            RKZClient.setTenantKey(helper.LICENSE_KEY,
                function() {
                    expect(true).toBeTruthy(); done();  // Success
                }, function(error) {
                    expect(false).toBeTruthy(); done();  // Failed
                });
        }, TIMEOUT);

        describe('事前データ準備', function() {
            it('User', function(done) {
                var user = { user_name: "【Timeout確認用】editUser", sex_cd: "0002", birth_day: "2016-08-25" };
                RKZClient.registUser(user,
                    function(user) {
                        expect(true).toBeTruthy();
                        _edit_user_data = user;
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('ObjectData', function(done) {
                var data = {
                    'object_id' : 'delete_master',
                    'name' : 'CORDOVA_PLUGIN_TEST_OBJECT',
                    'short_name' : 'short_name',
                    'sort_no' : 10,
                    attributes : {
                        'attributes_value' : '新規',
                        'attributes_date' : '2017-01-01 00:00:00'
                    }
                };
                RKZClient.addData(data,
                    function(statusCode) {
                        expect(true).toBeTruthy();
                        var objectId = "delete_master";
                        var searchConditions = [
                            RKZSearchCondition.equal("name", "CORDOVA_PLUGIN_TEST_OBJECT")
                        ];
                        var sortConditions = [];
                        RKZClient.getDataList(objectId, searchConditions, sortConditions,
                            function(datas) {
                                expect(true).toBeTruthy();
                                _edit_object_data = datas[0];
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            it('ModelchangeCode', function(done) {
                var user_name = "Timeout TEST - 認証コード発行用" + new Date();
                var user = {
                    user_name: user_name,
                    sex_cd: "0002",
                    birth_day: '2016-01-01',
                    user_password: 'test'
                };
                RKZClient.registUser(user,
                    function(userinfo) {
                        _user_auth_user_no = userinfo.user_no;
                        var userAccessToken = userinfo.user_access_token;
                        var param = {};
                        RKZClient.registModelChangeCode(userAccessToken, param,
                            function(modelChangeCode) {
                                expect(true).toBeTruthy();
                                _model_change_code = modelChangeCode.model_change_code;
                                _model_change_user_access_token = userAccessToken;
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, 60000);

            it('2 phase commit UserAccessToken.', function(done) {
                var user_name = "Timeout TEST - トークン更新用" + new Date();
                var user = {
                    user_name: user_name,
                    sex_cd: "0002",
                    birth_day: '2016-01-01',
                    user_password: 'test'
                };
                RKZClient.registUser(user,
                    function(userinfo) {
                        expect(true).toBeTruthy();
                        _two_phase_commit_user_access_token = userinfo.user_access_token;
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, 60000);
        });

        it('タイムアウト値の設定', function(done) {
            RKZClient.setDefaultTimeout(5,
                function(locale) {
                    expect(true).toBeTruthy(); done();
                }, function(error) {
                    expect(false).toBeTruthy(); done();
                });
        }, TIMEOUT);

        describe('Application APIs.', function() {
            it('getApplicationSettingData', function(done) {
                RKZClient.getApplicationSettingData(
                    function(applicationSetting) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getLocaleList', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getLocaleList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('setLocale', function(done) {
                var _locale = "ja";
                RKZClient.setLocale(USER_ACCESS_TOKEN, _locale,
                    function(locale) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getSystemDate', function(done) {
                RKZClient.getSystemDate(
                    function(date) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of Application APIs.

        describe('Beacon APIs.', function() {
            it('getBeaconList', function(done) {
                var searchConditions;   // undefined
                var sortConditions;     // undefined
                RKZClient.getBeaconList(searchConditions, sortConditions,
                    function(beacons) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('addDetectBeaconContact', function(done) {
                var beaconId = "FD064A00300C";
                var beaconSpotCode = "0001";
                var rssi = 3;
                var detectBeaconDatetime = new Date();
                var remarks = "テスト備考";
                RKZClient.addDetectBeaconContact(USER_ACCESS_TOKEN,
                    beaconId,
                    beaconSpotCode,
                    rssi,
                    detectBeaconDatetime,
                    remarks,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('正常なパラメータの場合、正しく取得できること', function(done) {
                var searchConditions = null;
                var sortConditions = null;
                RKZClient.getDetectBeaconContact(USER_ACCESS_TOKEN,
                    searchConditions,
                    sortConditions,
                    function(beaconContacts) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of Beacon APIs.

        describe('Contact APIs.', function() {
            it('addContact', function(done) {
                var contact = {
                    contact_class_cd: "0015",
                    contact_method_class_cd: "0007",
                };
                RKZClient.addContact(USER_ACCESS_TOKEN, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getContactList', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("contact_class_cd", "0015"),
                ];
                var sortConditions = [];
                RKZClient.getContactList(USER_ACCESS_TOKEN, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of Contact APIs.

        describe('Coupon APIs.', function() {
            it('getCoupon', function(done) {
                var couponCd = "0001";
                RKZClient.getCoupon(couponCd,
                    function(coupon) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getCouponList', function(done) {
                var searchConditions;
                var sortConditions = [
                    RKZSortCondition.desc("code"),
                ];
                RKZClient.getCouponList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('exchangeCoupon', function(done) {
                var couponCd = "0001";
                var quantity = 2;
                RKZClient.exchangeCoupon(USER_ACCESS_TOKEN, couponCd, quantity,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getMyCouponList', function(done) {
                var searchConditions;
                var sortConditions = [
                    RKZSortCondition.desc("code"),
                ];
                RKZClient.getMyCouponList(USER_ACCESS_TOKEN, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、正しく処理されること', function(done) {
                //ポイントのテスト.js動作後でないと、エラーになります。
                var myCoupon = {
                    code: "3",
                    coupon_cd: "0001",
                };
                RKZClient.useMyCoupon(USER_ACCESS_TOKEN, myCoupon,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

        });  // End of Coupon APIs.

        describe('News APIs.', function() {
            it('getNews', function(done) {
                var params = { news_id: "1" };
                RKZClient.getNews(params,
                    function(news) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getNewsList', function(done) {
                var limit;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getReleasedNewsList', function(done) {
                var limit;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('registNewsReadHistory', function(done) {
                var params = { news_id: "1" };
                RKZClient.registNewsReadHistory(params, USER_ACCESS_TOKEN,
                    function(status) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getNewsReadHistory', function(done) {
                var params = { news_id: "1" };
                RKZClient.getNewsReadHistory(params, USER_ACCESS_TOKEN,
                    function(news) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of News APIs.

        describe('ObjectData APIs.', function() {
            it('getData', function(done) {
                var objectId = "beacon";
                var code = "0001";
                RKZClient.getData(objectId, code,
                    function(data) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getDataList', function(done) {
                var objectId = "beacon";
                var searchConditions;
                var sortConditions = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('addData', function(done) {
                var data = {
                    'object_id' : 'delete_master',
                    'name' : 'CORDOVA_PLUGIN_TEST_OBJECT',
                    'short_name' : 'short_name',
                    'sort_no' : 10,
                    attributes : {
                        'attributes_value' : '新規',
                        'attributes_date' : '2017-01-01 00:00:00'
                    }
                };
                RKZClient.addData(data,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('editData', function(done) {
                _edit_object_data.name = "Timeout TEST EDIT.";

                _edit_object_data.attributes = {
                    "attributes_value" : "修正",
                    "attributes_date" : "2017-03-01 12:34:56"
                };


                RKZClient.editData(_edit_object_data,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('deleteData', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("code", _edit_object_data.code)
                ];
                RKZClient.deleteData("delete_master", searchConditions,
                    function(deleteCount) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getDataWithRelationObjects', function(done) {
                var objectId = "spot";
                var code = "0004";
                RKZClient.getDataWithRelationObjects(objectId, code,
                    function(data) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of ObjectData APIs.

        describe('Point APIs.', function() {
            it('addPoint', function(done) {
                var point = 1;
                var addDate = new Date();
                RKZClient.addPoint(USER_ACCESS_TOKEN, point, addDate,
                    function(point) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);  // end of it('パラメータが正しい場合、正常に検索できること', function(done)

            it('getPoint', function(done) {
                RKZClient.getPoint(USER_ACCESS_TOKEN,
                    function(point) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of Point APIs.

        describe('Spot APIs.', function() {
            it('getSpotList', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("name", "A-1")
                ];
                var sortConditions = null;
                RKZClient.getSpotList(searchConditions, sortConditions,
                    function(spots) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of Spot APIs.

        describe('StampRally APIs.', function() {
            it('getStampRallyList', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBefore("name", "スタンプ"),
                ];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getAllStampRallyList', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBoth("name", "ラリー"),
                ];
                var sortConditions = [
                    RKZSortCondition.desc("name"),
                ];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getStampRallySpotList', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getStampRallySpotListByStampRallyId', function(done) {
                var stampRallyId = "0001";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.desc("code"),
                ];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getStampRallySpotListBySpotId', function(done) {
                var spotId = "0006";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getStampRallySpotListByBeaconId', function(done) {
                var beaconId = "0006";
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('addMyStamp', function(done) {
                var stampRallyId = "0001";
                var stampRallySpotId = "0001";
                RKZClient.addMyStamp(USER_ACCESS_TOKEN, stampRallyId, stampRallySpotId,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('stampComplete', function(done) {
                var stampRallyId = "0001";
                RKZClient.stampComplete(USER_ACCESS_TOKEN, stampRallyId,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('getMyStampHistoryList', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("stamp_rally_cd", "0001"),
                ];
                var sortConditions = null;
                RKZClient.getMyStampHistoryList(USER_ACCESS_TOKEN, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of StampRally APIs.

        describe('User APIs.', function() {
            it('registUser', function(done) {
                var now = new Date();
                var user = {
                    user_name: "【日付確認】" + new Date(),
                    sex_cd : "0001",
                    birth_day : now
                };
                RKZClient.registUser(user,
                    function(user) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('getUser', function(done) {
                var userAccessToken = USER_ACCESS_TOKEN;
                RKZClient.getUser(userAccessToken,
                    function(user) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('editUser', function(done) {
                _edit_user_data.user_first_name = _edit_user_data.user_first_name + "【修正】";
                RKZClient.editUser(_edit_user_data,
                    function(user) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);

            it('registPushDeviceToken', function(done) {
                var userAccessToken = _edit_user_data.user_access_token;
                var deviceToken = "CORDOVA_PLUGIN_TEST_TOKEN";
                RKZClient.registPushDeviceToken(userAccessToken, deviceToken,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('editPassword', function(done) {
                var userAccessToken = _edit_user_data.user_access_token;
                var nowPassword = "test";
                var newPassword = "test2";
                RKZClient.editPassword(userAccessToken, nowPassword, newPassword,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('registModelChangeCode', function(done) {
                var userAccessToken = _edit_user_data.user_access_token;
                var param = {};
                RKZClient.registModelChangeCode(userAccessToken, null,
                    function(modelChangeCode) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('authModelChange', function(done) {
                var modelChangeCode = _model_change_code;
                var password = null;

                RKZClient.authModelChange(modelChangeCode, password,
                    function(user) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('userAuth', function(done) {
                var loginId = _user_auth_user_no;
                var password = "test";
                RKZClient.userAuth(loginId, password,
                    function(user) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
            it('updateUserAccessToken', function(done) {
                var _userAccessToken = _model_change_user_access_token;
                RKZClient.updateUserAccessToken(_userAccessToken,
                    function(newUserAccessToken) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    })
            }, TIMEOUT);
            it('beginUpdateUserAccessToken', function(done) {
                var _userAccessToken = _two_phase_commit_user_access_token;
                RKZClient.beginUpdateUserAccessToken(_userAccessToken,
                    function(newUserAccessToken) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    })
            }, TIMEOUT);
            it('commitUpdateUserAccessToken', function(done) {
                // これより前に実行した、beginUpdateUserAccessTokenが終わるまで待機 (単純に10秒待機)
                setTimeout(function() {
                    var _userAccessToken = _two_phase_commit_user_access_token;
                    RKZClient.commitUpdateUserAccessToken(_userAccessToken,
                        function(newUserAccessToken) {
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                            done();
                        });
                    }, 10000);
            }, 60000);
            it('getUserFieldDataList', function(done) {
                var visibleFieldOnly;
                RKZClient.getUserFieldDataList(visibleFieldOnly,
                    function(fields) {
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9031"}));
                        done();
                    });
            }, TIMEOUT);
        });  // End of User APIs.
    });

};
