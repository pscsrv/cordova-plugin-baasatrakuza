var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for read news', function() {
        describe('RKZClient.getNewsList', function() {
            it('readNewsを呼び出す前は未読であること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.readedNews.all()
                ];
                var sortConditions = [
                    RKZSortCondition.asc("news_id"),
                ];
                RKZClient.getNewsList(
                    2,
                    searchConditions,
                    sortConditions,
                    {
                        "user_access_token": helper.userAccessToken
                    },
                    function(news) {
                        expect(news).toBeDefined();
                        expect(news.length).toEqual(2);
                        expect(Object.keys(news[0]).length).toEqual(29);
                        expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                        expect(news[0].readed_flg).toBeFalsy();
                        expect(news[0].readed_dte).toBeNull();
                        done();
                    },
                    function(error) {
                        // Failed
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });   // end of RKZClient.getNewsList

        describe('RKZClient.readNews', function() {
            it('正しく登録できること', function(done) {
                RKZClient.readNews(
                    {
                        news_id: "1"
                    },
                    helper.userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    },
                    function(error) {
                        // Failed
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });   // end of RKZClient.readNews

        describe('RKZClient.getNewsList', function() {
            describe('extensionAttribute', function() {
                it('==undefinedの場合、エラーになること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.readedNews.all()
                    ];
                    var sortConditions = [
                        RKZSortCondition.asc("news_id"),
                    ];
                    var extensionAttribute;
                    RKZClient.getNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!==Objectの場合、エラーになること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.readedNews.all()
                    ];
                    var sortConditions = [
                        RKZSortCondition.asc("news_id"),
                    ];
                    var extensionAttribute = 1234;
                    RKZClient.getNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('user_access_token', function() {
                    it('.type!==Stringの場合、エラーになること', function(done) {
                        var searchConditions = [
                            RKZSearchCondition.readedNews.all()
                        ];
                        var sortConditions = [
                            RKZSortCondition.asc("news_id"),
                        ];
                        var extensionAttribute = {
                            "user_access_token": 1234
                        };
                        RKZClient.getNewsList(
                            2,
                            searchConditions,
                            sortConditions,
                            extensionAttribute,
                            function(news) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.user_access_token is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
            });

            it('readNewsを呼び出した後は既読であること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.readedNews.all()
                ];
                var sortConditions = [
                    RKZSortCondition.asc("news_id"),
                ];
                RKZClient.getNewsList(
                    2,
                    searchConditions,
                    sortConditions,
                    {
                        "user_access_token": helper.userAccessToken
                    },
                    function(news) {
                        expect(news).toBeDefined();
                        expect(news.length).toEqual(2);
                        expect(Object.keys(news[0]).length).toEqual(29);
                        expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                        expect(news[0].readed_flg).toBeTruthy();
                        expect(news[0].readed_dte).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        done();
                    },
                    function(error) {
                        // Failed
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);

            it('既読のお知らせのみ取得できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.readedNews.alreadyRead()
                ];
                var sortConditions = [
                    RKZSortCondition.asc("news_id"),
                ];
                RKZClient.getNewsList(
                  null,
                  searchConditions,
                  sortConditions,
                  {
                      "user_access_token": helper.userAccessToken
                  },
                  function(news) {
                      expect(news).toBeDefined();
                      expect(news.length).toEqual(1);
                      expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                      expect(news[0].readed_flg).toBeTruthy();
                      expect(news[0].readed_dte).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                      done();
                  },
                  function(error) {
                      // Failed
                      console.log( window.JSON.stringify(error) );
                      expect(false).toBeTruthy(); done();
                  });
            }, TIMEOUT);

            it('未読のお知らせのみ取得できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.readedNews.nonread()
                ];
                var sortConditions = [
                    RKZSortCondition.asc("news_id"),
                ];
                RKZClient.getNewsList(
                  null,
                  searchConditions,
                  sortConditions,
                  {
                      "user_access_token": helper.userAccessToken
                  },
                  function(news) {
                      expect(news).toBeDefined();
                      expect(news.length).toEqual(3);

                      expect(news[0]).toEqual(jasmine.objectContaining({news_id: "2"}));
                      expect(news[0].readed_flg).toBeFalsy();
                      expect(news[0].readed_dte).toBeNull();

                      expect(news[1]).toEqual(jasmine.objectContaining({news_id: "3"}));
                      expect(news[1].readed_flg).toBeFalsy();
                      expect(news[1].readed_dte).toBeNull();

                      expect(news[2]).toEqual(jasmine.objectContaining({news_id: "4"}));
                      expect(news[2].readed_flg).toBeFalsy();
                      expect(news[2].readed_dte).toBeNull();

                      done();
                  },
                  function(error) {
                      // Failed
                      console.log( window.JSON.stringify(error) );
                      expect(false).toBeTruthy(); done();
                  });
            }, TIMEOUT);
        });   // end of RKZClient.getNewsList
    });
};

