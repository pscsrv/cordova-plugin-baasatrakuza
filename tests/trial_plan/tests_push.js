var TIMEOUT = 30000;
var USER_ACCESS_TOKEN = '';
var PUSH_NO = null;

function isIOS() {
    return cordova.platformId === 'ios';
}

exports.suite = function(helper) {
    describe('Testing for push', function() {
        describe('RKZClient.openPush', function() {
            describe('ユーザーアクセストークン', function () {
                it('===undefinedの場合、エラーとなること', function (done) {
                    RKZClient.openPush(undefined, PUSH_NO, function () {
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
                    RKZClient.openPush({}, PUSH_NO, function () {
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
                    RKZClient.openPush('', PUSH_NO, function () {
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
            describe('プッシュ番号', function () {
                it('===undefinedの場合、エラーとなること', function (done) {
                    RKZClient.openPush(USER_ACCESS_TOKEN, undefined, function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of pushNo is not correct.'
                        }));
                        done();
                    })
                }, TIMEOUT);
                it('!==Numberの場合、エラーとなること', function(done) {
                    RKZClient.openPush(USER_ACCESS_TOKEN, '', function () {
                        expect(false).toBeTruthy();
                        done();
                    }, function (error) {
                        expect(error).toBeDefined();
                        expect(error).toEqual(jasmine.objectContaining({
                            status_code: 'CDVE0001',
                            message: 'Type of pushNo is not correct.'
                        }));
                        done();
                    });
                }, TIMEOUT);
            });
            describe('正常な値の場合', function() {
                it('開封済みにできること', function (done) {
                    RKZClient.openPush(USER_ACCESS_TOKEN, PUSH_NO, function (statusCode) {
                        expect(statusCode).toBeDefined();
                        expect(statusCode).toEqual('1001');
                        done();
                    }, function () {
                        expect(false).toBeTruthy();
                        done();
                    })
                }, TIMEOUT);
            });
        });
    });
};
