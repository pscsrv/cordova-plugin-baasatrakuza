var TIMEOUT = 30000;
var JST_FULL_DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+0900$/;

function userDetailContaining(userDetail, source) {
    if (source == null) source = {};
    return jasmine.objectContaining(Object.assign(
      {},
      userDetail,
      {
          id: jasmine.any(String),
          attributes: jasmine.objectContaining(userDetail.attributes)
      },
      source
    ));
}

function isIOS() {
    return cordova.platformId === 'ios';
}

exports.suite = function(helper) {
    let testUser1 = null;
    let testUser2 = null;

    var testData1 = null; // testUser1ユーザーの非公開データ
    var testData2 = null; // testUser1ユーザーの公開データ(認証必須)
    var testData3 = null; // testUser1ユーザーの公開データ(認証不要)
    var testData4 = null; // testUser1ユーザーの非公開データ

    describe('Testing for user detail.', function() {
        beforeAll(function (done) {
            testUser1 = helper.user;

            var user = {
                user_name: 'コルドバ太郎【新規登録】' + new Date()
            };
            RKZClient.registUser(user,
              function(user) {
                  expect(user).toBeDefined();
                  testUser2 = user;
                  done();
              }, function() {
                  expect(false).toBeTruthy();
                  done();
              });
        });

        describe('RKZClient.addUserDetail', function() {
            describe('ユーザー詳細', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail(undefined, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    })
                }, TIMEOUT);
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail('', testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('オブジェクトID===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail({}, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail({}, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail({}, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.addUserDetail({
                        object_id: 'test'
                    }, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('非公開データが正しく登録されること', function(done) {
                    RKZClient.addUserDetail({
                        object_id: 'test',
                        sort_no: 1,
                        object_sort_no: 1,
                        attributes: {
                            attributes_value: '新規1',
                            attributes_date: '2017-01-01 00:00:00'
                        }
                    }, testUser1.user_access_token, function (userDetail) {
                        expect(userDetail).toEqual(jasmine.objectContaining({
                            object_id: 'test',
                            object_sort_no: 1,
                            user_id: helper.user.user_id,
                            user_tenant_id: '21002',
                            user_no: helper.user.user_no,
                            visibility: '0001',
                            attributes: jasmine.objectContaining({
                                attributes_value: '新規1',
                                attributes_date: '2017-01-01 00:00:00'
                            }),
                            code: jasmine.any(String),
                            id: jasmine.any(String),
                            sort_no: jasmine.any(Number),
                            sys_insert_date: jasmine.stringMatching(JST_FULL_DATE_TIME_PATTERN),
                            sys_update_date: jasmine.stringMatching(JST_FULL_DATE_TIME_PATTERN)
                        }));
                        testData1 = userDetail;
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証必須)が正しく登録されること', function(done) {
                    RKZClient.addUserDetail({
                        object_id: 'test',
                        visibility: '0002',
                        attributes: {
                            attributes_value: '新規2'
                        }
                    }, testUser1.user_access_token, function (userDetail) {
                        expect(userDetail).toEqual(jasmine.objectContaining({
                            object_id: 'test',
                            visibility: '0002',
                            attributes: jasmine.objectContaining({
                                attributes_value: '新規2'
                            })
                        }));
                        testData2 = userDetail;
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証不要)が正しく登録されること', function(done) {
                    RKZClient.addUserDetail({
                        object_id: 'test',
                        visibility: '0003',
                        attributes: {
                            attributes_value: '新規3'
                        }
                    }, testUser1.user_access_token, function (userDetail) {
                        expect(userDetail).toEqual(jasmine.objectContaining({
                            object_id: 'test',
                            visibility: '0003',
                            attributes: jasmine.objectContaining({
                                attributes_value: '新規3'
                            })
                        }));
                        testData3 = userDetail;
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });

            afterAll(function (done) {
                RKZClient.addUserDetail({
                    object_id: 'test',
                    attributes: {
                        attributes_value: '新規4'
                    }
                }, testUser1.user_access_token, function (userDetail) {
                    expect(userDetail).toBeDefined();
                    testData4 = userDetail;
                    done();
                }, function () {
                    expect(false).toBeTruthy();
                    done();
                });
            });
        });

        describe('RKZClient.getUserDetail', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail(undefined, testUser1.user_access_token, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail({}, testUser1.user_access_token, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('', testUser1.user_access_token, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', undefined, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', {}, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', '', '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザー詳細ID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetailId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetailId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : IDの取得に失敗しました' : 'IDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('拡張オブジェクト検索条件', function() {
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, testData1.id, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, testData1.id, {
                        show_favorite: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite_summary!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, testData1.id, {
                        show_favorite_summary: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite_summary is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('IDで1件取得できること(お気に入り情報を含まない)', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, testData1.id, function (userDetail) {
                        expect(userDetail).toBeDefined();
                        expect(userDetail).not.toBeNull();
                        expect(userDetail).toEqual(userDetailContaining(testData1));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('IDで1件取得できること(お気に入り情報を含む)', function(done) {
                    RKZClient.getUserDetail('test', testUser1.user_access_token, testData1.id, {
                        show_favorite: true,
                        show_favorite_summary: true
                    }, function (userDetail) {
                        expect(userDetail).toBeDefined();
                        expect(userDetail).not.toBeNull();
                        expect(userDetail).toEqual(userDetailContaining(testData1, {
                            sys_favorite: jasmine.objectContaining({
                                is_favorite: false,
                                favorite_date: null
                            }),
                            sys_favorite_sum: jasmine.objectContaining({
                                favorite_count: 0
                            })
                        }));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('IDで1件取得できないこと(他ユーザーの非公開データ)', function(done) {
                    RKZClient.getUserDetail('test', testUser2.user_access_token, testData1.id, function (userDetail) {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9011',
                            message: isIOS() ? 'API整合性エラー : ゼロ件の取得エラー' : 'API整合性エラー'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getUserDetailList', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList(undefined, testUser1.user_access_token, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList({}, testUser1.user_access_token, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('', testUser1.user_access_token, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', undefined, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', {}, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', '', null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('検索条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of searchConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ソート条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of sortConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('拡張オブジェクト検索条件', function() {
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null, {
                        show_favorite: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite_summary!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null, {
                        show_favorite_summary: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite_summary is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('全件取得できること(お気に入り情報を含まない)', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(4);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData1));
                        expect(userDetails[1]).toEqual(userDetailContaining(testData2));
                        expect(userDetails[2]).toEqual(userDetailContaining(testData3));
                        expect(userDetails[3]).toEqual(userDetailContaining(testData4));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('全件取得できること(お気に入り情報を含む)', function(done) {
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null,{
                        show_favorite: true,
                        show_favorite_summary: true
                    }, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(4);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData1, {
                            sys_favorite: jasmine.objectContaining({
                                is_favorite: false,
                                favorite_date: null
                            }),
                            sys_favorite_sum: jasmine.objectContaining({
                                favorite_count: 0
                            })
                        }));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('検索条件に一致するデータが取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.in('attributes_value', ['新規1', '新規4'])
                    ];
                    var sortConditions = [
                        RKZSortCondition.desc('code')
                    ];
                    RKZClient.getUserDetailList('test', testUser1.user_access_token, searchConditions, sortConditions, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(2);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData4));
                        expect(userDetails[1]).toEqual(userDetailContaining(testData1));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getPaginateUserDetailList', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList(undefined, testUser1.user_access_token, 1, 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList({}, testUser1.user_access_token, 1, 0,null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('', testUser1.user_access_token, 1, 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', undefined, 1, 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', {}, 1, 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', '', 1, 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得件数', function() {
                it('!==Numberの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, '1', 0, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of limit is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得開始位置', function() {
                it('!==Numberの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, '0', null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of offset is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('検索条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 0, {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of searchConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ソート条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 0, null, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of sortConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('拡張オブジェクト検索条件', function() {
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 0, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 0, null, null, {
                        show_favorite: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('show_favorite_summary!==Booleanの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 0, null, null, {
                        show_favorite_summary: ''
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of extensionAttributes.show_favorite_summary is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('ページング条件(limit, offset)が正しく設定されていること(お気に入り情報を含まない)', function(done) {
                    var sortConditions = [
                        RKZSortCondition.desc('code')
                    ];
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 2, 1, null, sortConditions, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(4);
                        expect(pagingData.limit).toBe(2);
                        expect(pagingData.offset).toBe(1);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(2);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData3));
                        expect(pagingData.datas[1]).toEqual(userDetailContaining(testData2));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('ページング条件(limit, offset)が正しく設定されていること(お気に入り情報を含む)', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.in('attributes_value', ['新規1', '新規4'])
                    ];
                    RKZClient.getPaginateUserDetailList('test', testUser1.user_access_token, 1, 1, searchConditions, null, {
                        show_favorite: true,
                        show_favorite_summary: true
                    }, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(2);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(1);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData4, {
                            sys_favorite: jasmine.objectContaining({
                                is_favorite: false,
                                favorite_date: null
                            }),
                            sys_favorite_sum: jasmine.objectContaining({
                                favorite_count: 0
                            })
                        }));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getSharedUserDetail', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail(undefined, testUser1.user_access_token, '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail({}, testUser1.user_access_token, '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('', testUser1.user_access_token, '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('test', {}, '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザー詳細ID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('test', testUser1.user_access_token, undefined, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetailId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('test', testUser1.user_access_token, {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetailId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('test', testUser1.user_access_token, '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : IDの取得に失敗しました' : 'IDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得対象の公開範囲', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetail('test', testUser1.user_access_token, testData1.id, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of visibility is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('IDで1件取得できること(他ユーザーの公開データ)', function(done) {
                    RKZClient.getSharedUserDetail('test', null, testData3.id, ['0003'], function (userDetail) {
                        expect(userDetail).toBeDefined();
                        expect(userDetail).not.toBeNull();
                        expect(userDetail).toEqual(userDetailContaining(testData3));
                        done();
                    }, function (error) {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('IDで1件取得できないこと(他ユーザーの非公開データ)', function(done) {
                    RKZClient.getSharedUserDetail('test', testUser2.user_access_token, testData1.id, ['0002'] , function (userDetail) {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9011',
                            message: isIOS() ? 'API整合性エラー : ゼロ件の取得エラー' : 'API整合性エラー'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getSharedUserDetailList', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList(undefined, testUser1.user_access_token, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList({}, testUser1.user_access_token, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList('', testUser1.user_access_token, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList('test', {}, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得対象の公開範囲', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser1.user_access_token, '', null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of visibility is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('検索条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser1.user_access_token, null, {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of searchConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ソート条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser1.user_access_token, null, null, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of sortConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('非公開データのみ取得できること', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser1.user_access_token, ['0001'], null, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(2);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData1));
                        expect(userDetails[1]).toEqual(userDetailContaining(testData4));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証必須)のみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getSharedUserDetailList('test', testUser2.user_access_token, ['0002'], searchConditions, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(1);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData2));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証不要)のみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getSharedUserDetailList('test', null, ['0003'], searchConditions, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(1);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData3));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データのみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getSharedUserDetailList('test', testUser2.user_access_token, ['0002', '0003'], searchConditions, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(2);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData2));
                        expect(userDetails[1]).toEqual(userDetailContaining(testData3));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開範囲を指定しない場合、非公開データのみ取得できること', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser1.user_access_token, null, null, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(2);
                        expect(userDetails[0]).toEqual(userDetailContaining(testData1));
                        expect(userDetails[1]).toEqual(userDetailContaining(testData4));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('他ユーザーの非公開データを取得できないこと', function(done) {
                    RKZClient.getSharedUserDetailList('test', testUser2.user_access_token, ['0001'], null, null, function (userDetails) {
                        expect(userDetails).toEqual(jasmine.any(Array));
                        expect(userDetails.length).toBe(0);
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('ユーザーアクセストークン===nullかつ公開データ(認証必須)を要求した場合、エラーになること', function(done) {
                    RKZClient.getSharedUserDetailList('test', null, ['0002'], null, null, function (userDetails) {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9002',
                            message: 'システムエラー : 公開範囲の指定が不正です。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getPaginateSharedUserDetailList', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList(undefined, testUser1.user_access_token, 1, 0, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList({}, testUser1.user_access_token, 1, 0, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('', testUser1.user_access_token, 1, 0, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', {},  1, 0,null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得件数', function() {
                it('!==Numberの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token, '1', 0, null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of limit is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得開始位置', function() {
                it('!==Numberの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token, 1, '0', null, null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of offset is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('取得対象の公開範囲', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token, 1, 0, '', null, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of visibility is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('検索条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token,  1, 0,null, {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of searchConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ソート条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token,  1, 0, null, null, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of sortConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('非公開データのみ取得できること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token,  1, 1, ['0001'], null, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(2);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(1);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData4));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証必須)のみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getPaginateSharedUserDetailList('test', testUser2.user_access_token, 1, 0, ['0002'], searchConditions, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(1);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(0);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData2));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データ(認証不要)のみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getPaginateSharedUserDetailList('test', null, 1, 0, ['0003'], searchConditions, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(1);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(0);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData3));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開データのみ取得できること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('user_no', testUser1.user_no)
                    ];
                    RKZClient.getPaginateSharedUserDetailList('test', testUser2.user_access_token, 1, 1, ['0002', '0003'], searchConditions, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(2);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(1);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData3));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開範囲を指定しない場合、非公開データのみ取得できること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser1.user_access_token, 1, 0, null, null, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(2);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(0);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(1);
                        expect(pagingData.datas[0]).toEqual(userDetailContaining(testData1));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('他ユーザーの非公開データを取得できないこと', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', testUser2.user_access_token, 1, 0, ['0001'], null, null, function (pagingData) {
                        expect(pagingData).toBeDefined();
                        expect(pagingData.result_cnt).toBe(0);
                        expect(pagingData.limit).toBe(1);
                        expect(pagingData.offset).toBe(0);
                        expect(pagingData.datas).toEqual(jasmine.any(Array));
                        expect(pagingData.datas.length).toBe(0);
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('ユーザーアクセストークン===nullかつ公開データ(認証必須)を要求した場合、エラーになること', function(done) {
                    RKZClient.getPaginateSharedUserDetailList('test', null, 1, 0, ['0002'], null, null, function (pagingData) {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9002',
                            message: 'システムエラー : 公開範囲の指定が不正です。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.editUserDetail', function() {
            describe('ユーザー詳細', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail(undefined, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    })
                }, TIMEOUT);
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail('', testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('オブジェクトID===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail({}, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail({}, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail({}, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.editUserDetail({
                        object_id: 'test'
                    }, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('正しく更新されること', function(done) {
                    RKZClient.editUserDetail({
                        object_id: testData1.object_id,
                        code: testData1.code,
                        object_sort_no: 2,
                        attributes: {
                            attributes_value: '修正',
                            attributes_date: '2017-03-01 12:34:56'
                        }
                    }, testUser1.user_access_token, function (userDetail) {
                        expect(userDetail).toBeDefined();
                        expect(userDetail).toEqual(jasmine.objectContaining({
                            object_sort_no: 2,
                            attributes: jasmine.objectContaining({
                                attributes_value: '修正',
                                attributes_date: '2017-03-01 12:34:56'
                            })
                        }));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('公開範囲を更新できること', function(done) {
                    RKZClient.editUserDetail({
                        object_id: testData4.object_id,
                        code: testData4.code,
                        visibility: '0002',
                        attributes: {}
                    }, testUser1.user_access_token, function (userDetail) {
                        expect(userDetail).toBeDefined();
                        expect(userDetail).toEqual(jasmine.objectContaining({
                            visibility: '0002'
                        }));
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.addUserDetailToFavorite', function() {
            describe('ユーザー詳細', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite(undefined, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    })
                }, TIMEOUT);
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite('', testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('オブジェクトID===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite({}, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite({}, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite({}, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.addUserDetailToFavorite({
                        object_id: 'test',
                        id: testData1.id,
                    }, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('お気に入り登録されること', function(done) {
                    RKZClient.addUserDetailToFavorite({
                        object_id: 'test',
                        id: testData1.id,
                    }, testUser1.user_access_token, function (statusCode) {
                        expect(statusCode).toBe('1001');
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.getUserDetailList (favorite)', function() {
            beforeAll(function (done) {
                // お気に入りのテストデータを登録
                var error = function () {
                    expect(false).toBeTruthy();
                    done();
                };
                // お気に入りの更新順ソートは秒単位で行うため、1秒遅延させる
                setTimeout(function () {
                    RKZClient.addUserDetailToFavorite({ object_id: 'test', id: testData3.id }, testUser1.user_access_token, function (statusCode) {
                        expect(statusCode).toBe('1001');

                        setTimeout(function () {
                            RKZClient.addUserDetailToFavorite({ object_id: 'test', id: testData4.id }, testUser1.user_access_token, function (statusCode) {
                                expect(statusCode).toBe('1001');

                                RKZClient.addUserDetailToFavorite({ object_id: 'test', id: testData4.id }, testUser2.user_access_token, function (statusCode) {
                                    expect(statusCode).toBe('1001');
                                    done();
                                }, error);
                            }, error);
                        }, 1000);
                    }, error);
                }, 1000);
            });
            it('お気に入り情報、お気に入りサマリ情報が取得できること', function(done) {
                var sortConditions = [
                  RKZSortCondition.asc('code')
                ];
                RKZClient.getUserDetailList('test', testUser1.user_access_token, null, sortConditions,{
                    show_favorite: true,
                    show_favorite_summary: true
                }, function (userDetails) {
                    expect(userDetails).toEqual(jasmine.any(Array));
                    expect(userDetails.length).toBe(4);
                    expect(userDetails[0]).toEqual(jasmine.objectContaining({
                        code: testData1.code,
                        sys_favorite: jasmine.objectContaining({
                            is_favorite: true,
                            favorite_date: jasmine.stringMatching(JST_FULL_DATE_TIME_PATTERN)
                        }),
                        sys_favorite_sum: jasmine.objectContaining({
                            favorite_count: 1
                        })
                    }));
                    expect(userDetails[1]).toEqual(jasmine.objectContaining({
                        code: testData2.code,
                        sys_favorite: jasmine.objectContaining({
                            is_favorite: false,
                            favorite_date: null
                        }),
                        sys_favorite_sum: jasmine.objectContaining({
                            favorite_count: 0
                        })
                    }));
                    expect(userDetails[2]).toEqual(jasmine.objectContaining({
                        code: testData3.code,
                        sys_favorite: jasmine.objectContaining({
                            is_favorite: true,
                            favorite_date: jasmine.stringMatching(JST_FULL_DATE_TIME_PATTERN)
                        }),
                        sys_favorite_sum: jasmine.objectContaining({
                            favorite_count: 1
                        })
                    }));
                    expect(userDetails[3]).toEqual(jasmine.objectContaining({
                        code: testData4.code,
                        sys_favorite: jasmine.objectContaining({
                            is_favorite: true,
                            favorite_date: jasmine.stringMatching(JST_FULL_DATE_TIME_PATTERN)
                        }),
                        sys_favorite_sum: jasmine.objectContaining({
                            favorite_count: 2
                        })
                    }));
                    done();
                }, function () {
                    expect(false).toBeTruthy();
                    done();
                });
            }, TIMEOUT);
            it('自身がお気に入り登録しているデータのみ', function(done) {
                var searchConditions = [
                    RKZSearchCondition.withFavorite.myFavoriteOnly()
                ];
                var sortConditions = [
                    RKZSortCondition.asc('code')
                ];
                RKZClient.getUserDetailList('test', testUser1.user_access_token, searchConditions, sortConditions,{
                    show_favorite: true,
                    show_favorite_summary: true
                }, function (userDetails) {
                    expect(userDetails).toEqual(jasmine.any(Array));
                    expect(userDetails.length).toBe(3);
                    expect(userDetails[0].code).toBe(testData1.code);
                    expect(userDetails[1].code).toBe(testData3.code);
                    expect(userDetails[2].code).toBe(testData4.code);
                    done();
                }, function () {
                    expect(false).toBeTruthy();
                    done();
                });
            }, TIMEOUT);
            it('お気に入り件数でソートされていること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.withFavorite.myFavoriteOnly()
                ];
                var sortConditions = [
                    RKZSortCondition.withFavorite.favoriteCount.desc()
                ];
                RKZClient.getUserDetailList('test', testUser1.user_access_token, searchConditions, sortConditions,{
                    show_favorite: true,
                    show_favorite_summary: true
                }, function (userDetails) {
                    expect(userDetails).toEqual(jasmine.any(Array));
                    expect(userDetails.length).toBe(3);
                    expect(userDetails[0].code).toBe(testData4.code); // 2件
                    expect(userDetails[1].code).toBe(testData1.code); // 1件
                    expect(userDetails[2].code).toBe(testData3.code); // 1件
                    done();
                }, function () {
                    expect(false).toBeTruthy();
                    done();
                });
            }, TIMEOUT);
            it('お気に入り更新順(降順)でソートされていること', function(done) {
                var searchConditions = [
                    RKZSearchCondition.withFavorite.myFavoriteOnly()
                ];
                var sortConditions = [
                    RKZSortCondition.withFavorite.updateDate.desc()
                ];
                RKZClient.getUserDetailList('test', testUser1.user_access_token, searchConditions, sortConditions,{
                    show_favorite: true,
                    show_favorite_summary: true
                }, function (userDetails) {
                    expect(userDetails).toEqual(jasmine.any(Array));
                    expect(userDetails.length).toBe(3);
                    expect(userDetails[0].code).toBe(testData4.code);
                    expect(userDetails[1].code).toBe(testData3.code);
                    expect(userDetails[2].code).toBe(testData1.code);
                    done();
                }, function () {
                    expect(false).toBeTruthy();
                    done();
                });
            }, TIMEOUT);
        });

        describe('RKZClient.deleteUserDetailFromFavorite', function() {
            describe('ユーザー詳細', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite(undefined, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    })
                }, TIMEOUT);
                it('!==Objectの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite('', testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userDetail is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('オブジェクトID===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite({}, testUser1.user_access_token, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite({}, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite({}, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite({
                        object_id: 'test',
                        id: testData1.id
                    }, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('お気に入り削除されること', function(done) {
                    RKZClient.deleteUserDetailFromFavorite({
                        object_id: 'test',
                        id: testData1.id,
                    }, testUser1.user_access_token, function (statusCode) {
                        expect(statusCode).toBe('1001');
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });

        describe('RKZClient.deleteUserDetail', function() {
            describe('オブジェクトID', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail(undefined, testUser1.user_access_token, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail({}, testUser1.user_access_token, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of objectId is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail('', testUser1.user_access_token, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : オブジェクトIDの取得に失敗しました' : 'オブジェクトIDがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('ユーザーアクセストークン', function() {
                it('===undefinedの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail('test', undefined, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('!==Stringの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail('test', {}, null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of userAccessToken is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
                it('===""の場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail('test', '', null, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: '9020',
                            message: isIOS() ? '必須入力チェックエラー : ユーザーアクセストークンの取得に失敗しました' : 'ユーザアクセストークンがありません。'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('検索条件', function() {
                it('!==Arrayの場合、エラーとなること', function(done) {
                    RKZClient.deleteUserDetail('test', testUser1.user_access_token, {}, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of searchConditions is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });

            describe('正常な値の場合', function() {
                it('指定した条件のデータが削除されること', function(done) {
                    var searchConditions = [
                        RKZSearchCondition.equal('code', testData1.code)
                    ];
                    RKZClient.deleteUserDetail('test', testUser1.user_access_token, searchConditions, function (deleteCount) {
                        expect(deleteCount).toBe(1);
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
                it('条件を指定しない場合、全件削除されること', function(done) {
                    RKZClient.deleteUserDetail('test', testUser1.user_access_token, null, function (deleteCount) {
                        expect(deleteCount).toBe(3);

                        RKZClient.getUserDetailList('test', testUser1.user_access_token, null, null, function (userDetails) {
                            expect(userDetails).toEqual(jasmine.any(Array));
                            expect(userDetails.length).toBe(0);
                            done();
                        }, function () {
                            expect(false).toBeTruthy();
                            done();
                        });
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    });
                }, TIMEOUT);
            });
        });
    });
};
