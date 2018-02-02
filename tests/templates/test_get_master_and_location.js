//
// 位置情報付きオブジェクトデータ抽出
//      お知らせのセグメント配信は、管理者機能にて特定のユーザーに対して送信する必要があるため
//      自動テストでは組みづらい事情がある。
//      が、各項目が正しいかなどのチェックは必要のため、テンプレートとして実行できる状態にはしておく。
//      テストを実行する場合は、このテンプレートを個別に呼び出すこと。
//
//      呼び出し方
//          とりあえず tests.jsの exports.defineAutoTests = function () 部分に、
//          description('BaaS@Rakuza for Cordova 結合テスト - Get master and location');
//          をコピりましょう。
//          ※ 他のテストケースはコメント化しておく方が望ましい。
//
//      Unittestの接続先のテナントでテストデータを事前に準備しておけば、このテストはAutotestに組み込んでもOK。
//
var TIMEOUT = 30000;
var LICENSE_KEY = "{You.have.an.authentication_id}";
var USER_ACCESS_TOKEN = "JFAkQnEzVExMZ1VwbVN6ZU53M3BOWHpOSlRNQS5tdFpMLg--";

exports.suite = function(helper) {

    describe('BaaS@Rakuza for Cordova 結合テスト - Get master and location', function() {

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

        describe('RKZClient.getDataWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var code = "";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = null;
                    var code = "";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーとなること', function(done) {
                    var objectId = 1;
                    var code = "";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= "" の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var code = "";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            // Failed
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                            done();
                        });
                }, TIMEOUT);
            });   // end of パラメータ:objectId
            describe('パラメータ:code', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var code;
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var code = null;
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var code = 1;
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:code
            describe('パラメータ:location', function() {
                it('= undefined の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var code = "1";
                    var location;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var code = "9999";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var code = "1";
                    var location = 1;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of location is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.latitude', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            latitude : null
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var code = "1";
                        var location = {
                            latitude : "134"
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.latitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('緯度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            latitude : 34.601695
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.longitude = null の場合、未指定で検索されること', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            longitude : null
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var code = "1";
                        var location = {
                            longitude : "134"
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.longitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('経度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            longitude : 133.765923
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.range = null の場合、未指定で検索されること', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            range : null
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                                done();
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var code = "1";
                        var location = {
                            range : "134"
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.range is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('距離のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var code = "9999";
                        var location = {
                            range : 100
                        };
                        var spotFieldName = null;
                        RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
            });
            describe('パラメータ:spotFieldName', function() {
                it('= null の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var code = "9999";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
                it('= undefined の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var code = "9999";
                    var location = null;
                    var spotFieldName;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var code = "9999";
                    var location = null;
                    var spotFieldName = null;
                    RKZClient.getDataWithLocation(objectId, code, location, spotFieldName,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
                it('未指定でも検索できること', function(done) {
                    var objectId = "location_test";
                    var code = "9999";
                    var location = null;
                    RKZClient.getDataWithLocation(objectId, code, location,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                            done();
                        });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getDataListWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = null;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーとなること', function(done) {
                    var objectId = 1;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= "" の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            // Failed
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                            done();
                        });
                }, TIMEOUT);
            });   // end of パラメータ:objectId
            describe('パラメータ:location', function() {
                it('= undefined の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var location;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var location = 1;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of location is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.latitude', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            latitude : null
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            latitude : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.latitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('緯度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            latitude : 34.601695
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.longitude = null の場合、未指定で検索されること', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            longitude : null
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            longitude : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.longitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('経度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            longitude : 133.765923
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.range = null の場合、未指定で検索されること', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            range : null
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas).toBeDefined();
                                expect(datas.length).toEqual(5);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            range : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.range is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('距離のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var location = {
                            range : 100
                        };
                        var spotFieldName = null;
                        var searchConditions = null;
                        var sortConditions = null;
                        RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                            function(datas) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                it('緯度経度を指定した場合、正常に検索できること', function(done) {
                    var objectId = "location_test";
                    var location = {
                        latitude : 34.601695,
                        longitude : 133.765923
                    };
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            expect(datas[0].code).toEqual("0001");
                            expect(datas[1].code).toEqual("0004");
                            expect(datas[2].code).toEqual("0003");
                            expect(datas[3].code).toEqual("0002");
                            expect(datas[4].code).toEqual("0005");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('緯度経度＋距離を指定した場合、正常に検索できること', function(done) {
                    var objectId = "location_test";
                    var location = {
                        latitude : 34.601695,
                        longitude : 133.765923,
                        range: 0.1
                    };
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0].code).toEqual("0001");
                            expect(datas[1].code).toEqual("0004");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:spotFieldName', function() {
                it('= null の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= undefined の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var spotFieldName;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var spotFieldName = 1;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of spotFieldName is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('未指定でも検索できること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('項目を指定した場合、その項目で検索すること', function(done) {
                    var objectId = "location_test";
                    var location = {
                        latitude : 34.601695,
                        longitude : 133.765923
                    };
                    var spotFieldName = "spot2";
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0].code).toEqual("0004");
                            expect(datas[1].code).toEqual("0005");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:searchConditions
            describe('パラメータ:sortConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(5);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var location = null;
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:sortConditions
        });

        describe('RKZClient.getPaginateDataListWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var limit;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = null;
                    var limit;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーとなること', function(done) {
                    var objectId = 1;
                    var limit;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= "" の場合、エラーとなること', function(done) {
                    var objectId = "";
                    var limit = 100;
                    var offset = 1;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            // Failed
                            expect(false).toBeTruthy(); done();
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                            done();
                        });
                }, TIMEOUT);
            });   // end of パラメータ:objectId
            describe('パラメータ:limit', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of limit is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = null;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of limit is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== Number の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = "1";
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of limit is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:limit
            describe('パラメータ:offset', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of offset is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = null;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of offset is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== Number の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = "2";
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of offset is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:offset
            describe('パラメータ:location', function() {
                it('= undefined の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、未指定として検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーとなること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = 1;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of location is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.latitude', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            latitude : null
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            latitude : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.latitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('緯度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            latitude : 34.601695
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.longitude = null の場合、未指定で検索されること', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            longitude : null
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            longitude : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.longitude is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('経度のみ指定した場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            longitude : 133.765923
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                describe('.range', function() {
                    it('= null の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            range : null
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('= undefined の場合、未指定で検索されること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(response) {
                                expect(response).toBeDefined();
                                expect(response.datas.length).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();  // Failed
                            });
                    }, TIMEOUT);
                    it('!== Number の場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            range : "134"
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of location.range is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('距離のみ指定した場合、エラーになること', function(done) {
                        var objectId = "location_test";
                        var limit = 1;
                        var offset = 2;
                        var location = {
                            range : 100
                        };
                        var spotFieldName = null;
                        var searchConditions = [];
                        var sortConditions = [];
                        RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                            function(data) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "2001"}));
                                done();
                            });
                    }, TIMEOUT);
                });
                it('緯度経度を指定した場合、正常に検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 0;
                    var location = {
                        latitude : 34.601695,
                        longitude : 133.765923
                    };
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('緯度経度＋距離を指定した場合、正常に検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 0;
                    var location = {
                        latitude : 34.601695,
                        longitude : 133.765923,
                        range: 0.1
                    };
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:spotFieldName', function() {
                it('= null の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var spotFieldName = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= undefined の場合、未指定で検索されること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var spotFieldName;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var spotFieldName = 1;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of spotFieldName is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('未指定でも検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var searchConditions = null;
                    var sortConditions = null;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('正常値を指定した場合、正常に検索できること', function(done) {
                    var objectId = "location_test";
                    var limit = 2;
                    var offset = 0;
                    var location = null;
                    var searchConditions = [
                        RKZSearchCondition.equal("code", "0001")
                    ];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            expect(response.datas[0].code).toEqual("0001");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
            });  // end of パラメータ:searchConditions
            describe('パラメータ:sortConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "location_test";
                    var limit = 1;
                    var offset = 2;
                    var location = null;
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, location, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:sortConditions
        });
    });

};
