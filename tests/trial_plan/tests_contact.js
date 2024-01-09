var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for contact', function() {
        describe('RKZClient.addContact', function() {
            it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                var userAccessToken;
                var contact = {
                    contact_class_cd: "0015",
                    contact_method_class_cd: "0007",
                };
                RKZClient.addContact(userAccessToken, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('contact=undefinedの場合、エラーになること', function(done) {
                var contact;
                RKZClient.addContact(helper.userAccessToken, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of contact is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('userAccessToken!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = [ "NG" ];
                var contact = {
                    contact_class_cd: "0015",
                    contact_method_class_cd: "0007",
                };
                RKZClient.addContact(userAccessToken, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('contact!==Objectの場合、エラーになること', function(done) {
                var contact = "NG";
                RKZClient.addContact(helper.userAccessToken, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of contact is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('パラメータが正しい場合、正常に登録できること', function(done) {
                var contact = {
                    contact_class_cd: "0015",
                    contact_method_class_cd: "0007",
                    point: 1
                };
                RKZClient.addContact(helper.userAccessToken, contact,
                    function(statusCode) {
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ポイントを減算できること', function(done) {
              var contact = {
                contact_class_cd: "0015",
                contact_method_class_cd: "0007",
                point: -1
              };
              RKZClient.addContact(helper.userAccessToken, contact,
                function(statusCode) {
                  expect(statusCode).toEqual("1001");
                  done();
                }, function(error) {
                  expect(false).toBeTruthy(); done();  // Failed
                });
            }, TIMEOUT);
            it('contactのプロパティが正しく設定されていない場合、エラーが返されること', function(done) {
                var contact = {};
                RKZClient.addContact(helper.userAccessToken, contact,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9002"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "システムエラー : 不正なパラメータです。"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of 登録する場合
        describe('RKZClient.getContactList', function() {
            it('userAccessToken=undefinedの場合、エラーになること', function(done) {
                var userAccessToken;
                var searchConditions = [
                    RKZSearchCondition.equal("contact_class_cd", "0015"),
                ];
                var sortConditions = [];
                RKZClient.getContactList(userAccessToken, searchConditions, sortConditions,
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
                RKZClient.getContactList(helper.userAccessToken, searchConditions, sortConditions,
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
                RKZClient.getContactList(helper.userAccessToken, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('userAccessToken!==Stringの場合、エラーになること', function(done) {
                var userAccessToken = { status:"NG" };
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getContactList(userAccessToken, searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                        expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                        done();
                    });
            }, TIMEOUT);
            it('searchConditions!==Objectの場合、エラーになること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getContactList(helper.userAccessToken, searchConditions, sortConditions,
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
                RKZClient.getContactList(helper.userAccessToken, searchConditions, sortConditions,
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
                    RKZSearchCondition.equal("contact_class_cd", "0015"),
                ];
                var sortConditions = [
                    RKZSortCondition.desc('contact_no'),
                ];
                RKZClient.getContactList(helper.userAccessToken, searchConditions, sortConditions,
                    function(datas) {
                        expect(datas).toBeDefined();
                        expect(datas.length).toEqual(3);
                        expect(Object.keys(datas[0]).length).toEqual(20);

                        expect(datas[0]).toEqual(jasmine.objectContaining({"point":-1}));

                        expect(datas[1]).toEqual(jasmine.objectContaining({"contact_method_class_cd":"0007"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"entry_no":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"contact_item_no":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"deposit_no":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"contact_item_name":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"contact_class_cd":"0015"}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"rssi":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"coupon_cd":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"stamp_rally_cd":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"beacon_id":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"stamp_rally_spot_cd":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"remarks":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"beacon_spot_cd":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"quantity":null}));
                        expect(datas[1].contact_no).toBeDefined();
                        expect(datas[1].contact_no).not.toBeNull();
                        expect(datas[1]).toEqual(jasmine.objectContaining({"place_cd":null}));
                        expect(datas[1].contact_date).toBeDefined();
                        expect(datas[1].contact_date).not.toBeNull();
                        expect(datas[1]).toEqual(jasmine.objectContaining({"point":1}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"status_cd":null}));
                        expect(datas[1]).toEqual(jasmine.objectContaining({"attributes": {"beacon_spot_cd_name":null,"status_cd_name":null,"place_cd_name":null,"contact_class_cd_name":"スタンプコンプリート","stamp_rally_cd_name":null,"coupon_cd_name":null,"stamp_rally_spot_cd_name":null,"contact_method_class_cd_name":"管理者代行","ticket_cd":null,"ticket_no":null,"ticket_name":null,"user_coupon_cd": null,"stamp_spot_cd": null,"stamp_spot_cd_name": null} }));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ポイント加減算が正しく行われていること', function(done) {
              RKZClient.getPoint(helper.userAccessToken,
                function(point) {
                  expect(point).toBeDefined();
                  expect(point.user_id).not.toBeNull();
                  expect(point).toEqual(jasmine.objectContaining({point: 1}));
                  done();
                }, function(error) {
                  expect(false).toBeTruthy(); done();  // Failed
                });
            }, TIMEOUT);
        });  // end of 取得する場合
    });  // end of コンタクト履歴関連API

};
