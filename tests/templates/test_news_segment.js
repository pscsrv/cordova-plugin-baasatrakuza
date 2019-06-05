//
// お知らせセグメント配信テストロジック
//      お知らせのセグメント配信は、管理者機能にて特定のユーザーに対して送信する必要があるため
//      自動テストでは組みづらい事情がある。
//      が、各項目が正しいかなどのチェックは必要のため、テンプレートとして実行できる状態にはしておく。
//      テストを実行する場合は、このテンプレートを個別に呼び出すこと。
//
//      呼び出し方
//          とりあえず tests.jsの exports.defineAutoTests = function () 部分に、
//          description('BaaS@Rakuza for Cordova 結合テスト - Template');
//          をコピりましょう。
//          ※ 他のテストケースはコメント化しておく方が望ましい。
//
//      Unittestの接続先のテナントでテストデータを事前に準備しておけば、このテストはAutotestに組み込んでもOK。
//
var TIMEOUT = 30000;
var LICENSE_KEY = "{You.have.an.authentication_id}";
var USER_ACCESS_TOKEN = "JFAkQk5NTjljV2ZELlIyQjNrTDlHNTg1OUE4LmMuOHl6MA--";

exports.suite = function(helper) {

    describe('BaaS@Rakuza for Cordova 結合テスト - Template', function() {

        describe('RKZClient.setTenantKey', function() {
            it('正しいアクセストークンの場合、正常に接続できること', function(done) {
                RKZClient.setTenantKey(LICENSE_KEY,
                    function() {
                        expect(true).toBeTruthy(); done();  // Success
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

        describe('RKZClient.getSegmentNewsList', function() {
            describe('パラメータ: userAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = null;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==String の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = { token: "NG" };
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('パラメータ: onlyMatchSegment', function() {
                it('= undefined の場合、全て取得すること', function(done) {
                    var limit = 2;
                    var _onlyMatchSegment;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"5"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、全て取得すること', function(done) {
                    var limit = 2;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"5"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Boolean の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment = "true";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of onlyMatchSegment is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= True and userAccessToken = null の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = null;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('onlyMatchSegment = true', function() {
                it('userAccessToken が正しい場合、正常に結果が取得できること', function(done) {
                    var limit = 10;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit,
                        USER_ACCESS_TOKEN,
                        true,
                        searchConditions,
                        sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(Object.keys(datas[0]).length).toEqual(24);

                            expect(datas[0].tenant_id).toBeDefined();

                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: '4'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_flg: true}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_from_date: '2016-10-27 16:59:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({push_time: '2016-12-27 20:58:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({title: 'テストニュース４'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({url: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({category_name: '通常'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_target_kbn_name: '管理者,利用者'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({rss_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({genre_name: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({category: '0001'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({use_push_flg: true}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({match_segment_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_end_date: '2117-10-27 16:59:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({date: '2016-10-27 00:00:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({push_done_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_target_kbn: '0001,0002'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({photo: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({tenant_id: '21002'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({genre: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({author: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({description: 'テスト詳細4'}));


                            expect(Object.keys(datas[0].news_segment_conditions).length).toEqual(3);
                            expect(datas[0].news_segment_conditions).toEqual(jasmine.objectContaining({user_high_class_cd: '0001'}));
                            expect(datas[0].news_segment_conditions).toEqual(jasmine.objectContaining({condition_type: 'input'}));

                            expect(Object.keys(datas[0].news_segment_conditions.conditions).length).toEqual(5);

                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({ field_name: 'user_no'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({search_type: 'like_before'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({search_value: 'APP01000'}));

                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({ field_name: 'sex_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({field_name: 'age_config'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({field_name: 'business_class_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({field_name: 'state_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(Object.keys(datas[0].attributes).length).toEqual(7);
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({ news_segment_flg: '1'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({news_segment_only_flg: '0'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({site_dir: 'https://baas.raku-za.jp/stage/unittest/sdk.0210/'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({data_id: '29'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({readed_flg: '0'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({readed_dte: null}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({tenant_name: 'BaaS SDK テスト'}));

                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"1"}));

                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('onlyMatchSegment = false', function() {
                it('user_access_token が正しい場合、正常に結果が取得できること', function(done) {
                    var limit = 10;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getSegmentNewsList(limit,
                        USER_ACCESS_TOKEN,
                        false,
                        searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"1"}));
                            expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));

                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            it('既存のgetNewslistには影響なしで動くこと', function(done) {
                var limit = 10;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(4);
                        expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                        expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"1"}));
                        expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

        describe('RKZClient.getReleasedSegmentNewsList', function() {
            describe('パラメータ: userAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = null;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==String の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = { token: "NG" };
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('パラメータ: onlyMatchSegment', function() {
                it('= undefined の場合、全て取得すること', function(done) {
                    var limit = 2;
                    var _onlyMatchSegment;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"5"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、全て取得すること', function(done) {
                    var limit = 2;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"5"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[2]).toEqual(jasmine.objectContaining({"news_id":"3"}));
                            expect(datas[3]).toEqual(jasmine.objectContaining({"news_id":"2"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Boolean の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = USER_ACCESS_TOKEN;
                    var _onlyMatchSegment = "true";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of onlyMatchSegment is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= True and userAccessToken = null の場合、エラーになること', function(done) {
                    var limit = 2;
                    var _userAccessToken = null;
                    var _onlyMatchSegment = true;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit, _userAccessToken, _onlyMatchSegment, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('onlyMatchSegment = true', function() {
                it('userAccessToken が正しい場合、正常に結果が取得できること', function(done) {
                    var limit = 10;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit,
                        USER_ACCESS_TOKEN,
                        true,
                        searchConditions,
                        sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(Object.keys(datas[0]).length).toEqual(24);

                            expect(datas[0].tenant_id).toBeDefined();

                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: '4'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_flg: true}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_from_date: '2016-10-27 16:59:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({push_time: '2016-12-27 20:58:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({title: 'テストニュース４'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({url: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({category_name: '通常'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_target_kbn_name: '管理者,利用者'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({rss_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({genre_name: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({category: '0001'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({use_push_flg: true}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({match_segment_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_end_date: '2117-10-27 16:59:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({date: '2016-10-27 00:00:00+0900'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({push_done_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({release_target_kbn: '0001,0002'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({photo: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({tenant_id: '21002'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({genre: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({author: ''}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({description: 'テスト詳細4'}));


                            expect(Object.keys(datas[0].news_segment_conditions).length).toEqual(3);
                            expect(datas[0].news_segment_conditions).toEqual(jasmine.objectContaining({user_high_class_cd: '0001'}));
                            expect(datas[0].news_segment_conditions).toEqual(jasmine.objectContaining({condition_type: 'input'}));

                            expect(Object.keys(datas[0].news_segment_conditions.conditions).length).toEqual(5);

                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({ field_name: 'user_no'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({search_type: 'like_before'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[0]).toEqual(jasmine.objectContaining({search_value: 'APP01000'}));

                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({ field_name: 'sex_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[1]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({field_name: 'age_config'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[2]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({field_name: 'business_class_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[3]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({field_name: 'state_cd'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({search_type: 'equal'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({object_name: 'user_edit_form_individual'}));
                            expect(datas[0].news_segment_conditions.conditions[4]).toEqual(jasmine.objectContaining({search_value: ''}));

                            expect(Object.keys(datas[0].attributes).length).toEqual(7);
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({ news_segment_flg: '1'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({news_segment_only_flg: '0'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({site_dir: 'https://baas.raku-za.jp/stage/unittest/sdk.0210/'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({data_id: '29'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({readed_flg: '0'}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({readed_dte: null}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({tenant_name: 'BaaS SDK テスト'}));

                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"1"}));

                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('onlyMatchSegment = false', function() {
                it('userAccessToken が正しい場合、正常に結果が取得できること', function(done) {
                    var limit = 10;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedSegmentNewsList(limit,
                        USER_ACCESS_TOKEN,
                        false,
                        searchConditions,
                        sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"1"}));

                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            it('既存のgetReleasedNewsListには影響なしで動くこと', function(done) {
                var limit = 10;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"4"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"news_id":"1"}));

                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

    });

};
