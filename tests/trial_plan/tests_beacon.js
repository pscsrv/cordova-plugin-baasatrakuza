var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for beacon', function() {
        describe('RKZClient.getBeaconList', function() {
            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getBeaconList(searchConditions, sortConditions,
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
                var searchConditions = [];
                var sortConditions = "NG";
                RKZClient.getBeaconList(searchConditions, sortConditions,
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
            it('検索条件=Undefined and ソート条件=Undefinedだと、条件未指定で検索すること', function(done) {
                var searchConditions;   // undefined
                var sortConditions;     // undefined
                RKZClient.getBeaconList(searchConditions, sortConditions,
                    function(beacons) {
                        expect(beacons).toBeDefined();
                        expect(beacons.length).toEqual(6);
                        done();
                    },
                    function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('検索条件を指定したら、正しく検索されること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("name", "301"),
                ];
                var sortConditions = null;
                RKZClient.getBeaconList(searchConditions, sortConditions,
                    function(beacons) {
                        expect(beacons).toBeDefined();
                        expect(beacons.length).toEqual(1);
                        expect(Object.keys(beacons[0]).length).toEqual(10);
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"code":"0001"}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"name":"301"}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"short_name":"場所A"}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"sort_no":1}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"beacon_id":"FD064A00300C"}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"major":null}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"minor":null}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"not_use_flg":false}));
                        expect(beacons[0]).toEqual(jasmine.objectContaining({"beacon_type_cd":"0002"}));
                        expect(Object.keys(beacons[0].attributes).length).toEqual(5);
                        expect(beacons[0].attributes).toEqual(jasmine.objectContaining( {"beacon_type_cd_name":"BLUETUS"} ));
                        expect(beacons[0].attributes).toEqual(jasmine.objectContaining( {"not_delete_flg":"0"} ));
                        expect(beacons[0].attributes).toEqual(jasmine.objectContaining( {"not_edit_flg":"0"} ));
                        expect(beacons[0].attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(beacons[0].attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    },
                    function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('ソート条件を指定したら、正しく並び替えされること', function(done) {
                var searchConditions = null;
                var sortConditions = [
                    RKZSortCondition.desc("name"),
                ];
                RKZClient.getBeaconList(searchConditions, sortConditions,
                    function(beacons) {
                        expect(beacons).toBeDefined();
                        expect(beacons.length).toEqual(6);
                        expect(beacons[0]).toEqual(jasmine.objectContaining({code: "0007"}));
                        expect(beacons[1]).toEqual(jasmine.objectContaining({code: "0006"}));
                        expect(beacons[2]).toEqual(jasmine.objectContaining({code: "0005"}));
                        expect(beacons[3]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(beacons[4]).toEqual(jasmine.objectContaining({code: "0001"}));
                        expect(beacons[5]).toEqual(jasmine.objectContaining({code: "0008"}));
                        done();
                    },
                    function(response) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
            it('条件にマッチしない場合は、空で帰ってくること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("name", "場所TEST")
                ];
                var sortConditions = null;
                RKZClient.getBeaconList(searchConditions, sortConditions,
                    function(beacons) {
                        expect(beacons).toBeDefined();
                        expect(beacons.length).toEqual(0);
                        done();
                    },
                    function(response) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });  // end of getBeaconList

        describe('RKZClient.addDetectBeaconContact', function() {
            it('正常なパラメータの場合、正しく登録できること', function(done) {
                var beaconId = "FD064A00300C";
                var beaconSpotCode = "0001";
                var rssi = 3;
                var detectBeaconDatetime = new Date();
                var remarks = "テスト備考";
                RKZClient.addDetectBeaconContact(helper.userAccessToken,
                    beaconId,
                    beaconSpotCode,
                    rssi,
                    detectBeaconDatetime,
                    remarks,
                    function(statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual("1001");
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

        describe('RKZClient.getDetectBeaconContact', function() {
            it('正常なパラメータの場合、正しく取得できること', function(done) {
                var searchConditions = null;
                var sortConditions = null;
                RKZClient.getDetectBeaconContact(helper.userAccessToken,
                    searchConditions,
                    sortConditions,
                    function(beaconContacts) {
                        expect(beaconContacts).toBeDefined();
                        expect(beaconContacts.length).toEqual(1);
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"beacon_id":"FD064A00300C"}));
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"contact_method_class_cd_name":"ビーコン検知"}));
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"contact_method_class_cd":"0008"}));
                        expect(beaconContacts[0].contact_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\+0900$/);
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"target_tenant_id":"21002"}));
                        expect(beaconContacts[0].contact_no).toBeDefined();
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"beacon_spot_cd":"0001"}));
                        expect(beaconContacts[0].user_id).toMatch(/^21002[0-9]{10}$/);
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"contact_class_cd_name":"ビーコン検知"}));
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"rssi":3}));
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"contact_class_cd":"0012"}));
                        expect(beaconContacts[0]).toEqual(jasmine.objectContaining({"remarks":"テスト備考"}));
                        done();
                    }, function(error) {
                        expect(false).toBeTruthy(); done();  // Failed
                    });
            }, TIMEOUT);
        });

    });  // end of describe('Testing for beacon', function()

};
