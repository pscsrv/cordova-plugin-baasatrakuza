![BaaS@rakuza](http://www.raku-za.jp/baas/images/baasatrakuza_logo.png)

# cordova-plugin-baasatrakuza

CordovaやMonacaで開発するアプリからBaaS@rakuzaを利用するためのCordovaプラグインです。

BaaS@rakuzaのご利用については [BaaS@rakuza製品サイト](http://www.raku-za.jp/baas/) をご確認ください。

サポートされるBaaS@rakuzaのバージョンは以下の通りです。

|プラグイン バージョン|BaaS@rakuza SDK バージョン|BaaS@rakuza バージョン|
|:-:|:-:|:-:|
|:new: 1.5.0|2.5.0, 2.4.0|2.3.x, 2.4.x, 2.5.x|
|1.4.0|2.4.0, 2.3.0|2.3.x, 2.4.x, 2.5.x|
|1.3.0|2.3.0, 2.2.2|2.3.x, 2.4.x, 2.5.x|
|1.2.2|2.2.2, 2.2.2|2.3.x, 2.4.x, 2.5.x|
|1.2.1|2.2.1, 2.2.1|2.3.x, 2.4.x, 2.5.x|
|1.2.0|2.2.0, 2.2.0|2.3.x, 2.4.x, 2.5.x|
|1.1.2|2.1.0, 2.1.1|2.1.0, 2.2.0|
|1.1.1|2.1.0, 2.1.1|2.1.0, 2.2.0|
|1.1.0|2.1.0|2.1.0, 2.2.0|
|1.0.3|2.0.0, 2.0.1|2.0.0|
|1.0.2|2.0.0, 2.0.1|2.0.0|
|1.0.1|2.0.0, 2.0.1|2.0.0|
|1.0.0|2.0.0|2.0.0|

各バージョン毎の変更履歴につきましては、[リリースノート](https://github.com/pscsrv/cordova-plugin-baasatrakuza/wiki/ReleaseNote) を参照ください。

## インストール方法

### Cordovaでのインストール方法

    cordova plugin add https://github.com/pscsrv/cordova-plugin-baasatrakuza

### Monacaでのインストール方法

Monaca IDE から `Cordovaプラグインの管理...`を開き、利用可能なプラグンより `BaaS@rakuza` を選択して `有効` ボタンをクリックしてください。

## サポートプラットフォーム

- Android
- iOS

## リファレンス

BaaS@rakuzaのリファレンスは[こちら](../../wiki)を参考して下さい。

## 簡単な使用例

### テナント認証キーを設定して、BaaS@rakuzaとの接続を行う。

```js
RKZClient.setTenantKey("my.tenant.id",
    function() {
        // 成功時の処理
    }, function(error) {
        // 失敗時の処理
        console.log("認証失敗");
    });
```

### アプリユーザーを登録して、デバイストークンを登録する。

```js
// プッシュ通知初期設定
pushNotification = PushNotification.init({
    android: {
        senderID:　"ex:1234567890"
    },
    ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
    }
});

var user = {
    name : "ピープル　太郎",
    tel : "086-426-5930"
};

RKZClient.registUser(user,
    function(userInfo) {

        // ユーザー登録が完了したので、プッシュデバイストークンを取得してデバイストークンを設定する
        pushNotification.on('registration',
            function(data) {

                // dataにプッシュ通知のIDが格納される。
                RKZClient.registPushDeviceToken(userInfo.user_access_token,
                    data.registrationId,
                    function(statusCode) {

                        // デバイストークンの登録成功
                        console.log("SUCCESS!!!");

                        // プッシュ通知のイベントを登録〜
                            :

                    }, function(error) {
                        console.log("ユーザーデバイストークン登録失敗");
                    });
            });
    }, function(error) {
        console.log("ユーザー登録失敗");
    });
```

:warning: デバイストークンを取得するために、[PushPlugin](https://github.com/phonegap/phonegap-plugin-push)を利用しています。
