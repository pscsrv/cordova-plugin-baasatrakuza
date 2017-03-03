var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for generic Data', function() {
        describe('RKZClient.getData', function() {
            it('オブジェクトID=undefinedの場合、エラーとなること', function(done) {
                var objectId;
                var code = "";
                RKZClient.getData(objectId, code,
                    function(data) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('コード=undefinedの場合、エラーとなること', function(done) {
                var objectId = "";
                var code;
                RKZClient.getData(objectId, code,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('オブジェクトID!==Stringの場合、エラーとなること', function(done) {
                var objectId = { objectId: "NG" };
                var code = "";
                RKZClient.getData(objectId, code,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('コード!==Stringの場合、エラーとなること', function(done) {
                var objectId = "";
                var code = { code: "NG" };
                RKZClient.getData(objectId, code,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "beacon";
                var code = "0001";
                RKZClient.getData(objectId, code,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(Object.keys(data).length).toEqual(7);
                        expect(data).toEqual(jasmine.objectContaining({object_id: 'beacon'}));
                        expect(data).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(data).toEqual(jasmine.objectContaining({name: '301'}));
                        expect(data).toEqual(jasmine.objectContaining({short_name: '場所A'}));
                        expect(data).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(data).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(data).toEqual(jasmine.objectContaining({attributes: {not_delete_flg: '0', major: '', minor: '', not_edit_flg: '0', beacon_id: 'FD064A00300C', beacon_type_cd_name: 'BULETUS', beacon_type_cd: '0002' } }));
                        done();
                    }, function(error) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    });
            }, TIMEOUT);

            it('オブジェクトIDが空の場合、エラーが返ってくること', function(done) {
                var objectId = "";
                var code = "";
                RKZClient.getData(objectId, code,
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
        });  // end of 汎用テーブルを単件検索する場合

        describe('RKZClient.getDataList', function() {
            it('オブジェクトID=undefinedの場合、エラーとなること', function(done) {
                var objectId;
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var objectId = "beacon";
                var searchConditions;
                var sortConditions = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(6);
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({code: "0007"}));
                        expect(datas[2]).toEqual(jasmine.objectContaining({code: "0006"}));
                        expect(datas[3]).toEqual(jasmine.objectContaining({code: "0005"}));
                        expect(datas[4]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(datas[5]).toEqual(jasmine.objectContaining({code: "0001"}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('ソート条件=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var objectId = "beacon";
                var searchConditions = [];
                var sortConditions;
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(6);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);

            it('オブジェクトID!==Stringの場合、エラーとなること', function(done) {
                var objectId = { objectId: "NG" };
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var objectId = "";
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
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
                var objectId = "";
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
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
                var objectId = "beacon";
                var searchConditions = [
                    RKZSearchCondition.equal("name", "DB000301"),
                ];
                var sortConditions = [];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
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

            it('オブジェクトIDが空の場合、エラーが返ってくること', function(done) {
                var objectId = "";
                var searchConditions = [
                    RKZSearchCondition.equal("name", "DB000301"),
                ];
                var sortConditions = [];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
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
        });  // end of 汎用テーブルを複数検索する場合

        describe('RKZClient.addData', function() {
            it('追加データ=undefinedの場合エラーとなること', function(done) {
                var data;
                RKZClient.addData(data,
                    function(statusCode) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('追加データ!==Objectの場合エラーとなること', function(done) {
                var data = "String";
                RKZClient.addData(data,
                    function(statusCode) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            describe('正常な値の登録の場合', function() {
                it('正常な値の場合、正しく登録されること', function(done) {
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
                            expect(statusCode).toBeDefined();
                            expect(statusCode).toEqual("1001");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);

                afterEach(function(done) {
                    var objectId = "delete_master";
                    var searchConditions = [
                        RKZSearchCondition.equal("name", "CORDOVA_PLUGIN_TEST_OBJECT")
                    ];
                    var sortConditions = [];
                    RKZClient.getDataList(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas.length).toEqual(1);
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({attributes_value: "新規"}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({attributes_date: "2017-01-01 00:00:00"}));
                            done();
                        }, function(error) {
                            done();
                        });
                }, TIMEOUT);
            });

            it('必須項目が未指定の場合、エラーが返ってくること', function(done) {
                var data = {
                    'name' : 'CORDOVA_PLUGIN_TEST_OBJECT',
                };
                RKZClient.addData(data,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                        done();
                    });
            }, TIMEOUT);
        });  // end of 汎用テーブルにデータを追加する場合

        describe('RKZClient.editData', function() {
            it('data=undefinedの場合、エラーになること', function(done) {
                var data;
                RKZClient.editData(data,
                    function(statusCode) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            it('data!==Objectの場合、エラーになること', function(done) {
                var data = "String";
                RKZClient.editData(data,
                    function(statusCode) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of data is not correct."}));
                        done();
                    });
            }, TIMEOUT);

            describe('正しいdataを指定した場合', function() {
                var _data = null;
                beforeEach(function(done) {
                    var objectId = "delete_master";
                    var searchConditions = [
                        RKZSearchCondition.equal("name", "CORDOVA_PLUGIN_TEST_OBJECT")
                    ];
                    var sortConditions = [];
                    RKZClient.getDataList(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas.length).toEqual(1);
                            _data = datas[0];
                            done();
                        }, function(error) {
                            done();
                        });
                }, TIMEOUT);

                it('正しく更新されること', function(done) {
                    _data.short_name = "Short name.";
                    _data.attributes = {
                        "attributes_value" : "修正",
                        "attributes_date" : "2017-03-01 12:34:56"
                    };

                    RKZClient.editData(_data,
                        function(statusCode) {
                            expect(statusCode).toBeDefined();
                            expect(statusCode).toEqual("1001");
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);

                it('data.object_idが空の場合、エラーが返ってくること', function(done) {
                    _data.object_id = null;
                    RKZClient.editData(_data,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                            if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                            else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                            done();
                        });
                }, TIMEOUT);

                afterEach(function(done) {
                    var objectId = "delete_master";
                    var searchConditions = [
                        RKZSearchCondition.equal("name", "CORDOVA_PLUGIN_TEST_OBJECT")
                    ];
                    var sortConditions = [];
                    RKZClient.getDataList(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas.length).toEqual(1);
                            expect(datas[0].short_name).toEqual("Short name.");
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({attributes_value: "修正"}));
                            expect(datas[0].attributes).toEqual(jasmine.objectContaining({attributes_date: "2017-03-01 12:34:56"}));
                            done();
                        }, function(error) {
                            done();
                        });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.deleteData', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var objectId;
                    var searchConditions = null;
                    RKZClient.deleteData(objectId, searchConditions,
                        function(deleteCount) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var objectId = { object_id: "NG" };
                    var searchConditions = null;
                    RKZClient.deleteData(objectId, searchConditions,
                        function(deleteCount) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:tableName', function()
            describe('パラメータ:searchConditions', function() {
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "delete_master";
                    var searchConditions = "1";
                    RKZClient.deleteData(objectId, searchConditions,
                        function(deleteCount) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });

            it('objectId = "" の場合、エラーが返ってくること', function(done) {
                RKZClient.deleteData("", null,
                    function(deleteCount) {
                        expect(false).toBeTruthy(); done();    // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "必須入力チェックエラー : オブジェクトIDの取得に失敗しました"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "オブジェクトIDがありません。"})); }
                        done();
                    });
            }, TIMEOUT);

            describe('条件指定削除', function() {
                describe('正しいコードを指定した場合', function() {
                    var _code = null;
                    beforeEach(function(done) {
                        var objectId = "delete_master";
                        var searchConditions = [
                            RKZSearchCondition.equal("name", "CORDOVA_PLUGIN_TEST_OBJECT")
                        ];
                        var sortConditions = [];
                        RKZClient.getDataList(objectId, searchConditions, sortConditions,
                            function(datas) {
                                expect(datas.length).toEqual(1);
                                _code = datas[0].code;
                                done();
                            }, function(error) {
                                done();
                            });
                    }, TIMEOUT);
                    it('正しく削除されること', function(done) {
                        var searchConditions = [
                            RKZSearchCondition.equal("code", _code)
                        ];
                        RKZClient.deleteData("delete_master", searchConditions,
                            function(deleteCount) {
                                expect(deleteCount).toBeDefined();
                                expect(deleteCount).toEqual(1);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();    // Failed
                            });
                    }, TIMEOUT);
                });  // end of describe('正しいコードを指定した場合', function()
            });  // end of describe('条件指定削除', function()

            describe('全件削除', function() {
                describe('削除処理', function() {
                    beforeEach(function(done) {
                        var count = {
                            num: 10,
                            sub: function() {
                                this.num--;
                            },
                        };
                        var name = "CORDOVA_PLUGIN_TEST_DATA";
                        var data = {
                            'object_id' : 'delete_master',
                            'short_name' : 'short_name',
                            'sort_no' : 10,
                            'updated_at' : '2016-09-30 10:36',
                        };
                        for (var i = 1; i <= 10; i++) {
                            data.name = name + i;
                            RKZClient.addData(data,
                                function(statusCode) {
                                    count.sub();
                                }, function(error) {
                                    expect(false).toBeTruthy();    // Failed
                                });
                        }
                        setTimeout(function() {
                            done();
                        }, 20000);
                    }, TIMEOUT);
                    it('正しく削除されること', function(done) {
                        var searchConditions = [];
                        RKZClient.deleteData("delete_master", searchConditions,
                            function(deleteCount) {
                                expect(deleteCount).toBeDefined();
                                expect(deleteCount).toEqual(10);
                                done();
                            }, function(error) {
                                expect(false).toBeTruthy(); done();    // Failed
                            });
                    }, TIMEOUT);
                });
                it('削除された後、データオブジェクトにはデータが存在しないこと', function(done) {
                    var objectId = "delete_master";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataList(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(0);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            }); // end of describe('全件削除', function()
        });  // end of describe('RKZClient.deleteData', function()
    });  // end of 汎用テーブル関連API
};
