//
// ███████╗██████╗  ██████╗ ████████╗    ████████╗███████╗███████╗████████╗███████╗
// ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
// ███████╗██████╔╝██║   ██║   ██║          ██║   █████╗  ███████╗   ██║   ███████╗
// ╚════██║██╔═══╝ ██║   ██║   ██║          ██║   ██╔══╝  ╚════██║   ██║   ╚════██║
// ███████║██║     ╚██████╔╝   ██║          ██║   ███████╗███████║   ██║   ███████║
// ╚══════╝╚═╝      ╚═════╝    ╚═╝          ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝
//
var TIMEOUT = 30000;

exports.suite = function(helper) {

    describe('Testing for spot', function() {
        describe('RKZClient.getSpotList', function() {
            it('検索条件!==Objectの場合、エラーとなること', function(done) {
                var searchConditions = "NG";
                var sortConditions = [];
                RKZClient.getSpotList(searchConditions, sortConditions,
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
                RKZClient.getSpotList(searchConditions, sortConditions,
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
                RKZClient.getSpotList(searchConditions, sortConditions,
                    function(spots) {
                        expect(spots).toBeDefined();
                        expect(spots.length).toEqual(9);
                        done();
                    },
                    function(error) {
                        // Failed
                        expect(false).toBeTruthy();
                        done();
                    });
            }, TIMEOUT);

            it('検索条件を指定したら、正しく検索されること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("name", "A-1")
                ];
                var sortConditions = null;
                RKZClient.getSpotList(searchConditions, sortConditions,
                    function(spots) {
                        expect(spots).toBeDefined();
                        expect(spots.length).toEqual(1);
                        expect(Object.keys(spots[0]).length).toEqual(13);
                        expect(spots[0]).toEqual(jasmine.objectContaining({code: "0004"}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({name: "A-1"}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({short_name: ""}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({sort_no: 3}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({beacon_range_for_android: null}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({beacon_range_for_iphone: null}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({latitude: null}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({longitude: null}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({pixel_position_x: ""}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({pixel_position_y: ""}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({not_use_flg: false}));
                        expect(spots[0]).toEqual(jasmine.objectContaining({beacon: ["0005"]}));
                        expect(Object.keys(spots[0].attributes).length).toEqual(5);
                        expect(spots[0].attributes).toEqual(jasmine.objectContaining({not_delete_flg: '0'}));
                        expect(spots[0].attributes).toEqual(jasmine.objectContaining({beacon_name: 'A-1'}));
                        expect(spots[0].attributes).toEqual(jasmine.objectContaining({not_edit_flg: '0'}));
                        expect(spots[0].attributes.sys_insert_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        expect(spots[0].attributes.sys_update_date).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
                        done();
                    },
                    function(response) {
                        // Failed
                        expect(false).toBeTruthy();
                        done();
                    });
            }, TIMEOUT);

            it('ソート条件を指定したら、正しく並び替えされること', function(done) {
                var searchConditions = null;
                var sortConditions = [
                    RKZSortCondition.desc("name"),
                ];
                RKZClient.getSpotList(searchConditions, sortConditions,
                    function(spots) {
                        expect(spots).toBeDefined();
                        expect(spots.length).toEqual(9);
                        expect(spots[0]).toEqual(jasmine.objectContaining({code: "0011"}));
                        expect(spots[1]).toEqual(jasmine.objectContaining({code: "0008"}));
                        expect(spots[2]).toEqual(jasmine.objectContaining({code: "0003"}));
                        expect(spots[3]).toEqual(jasmine.objectContaining({code: "0010"}));
                        expect(spots[4]).toEqual(jasmine.objectContaining({code: "0009"}));
                        expect(spots[5]).toEqual(jasmine.objectContaining({code: "0007"}));
                        expect(spots[6]).toEqual(jasmine.objectContaining({code: "0006"}));
                        expect(spots[7]).toEqual(jasmine.objectContaining({code: "0005"}));
                        expect(spots[8]).toEqual(jasmine.objectContaining({code: "0004"}));
                        done();
                    },
                    function(response) {
                        // Failed
                        expect(false).toBeTruthy();
                        done();
                    });
            }, TIMEOUT);

            it('条件にマッチしない場合は、空で帰ってくること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.equal("name", "場所TEST")
                ];
                var sortConditions = null;
                RKZClient.getSpotList(searchConditions, sortConditions,
                    function(spots) {
                        expect(spots).toBeDefined();
                        expect(spots.length).toEqual(0);
                        done();
                    },
                    function(response) {
                        // Failed
                        expect(false).toBeTruthy();
                        done();
                    });
            }, TIMEOUT);
        });
    });  // end of スポット関連API

};
