//   ██████ ▄▄▄█████▓ ▄▄▄       ███▄ ▄███▓ ██▓███   ██▀███   ▄▄▄       ██▓     ██▓   ▓██   ██▓   ▄▄▄█████▓▓█████   ██████ ▄▄▄█████▓
// ▒██    ▒ ▓  ██▒ ▓▒▒████▄    ▓██▒▀█▀ ██▒▓██░  ██▒▓██ ▒ ██▒▒████▄    ▓██▒    ▓██▒    ▒██  ██▒   ▓  ██▒ ▓▒▓█   ▀ ▒██    ▒ ▓  ██▒ ▓▒
// ░ ▓██▄   ▒ ▓██░ ▒░▒██  ▀█▄  ▓██    ▓██░▓██░ ██▓▒▓██ ░▄█ ▒▒██  ▀█▄  ▒██░    ▒██░     ▒██ ██░   ▒ ▓██░ ▒░▒███   ░ ▓██▄   ▒ ▓██░ ▒░
//   ▒   ██▒░ ▓██▓ ░ ░██▄▄▄▄██ ▒██    ▒██ ▒██▄█▓▒ ▒▒██▀▀█▄  ░██▄▄▄▄██ ▒██░    ▒██░     ░ ▐██▓░   ░ ▓██▓ ░ ▒▓█  ▄   ▒   ██▒░ ▓██▓ ░
// ▒██████▒▒  ▒██▒ ░  ▓█   ▓██▒▒██▒   ░██▒▒██▒ ░  ░░██▓ ▒██▒ ▓█   ▓██▒░██████▒░██████▒ ░ ██▒▓░     ▒██▒ ░ ░▒████▒▒██████▒▒  ▒██▒ ░
// ▒ ▒▓▒ ▒ ░  ▒ ░░    ▒▒   ▓▒█░░ ▒░   ░  ░▒▓▒░ ░  ░░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ▒░▓  ░░ ▒░▓  ░  ██▒▒▒      ▒ ░░   ░░ ▒░ ░▒ ▒▓▒ ▒ ░  ▒ ░░
// ░ ░▒  ░ ░    ░      ▒   ▒▒ ░░  ░      ░░▒ ░       ░▒ ░ ▒░  ▒   ▒▒ ░░ ░ ▒  ░░ ░ ▒  ░▓██ ░▒░        ░     ░ ░  ░░ ░▒  ░ ░    ░
// ░  ░  ░    ░        ░   ▒   ░      ░   ░░         ░░   ░   ░   ▒     ░ ░     ░ ░   ▒ ▒ ░░       ░         ░   ░  ░  ░    ░
//       ░                 ░  ░       ░               ░           ░  ░    ░  ░    ░  ░░ ░                    ░  ░      ░
//                                                                                    ░ ░
var TIMEOUT = 30000;

