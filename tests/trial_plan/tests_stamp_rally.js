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
            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBefore("name", "スタンプ"),
                ];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        expect(Object.keys(datas[0]).length).toEqual(17);
                        expect(datas[0]).toEqual(jasmine.objectContaining({"code":"0001"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"name":"スタンプラリー1"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"short_name":"ラリー1"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"sort_no":1}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"not_use_flg":false}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_detail":"ラリー1詳細"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_start_date":"2016-01-01 00:00:00+0900"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_end_date":"2116-12-31 00:00:00+0900"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_image":"960_95_148_1578615922886.png"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_image_url":"https://cloud.raku-za.jp/stage/unittest/sdk.0210/Image/users/960_95_148_1578615922886.png"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"complete_count_name":null}));
                        expect(Object.keys(datas[0].attributes).length).toEqual(4);
                        expect(datas[0].attributes.not_edit_flg).toEqual("0");
                        expect(datas[0].attributes.not_delete_flg).toEqual("0");
                        expect(datas[0].attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(datas[0].attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of スタンプラリーを検索する場合

        describe('RKZClient.getAllStampRallyList', function() {
            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(3);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(3);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBoth("name", "ラリー"),
                ];
                var sortConditions = [
                    RKZSortCondition.desc("name"),
                ];
                RKZClient.getAllStampRallyList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(3);
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({code: "0002"}));
                        expect(datas[2]).toEqual(jasmine.objectContaining({code: "0001"}));
                        done();
                    }, function(error) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                        done();
                    });
            }, TIMEOUT);
        });  // end of スタンプラリーを全件検索する場合

        describe('RKZClient.getStampRallySpotList', function() {
            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(5);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(5);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
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
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.likeBefore("code", "0001"),
                ];
                var sortConditions = [];
                RKZClient.getStampRallySpotList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(1);
                        expect(Object.keys(datas[0]).length).toEqual(8);
                        expect(datas[0]).toEqual(jasmine.objectContaining({"code":"0001"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"name":"スタンプラリースポット1"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"sort_no":1}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"not_use_flg":false}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_cd":"0001"}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({"stamp_rally_name":"スタンプラリー1"}));
                        expect(Object.keys(datas[0].attributes).length).toEqual(4);
                        expect(datas[0].attributes.not_edit_flg).toEqual("0");
                        expect(datas[0].attributes.not_delete_flg).toEqual("0");
                        expect(datas[0].attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(datas[0].attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(Object.keys(datas[0].spot).length).toEqual(13);
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({code: '0004'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({name: 'A-1'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({short_name: 'A1'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({sort_no: 3}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({beacon: [ '0005' ]}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({latitude: '34.602446'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({longitude: '133.765669'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({pixel_position_x: '10'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({pixel_position_y: '20'}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({beacon_range_for_android: -80}));
                        expect(datas[0].spot).toEqual(jasmine.objectContaining({beacon_range_for_iphone: -80}));
                        expect(Object.keys(datas[0].spot.attributes).length).toEqual(5);
                        expect(datas[0].spot.attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(datas[0].spot.attributes).toEqual(jasmine.objectContaining({beacon_name: 'A-1'}));
                        expect(datas[0].spot.attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(datas[0].spot.attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(datas[0].spot.attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
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
                        // Failed
                        expect(false).toBeTruthy(); done();
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var stampRallyId = "0001";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.desc("code"),
                ];
                RKZClient.getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(3);
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({code: "0002"}));
                        expect(datas[2]).toEqual(jasmine.objectContaining({code: "0001"}));
                        done();
                    }, function(error) {
                        // Failed
                        expect(false).toBeTruthy(); done();
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var spotId = "0006";
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code"),
                ];
                RKZClient.getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({code: "0005"}));
                        done();
                    }, function(error) {
                        // Failed
                        expect(false).toBeTruthy(); done();
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

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var beaconId = "0006";
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(1);
                        done();
                    }, function(error) {
                        // Failed
                        expect(false).toBeTruthy(); done();
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
                it('パラメータが正しい場合、正常に登録できること', function(done) {
                    var stampRallyId = "0001";
                    var stampRallySpotId = "0001";
                    RKZClient.addMyStamp(helper.userAccessToken, stampRallyId, stampRallySpotId,
                        function(statusCode) {
                            expect(statusCode).toEqual("1001");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
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
                it('パラメータが正しい場合、正常に登録できること', function(done) {
                    var stampRallyId = "0001";
                    RKZClient.stampComplete(helper.userAccessToken, stampRallyId,
                        function(statusCode) {
                            expect(statusCode).toEqual("1001");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
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
                it('searchConditions=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions;
                    var sortConditions = [];
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);  // 実行前より2件多いはず
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('sortConditions=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);  // 実行前より2件多いはず
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
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

                it('パラメータが正しい場合、正常に検索できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("stamp_rally_cd", "0001"),
                    ];
                    var sortConditions = null;
                    RKZClient.getMyStampHistoryList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);  // 実行前より2件多いはず
                            expect(datas[0].contact_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });  // end of スタンプ取得履歴を検索する場合
        });  // end of スタンプ取得・コンプリートの登録と状況の確認をする場合
    });  // end of スタンプラリー関連API
};
