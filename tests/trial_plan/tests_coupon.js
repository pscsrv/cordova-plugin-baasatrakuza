var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for coupon', function() {
        describe('RKZClient.getCoupon', function() {
            describe('パラメータ:couponCd', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var couponCd;
                    RKZClient.getCoupon(couponCd,
                        function(coupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var couponCd = 1;
                    RKZClient.getCoupon(couponCd,
                        function(coupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:couponCd', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var couponCd = "0001";
                RKZClient.getCoupon(couponCd,
                    function(coupon) {
                        expect(coupon).toBeDefined();
                        expect(Object.keys(coupon).length).toEqual(12);
                        expect(coupon).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(coupon).toEqual(jasmine.objectContaining({name: 'サンプル無料券'}));
                        expect(coupon).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(coupon).toEqual(jasmine.objectContaining({enable_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(coupon).toEqual(jasmine.objectContaining({enable_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(coupon).toEqual(jasmine.objectContaining({possible_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(coupon).toEqual(jasmine.objectContaining({possible_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(coupon).toEqual(jasmine.objectContaining({image: '688_40_2_1578615871388.png'}));
                        expect(coupon).toEqual(jasmine.objectContaining({image_url: 'https://cloud.raku-za.jp/stage/unittest/sdk.0210/Image/users/688_40_2_1578615871388.png'}));
                        expect(coupon).toEqual(jasmine.objectContaining({point: 10}));
                        expect(coupon).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(Object.keys(coupon.attributes).length).toEqual(4);
                        expect(coupon.attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(coupon.attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(coupon.attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(coupon.attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ネイティブで発生したエラーはerrorで受け取れること', function(done) {
                var couponCd = "";
                RKZClient.getCoupon(couponCd,
                    function(coupon) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getCoupon', function()
        describe('RKZClient.getCouponList', function() {
            describe('パラメータ:searchConditions', function() {
                it('== undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code"),
                    ];
                    RKZClient.getCouponList(searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0]).toEqual(jasmine.objectContaining({code: "0003"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({code: "0001"}));
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var searchConditions = "NG";
                    var sortConditions = [];
                    RKZClient.getCouponList(searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:searchConditions', function()
            describe('パラメータ:sortConditions', function() {
                it('== undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getCouponList(searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0]).toEqual(jasmine.objectContaining({code: "0001"}));
                            expect(datas[1]).toEqual(jasmine.objectContaining({code: "0003"}));
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var searchConditions = [];
                    var sortConditions = "NG";
                    RKZClient.getCouponList(searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:sortConditions', function()
            it('パラメータが正しい場合、正常に検索できること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("code", "0001"),
                ];
                var sortConditions = [];
                RKZClient.getCouponList(searchConditions, sortConditions,
                    function(coupons) {
                        expect(coupons).toBeDefined();
                        expect(coupons.length).toEqual(1);
                        expect(Object.keys(coupons[0]).length).toEqual(12);
                        expect(coupons[0]).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({name: 'サンプル無料券'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({enable_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({enable_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({possible_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({possible_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({image: '688_40_2_1578615871388.png'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({image_url: 'https://cloud.raku-za.jp/stage/unittest/sdk.0210/Image/users/688_40_2_1578615871388.png'}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({point: 10}));
                        expect(coupons[0]).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(Object.keys(coupons[0].attributes).length).toEqual(4);
                        expect(coupons[0].attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(coupons[0].attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(coupons[0].attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(coupons[0].attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });
        describe('RKZClient.exchangeCoupon', function() {
            describe('パラメータ:userAccessToken', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    var couponCd = "0001";
                    var quantity = 1;
                    RKZClient.exchangeCoupon(userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 1;
                    var couponCd = "0001";
                    var quantity = 1;
                    RKZClient.exchangeCoupon(userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            describe('パラメータ:couponCd', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var couponCd;
                    var quantity = 1;
                    RKZClient.exchangeCoupon(helper.userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var couponCd = 1;
                    var quantity = 1;
                    RKZClient.exchangeCoupon(helper.userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:couponCd', function()
            describe('パラメータ:quantity', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var couponCd = "0001";
                    var quantity;
                    RKZClient.exchangeCoupon(helper.userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of quantity is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var couponCd = "0001";
                    var quantity = "1";
                    RKZClient.exchangeCoupon(helper.userAccessToken, couponCd, quantity,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of quantity is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:quantity', function()
            it('パラメータが正常の場合、正しく処理されること', function(done) {
                var couponCd = "0001";
                var quantity = 2;
                RKZClient.exchangeCoupon(helper.userAccessToken, couponCd, quantity,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ネイティブでエラーが発生した場合、エラーが復帰されること', function(done) {
                var couponCd = "0001";
                var quantity = 1;
                RKZClient.exchangeCoupon("", couponCd, quantity,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.exchangeCoupon', function()
        describe('RKZClient.getMyCouponList', function() {
            describe('パラメータ:userAccessToken', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getMyCouponList(userAccessToken, searchConditions, sortConditions,
                        function(coupons) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 1;
                    var searchConditions = [];
                    var sortConditions = [];
                    RKZClient.getMyCouponList(userAccessToken, searchConditions, sortConditions,
                        function(coupons) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            describe('パラメータ:searchConditions', function() {
                it('== undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions;
                    var sortConditions = [
                        RKZSortCondition.desc("code"),
                    ];
                    RKZClient.getMyCouponList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(1);
                            expect(Object.keys(datas[0]).length).toEqual(9);
                            expect(datas[0].code).not.toBeNull();
                            expect(datas[0]).toEqual(jasmine.objectContaining({quantity: 2}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({coupon_cd: '0001'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({coupon_name: 'サンプル無料券'}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({used_flg: false}));
                            expect(datas[0]).toEqual(jasmine.objectContaining({use_date: null}));
                            expect(datas[0].get_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                            expect(Object.keys(datas[0].coupon).length).toEqual(12);
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({code: '0001'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({name: 'サンプル無料券'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({sort_no: 1}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({enable_from_dte: '2015-01-01 00:00:00+0900'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({enable_to_dte: '2116-12-31 23:59:00+0900'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({possible_from_dte: '2015-01-01 00:00:00+0900'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({possible_to_dte: '2116-12-31 23:59:00+0900'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({image: '688_40_2_1578615871388.png'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({image_url: 'https://cloud.raku-za.jp/stage/unittest/sdk.0210/Image/users/688_40_2_1578615871388.png'}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({point: 10}));
                            expect(datas[0].coupon).toEqual(jasmine.objectContaining({not_use_flg: false}));
                            expect(Object.keys(datas[0].coupon.attributes).length).toEqual(4);
                            expect(datas[0].coupon.attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                            expect(datas[0].coupon.attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                            expect(datas[0].coupon.attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                            expect(datas[0].coupon.attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var searchConditions = "NG";
                    var sortConditions = [];
                    RKZClient.getMyCouponList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of searchConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:searchConditions', function()
            describe('パラメータ:sortConditions', function() {
                it('== undefined の場合、条件未指定と同じ結果が取得できること', function(done) {
                    var searchConditions = [];
                    var sortConditions;
                    RKZClient.getMyCouponList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(1);
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                }, TIMEOUT);
                it('!== Object の場合、エラーになること', function(done) {
                    var searchConditions = [];
                    var sortConditions = "NG";
                    RKZClient.getMyCouponList(helper.userAccessToken, searchConditions, sortConditions,
                        function(datas) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of sortConditions is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:sortConditions', function()
            it('ネイティブでエラーが発生した場合、エラーが復帰されること', function(done) {
                var searchConditions = [];
                var sortConditions = [];
                RKZClient.getMyCouponList("", searchConditions, sortConditions,
                    function(datas) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);
        });  // end of describe('RKZClient.getMyCouponList', function()
        describe('RKZClient.getMyCoupon', function() {
            describe('パラメータ:userAccessToken', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    var code = "2";
                    RKZClient.getMyCoupon(userAccessToken, code,
                        function(myCoupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 1;
                    var code = "2";
                    RKZClient.getMyCoupon(userAccessToken, code,
                        function(myCoupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            describe('パラメータ:code', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var code;
                    RKZClient.getMyCoupon(helper.userAccessToken, code,
                        function(myCoupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var code = 2;
                    RKZClient.getMyCoupon(helper.userAccessToken, code,
                        function(myCoupon) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of couponCd is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });
            it('パラメータが正しい場合、正常に処理できること', function(done) {
                //ポイントのテスト.js動作後でないと、エラーになります。
                var code = "4";
                RKZClient.getMyCoupon(helper.userAccessToken, code,
                    function(myCoupon) {
                        expect(myCoupon).toBeDefined();
                        expect(Object.keys(myCoupon).length).toEqual(9);
                        expect(myCoupon).toEqual(jasmine.objectContaining({code: '4'}));
                        expect(myCoupon.user_id).not.toBeNull();
                        expect(myCoupon).toEqual(jasmine.objectContaining({quantity: 2}));
                        expect(myCoupon).toEqual(jasmine.objectContaining({coupon_cd: '0001'}));
                        expect(myCoupon).toEqual(jasmine.objectContaining({coupon_name: 'サンプル無料券'}));
                        expect(myCoupon).toEqual(jasmine.objectContaining({used_flg: false}));
                        expect(myCoupon).toEqual(jasmine.objectContaining({use_date: null}));
                        expect(myCoupon.get_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(Object.keys(myCoupon.coupon).length).toEqual(12);
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({code: '0001'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({name: 'サンプル無料券'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({sort_no: 1}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({enable_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({enable_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({possible_from_dte: '2015-01-01 00:00:00+0900'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({possible_to_dte: '2116-12-31 23:59:00+0900'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({image: '688_40_2_1578615871388.png'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({image_url: 'https://cloud.raku-za.jp/stage/unittest/sdk.0210/Image/users/688_40_2_1578615871388.png'}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({point: 10}));
                        expect(myCoupon.coupon).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(Object.keys(myCoupon.coupon.attributes).length).toEqual(4);
                        expect(myCoupon.coupon.attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(myCoupon.coupon.attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(myCoupon.coupon.attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(myCoupon.coupon.attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ネイティブでエラーが発生した場合、エラーが復帰されること', function(done) {
                var code = "2";
                RKZClient.getMyCoupon("", code,
                    function(datas) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);
        });
        describe('RKZClient.useMyCoupon', function() {
            describe('パラメータ:userAccessToken', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    var myCoupon = {
                        code: "",
                        coupon_cd: "",
                    };
                    RKZClient.useMyCoupon(userAccessToken, myCoupon,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 1;
                    var myCoupon = {
                        code: "",
                        coupon_cd: "",
                    };
                    RKZClient.useMyCoupon(userAccessToken, myCoupon,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            describe('パラメータ:myCoupon', function() {
                it('== undefined の場合、エラーになること', function(done) {
                    var myCoupon;
                    RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var myCoupon = "NG";
                    RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                        function(statusCode) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                describe('.code', function() {
                    it('== undefined の場合、エラーになること', function(done) {
                        var myCoupon = {
                            coupon_cd: "",
                        };
                        RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                            function(statusCode) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon.code is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('!== String の場合、エラーになること', function(done) {
                        var myCoupon = {
                            code: 1,
                            coupon_cd: "",
                        };
                        RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                            function(statusCode) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon.code is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });  // end of describe('.code', function()
                describe('.coupon_cd', function() {
                    it('== undefined の場合、エラーになること', function(done) {
                        var myCoupon = {
                            code: "",
                        };
                        RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                            function(statusCode) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon.coupon_cd is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                    it('!== String の場合、エラーになること', function(done) {
                        var myCoupon = {
                            code: "",
                            coupon_cd: 1,
                        };
                        RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                            function(statusCode) {
                                expect(false).toBeTruthy(); done();  // Failed
                            }, function(error) {
                                expect(error).toBeDefined();
                                expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                                expect(error).toEqual(jasmine.objectContaining({message: "Type of myCoupon.coupon_cd is not correct."}));
                                done();
                            });
                    }, TIMEOUT);
                });  // end of describe('.code', function()
            });  // end of describe('パラメータ:myCoupon', function()
            it('パラメータが正しい場合、正しく処理されること', function(done) {
                //ポイントのテスト.js動作後でないと、エラーになります。
                var myCoupon = {
                    code: "4",
                    coupon_cd: "0001",
                };
                RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ネイティブでエラーが発生した場合、エラーで復帰されること', function(done) {
                var myCoupon = {
                    code: "",
                    coupon_cd: "0001",
                };
                RKZClient.useMyCoupon(helper.userAccessToken, myCoupon,
                    function(statusCode) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);
        });
    });

};
