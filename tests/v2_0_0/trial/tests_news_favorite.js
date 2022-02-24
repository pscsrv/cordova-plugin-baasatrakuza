var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for favorite news.', function() {

        describe('登録前', function() {
            describe('RKZClient.getNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getReleasedSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
        });   // end of 登録前

        describe('RKZClient.addNewsToFavorite', function() {
            describe('オブジェクトデータ', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var news;
                    RKZClient.addNewsToFavorite(
                        news,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of news is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('ユーザーアクセストークン', function() {
               it('=undefinedの場合、エラーとなること', function(done) {
                   var userAccessToken;
                   RKZClient.addNewsToFavorite(
                       {
                           'news_id': "1"
                       },
                       userAccessToken,
                       function(data) {
                           expect(false).toBeTruthy(); done();  // Failed
                       }, function(error) {
                           expect(error).toBeDefined();
                           expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                           expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                           done();
                       });
                }, TIMEOUT);
                it('.type!=Stringの場合、エラーとなること', function(done) {
                    var userAccessToken = 1234;
                    RKZClient.addNewsToFavorite(
                        {
                            'news_id': "1"
                        },
                        userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('正しく登録されること', function(done) {
                RKZClient.addNewsToFavorite(
                    {
                        'news_id': "1"
                    },
                    helper.userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });

        describe('登録後', function() {
            describe('RKZClient.getNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ有りで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toBeGreaterThan(0);
                            expect(news[0].is_favorite).toBeTruthy();
                            expect(news[0].favorite_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ有りで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toBeGreaterThan(0);
                            expect(news[0].is_favorite).toBeTruthy();
                            expect(news[0].favorite_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ有りで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toBeGreaterThan(0);
                            expect(news[0].is_favorite).toBeTruthy();
                            expect(news[0].favorite_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getReleasedSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ有りで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toBeGreaterThan(0);
                            expect(news[0].is_favorite).toBeTruthy();
                            expect(news[0].favorite_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
        });   // end of 登録後

        describe('RKZClient.deleteNewsFromFavorite', function() {
            describe('オブジェクトデータ', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var news;
                    RKZClient.deleteNewsFromFavorite(
                        news,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of news is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('ユーザーアクセストークン', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var userAccessToken;
                    RKZClient.deleteNewsFromFavorite(
                        {
                            'news_id': "1"
                        },
                        userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!=Stringの場合、エラーとなること', function(done) {
                    var userAccessToken = 1234;
                    RKZClient.deleteNewsFromFavorite(
                        {
                            'news_id': "1"
                        },
                        userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('正しく削除されること', function(done) {
                RKZClient.deleteNewsFromFavorite(
                    {
                        'news_id': "1"
                    },
                    helper.userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });

        describe('削除後', function() {
            describe('RKZClient.getNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "user_access_token": helper.userAccessToken,
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedNewsList(
                        2,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
            describe('RKZClient.getReleasedSegmentNewsList', function() {
                it('お知らせのお気に入りを入れる前は、お知らせ無しで返ってくること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal("news_id", "1")
                    ];
                    var sortConditions = [];
                    var extensionAttribute = {
                        "show_favorite": true,
                        "show_favorite_summary": true
                    };
                    RKZClient.getReleasedSegmentNewsList(
                        2,
                        helper.userAccessToken,
                        false,
                        searchConditions,
                        sortConditions,
                        extensionAttribute,
                        function(news) {
                            expect(news).toBeDefined();
                            expect(news.length).toEqual(1);
                            expect(Object.keys(news[0]).length).toEqual(29);
                            expect(news[0]).toEqual(jasmine.objectContaining({news_id: "1"}));
                            expect(news[0].favorite_count).toEqual(0);
                            expect(news[0].is_favorite).toBeFalsy();
                            expect(news[0].favorite_date).toEqual(null);
                            expect(news[0].readed_flg).toBeFalsy();
                            expect(news[0].readed_dte).toEqual(null);
                            done();
                        },
                        function(error) {
                            // Failed
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();
                        });
                }, TIMEOUT);
            });
        });   // end of 削除後
    });
};