exports.suite = function(helper) {

    var _userAccessToken = helper.userAccessToken;

    describe('Testing for stamp rally', function() {
        describe('RKZClient.getStampRallyList', function() {
            it('検索条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBefore("name", "スタンプ"),
                ];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリーを検索する場合

        describe('RKZClient.getAllStampRallyList', function() {
            it('検索条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(data) {
                        expect(false).toBeTruthy(); done();  // False
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBoth("name", "ラリー"),
                ];
                var sortConditions = [
                    RKZSortCondition.desc("name"),
                ];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリーを全件検索する場合

        describe('RKZClient.getStampRallySpotList', function() {
            it('検索条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(data) {
                        expect(false).toBeTruthy(); done();  // False
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(data) {
                        expect(false).toBeTruthy(); done();  // False
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBefore("code", "0001"),
                ];
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリーを全件検索する場合

        describe('RKZClient.getStampRallySpotListByStampRallyId', function() {
            it('スタンプラリーID=undefinedの場合、エラーになること', function(done) {
                var stampRallyId;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var stampRallyId = "";
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スタンプラリーIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スタンプラリーIDがありません"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var stampRallyId = "";
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        // スタンプらり−ID未指定のエラー
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スタンプラリーIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スタンプラリーIDがありません"})); }
                        done();
                    });
            }, TIMEOUT);

            it('スタンプラリーID!==Stringの場合、エラーとなること', function(done) {
                var stampRallyId = ["NG"];
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(data) {
                        expect(false).toBeTruthy(); done();  // False
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var stampRallyId = "";
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var stampRallyId = "";
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var stampRallyId = "0001";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.desc("code"),
                ];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリースポットをスタンプラリーIDで検索する場合

        describe('RKZClient.getStampRallySpotListBySpotId', function() {
            it('スポットID=undefinedの場合、エラーになること', function(done) {
                var spotId;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of spotId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var spotId = "";
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スポットIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スポットIDがありません"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var spotId = "";
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        // スタンプらり−ID未指定のエラー
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スポットIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スポットIDがありません"})); }
                        done();
                    });
            }, TIMEOUT);

            it('スポットID!==Stringの場合、エラーとなること', function(done) {
                var spotId = ["NG"];
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of spotId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var spotId = "";
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var spotId = "";
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var spotId = "0006";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリースポットをスポットIDで検索する場合

        describe('RKZClient.getStampRallySpotListByBeaconId', function() {
            it('ビーコンID=undefinedの場合、エラーになること', function(done) {
                var beaconId;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of beaconId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var beaconId = "";
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ビーコンIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ビーコンIdがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var beaconId = "";
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : ビーコンIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "ビーコンIdがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            it('スポットID!==Stringの場合、エラーとなること', function(done) {
                var beaconId = ["NG"];
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of beaconId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var beaconId = "";
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件!==Objectの場合、エラーとなること', function(done) {
                var beaconId = "";
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                var beaconId = "0006";
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリースポットをビーコンIDで検索する場合

        describe('スタンプ取得・コンプリートの登録と状況の確認をする場合', function() {
            describe('RKZClient.addMyStamp', function() {
                it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                    var userAccessToken;
                    var stampRallyId = "0001";
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId=undefinedの場合、エラーになること', function(done) {
                    var stampRallyId;
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallySpotId=undefinedの場合、エラーになること', function(done) {
                    var stampRallyId = "0001";
                    var stampRallySpotId;
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallySpotId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('userAccessToken!==Stringの場合、エラーとなること', function(done) {
                    var userAccessToken = { token: "NG" };
                    var stampRallyId = "0001";
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId!==Stringの場合、エラーとなること', function(done) {
                    var stampRallyId = { id: "NG" };
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallySpotId!===Stringの場合、エラーとなること', function(done) {
                    var stampRallyId = "0001";
                    var stampRallySpotId = { id: "NG" };
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallySpotId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                    var stampRallyId = "0001";
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId=""の場合、エラーが返されること', function(done) {
                    var stampRallyId = "";
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スタンプラリーIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スタンプラリーIDがありません"})); }
                            done();
                        });
                }, TIMEOUT);
            });  // end of 取得したスタンプを登録する場合

            describe('RKZClient.stampComplete', function() {
                it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                    var userAccessToken;
                    var stampRallyId = "0001";
                    RKZClient.stampComplete(userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId=undefinedの場合、エラーになること', function(done) {
                    var stampRallyId;
                    RKZClient.stampComplete(helper.userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('userAccessToken!==Stringの場合、エラーとなること', function(done) {
                    var userAccessToken = [ "NG" ];
                    var stampRallyId = "0001";
                    RKZClient.stampComplete(userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId!==Stringの場合、エラーとなること', function(done) {
                    var stampRallyId = [ "NG" ];
                    RKZClient.stampComplete(helper.userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of stampRallyId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                    var stampRallyId = "0001";
                    RKZClient.stampComplete(helper.userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                            done();
                        });
                }, TIMEOUT);
                it('stampRallyId=""の場合、エラーが返されること', function(done) {
                    var stampRallyId = "";
                    RKZClient.stampComplete(helper.userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : スタンプラリーIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "スタンプラリーIDがありません"})); }
                            done();
                        });
                }, TIMEOUT);
            });  // end of スタンプラリーにコンプリート情報を登録する場合

            describe('RKZClient.getMyStampHistoryList', function() {
                it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                    var userAccessToken;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getMyStampHistoryList(userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('searchConditions=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                    var searchConditions;
                    var sortConditions = [];
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                            done();
                        });
                }, TIMEOUT);
                it('sortConditions=undefinedの場合、プラン制限のため利用できないこと', function(done) {
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                            done();
                        });
                }, TIMEOUT);
                it('userAccessToken!==Stringの場合、エラーとなること', function(done) {
                    var userAccessToken = [ "NG" ];
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getMyStampHistoryList(userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('searchConditions!==Objectの場合、エラーとなること', function(done) {
                    var searchConditions = "NG";
                    var sortConditions = [];
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('sortConditions!==Objectの場合、エラーとなること', function(done) {
                    var searchConditions = [];
                    var sortConditions = "NG";
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('パラメータが正しい場合、プラン制限のため利用できないこと', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("stamp_rally_cd", "0001"),
                    ];
                    var sortConditions = null;
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9006"}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of スタンプ取得履歴を検索する場合
        });  // end of スタンプ取得・コンプリートの登録と状況の確認をする場合
    });  // end of スタンプラリー関連API
};
