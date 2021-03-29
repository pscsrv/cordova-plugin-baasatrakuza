var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for point', function() {
        describe('RKZClient.addPoint', function() {
            describe('パラメータ:userAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    var point = 1;
                    var addDate = new Date();
                    RKZClient.addPoint(userAccessToken, point, addDate,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 0;
                    var point = 1;
                    var addDate = new Date();
                    RKZClient.addPoint(userAccessToken, point, addDate,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:userAccessToken', function()
            describe('パラメータ:point', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var point;
                    var addDate = new Date();
                    RKZClient.addPoint(helper.userAccessToken, point, addDate,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of point is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== Number の場合、エラーになること', function(done) {
                    var point = "1";
                    var addDate = new Date();
                    RKZClient.addPoint(helper.userAccessToken, point, addDate,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of point is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:point', function()
            describe('パラメータ:addDate', function() {
                it('!== Date の場合、エラーになること', function(done) {
                    var point = 1;
                    var addDate = "2016-10-10";
                    RKZClient.addPoint(helper.userAccessToken, point, addDate,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of addDate is not correct."}));
                            done();
                        });
                }, TIMEOUT);
            });  // end of describe('パラメータ:addDate', function()
            it('ポイントを加算できること', function(done) {
                var point = 2;
                var addDate = null;
                RKZClient.addPoint(helper.userAccessToken, point, addDate,
                    function(point) {
                        expect(point).toBeDefined();
                        expect(point.user_id).not.toBeNull();
                        expect(point).toEqual(jasmine.objectContaining({point: 22}));

                        var searchConditions = [
                            RKZSearchCondition.equal('contact_class_cd', '0008'),
                        ];
                        RKZClient.getContactList(helper.userAccessToken, searchConditions, null,
                          function(datas) {
                              expect(datas).toBeDefined();
                              expect(datas.length).toEqual(1);
                              expect(datas[0].contact_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                              done();
                          }, function(error) {
                              expect(false).toBeTruthy(); done();  // Failed
                          });
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);  // end of it('ポイントを加算できること', function(done)
            it('ポイントを減算できること', function(done) {
                var point = -1;
                var addDate = new Date(2020, 6 - 1, 5, 14, 52, 31);
                RKZClient.addPoint(helper.userAccessToken, point, addDate,
                  function(point) {
                      expect(point).toBeDefined();
                      expect(point.user_id).not.toBeNull();
                      expect(point).toEqual(jasmine.objectContaining({point: 21}));

                      var searchConditions = [
                          RKZSearchCondition.equal('contact_class_cd', '0008'),
                      ];
                      RKZClient.getContactList(helper.userAccessToken, searchConditions, null,
                        function(datas) {
                            expect(datas).toBeDefined();
                            expect(datas.length).toEqual(2);
                            expect(datas[0].contact_date).toEqual('2020-06-05 14:52:31+0900');
                            done();
                        }, function(error) {
                            expect(false).toBeTruthy(); done();  // Failed
                        });
                  }, function(error) {
                      expect(false).toBeTruthy(); done();  // Failed
                  });
            }, TIMEOUT);  // end of it('ポイントを減算できること', function(done)
            it('ネイティブで発生したエラーはerrorで受け取れること', function(done) {
                var userAccessToken = "";
                var point = 1;
                var addDate = new Date();
                RKZClient.addPoint(userAccessToken, point, addDate,
                    function(point) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);  // end of it('ネイティブで発生したエラーはerrorで受け取れること', function(done)
        });
        describe('RKZClient.getPoint', function() {
            describe('パラメータ:userAccessToken', function() {
                it('= undefined の場合、エラーになること', function(done) {
                    var userAccessToken;
                    RKZClient.getPoint(userAccessToken,
                        function(point) {
                            expect(false).toBeTruthy(); done();  // Failed
                        }, function(error) {
                            expect(error).toBeDefined();
                            expect(error).toEqual(jasmine.objectContaining({status_code: "CDVE0001"}));
                            expect(error).toEqual(jasmine.objectContaining({message: "Type of userAccessToken is not correct."}));
                            done();
                        });
                }, TIMEOUT);
                it('!== String の場合、エラーになること', function(done) {
                    var userAccessToken = 100;
                    RKZClient.getPoint(userAccessToken,
                        function(point) {
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
                RKZClient.getPoint(helper.userAccessToken,
                    function(point) {
                        expect(point).toBeDefined();
                        expect(point.user_id).not.toBeNull();
                        expect(point).toEqual(jasmine.objectContaining({point: 21}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ネイティブで発生したエラーはerrorで受け取れること', function(done) {
                var userAccessToken = "";
                RKZClient.getPoint(userAccessToken,
                    function(point) {
                        expect(false).toBeTruthy(); done();  // Failed
                    }, function(error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({status_code: "9020"}));
                        done();
                    });
            }, TIMEOUT);  // end of it('ネイティブで発生したエラーはerrorで受け取れること', function(done)
        });
    });

};
