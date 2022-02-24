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
                        expect(Object.keys(data).length).toEqual(11);
                        expect(data).toEqual(jasmine.objectContaining({object_id: 'beacon'}));
                        expect(data).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(data).toEqual(jasmine.objectContaining({name: '301'}));
                        expect(data).toEqual(jasmine.objectContaining({short_name: '場所A'}));
                        expect(data).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(data).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(data.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(data.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(data.attributes).toEqual(jasmine.objectContaining({beacon_id: 'FD064A00300C', major: '', beacon_type_cd_name: 'BLUETUS', minor: '', beacon_type_cd: '0002', not_delete_flg: '0', not_edit_flg: '0'} ));
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

            it('検索条件値=undefinedの場合、条件未指定と同じ結果が取得できること', function(done) {
                var objectId = 'spot';
                var searchConditions = [
                    RKZSearchCondition.likeOr('beacon', undefined)
                ];
                var sortConditions = [
                    RKZSortCondition.desc('code')
                ];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                  function(datas) {
                      expect(datas).toBeDefined();
                      expect(datas.length).toEqual(9);
                      done();
                  }, function(error) {
                      expect(false).toBeTruthy(); done();    // Failed
                  });
            }, TIMEOUT);

            it('検索条件値=nullの場合、条件未指定と同じ結果が取得できること', function(done) {
                var objectId = 'spot';
                var searchConditions = [
                    RKZSearchCondition.likeOr('beacon', null)
                ];
                var sortConditions = [
                    RKZSortCondition.desc('code')
                ];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                  function(datas) {
                      expect(datas).toBeDefined();
                      expect(datas.length).toEqual(9);
                      done();
                  }, function(error) {
                      expect(false).toBeTruthy(); done();    // Failed
                  });
            }, TIMEOUT);

            it('検索条件値(複数)!==Arrayの場合、エラーとなること', function(done) {
                var objectId = 'spot';
                var searchConditions = [
                    RKZSearchCondition.likeOr('beacon', '0005')
                ];
                var sortConditions = [
                    RKZSortCondition.desc('code')
                ];
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

            it('検索条件値(複数)===Arrayの場合、正常に検索できること', function(done) {
                var objectId = 'spot';
                var searchConditions = [
                    RKZSearchCondition.likeOr('beacon', ['0005'])
                ];
                var sortConditions = [
                    RKZSortCondition.desc('code')
                ];
                RKZClient.getDataList(objectId, searchConditions, sortConditions,
                  function(datas) {
                      expect(datas).toBeDefined();
                      expect(datas.length).toEqual(1);
                      expect(datas[0]).toEqual(jasmine.objectContaining({code: '0004'}));
                      done();
                  }, function(error) {
                      expect(false).toBeTruthy(); done();    // Failed
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

        describe('RKZClient.getPaginateDataList', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:objectId
            describe('パラメータ:limit', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "spot";
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = null;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = "1";
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = "2";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of offset is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:sortConditions
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "spot";
                var limit = 2;
                var offset = 2;
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code")
                ];
                RKZClient.getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions,
                    function(response) {
                        expect(response).toBeDefined();
                        expect(response.limit).toEqual(limit);
                        expect(response.offset).toEqual(offset);
                        expect(response.result_cnt).toEqual(9);
                        expect(response.datas.length).toEqual(2);
                        expect(response.datas[0].code).toEqual("0005");
                        expect(response.datas[1].code).toEqual("0006");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);
        });  // end of 汎用テーブルを複数検索する場合　[ページング機能]

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

        describe('RKZClient.getDataWithRelationObjects', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var code = "";
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
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
                    RKZClient.getDataWithRelationObjects(objectId, code,
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "spot";
                var code = "0004";
                RKZClient.getDataWithRelationObjects(objectId, code,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(Object.keys(data).length).toEqual(11);
                        expect(data).toEqual(jasmine.objectContaining({object_id: 'spot'}));
                        expect(data).toEqual(jasmine.objectContaining({code: '0004'}));
                        expect(data).toEqual(jasmine.objectContaining({name: 'A-1'}));
                        expect(data).toEqual(jasmine.objectContaining({short_name: 'A1'}));
                        expect(data).toEqual(jasmine.objectContaining({sort_no: 3}));
                        expect(data).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(data.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(data.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(Object.keys(data.attributes).length).toEqual(10);
                        expect(data.attributes).toEqual(jasmine.objectContaining({beacon_range_for_android: "-80"}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({beacon_range_for_iphone: "-80"}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({latitude_longitude: '34.602446∀133.765669∀'}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({pixel_position_x: "10"}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({pixel_position_y: "20"}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({beacon: "0005"}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({beacon_name: 'A-1'}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(data.attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(data.attributes.beacon_objects).toBeDefined();
                        expect(data.attributes.beacon_objects.length).toEqual(1);
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({code: '0005'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({name: 'A-1'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({short_name: ''}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({sort_no: '3'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_type_cd: '0001'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_type_cd_name: 'iBeacon'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_id: 'b0fc4601-14a6-43a1-abcd-cb9cfddb4013'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({major: ''}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({minor: ''}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_use_flg: '0'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(data.attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('0件の場合、エラーになること', function(done) {
                var objectId = "spot";
                var code = "9999";
                RKZClient.getDataWithRelationObjects(objectId, code,
                  function(data) {
                      // Failed
                      expect(false).toBeTruthy(); done();
                  }, function(error) {
                      expect(error).toBeDefined();
                      expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                      if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー : ゼロ件の取得エラー"})); }
                      else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー"})); }
                      done();
                  });
            }, TIMEOUT);
        });  // end of 汎用テーブル外部結合検索単件

        describe('RKZClient.getDataListWithRelationObjects', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
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
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "spot";
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(9);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(9);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
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
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "spot";
                var searchConditions = [
                    RKZSearchCondition.equal("name", "A-1")
                ];
                var sortConditions = null;
                RKZClient.getDataListWithRelationObjects(objectId, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(1);
                        expect(Object.keys(datas[0]).length).toEqual(11);
                        expect(datas[0]).toEqual(jasmine.objectContaining({object_id: 'spot'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({code: '0004'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({name: 'A-1'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({short_name: 'A1'}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({sort_no: 3}));
                        expect(datas[0]).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(datas[0].sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(datas[0].sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(Object.keys(datas[0].attributes).length).toEqual(10);
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({beacon_range_for_android: "-80"}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({beacon_range_for_iphone: "-80"}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({latitude_longitude: '34.602446∀133.765669∀'}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({pixel_position_x: "10"}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({pixel_position_y: "20"}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({beacon: "0005"}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({beacon_name: 'A-1'}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(datas[0].attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(datas[0].attributes.beacon_objects).toBeDefined();
                        expect(datas[0].attributes.beacon_objects.length).toEqual(1);
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({code: '0005'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({name: 'A-1'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({short_name: ''}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({sort_no: '3'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_type_cd: '0001'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_type_cd_name: 'iBeacon'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({beacon_id: 'b0fc4601-14a6-43a1-abcd-cb9cfddb4013'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({major: ''}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({minor: ''}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_use_flg: '0'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(datas[0].attributes.beacon_objects[0]).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of 汎用テーブル外部結合検索複数件

        describe('RKZClient.getPaginateDataListWithRelationObjects', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:objectId
            describe('パラメータ:limit', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "spot";
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = null;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = "1";
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = "2";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
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
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
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
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:sortConditions
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "spot";
                var limit = 2;
                var offset = 2;
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code")
                ];
                RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, searchConditions, sortConditions,
                    function(response) {
                        expect(response).toBeDefined();
                        expect(response.limit).toEqual(limit);
                        expect(response.offset).toEqual(offset);
                        expect(response.result_cnt).toEqual(9);
                        expect(response.datas.length).toEqual(2);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();    // Failed
                    });
            }, TIMEOUT);
            describe('パラメータ:treeCount', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 2;
                    var offset = 2;
                    var treeCount;
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of treeCount is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= null の場合、正常に検索できること', function(done) {
                    var objectId = "spot";
                    var limit = 2;
                    var offset = 2;
                    var treeCount = null;
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.limit).toEqual(limit);
                            expect(response.offset).toEqual(offset);
                            expect(response.result_cnt).toEqual(9);
                            expect(response.datas.length).toEqual(2);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Number エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 2;
                    var offset = 2;
                    var treeCount = "1";
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of treeCount is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('= 4 の場合、サーバーの最大値以上のため、エラーになること', function(done) {
                    var objectId = "spot";
                    var limit = 2;
                    var offset = 2;
                    var treeCount = 4;
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                            done();
                        });
                }, TIMEOUT);
                it('= 0 の場合、正しく取得できること', function(done) {
                    var objectId = "spot";
                    var limit = 2;
                    var offset = 2;
                    var treeCount = 0;
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.limit).toEqual(limit);
                            expect(response.offset).toEqual(offset);
                            expect(response.result_cnt).toEqual(9);
                            expect(response.datas.length).toEqual(2);
                            expect(response.datas[0].attributes.beacon_objects.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
            });  // end of パラメータ:treeCount
        });  // end of 汎用テーブル外部結合検索複数件(リミット制限あり)

        describe('RKZClient.getFieldDataList', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    RKZClient.getFieldDataList(objectId,
                        function(fields) {
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
                    RKZClient.getFieldDataList(objectId,
                        function(fields) {
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
                    RKZClient.getFieldDataList(objectId,
                        function(fields) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:objectId
            describe('パラメータ:visibleFieldOnly', function() {
                it('= undefined の場合、表示項目のみ指定と同じ結果が帰ってくること', function(done) {
                    var objectId = "spot";
                    var visibleFieldOnly;
                    RKZClient.getFieldDataList(objectId, visibleFieldOnly,
                        function(fields) {
                            expect(fields).toBeDefined();
                            expect(fields.length).toEqual(12);
                            expect(fields[0].sort_no).toEqual(10);
                            expect(fields[1].sort_no).toEqual(20);
                            expect(fields[2].sort_no).toEqual(30);
                            expect(fields[3].sort_no).toEqual(40);
                            expect(fields[4].sort_no).toEqual(50);
                            expect(fields[5].sort_no).toEqual(60);
                            expect(fields[6].sort_no).toEqual(70);
                            expect(fields[7].sort_no).toEqual(80);
                            expect(fields[8].sort_no).toEqual(90);
                            expect(fields[9].sort_no).toEqual(110);
                            expect(fields[10].sort_no).toEqual(120);
                            expect(fields[11].sort_no).toEqual(130);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('= null の場合、表示項目のみ指定と同じ結果が帰ってくること', function(done) {
                    var objectId = "spot";
                    var visibleFieldOnly = null;
                    RKZClient.getFieldDataList(objectId, visibleFieldOnly,
                        function(fields) {
                            expect(fields).toBeDefined();
                            expect(fields.length).toEqual(12);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Boolean の場合、エラーとなること', function(done) {
                    var objectId = "spot";
                    var visibleFieldOnly = "TRUE";
                    RKZClient.getFieldDataList(objectId, visibleFieldOnly,
                        function(fields) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of visibleFieldOnly is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('== False の場合、隠しフィールドも取得すること', function(done) {
                    var objectId = "spot";
                    var visibleFieldOnly = false;
                    RKZClient.getFieldDataList(objectId, visibleFieldOnly,
                        function(fields) {
                            expect(fields).toBeDefined();
                            expect(fields.length).toEqual(13);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });  // end of パラメータ:visibleFieldOnly
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "spot";
                RKZClient.getFieldDataList(objectId,
                    function(fields) {
                        expect(fields).toBeDefined();
                        expect(fields.length).toEqual(12);
                        expect(Object.keys(fields[0]).length).toEqual(12);
                        expect(fields[0]).toEqual(jasmine.objectContaining({"sort_no":10}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"field_name":"code"}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"label_str":"コード"}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"data_type_id":"0001"}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"display_type":"0029"}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"read_only_flg":"0"}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"is_required_flg":true}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"not_visible_flg":false}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"min_length":0}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"max_length":10}));
                        expect(fields[0]).toEqual(jasmine.objectContaining({"help_txt":"ヘルプテキスト"}));
                        expect(Object.keys(fields[0].attributes).length).toEqual(33);
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"search_related_field_no":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"is_unique_flg":"1"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"display_format_pattern":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"choose_list":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"default_value":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"label_group":""}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"field_num":"0"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"master_object_id":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"group_flg":"0"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"confirm_input_flg":"0"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"is_index_flg":"1"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"group_field_no":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"parent_flg":"0"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"related_check_flg":"0"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"group_id":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"section_no":"1"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"field_info":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"search_type":'1 '}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"related_check_field":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"style_txt":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"related_check_type":"1"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"system_field_id":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"link_url":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"display_name_kbn":"1"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"group_field_disp_direction":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"master_object_label":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"master_object_key":null}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"section_name":"基本情報"}));
                        expect(fields[0].attributes).toEqual(jasmine.objectContaining({"section_not_visible_flg":"0"}));
                        expect(fields[0].attributes.label_mult_str).toEqual(jasmine.objectContaining({"ja":"コード"}));
                        expect(fields[0].attributes.label_mult_group).toEqual(jasmine.objectContaining({"ja":""}));
                        expect(fields[0].attributes.help_mult_txt).toEqual(jasmine.objectContaining({"ja":"ヘルプテキスト"}));
                        expect(fields[0].attributes.section_mult_name).toEqual(jasmine.objectContaining({"ja":"基本情報"}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of RKZClient.getFieldDataList

        describe('RKZClient.getDataWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var code = "";
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
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
                    RKZClient.getDataWithLocation(objectId, code, {},
                        function(data) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of code is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('指定した範囲内の場合、取得できること', function(done) {
                var objectId = "stamp_rally_spot";
                var code = "0002";
                var location = {
                    latitude: 34.601825,
                    longitude: 133.76701,
                    range: 0.12
                };
                RKZClient.getDataWithLocation(objectId, code, location,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data).toEqual(jasmine.objectContaining({code: '0002'}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('指定した範囲外の場合、エラーになること', function(done) {
                var objectId = "stamp_rally_spot";
                var code = "0002";
                var location = {
                    latitude: 34.601825,
                    longitude: 133.76701,
                    range: 0.06
                };
                RKZClient.getDataWithLocation(objectId, code, location,
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー : ゼロ件の取得エラー"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー"})); }
                        done();
                    });
            }, TIMEOUT);
            it('0件の場合、エラーになること', function(done) {
                var objectId = "stamp_rally_spot";
                var code = "9999";
                RKZClient.getDataWithLocation(objectId, code, {},
                    function(data) {
                        // Failed
                        expect(false).toBeTruthy(); done();
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9011"}));
                        if (cordova.platformId == "ios") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー : ゼロ件の取得エラー"})); }
                        else if (cordova.platformId == "android") { expect(error).toEqual(jasmine.objectContaining({message: "API整合性エラー"})); }
                        done();
                    });
            }, TIMEOUT);
        });  // end of 汎用テーブル位置情報検索単件

        describe('RKZClient.getDataListWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
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
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(4);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
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
            it('条件なしの場合、緯度経度を設定している全件取得できること', function(done) {
                var objectId = "stamp_rally_spot";
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getDataListWithLocation(objectId, {}, searchConditions, sortConditions,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(4);
                        expect(data[0].code).toEqual('0001');
                        expect(data[1].code).toEqual('0002');
                        expect(data[2].code).toEqual('0003');
                        expect(data[3].code).toEqual('0005');
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('指定した範囲内のデータを取得できること', function(done) {
                var objectId = "stamp_rally_spot";
                var location = {
                    latitude: 34.601825,
                    longitude: 133.76701,
                    range: 0.12
                };
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code")
                ];
                RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(3);
                        expect(data[0].code).toEqual('0002');
                        expect(data[1].code).toEqual('0003');
                        expect(data[2].code).toEqual('0005');
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('指定した範囲外のデータが取得されないこと', function(done) {
                var objectId = "stamp_rally_spot";
                var location = {
                    latitude: 34.601825,
                    longitude: 133.76701,
                    range: 0.06
                };
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.asc("code")
                ];
                RKZClient.getDataListWithLocation(objectId, location, searchConditions, sortConditions,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.length).toEqual(0);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            describe('spot項目が複数ある場合', function() {
                it('spotFieldNameに指定した項目(設定あり)が検索されること', function(done) {
                    var objectId = "location_test";
                    var location = {
                        latitude: 34.601825,
                        longitude: 133.76701,
                        range: 0.12
                    };
                    var spotFieldName = 'spot1';
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(1);
                            expect(data[0].code).toEqual('0001');
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('spotFieldNameに指定した項目(未設定)が検索されること', function(done) {
                    var objectId = "location_test";
                    var location = {
                        latitude: 34.601825,
                        longitude: 133.76701,
                        range: 0.12
                    };
                    var spotFieldName = 'spot2';
                    var searchConditions = [];
                    var sortConditions = [
                        RKZSortCondition.asc("code")
                    ];
                    RKZClient.getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions,
                        function(data) {
                            expect(data).toBeDefined();
                            expect(data.length).toEqual(0);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
            });
        });  // end of 汎用テーブル位置情報検索複数件

        describe('RKZClient.getPaginateDataListWithLocation', function() {
            describe('パラメータ:objectId', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId;
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
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
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of objectId is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:objectId
            describe('パラメータ:limit', function() {
                it('= undefined の場合、エラーとなること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var limit;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var limit = null;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var limit = "1";
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = null;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
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
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = "2";
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of offset is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            describe('パラメータ:searchConditions', function() {
                it('= undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = "1";
                    var sortConditions = [
                        RKZSortCondition.desc("code")
                    ];
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
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
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
                            expect(response).toBeDefined();
                            expect(response.datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();    // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var objectId = "stamp_rally_spot";
                    var limit = 1;
                    var offset = 2;
                    var searchConditions = [];
                    var sortConditions = "1";
                    RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                        function(response) {
                            expect(false).toBeTruthy(); done();    // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of パラメータ:sortConditions
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var objectId = "stamp_rally_spot";
                var limit = 2;
                var offset = 1;
                var searchConditions = [];
                var sortConditions = [
                    RKZSortCondition.desc("code")
                ];
                RKZClient.getPaginateDataListWithLocation(objectId, limit, offset, {}, searchConditions, sortConditions,
                    function(data) {
                        expect(data).toBeDefined();
                        expect(data.result_cnt).toEqual(4);
                        expect(data.datas.length).toEqual(2);
                        expect(data.datas[0].code).toEqual('0003');
                        expect(data.datas[1].code).toEqual('0002');
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of 汎用テーブル位置情報検索複数件(リミット制限あり)
    });  // end of 汎用テーブル関連API
};
