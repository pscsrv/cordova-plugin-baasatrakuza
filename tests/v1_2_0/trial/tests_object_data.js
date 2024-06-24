var TIMEOUT = 30000;

exports.suite = function(helper) {

    var _objectData = null;

    describe('Testing for favorite object.', function() {
        describe('RKZClient.getDataList', function() {
            it('extensionAttribute未指定の場合、今までのgetDataListで動くこと', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(
                    objectId,
                    searchCondition,
                    sortCondition,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(6);
                        expect(data[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data[5]).toEqual(jasmine.objectContaining({code: "0001"}));

                        // 検索結果にお気に入り情報が含まれないこと
                        expect(data[0].sys_favorite).toBeFalsy();

                        // 以降の処理でお気に入り登録するので保持
                        _objectData = data[0];

                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);
        });  // end of RKZClient.getDataList

        describe('RKZClient.getPaginateDataList', function() {
            it('extensionAttribute未指定の場合、今までのgetDataListで動くこと', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getPaginateDataList(
                    objectId,
                    2,
                    0,
                    searchCondition,
                    sortCondition,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.datas.length).toEqual(2);
                        expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data.datas[1]).toEqual(jasmine.objectContaining({code: "0007"}));

                        // 検索結果にお気に入り情報が含まれないこと
                        expect(data.datas[0].sys_favorite).toBeFalsy();

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);
        });   // end of RKZClient.getPaginateDataList

        describe('RKZClient.addObjectDataToFavorite', function() {
            describe('オブジェクトデータ', function() {
                it('==undefinedの場合、エラーとなること', function(done) {
                    var objectData;
                    RKZClient.addObjectDataToFavorite(
                        objectData,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('==nullの場合、エラーとなること', function(done) {
                    var objectData = null;
                    RKZClient.addObjectDataToFavorite(
                        objectData,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!==Objectの場合、エラーとなること', function(done) {
                    var objectData = 1234;
                    RKZClient.addObjectDataToFavorite(
                        objectData,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('ユーザーアクセストークン', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var userAccessToken;
                    RKZClient.addObjectDataToFavorite(
                        _objectData,
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
                    RKZClient.addObjectDataToFavorite(
                        _objectData,
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
                RKZClient.addObjectDataToFavorite(
                    _objectData,
                    helper.userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            });
            it('登録日の並び替え用に別のマスタをお気に入り登録する。', function(done) {
                var intervalId = setInterval(function() {
                    RKZClient.addObjectDataToFavorite(
                        {
                            object_id: 'beacon',
                            code: '0003'
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
                    clearInterval(intervalId);
                }, (60 * 1000));
            }, ((60 + 30) * 1000));
        });  // end of RKZClient.addObjectDataToFavorite

        describe('RKZClient.getDataList', function() {
            describe('extensionAttrribute', function() {
                it('==undefineの場合、エラーになること', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    var extensionAttribute;
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        extensionAttribute,
                        function(data) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!==Objectの場合、エラーになること', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    var extensionAttribute = 1234;
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        extensionAttribute,
                        function(data) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.user_access_token', function() {
                    it('.type!==Stringの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            user_access_token: 1234
                        };
                        RKZClient.getDataList(
                            objectId,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.user_access_token is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.show_favorite', function() {
                    it('.type!==Booleanの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            show_favorite: 1234
                        };
                        RKZClient.getDataList(
                            objectId,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.show_favorite is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.show_favorite_summary', function() {
                    it('.type!==Booleanの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            show_favorite_summary: 1234
                        };
                        RKZClient.getDataList(
                            objectId,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.show_favorite_summary is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
            });
            it('extensionAttribute.show_favoriteを指定すると、お気に入り情報が返ってくること', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(
                    objectId,
                    searchCondition,
                    sortCondition,
                    {
                        'show_favorite': true,
                        'user_access_token': helper.userAccessToken
                    },
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(6);
                        expect(data[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data[5]).toEqual(jasmine.objectContaining({code: "0001"}));

                        // 検索結果にお気に入り情報が含まれること
                        expect(data[0].sys_favorite).toBeTruthy();
                        expect(data[0].sys_favorite["is_favorite"]).toBeTruthy();
                        expect(data[0].sys_favorite["favorite_date"]).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(data[0].sys_favorite_sum).toBeFalsy();
                        // お気に入りしていない情報はお気に入りになってないこと
                        expect(data[5].sys_favorite).toBeTruthy();
                        expect(data[5].sys_favorite["is_favorite"]).toBeFalsy();
                        expect(data[5].sys_favorite["favorite_date"]).toEqual(null);
                        expect(data[5].sys_favorite_sum).toBeFalsy();

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('extensionAttribute.show_favorite_summaryを指定すると、お気に入り集計情報が返ってくること', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(
                    objectId,
                    searchCondition,
                    sortCondition,
                    {
                        'show_favorite_summary': true
                    },
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(6);
                        expect(data[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data[5]).toEqual(jasmine.objectContaining({code: "0001"}));

                        // 検索結果にお気に入り情報が含まれること
                        expect(data[0].sys_favorite).toBeFalsy();
                        expect(data[0].sys_favorite_sum).toBeTruthy();
                        expect(data[0].sys_favorite_sum["favorite_count"]).toBeGreaterThan(0);
                        // お気に入りしていない情報はお気に入りになってないこと
                        expect(data[5].sys_favorite).toBeFalsy();
                        expect(data[5].sys_favorite_sum).toBeTruthy();
                        expect(data[5].sys_favorite_sum["favorite_count"]).toEqual(0);

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            describe('お気に入り情報での検索', function() {
                it('お気に入りのみ取得', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.myFavoriteOnly()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(2);
                            expect(data[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);

                it('お気に入り以外の取得', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.notMyFavorite()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(4);
                            expect(data[0]).toEqual(jasmine.objectContaining({code: "0007"}));
                            expect(data[3]).toEqual(jasmine.objectContaining({code: "0001"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);

                it('お気に入り全部', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.all()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(6);
                            expect(data[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                            expect(data[5]).toEqual(jasmine.objectContaining({code: "0001"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
            });   // end of お気に入り情報での検索

            describe('お気に入り情報での並び替え', function() {
                it('お気に入り件数で並び替えを行うと、正しく取得できること', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [];
                    var sortCondition = [
                        RKZSortCondition.withFavorite.favoriteCount.desc(),
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataList(
                        objectId,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken,
                            'show_favorite_summary': true
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(6);
                            expect(data[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                            expect(data[5]).toEqual(jasmine.objectContaining({code: "0001"}));

                            // 検索結果にお気に入り情報が含まれること
                            expect(data[0].sys_favorite).toBeTruthy();
                            expect(data[0].sys_favorite["is_favorite"]).toBeTruthy();
                            expect(data[0].sys_favorite["favorite_date"]).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(data[0].sys_favorite_sum).toBeTruthy();
                            expect(data[0].sys_favorite_sum["favorite_count"]).toBeGreaterThan(0);

                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                    }, TIMEOUT);
                    it('お気に入り登録日で並び替えを行うと、正しく取得できること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.withFavorite.updateDate.desc(),
                            RKZSortCondition.desc("code")
                        ];
                        RKZClient.getDataList(
                            objectId,
                            searchCondition,
                            sortCondition,
                            {
                                'show_favorite': true,
                                'user_access_token': helper.userAccessToken,
                                'show_favorite_summary': true
                            },
                            function(data) {
                                expect(data).toBeDefined();
                                expect(data.length).toEqual(6);
                                expect(data[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                                expect(data[1]).toEqual(jasmine.objectContaining({code: "0008"}));

                                // 検索結果にお気に入り情報が含まれること
                                expect(data[0].sys_favorite).toBeTruthy();
                                expect(data[0].sys_favorite["is_favorite"]).toBeTruthy();
                                expect(data[0].sys_favorite["favorite_date"]).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                                expect(data[0].sys_favorite_sum).toBeTruthy();
                                expect(data[0].sys_favorite_sum["favorite_count"]).toBeGreaterThan(0);

                                done();
                            }, function(error) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            });
                        }, TIMEOUT);
                });
        });  // end of RKZClient.getDataList

        describe('RKZClient.getPaginateDataList', function() {
            describe('extensionAttrribute', function() {
                it('==undefineの場合、エラーになること', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    var extensionAttribute;
                    RKZClient.getPaginateDataList(
                        objectId,
                        2,
                        0,
                        searchCondition,
                        sortCondition,
                        extensionAttribute,
                        function(data) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!==Objectの場合、エラーになること', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    var extensionAttribute = 1234;
                    RKZClient.getPaginateDataList(
                        objectId,
                        2,
                        0,
                        searchCondition,
                        sortCondition,
                        extensionAttribute,
                        function(data) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.user_access_token', function() {
                    it('.type!==Stringの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            user_access_token: 1234
                        };
                        RKZClient.getPaginateDataList(
                            objectId,
                            2,
                            0,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.user_access_token is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.show_favorite', function() {
                    it('.type!==Booleanの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            show_favorite: 1234
                        };
                        RKZClient.getPaginateDataList(
                            objectId,
                            2,
                            0,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.show_favorite is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.show_favorite_summary', function() {
                    it('.type!==Booleanの場合、エラーになること', function(done) {
                        var objectId = 'beacon';
                        var searchCondition = [];
                        var sortCondition = [
                            RKZSortCondition.desc("code")
                        ];
                        var extensionAttribute = {
                            show_favorite_summary: 1234
                        };
                        RKZClient.getPaginateDataList(
                            objectId,
                            2,
                            0,
                            searchCondition,
                            sortCondition,
                            extensionAttribute,
                            function(data) {
                                console.log( window.JSON.stringify(error) );
                                expect(false).toBeTruthy(); done();    // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of extensionAttributes.show_favorite_summary is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });
            });

            it('extensionAttribute.show_favoriteを指定すると、お気に入り情報が返ってくること', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getPaginateDataList(
                    objectId,
                    2,
                    0,
                    searchCondition,
                    sortCondition,
                    {
                        'show_favorite': true,
                        'user_access_token': helper.userAccessToken
                    },
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.datas.length).toEqual(2);
                        expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data.datas[1]).toEqual(jasmine.objectContaining({code: "0007"}));

                        // 検索結果にお気に入り情報が含まれること
                        expect(data.datas[0].sys_favorite).toBeTruthy();
                        expect(data.datas[0].sys_favorite["is_favorite"]).toBeTruthy();
                        expect(data.datas[0].sys_favorite["favorite_date"]).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(data.datas[0].sys_favorite_sum).toBeFalsy();
                        // お気に入りしていない情報はお気に入りになってないこと
                        expect(data.datas[1].sys_favorite).toBeTruthy();
                        expect(data.datas[1].sys_favorite["is_favorite"]).toBeFalsy();
                        expect(data.datas[1].sys_favorite["favorite_date"]).toEqual(null);
                        expect(data.datas[1].sys_favorite_sum).toBeFalsy();

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('extensionAttribute.show_favorite_summaryを指定すると、お気に入り集計情報が返ってくること', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getPaginateDataList(
                    objectId,
                    2,
                    0,
                    searchCondition,
                    sortCondition,
                    {
                        'show_favorite_summary': true
                    },
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.datas.length).toEqual(2);
                        expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(data.datas[1]).toEqual(jasmine.objectContaining({code: "0007"}));

                        // 検索結果にお気に入り情報が含まれること
                        expect(data.datas[0].sys_favorite).toBeFalsy();
                        expect(data.datas[0].sys_favorite_sum).toBeTruthy();
                        expect(data.datas[0].sys_favorite_sum["favorite_count"]).toBeGreaterThan(0);
                        // お気に入りしていない情報はお気に入りになってないこと
                        expect(data.datas[1].sys_favorite).toBeFalsy();
                        expect(data.datas[1].sys_favorite_sum).toBeTruthy();
                        expect(data.datas[1].sys_favorite_sum["favorite_count"]).toEqual(0);

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            describe('お気に入り情報での検索', function() {
                it('お気に入りのみ取得', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.myFavoriteOnly()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataList(
                        objectId,
                        2,
                        0,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.datas.length).toEqual(2);
                            expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);

                it('お気に入り以外の取得', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.notMyFavorite()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataList(
                        objectId,
                        2,
                        0,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.datas.length).toEqual(2);
                            expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0007"}));
                            expect(data.datas[1]).toEqual(jasmine.objectContaining({code: "0006"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);

                it('お気に入り全部', function(done) {
                    var objectId = 'beacon';
                    var searchCondition = [
                        RKZSearchCondition.withFavorite.all()
                    ];
                    var sortCondition = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataList(
                        objectId,
                        2,
                        0,
                        searchCondition,
                        sortCondition,
                        {
                            'show_favorite': true,
                            'user_access_token': helper.userAccessToken
                        },
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.datas.length).toEqual(2);
                            expect(data.datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                            expect(data.datas[1]).toEqual(jasmine.objectContaining({code: "0007"}));
                            done();
                        }, function(error) {
                            console.log( window.JSON.stringify(error) );
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
            });   // end of お気に入り情報での検索

        });   // end of RKZClient.getPaginateDataList

        describe('RKZClient.deleteObjectDataFromFavorite', function() {
            describe('オブジェクトデータ', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var objectData;
                    RKZClient.deleteObjectDataFromFavorite(
                        objectData,
                        helper.userAccessToken,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('=undefinedの場合、エラーとなること', function(done) {
                    var userAccessToken;
                    RKZClient.deleteObjectDataFromFavorite(
                        _objectData,
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
                    RKZClient.deleteObjectDataFromFavorite(
                        _objectData,
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
                RKZClient.deleteObjectDataFromFavorite(
                    _objectData,
                    helper.userAccessToken,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            });

            it('お気に入り削除後は、お気に入りフラグが消えていること', function(done) {
                var objectId = 'beacon';
                var searchCondition = [];
                var sortCondition = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(
                    objectId,
                    searchCondition,
                    sortCondition,
                    {
                        'show_favorite': true,
                        'user_access_token': helper.userAccessToken
                    },
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(6);

                        // 検索結果にお気に入り情報が含まれること
                        expect(data[0].sys_favorite).toBeTruthy();
                        expect(data[0].sys_favorite["is_favorite"]).toBeFalsy();
                        expect(data[0].sys_favorite["favorite_date"]).toEqual(null);
                        expect(data[0].sys_favorite_sum).toBeFalsy();

                        done();
                    }, function(error) {
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);
        });   // end of RKZClient.deleteObjectDataFromFavorite

        describe('RKZClient.getDataFromQRCode', function() {
            describe('QRコード', function() {
                it('=undefinedの場合エラーとなること', function(done) {
                    var qrCode;
                    RKZClient.getDataFromQRCode(
                        qrCode,
                        function(data) {
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of qrCode is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('.type!=Stringの場合エラーとなること', function(done) {
                    var qrCode = 1234;
                    RKZClient.getDataFromQRCode(
                        qrCode,
                        function(data) {
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of qrCode is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('正常に取得できること', function(done) {
                RKZClient.getDataFromQRCode(
                    "861bcae45558b0100f0d3471ce0e6c94,6de766e9f42f16a42a7bae63816f3d39,f0+k2H6qldZxSvWfcvnOiQnCaqhQJSJ/0DlHgsEIQ1D0y2j+URdcko4S/wut7Poo",
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data).toEqual(jasmine.objectContaining({object_id: 'qr_master'}));
                        expect(data).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(data).toEqual(jasmine.objectContaining({name: 'QRコード001'}));
                        expect(data).toEqual(jasmine.objectContaining({short_name: 'QRコード001'}));
                        done();
                    }, function(error) {
                        // Failed
                        console.log( window.JSON.stringify(error) );
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);
        });

    });  // end of Testing for generic Data
};

