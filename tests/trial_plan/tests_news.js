var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for news', function() {
        describe('RKZClient.getNews', function() {
            describe('パラメータ:params', function() {
                it('=undefinedの場合、エラーになること', function(done) {
                    var params;
                    RKZClient.getNews(params,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var params = "NG";
                    RKZClient.getNews(params,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.news_id=undefinedの場合、エラーになること', function(done) {
                    var params = {};
                    RKZClient.getNews(params,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.news_id!==Stringの場合、エラーになること', function(done) {
                    var params = { news_id: 1 };
                    RKZClient.getNews(params,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.tenant_id=undefinedの場合、正常に検索できること', function(done) {
                    var params = { news_id: "1" };
                    RKZClient.getNews(params,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(Object.keys(news).length).toEqual(22);
                            expect(news.tenant_id).toBeDefined();
                            expect(news).toEqual(jasmine.objectContaining({"news_id":"1"}));
                            expect(news).toEqual(jasmine.objectContaining({"title":"テストニュース!"}));
                            expect(news).toEqual(jasmine.objectContaining({"description":"テスト詳細"}));
                            expect(news).toEqual(jasmine.objectContaining({"url":""}));
                            expect(news).toEqual(jasmine.objectContaining({"category_name":"通常"}));
                            expect(news).toEqual(jasmine.objectContaining({"release_target_kbn_name":"管理者,利用者"}));
                            expect(news).toEqual(jasmine.objectContaining({"rss_flg":false}));
                            expect(news).toEqual(jasmine.objectContaining({"genre_name":""}));
                            expect(news).toEqual(jasmine.objectContaining({"category":"0001"}));
                            expect(news).toEqual(jasmine.objectContaining({"use_push_flg":true}));
                            expect(news).toEqual(jasmine.objectContaining({"release_from_date":"2016-09-30 22:56:00+0900"}));
                            expect(news).toEqual(jasmine.objectContaining({"release_end_date":"2117-09-30 22:56:00+0900"}));
                            expect(news).toEqual(jasmine.objectContaining({"date":"2016-09-30 00:00:00+0900"}));
                            expect(news).toEqual(jasmine.objectContaining({"release_target_kbn":"0001,0002"}));
                            expect(news).toEqual(jasmine.objectContaining({"genre":""}));
                            expect(news).toEqual(jasmine.objectContaining({"photo":""}));
                            expect(news).toEqual(jasmine.objectContaining({"author":""}));
                            expect(news).toEqual(jasmine.objectContaining({"push_done_flg":false}));
                            expect(news).toEqual(jasmine.objectContaining({"push_time":"2016-12-27 20:53:00+0900"}));
                            expect(news).toEqual(jasmine.objectContaining({"release_flg":true}));
                            expect(Object.keys(news.attributes).length).toEqual(1);
                            expect(news.attributes).toEqual(jasmine.objectContaining({"tenant_name":"BaaS SDK テスト"}));
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('.tenant_id!==Stringの場合、エラーになること', function(done) {
                    var params = { news_id: "1", tenant_id: ["NG"] };
                    RKZClient.getNews(params,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.tenant_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:params', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var params = { news_id: "1", tenant_id: "20002" };
                RKZClient.getNews(params,
                    function(news) {
                        expect(news).toBeDefined();
                        expect(Object.keys(news).length).toEqual(22);
                        expect(news.tenant_id).toBeDefined();
                        expect(news).toEqual(jasmine.objectContaining({"news_id":"1"}));
                        expect(news).toEqual(jasmine.objectContaining({"title":"テストニュース!"}));
                        expect(news).toEqual(jasmine.objectContaining({"description":"テスト詳細"}));
                        expect(news).toEqual(jasmine.objectContaining({"url":""}));
                        expect(news).toEqual(jasmine.objectContaining({"category_name":"通常"}));
                        expect(news).toEqual(jasmine.objectContaining({"release_target_kbn_name":"管理者,利用者"}));
                        expect(news).toEqual(jasmine.objectContaining({"rss_flg":false}));
                        expect(news).toEqual(jasmine.objectContaining({"genre_name":""}));
                        expect(news).toEqual(jasmine.objectContaining({"category":"0001"}));
                        expect(news).toEqual(jasmine.objectContaining({"use_push_flg":true}));
                        expect(news).toEqual(jasmine.objectContaining({"release_from_date":"2016-09-30 22:56:00+0900"}));
                        expect(news).toEqual(jasmine.objectContaining({"release_end_date":"2117-09-30 22:56:00+0900"}));
                        expect(news).toEqual(jasmine.objectContaining({"date":"2016-09-30 00:00:00+0900"}));
                        expect(news).toEqual(jasmine.objectContaining({"release_target_kbn":"0001,0002"}));
                        expect(news).toEqual(jasmine.objectContaining({"genre":""}));
                        expect(news).toEqual(jasmine.objectContaining({"photo":""}));
                        expect(news).toEqual(jasmine.objectContaining({"author":""}));
                        expect(news).toEqual(jasmine.objectContaining({"push_done_flg":false}));
                        expect(news).toEqual(jasmine.objectContaining({"push_time":"2016-12-27 20:53:00+0900"}));
                        expect(news).toEqual(jasmine.objectContaining({"release_flg":true}));
                        expect(Object.keys(news.attributes).length).toEqual(1);
                        expect(news.attributes).toEqual(jasmine.objectContaining({"tenant_name":"BaaS SDK テスト"}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getNews', function()

        describe('RKZClient.getNewsList', function() {
            describe('パラメータ: limit', function() {
                it('= undefined の場合、全件数取得となること', function(done) {
                    var limit;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、全件数取得となること', function(done) {
                    var limit = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Numberの場合、エラーになること', function(done) {
                    var limit = "1";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of limit is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: limit', function()
            describe('パラメータ: searchConditions', function() {
                it('= undefinedの場合、条件未指定と同じように検索できること', function(done) {
                    var limit = 2;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.asc("news_id"),
                    ];
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(datas[0].tenant_id).toBeDefined();
                            expect(datas[0]).toEqual(jasmine.objectContaining({"news_id":"1"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"title":"テストニュース!"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"description":"テスト詳細"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"url":""}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"category_name":"通常"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"release_target_kbn_name":"管理者,利用者"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"rss_flg":false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"genre_name":""}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"category":"0001"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"use_push_flg":true}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"release_from_date":"2016-09-30 22:56:00+0900"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"release_end_date":"2117-09-30 22:56:00+0900"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"date":"2016-09-30 00:00:00+0900"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"release_target_kbn":"0001,0002"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"genre":""}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"photo":""}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"author":""}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"push_done_flg":false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"push_time":"2016-12-27 20:53:00+0900"}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({"release_flg":true}));
                            expect(Object.keys(datas[0].attributes).length).toEqual(1);
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({"tenant_name":"BaaS SDK テスト"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({news_id: "2"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var limit = 2;
                    var searchConditions = "NG";
                    var sortConditions = [];
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: searchConditions', function()
            describe('パラメータ: sortConditions', function() {
                it('= undefinedの場合、条件未指定と同じように検索できること', function(done) {
                    var limit = 2;
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "3"),
                    ];
                    var sortConditions;
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(1);
                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "3"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var limit = 2;
                    var searchConditions = [];
                    var sortConditions = "NG";
                    RKZClient.getNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: sortConditions', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var limit = 2;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "4"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({news_id: "3"}));
                        done();
                    }, function(error) {
                        expect(true).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getNewsList', function()

        describe('RKZClient.getReleasedNewsList', function() {
            describe('パラメータ: limit', function() {
                it('= undefined の場合、全件数取得となること', function(done) {
                    var limit;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(3);
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、全件数取得となること', function(done) {
                    var limit = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(3);
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Numberの場合、エラーになること', function(done) {
                    var limit = "1";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of limit is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: limit', function()
            describe('パラメータ: searchConditions', function() {
                it('= undefinedの場合、条件未指定と同じように検索できること', function(done) {
                    var limit = 2;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.asc("news_id"),
                    ];
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({news_id: "3"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var limit = 2;
                    var searchConditions = "NG";
                    var sortConditions = [];
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: searchConditions', function()
            describe('パラメータ: sortConditions', function() {
                it('= undefinedの場合、条件未指定と同じように検索できること', function(done) {
                    var limit = 2;
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "3"),
                    ];
                    var sortConditions;
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(1);
                            expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "3"}));
                            done();
                        }, function(error) {
                            expect(true).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var limit = 2;
                    var searchConditions = [];
                    var sortConditions = "NG";
                    RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                        function(datas) {
                            expect(true).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ: sortConditions', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var limit = 2;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(2);
                        expect(datas[0]).toEqual(jasmine.objectContaining({news_id: "4"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({news_id: "3"}));
                        done();
                    }, function(error) {
                        expect(true).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getReleasedNewsList', function()

        describe('RKZClient.registNewsReadHistory', function() {
            describe('パラメータ:params', function() {
                it('=undefinedの場合、エラーになること', function(done) {
                    var params;
                    RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                        function(status) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('!=Objectの場合、エラーになること', function(done) {
                    var params = "NG";
                    RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                        function(status) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                describe('.news_id', function() {
                    it('= undefinedの場合、エラーになること', function(done) {
                        var params = { tenant_id: "20002" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                    it('!= Stringの場合、エラーになること', function(done) {
                        var params = { news_id: {status:"NG"}, tenant_id: "20002" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                });  // end of describe('.news_id', function()
                describe('.tenant_id', function() {
                    it('= undefinedの場合、正常に登録できること', function(done) {
                        var params = { news_id: "1" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!= Stringの場合、エラーになること', function(done) {
                        var params = { news_id: "1", tenant_id: { status: "NG" } };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of params.tenant_id is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                });  // end of describe('.tenant_id', function()
                describe('.read_date', function() {
                    it('= undefinedの場合、デフォルト値で登録されること', function(done) {
                        var params = { news_id: "1" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= nullの場合、デフォルトで登録されること', function(done) {
                        var params = { news_id: "1", read_date: null };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('=== String(yyyy-MM-dd hh:mm:ss)の場合、日付として解釈して登録されること', function(done) {
                        var params = { news_id: "1", read_date: "2016-09-30 12:34:56" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, 30000);
                    it('=== String(yyyy-MM-dd hh:mm)の場合、日付として解釈して登録されること', function(done) {
                        var params = { news_id: "1", read_date: "2016-09-30 12:34" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, 30000);
                    it('=== String(yyyy-MM-dd)の場合、日付として解釈して登録されること', function(done) {
                        var params = { news_id: "1", read_date: "2016-09-30" };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, 30000);
                    it('=== Dateの場合、日付として解釈して登録されること', function(done) {
                        var params = { news_id: "1", read_date: new Date() };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(status).toBeDefined();
                                expect(status).toEqual("1001");
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, 30000);
                    it('!= String or != Dateの場合、エラーになること', function(done) {
                        var params = { news_id: "1", read_date: { status: "NG" } };
                        RKZClient.registNewsReadHistory(params, helper.userAccessToken,
                            function(status) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of params.read_date is not correct."}));
                                done();
                            })
                    }, TIMEOUT);
                });  // end of describe('.read_date', function()
            });  // end of describe('パラメータ:params', function()
            describe('パラメータ:userAccessToken', function() {
                it('= undefinedの場合、エラーになること', function(done) {
                    var params = { news_id: "1", tenant_id: "20002" };
                    var userAccessToken;
                    RKZClient.registNewsReadHistory(params, userAccessToken,
                        function(status) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
                it('!= Stringの場合、エラーになること', function(done) {
                    var params = { news_id: "1", tenant_id: "20002" };
                    var userAccessToken = { status: "NG" };
                    RKZClient.registNewsReadHistory(params, userAccessToken,
                        function(status) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        })
                }, TIMEOUT);
            });  // end of describe('パラメータ:params', function()
        });  // end of describe('RKZClient.registNewsReadHistory', function()

        describe('RKZClient.getNewsReadHistory', function() {
            describe('パラメータ:params', function() {
                it('=undefinedの場合、エラーになること', function(done) {
                    var params;
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==Objectの場合、エラーになること', function(done) {
                    var params = "NG";
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.news_id=undefinedの場合、エラーになること', function(done) {
                    var params = {};
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.news_id!==Stringの場合、エラーになること', function(done) {
                    var params = { news_id: 1 };
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.news_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.tenant_id=undefinedの場合、正常に検索できること', function(done) {
                    var params = { news_id: "1" };
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(Object.keys(news).length).toEqual(7);
                            expect(news).toEqual(jasmine.objectContaining({"news_id":"1"}));
                            expect(news).toEqual(jasmine.objectContaining({"read_flg":true}));
                            expect(news).toEqual(jasmine.objectContaining({"news_tenant_id":null}));
                            expect(news.read_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(news.sort_no).not.toBeNull();
                            expect(news).toEqual(jasmine.objectContaining({"not_use_flg":false}));
                            expect(news).toEqual(jasmine.objectContaining({ "attributes":{not_edit_flg: '0', not_delete_flg: '0'} }));
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('.tenant_id!==Stringの場合、エラーになること', function(done) {
                    var params = { news_id: "1", tenant_id: ["NG"] };
                    RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of params.tenant_id is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:params', function()
            describe('パラメータ:userAccessToken', function() {
                it('=undefinedの場合、エラーになること', function(done) {
                    var userAccessToken;
                    var params = { news_id: "1" };
                    RKZClient.getNewsReadHistory(params, userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==Stringの場合、エラーになること', function(done) {
                    var userAccessToken = { value: "NG" };
                    var params = { news_id: "1" };
                    RKZClient.getNewsReadHistory(params, userAccessToken,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            it('パラメータが正常の場合、正しく検索できること', function(done) {
                var params = { news_id: "1", tenant_id:"20002" };
                RKZClient.getNewsReadHistory(params, helper.userAccessToken,
                    function(news) {
                        expect(news).toBeDefined();
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getNewsReadHistory', function()

        describe('RKZClient.getNewsReadHistoryList', function() {
            describe('パラメータ:userAccessToken', function() {
                it('=undefinedの場合、エラーになること', function(done) {
                    var userAccessToken;
                    RKZClient.getNewsReadHistoryList(userAccessToken,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!==Stringの場合、エラーになること', function(done) {
                    var userAccessToken = { value: "NG" };
                    RKZClient.getNewsReadHistoryList(userAccessToken,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                RKZClient.getNewsReadHistoryList(helper.userAccessToken,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(7);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        }, TIMEOUT);
    });  // end of describe('Testing for news', function()
};
