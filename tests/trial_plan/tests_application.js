var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for application settings', function() {
        describe('RKZClient.getApplicationSettingData', function() {
            it('正しく取得できること', function(done) {
                RKZClient.getApplicationSettingData(
                    function(applicationSetting) {
                        expect(applicationSetting).toBeDefined();
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of getApplicationSettingData

        describe('RKZClient.getLocaleList', function() {
            it('searchConditions=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions;
                var sortConditions = [];
                RKZClient.getLocaleList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('sortConditions=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var searchConditions = [];
                var sortConditions;
                RKZClient.getLocaleList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('searchConditions!==Objectの場合、エラーになること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getLocaleList(searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('sortConditions!==Objectの場合、エラーになること', function(done) {
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getLocaleList(searchConditions, sortConditions,
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
                    RKZSearchCondition.equal("code", "LNG0001"),
                ];
                var sortConditions = [];
                RKZClient.getLocaleList(searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(1);
                        expect(Object.keys(datas[0]).length).toEqual(9);
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: 'LNG0001'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({name: '日本語'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({default_flg: true}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({language_cd: 'ja'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({language_name: '日本語'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({locale: 'ja'}));
                        expect(Object.keys(datas[0].attributes).length).toEqual(2);
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({not_edit_flg: '1'}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({not_delete_flg: '1'}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        }); // end of describe('RKZClient.getLocaleList', function()

        describe('RKZClient.setLocale', function() {
            it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                var userAccessToken;
                var locale = "ja";
                RKZClient.setLocale(userAccessToken, locale,
                    function(locale) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('locale=undefinedの場合、エラーになること', function(done) {
                var locale;
                RKZClient.setLocale(helper.userAccessToken, locale,
                    function(locale) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of locale is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('userAccessToken!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = {status:"NG"};
                var locale = "ja";
                RKZClient.setLocale(userAccessToken, locale,
                    function(locale) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('locale!==Stringの場合、エラーになること', function(done) {
                var locale = {status:"NG"};
                RKZClient.setLocale(helper.userAccessToken, locale,
                    function(locale) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of locale is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('パラメータが正しい場合、正常に登録できること', function(done) {
                var _locale = "ja";
                RKZClient.setLocale(helper.userAccessToken, _locale,
                    function(locale) {
                        expect(locale).toBeDefined();
                        expect(locale).toEqual("ja");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);

            describe('RKZClient.getLocale', function() {
                var _locale = null;

                describe('日本語', function() {
                    beforeEach(function(done) {
                        RKZClient.setLocale(helper.userAccessToken, "ja",
                            function(locale) { _locale = locale; done(); }, function(error) { expect(false).toBeTruthy(); done(); });
                    });
                    it('正常に取得できること', function(done) {
                        RKZClient.getLocale(
                            function(locale) {
                                expect(locale).toBeDefined();
                                expect(locale).toEqual(_locale);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                });

                describe('英語', function() {
                    beforeEach(function(done) {
                        RKZClient.setLocale(helper.userAccessToken, "en",
                            function(locale) { _locale = locale; done(); }, function(error) { expect(false).toBeTruthy(); done(); });
                    });
                    it('正常に取得できること', function(done) {
                        RKZClient.getLocale(
                            function(locale) {
                                expect(locale).toBeDefined();
                                expect(locale).toEqual(_locale);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                });

                describe('中国語(TW)', function() {
                    beforeEach(function(done) {
                        RKZClient.setLocale(helper.userAccessToken, "zh-TW",
                            function(locale) { _locale = locale; done(); }, function(error) { expect(false).toBeTruthy(); done(); });
                    });
                    it('正常に取得できること', function(done) {
                        RKZClient.getLocale(
                            function(locale) {
                                expect(locale).toBeDefined();
                                expect(locale).toEqual(_locale);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                });

                describe('中国語(CN)', function() {
                    beforeEach(function(done) {
                        RKZClient.setLocale(helper.userAccessToken, "zh-CN",
                            function(locale) { _locale = locale; done(); }, function(error) { expect(false).toBeTruthy(); done(); });
                    });
                    it('正常に取得できること', function(done) {
                        RKZClient.getLocale(
                            function(locale) {
                                expect(locale).toBeDefined();
                                expect(locale).toEqual(_locale);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                });
            });  // end of describe('RKZClient.getLocale', function()

            it('存在しないLocaleの場合、サーバに設定されているdefault localeが復帰されること', function(done) {
                RKZClient.setLocale(helper.userAccessToken, "GReeeeN",
                    function(locale) {
                        expect(locale).toBeDefined();
                        expect(locale).toEqual("ja");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.setLocale', function()

        describe('RKZClient.getSystemDate', function() {
            it('正しく取得できること', function(done) {
                RKZClient.getSystemDate(
                    function(date) {
                        expect(date).toBeDefined();
                        expect(date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getSystemDate', function()
    });  // end of describe('Testing for application settings', function()

};
