![BaaS@rakuza](http://www.raku-za.jp/baas/images/baasatrakuza_logo.png)

# cordova-plugin-baasatrakuza

CordovaやMonacaで開発するアプリからBaaS@rakuzaを利用するためのCordovaプラグインです。

BaaS@rakuzaのご利用については [BaaS@rakuza製品サイト](http://www.raku-za.jp/baas/) をご確認ください。

サポートされるBaaS@rakuzaのバージョンは以下の通りです。

|プラグイン バージョン|BaaS@rakuza SDK バージョン|BaaS@rakuza バージョン|
|:-:|:-:|:-:|
|1.0.3|2.0.0, 2.0.1|2.0.0|
|1.0.2|2.0.0, 2.0.1|2.0.0|
|1.0.1|2.0.0, 2.0.1|2.0.0|
|1.0.0|2.0.0|2.0.0|

## Cordovaでのインストール方法

    cordova plugin add https://github.com/pscsrv/cordova-plugin-baasatrakuza

## Monacaでのインストール方法

Monaca IDE から `Cordovaプラグインの管理...`を開き、利用可能なプラグンより `BaaS@rakuza` を選択して `有効` ボタンをクリックしてください。

## サポートプラットフォーム

- Android
- iOS


## リファレンス

### INDEX
* [RKZClientクラス](#rkzclientクラス)
    * [システムAPI](#システムapi)
        * [setTenantKeyメソッド](#settenantkeyメソッド)
        * [getSystemDateメソッド](#getsystemdateメソッド)
    * [アプリケーション設定情報API](#アプリケーション設定情報api)
        * [getApplicationSettingDataメソッド](#getapplicationsettingdataメソッド)
    * [データ管理API](#データ管理api)
        * [getDataListメソッド](#getdatalistメソッド)
        * [getDataメソッド](#getdataメソッド)
        * [addDataメソッド](#adddataメソッド)
        * [editDataメソッド](#editdataメソッド)
        * [deleteDataメソッド](#deletedataメソッド)
    * [ユーザー管理API](#ユーザー管理api)
        * [registUserメソッド](#registuserメソッド)
        * [getUserメソッド](#getuserメソッド)
        * [editUserメソッド](#edituserメソッド)
        * [editPasswordメソッド](#editpasswordメソッド)
        * [registModelChangeCodeメソッド](#registmodelchangecodeメソッド)
        * [authModelChangeメソッド](#authmodelchangeメソッド)
        * [userAuthメソッド](#userauthメソッド)
    * [コンタクト管理API](#コンタクト管理api)
        * [getContactListメソッド](#getcontactlistメソッド)
        * [addContactメソッド](#addcontactメソッド)
    * [お知らせ管理API](#お知らせ管理api)
        * [getNewsListメソッド](#getnewslistメソッド)
        * [getReleasedNewsListメソッド](#getreleasednewslistメソッド)
        * [getNewsメソッド](#getnewsメソッド)
        * [getNewsReadHistoryListメソッド](#getnewsreadhistorylistメソッド)
        * [getNewsReadHistoryメソッド](#getnewsreadhistoryメソッド)
        * [registNewsReadHistoryメソッド](#registnewsreadhistoryメソッド)
    * [プッシュ管理API](#プッシュ管理api)
        * [registPushDeviceTokenメソッド](#registpushdevicetokenメソッド)
    * [ビーコン管理API](#ビーコン管理api)
        * [getBeaconListメソッド](#getbeaconlistメソッド)
        * [getSpotListメソッド](#getspotlistメソッド)
        * [addDetectBeaconContactメソッド](#adddetectbeaconcontactメソッド)
        * [getDetectBeaconContactメソッド](#getdetectbeaconcontactメソッド)
    * [クーポン管理API](#クーポン管理api)
        * [getCouponListメソッド](#getcouponlistメソッド)
        * [getCouponメソッド](#getcouponメソッド)
        * [exchangeCouponメソッド](#exchangecouponメソッド)
        * [getMyCouponListメソッド](#getmycouponlistメソッド)
        * [getMyCouponメソッド](#getmycouponメソッド)
        * [useMyCouponメソッド](#usemycouponメソッド)
    * [ポイント管理API](#ポイント管理api)
        * [getPointメソッド](#getpointメソッド)
        * [addPointメソッド](#addpointメソッド)
* [RKZSearchConditionクラス](#rkzsearchconditionクラス)
    * [検索条件設定API](#検索条件設定api)
        * [equalメソッド](#equalメソッド)
        * [notEqualメソッド](#notequalメソッド)
        * [inメソッド](#inメソッド)
        * [notInメソッド](#notinメソッド)
        * [lessThanIncludeメソッド](#lessthanincludeメソッド)
        * [greaterThanIncludeメソッド](#greaterthanincludeメソッド)
        * [betweenIncludeメソッド](#betweenincludeメソッド)
        * [betweenExcludeメソッド](#betweenexcludeメソッド)
        * [likeBeforeメソッド](#likebeforeメソッド)
        * [likeAfterメソッド](#likeafterメソッド)
        * [likeBothメソッド](#likebothメソッド)
        * [likeOrメソッド](#likeorメソッド)
        * [notEqualメソッド](#notequalメソッド)
        * [notEqualメソッド](#notequalメソッド)
* [RKZSortConditionクラス](#rkzsortconditionクラス)
    * [ソート条件設定API](#ソート条件設定api)
        * [ascメソッド](#ascメソッド)
        * [descメソッド](#descメソッド)
* [エラー処理](#エラー処理)
    * [失敗時のコールバック関数](#失敗時のコールバック関数)
* [各種情報オブジェクト](#各種情報オブジェクト)
    * [汎用データプロパティ](#汎用データプロパティ)
    * [アプリケーション設定情報オブジェクト](#アプリケーション設定情報オブジェクト)
    * [オブジェクトデータ情報オブジェクト](#オブジェクトデータ情報オブジェクト)
    * [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)
    * [コンタクト情報オブジェクト](#コンタクト情報オブジェクト)
    * [お知らせ情報オブジェクト](#お知らせ情報オブジェクト)
    * [お知らせ既読情報オブジェクト](#お知らせ既読情報オブジェクト)
    * [ビーコン情報オブジェクト](#ビーコン情報オブジェクト)
    * [スポット情報オブジェクト](#スポット情報オブジェクト)
    * [ビーコン検知コンタクト情報オブジェクト](#ビーコン検知コンタクト情報オブジェクト)
    * [クーポン情報オブジェクト](#クーポン情報オブジェクト)
    * [マイクーポン情報オブジェクト](#マイクーポン情報オブジェクト)
    * [エラー情報オブジェクト](#エラー情報オブジェクト)

## RKZClientクラス

プラグインのメインとなるクラスで、BaaS@rakuzaとの接続および操作を行うAPIを提供します。

### システムAPI

#### setTenantKeyメソッド

テナント認証キーを設定してBaaS@rakuzaとの接続を行います。

RKZClientクラスの各APIメソッドを呼び出す前に、setTenantKeyメソッドを呼び出してSDKを利用可能な状態にします。

:warning: 本メソッドはCordovaの初期化が完了(devicereadyイベントが発火)した後に呼び出してください。
また、Onsen UIを利用している場合はOnsen UIコンポーネントの初期化が完了(ons.readyイベントが発火)した後に呼び出してください。

```js
RKZClient.setTenantKey(tenantKey, success, error);
```

* **tenantKey**: `String` テナント認証キー (必須)
* **success**: `function` 成功時コールバック関数

    ```js
    function() {
        // 成功時の処理
    }
    ```

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getSystemDateメソッド

BaaS@rakuzaのサーバー側システム日付を取得します。

:information_source: BaaS@rakuzaのタイムゾーンは JST です。

```js
RKZClient.getSystemDate(success, error);
```

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```
    * **data**: `Date` システム日付

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### アプリケーション設定情報API

#### getApplicationSettingDataメソッド

BaaS@rakuzaに設定したアプリケーション設定情報を取得します。

```js
RKZClient.getApplicationSettingData(success, error);
```

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [アプリケーション設定情報オブジェクト](#アプリケーション設定情報オブジェクト)


* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### データ管理API

#### getDataListメソッド

BaaS@rakuzaに設定されているオブジェクトのデータを、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getDataList(objectId, searchConditions, sortConditions, success, error);
```

* **objectId**: `String` オブジェクトID (必須)

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [オブジェクトデータ情報オブジェクト](#オブジェクトデータ情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getDataメソッド

BaaS@rakuzaに設定されているオブジェクトのデータを、コードを指定して一件取得します。

```js
RKZClient.getData(objectId, code, success, error);
```

* **objectId**: `String` オブジェクトID (必須)

* **code**: `String` コード (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [オブジェクトデータ情報オブジェクト](#オブジェクトデータ情報オブジェクト)

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### addDataメソッド

BaaS@rakuzaに設定されているオブジェクトにデータを追加します。

```js
RKZClient.addData(data, success, error);
```

* **data**: `Object` [オブジェクトデータ情報オブジェクト](#オブジェクトデータ情報オブジェクト)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### editDataメソッド

BaaS@rakuzaに設定されているオブジェクトのデータを、コードを指定して一件更新します。

```js
RKZClient.editData(data, success, error);
```

* **data**: `Object` [オブジェクトデータ情報オブジェクト](#オブジェクトデータ情報オブジェクト)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### deleteDataメソッド

BaaS@rakuzaに設定されているオブジェクトのデータを、検索条件を指定して削除します。

```js
RKZClient.deleteData(objectId, searchConditions, success, error);
```

* **objectId**: `String` オブジェクトID (必須)

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    削除条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(deleteCount) {
        // 成功時の処理
    }
    ```

    * **deleteCount**: `Number` 削除データ件数

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### ユーザー管理API

#### registUserメソッド

ユーザー情報を登録します。

登録に成功すると各種APIの認証で使用するユーザーアクセストークンが発行されます。

:warning: ユーザーアクセストークンはアプリ側で恒久的に保存するようにしてください。

```js
RKZClient.registUser(data, success, error);
```

* **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

    登録内容を設定したユーザー情報オブジェクトを指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

        登録後の最新ユーザー情報オブジェクトが返却されます。

        :information_source: 発行されたユーザーアクセストークンが設定されています。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getUserメソッド

ユーザー情報を取得します。

```js
RKZClient.editUser(userAccessToken, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン （必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

        ユーザー情報が返却されます。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### editUserメソッド

ユーザー情報を編集します。

```js
RKZClient.editUser(data, success, error);
```

* **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

    編集内容を設定したユーザー情報オブジェクトを指定します。

    :warning: 指定するユーザー情報オブジェクトには必ずユーザーアクセストークンを設定してください。

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

        編集後の最新ユーザー情報が返却されます。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### editPasswordメソッド

パスワードを変更します。

```js
RKZClient.editPassword(userAccessToken, nowPassword, newPassword, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン （必須)

* **nowPassword**: `String` 変更前パスワード （必須)

* **newPassword**: `String` 変更後パスワード （必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### registModelChangeCodeメソッド

機種変更登録情報を指定して、機種変更認証コードの発行を行います。

```js
RKZClient.registModelChangeCode(userAccessToken, params, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン （必須)

* **params**: `Object` 機種変更登録情報オブジェクト

    機種変更の登録情報を設定します。

    ```js
    {
        password: "password",
        limit_code: 10,
        limit_minute: 1440
    }
    ```
    * **password** `String` 認証パスワード

        機種変更認証パスワードを指定します。

        任意のパスワードが設定できます。

        :information_source: 未設定の場合、機種変更認証時に機種変更認証パスワードが不要になります。

    * **limit_code** `Number` 認証コード桁数

        発行する機種変更認証コードの桁数を指定します。

        :information_source: 未設定の場合、システム規定の桁数(5桁)で発行されます。

    * **limit_minute** `Number` 認証コード有効時間(分)

        発行する機種変更認証コードの有効時間を分で指定します。

        :information_source: 未設定の場合、有効時間は1440分(24時間)で発行されます。

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` 機種変更認証情報オブジェクト

        機種変更の認証情報が返却されます。

        ```js
        {
            model_change_code: "abcde",
            limit_date: "2017-01-23 22:59:21+0900"
        }
        ```

        * **model_change_code** `String` 機種変更認証コード

            発行された機種変更認証コードが設定されています。

        * **limit_date** `Date` 認証認証コード有効期限

            発行された機種変更認証コードの有効期限が設定されています。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### authModelChangeメソッド

機種変更認証コードの認証を行います。

:warning: 認証が成功するとユーザーアクセストークンが新しく発行され、古いユーザーアクセストークンは使用できなくなります。

```js
RKZClient.authModelChange(modelChangeCode, password, success, error);
```

* **modelChangeCode**: `String` 機種変更認証コード （必須)

* **password**: `String` 機種変更認証パスワード

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

        認証されたユーザー情報オブジェクトが返却されます。

        :information_source: 新しく発行されたユーザーアクセストークンが設定されています。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### userAuthメソッド

ログイン情報でのユーザー認証を行います。

```js
RKZClient.userAuth(loginId, password, success, error);
```

* **loginId**: `String` ログインID （必須)

* **password**: `String` パスワード （必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [ユーザー情報オブジェクト](#ユーザー情報オブジェクト)

        認証されたユーザー情報オブジェクトが返却されます。

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### コンタクト管理API

#### getContactListメソッド

ユーザーのコンタクト情報をリストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getContactList(userAccessToken, searchConditions, sortConditions, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [コンタクト情報オブジェクト](#コンタクト情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### addContactメソッド

ユーザーのコンタクト情報を追加します。

```js
RKZClient.addData(userAccessToken, data, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **data**: `Object` [コンタクト情報オブジェクト](#コンタクト情報オブジェクト)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### お知らせ管理API

#### getNewsListメソッド

全てのお知らせ情報を、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getNewsList(limit, searchConditions, sortConditions, success, error);
```

* **limit**: `Number` 取得件数

    取得件数の上限値を指定します。

    すべてを取得する場合はnullを指定します。

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [お知らせ情報オブジェクト](#お知らせ情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getReleasedNewsListメソッド

公開中のお知らせ情報のみを、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getReleasedNewsList(limit, searchConditions, sortConditions, success, error);
```

* **limit**: `Number` 取得件数

    取得件数の上限値を指定します。

    すべてを取得する場合はnullを指定します。

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [お知らせ情報オブジェクト](#お知らせ情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getNewsメソッド

お知らせ情報のキー情報を指定してお知らせ情報を一件取得します。

```js
RKZClient.getNews(params, success, error);
```

* **params**: `Object` お知らせキー情報オブジェクト

    ```js
    {
        news_id: "1",
        tenant_id: "99999"
    }
    ```

    * **news_id** `String` お知らせID (必須)

    * **tenant_id** `String` テナントID

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [お知らせ情報オブジェクト](#お知らせ情報オブジェクト)

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getNewsReadHistoryListメソッド

ユーザーのお知らせ既読情報を全件取得します。

```js
RKZClient.getNewsReadHistoryList(userAccessToken, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [お知らせ既読情報オブジェクト](#お知らせ既読情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getNewsReadHistoryメソッド

お知らせ情報のキー情報を指定して、ユーザーのお知らせ既読情報を一件取得します。

```js
RKZClient.getNewsReadHistory(params, userAccessToken, success, error);
```

* **params**: `Object` お知らせキー情報オブジェクト

    ```js
    {
        news_id: "1",
        tenant_id: "99999"
    }
    ```

    * **news_id** `String` お知らせID (必須)

    * **tenant_id** `String` テナントID

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [お知らせ既読情報オブジェクト](#お知らせ既読情報オブジェクト)

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### registNewsReadHistoryメソッド

お知らせ既読情報の登録を行います。

```js
RKZClient.registNewsReadHistory(params, userAccessToken, success, error);
```

* **params**: `Object` お知らせ既読情報オブジェクト

    既読にする対象のお知らせ情報を設定します。

    ```js
    {
        news_id: "1",
        tenant_id: "",
        read_date: "2017-01-24 13:00:00+0900"
    }
    ```
    * **news_id** `String` お知らせID (必須)
    * **tenant_id** `String` テナントID
    * **read_date** `Date` 既読日時

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### プッシュ管理API

#### registPushDeviceTokenメソッド

プッシュデバイストークンを登録します。

```js
RKZClient.registPushDeviceToken(userAccessToken, deviceToken, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **deviceToken**: `String` デバイストークン (必須)

    プッシュ通知に使用するデバイストークンを指定します。

    :information_source: デバイストークンは別途プラグインを導入するなどで取得をお願いします。

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### ビーコン管理API

#### getBeaconListメソッド

全てのビーコン端末情報を、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getBeaconList(searchConditions, sortConditions, success, error);
```

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [ビーコン端末情報オブジェクト](#ビーコン端末情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getSpotListメソッド

全てのスポット情報を、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getSpotList(searchConditions, sortConditions, success, error);
```

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [スポット情報オブジェクト](#スポット情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### addDetectBeaconContactメソッド

ユーザーのコンタクト情報にビーコン検知コンタクトを追加します。

```js
RKZClient.addDetectBeaconContact(userAccessToken, beaconId, beaconSpotCode, rssi, detectBeaconDatetime, remarks, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **beaconId**: `String` ビーコンID (必須)

* **beaconSpotCode**: `String` スポットコード (必須)

* **rssi**: `Number` 検知電波強度 (必須)

* **detectBeaconDatetime**: `Date` ビーコン検知日時 (必須)

* **remarks**: `String` 備考

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getDetectBeaconContactメソッド

ユーザーのコンタクト情報からビーコン検知コンタクトを取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getDetectBeaconContact(userAccessToken, searchConditions, sortConditions, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [ビーコン検知コンタクト情報オブジェクト](#ビーコン検知コンタクト情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### クーポン管理API

#### getCouponListメソッド

全てのクーポン情報を、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getCouponList(searchConditions, sortConditions, success, error);
```

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [クーポン情報オブジェクト](#クーポン情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getCouponメソッド

クーポンコードを指定してクーポン情報を一件取得します。

```js
RKZClient.getCoupon(couponCd, success, error);
```

* **couponCd**: `String` クーポンコード (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [クーポン情報オブジェクト](#クーポン情報オブジェクト)

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### exchangeCouponメソッド

クーポンコードを指定してマイクーポンを発行します。

クーポン交換ポイントが設定されている場合は、ユーザーのポイントから自動的に減算されます。

```js
RKZClient.exchangeCoupon(userAccessToken, couponCd, quantity, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **couponCd**: `String` クーポンコード (必須)

* **quantity**: `Number` 数量 (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getMyCouponListメソッド

ユーザーの全てのマイクーポン情報を、リストで複数件取得します。

検索条件およびソート条件を指定して取得することも可能です。

```js
RKZClient.getMyCouponList(userAccessToken, searchConditions, sortConditions, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **searchConditions**: `Array` [RKZSearchConditionオブジェクト](#rkzsearchconditionクラス)の配列

    検索条件を指定します。

* **sortConditions**: `Array` [RKZSortConditionオブジェクト](#rkzsortconditionクラス)の配列

    ソート条件を指定します。

* **success**: `function` 成功時コールバック関数

    ```js
    function(datas) {
        // 成功時の処理
    }
    ```

    * **datas**: `Array` [マイクーポン情報オブジェクト](#マイクーポン情報オブジェクト)の配列

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### getMyCouponメソッド

マイクーポンコードを指定してマイクーポン情報を一件取得します。

```js
RKZClient.getMyCoupon(userAccessToken, couponCd, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **couponCd**: `String` マイクーポンコード (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` [マイクーポン情報オブジェクト](#マイクーポン情報オブジェクト)

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### useMyCouponメソッド

マイクーポン情報のキー情報を指定して、マイクーポン情報を使用済にします。

```js
RKZClient.useMyCoupon(userAccessToken, myCoupon, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **myCoupon**: `Object` マイクーポンコード (必須)

    ```js
    {
        code: "5",
        coupon_cd: "0001"
    }
    ```

    * **code** `String` マイクーポンコード (必須)

    * **coupon_cd** `String` クーポンコード (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(statusCode) {
        // 成功時の処理
    }
    ```

    * **statusCode**: `String` 正常終了のステータスコード

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

### ポイント管理API

#### getPointメソッド

ユーザーが保持しているポイント情報を取得します。

```js
RKZClient.getPoint(userAccessToken, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` ポイント情報オブジェクト

        ```js
        {
            point: 10
        }
        ```
        * **point** `Number` ポイント数

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

#### addPointメソッド

ユーザーがへポイントの付与を行います。

```js
RKZClient.addPoint(userAccessToken, point, addDate, success, error);
```

* **userAccessToken**: `String` ユーザーアクセストークン (必須)

* **point**: `Number` ポイント (必須)

    加算するポイントを指定します。

    負の値を指定することでポイントの減算も行えます。

* **addDate**: `Date` ポイント追加日 (必須)

* **success**: `function` 成功時コールバック関数

    ```js
    function(data) {
        // 成功時の処理
    }
    ```

    * **data**: `Object` ポイント情報オブジェクト

        加算・減算後の最新ポイント情報が返却されます。

        ```js
        {
            point: 10
        }
        ```
        * **point** `Number` ポイント数

* **error**: `function` [失敗時のコールバック関数](#失敗時のコールバック関数)

## エラー処理

### 失敗時のコールバック関数

各APIでエラーが発生した場合は、指定したコールバック関数が呼び出されます。

コールバック関数のパラメータで渡されるエラー情報オブジェクトの内容を確認してください。

```js
function(error) {
    // エラー時の処理
}
```

* **error**: `Object` [エラー情報オブジェクト](#エラー情報オブジェクト)

## RKZSearchConditionクラス

各種情報の取得APIで指定する検索条件を設定・操作するオブジェクトです。

APIでの検索条件の指定は、各種の検索条件設定メソッドで返されるRKZSearchConditionオブジェクトを指定します。

配列で複数の検索条件を設定した場合、AND条件の指定となります。

```js
var searchCondition = [
    RKZSearchCondition.in("code", ["0001", "0003"]),
    RKZSearchCondition.likeBefore("name", "サンプル"),
];
```

### 検索条件設定API

#### equalメソッド

一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.equal(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件値の値を設定します。

#### notEqualメソッド

不一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.notEqual(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件値の値を設定します。

#### inメソッド

要素リスト一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.in(columnName, values);
```
* **columnName**: `String` 項目名称
* **values**: `Array` 条件値(`String`)の配列

    条件値の要素リストを設定します。

#### notInメソッド

要素リスト不一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.notIn(columnName, values);
```
* **columnName**: `String` 項目名称
* **values**: `Array` 条件値(`String`)の配列

    条件値の要素リストを設定します。

#### lessThanIncludeメソッド

条件値以下の検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.lessThanInclude(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件の値を設定します。

#### greaterThanIncludeメソッド

条件値以上の検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.greaterThanInclude(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件の値を設定します。

#### betweenIncludeメソッド

範囲検索条件を設定したRKZSearchConditionオブジェクトを返します。

:warning:条件値を含んだ範囲検索条件が設定されます。

```js
RKZSearchCondition.betweenInclude(columnName, values);
```
* **columnName**: `String` 項目名称
* **values**: `Array` 条件値(`String`)の配列

    範囲指定最小値と範囲指定最大値を設定します。

#### betweenExcludeメソッド

範囲検索条件を設定したRKZSearchConditionオブジェクトを返します。

:warning:条件値を含まない範囲検索条件が設定されます。

```js
RKZSearchCondition.betweenExclude(columnName, values);
```

* **columnName**: `String` 項目名称
* **values**: `Array` 条件値(`String`)の配列

    範囲指定最小値と範囲指定最大値を設定します。

#### likeBeforeメソッド

前方一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.likeBefore(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件に指定する値を設定します。

    :warning: ワイルドカードを含めないでください。

#### likeAfterメソッド

後方一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.likeAfter(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件の値を設定します。

    :warning: ワイルドカードを含めないでください。

#### likeBothメソッド

中間一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

```js
RKZSearchCondition.likeBoth(columnName, value);
```

* **columnName**: `String` 項目名称
* **value**: `String` 条件値

    条件の値を設定します。

    :warning: ワイルドカードを含めないでください。

#### likeOrメソッド

チェックボックス項目の要素リスト一致検索条件を設定したRKZSearchConditionオブジェクトを返します。

:warning: 表示タイプにチェックボックスを指定した項目専用です。その他の表示タイプでは使用しないでください。

```js
RKZSearchCondition.likeOr(columnName, values);
```

* **columnName**: `String` 項目名称
* **values**: `Array` 条件値(`String`)の配列

    条件値の要素リストを設定します。

## RKZSortConditionクラス

各種情報の取得APIで指定するソート条件を設定・操作するオブジェクトです。

APIでのソート条件の指定は、ソート条件設定メソッドで返されるRKZSortConditionオブジェクトを指定します。

配列で複数のソート条件を設定した場合、配列の先頭から優先順位が決定されます。

```js
var sortCondition = [
    RKZSortCondition.asc("name"),
    RKZSortCondition.desc("code"),
];
```

### ソート条件設定API

#### ascメソッド

昇順でのソート条件を設定したRKZSortConditionオブジェクトを返します。

```js
RKZSortCondition.asc(columnName);
```

* **columnName**: `String` 項目名称

#### descメソッド

降順でのソート条件を設定したRKZSortConditionオブジェクトを返します。

```js
RKZSortCondition.desc(columnName);
```

* **columnName**: `String` 項目名称

## 各種情報オブジェクト

APIで取得する各種情報オブジェクトのプロパティ一覧です。

ここで記載する内容は主にBaaS@rakuza提供時の初期状態を元にしております。

BaaS@rakuzaの項目設定によって各オブジェクトのプロパティは動的に変化します。

---
### 汎用データプロパティ

オブジェクト型のattributesプロパティを持っている場合は、主に以下の情報が格納されています。

* 初期状態から項目設定で追加した項目などが格納されます

* 他オブジェクトと紐づいたコード項目がある場合はその名称が格納されます

---

### アプリケーション設定情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|name|`String`|アプリ名称|
|short_name|`String`|短縮名称|
|version_android|`String`|アプリバージョン(Android)|
|version_ios|`String`|アプリバージョン(iOS)|
|app_end_dte|`Date`|アプリ公開終了日付|
|app_end_flg|`Boolean`|アプリ公開終了フラグ|
|app_end_message|`String`|アプリ公開終了メッセージ|

```js
{
    name: "アプリ名称",
    short_name: "アプリ略称",
    version_android: "1.0.1",
    version_ios: "1.0.1",
    app_end_dte: "2020-12-31",
    app_end_flg: false,
    app_end_message: "本サービスは終了しました。",
}
```

### オブジェクトデータ情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|object_id|`String`|オブジェクトID|
|code|`String`|コード|
|name|`String`|名称|
|short_name|`String`|短縮名称|
|sort_no|`Number`|順序|
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

```js
{
    object_id: "sample_object",
    code: "0001",
    name: "サンプル名称",
    short_name: "サンプル短縮名称",
    sort_no: 1,
    attributes: {
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

### ユーザー情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|user_no|`String`|ユーザーNp|
|sex_cd|`String`|性別|
|business_class_cd|`String`|職業|
|state_cd|`String`|都道府県|
|age_config|`String`|年代|
|user_name|`String`|氏名|
|user_last_name|`String`|姓|
|user_first_name|`String`|名|
|user_furigana|`String`|フリガナ|
|user_last_furigana|`String`|セイ|
|user_first_furigana|`String`|メイ|
|birth_day|`Date`|生年月日|
|tel_no_1|`String`|電話番号|
|mail_address_1|`String`|メールアドレス|
|join_dte|`Date`|登録日|
|point|`Number`|ポイント数|
|user_access_token|`String`|ユーザーアクセストークン|
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

```js
{
    user_no: "APP00001",
    sex_cd: "0001",
    business_class_cd: "0001",
    state_cd: "0001",
    age_config: "0001",
    user_name: "東京 太郎",
    user_last_name: "東京",
    user_first_name: "太郎",
    user_furigana: "トウキョウ タロウ",
    user_last_furigana: "トウキョウ",
    user_first_furigana: "タロウ",
    birth_day: "2000-01-01",
    tel_no_1: "0120-542-070",
    mail_address_1: "rakuza@pscsrv.co.jp",
    join_dte: "2017-01-23",
    point: 10,
    user_access_token: "",
    attributes: {
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

### コンタクト情報オブジェクト


|プロパティ名|データ型|説明|
|---|---|---|
|contact_no|`String`|コンタクト番号
|contact_date|`Date`|日時
|contact_class_cd|`String`|コンタクト種別
|contact_method_class_cd|`String`|コンタクト方法種別
|remarks|`String`|備考
|contact_item_no|`String`|イベント番号
|contact_item_name|`String`|イベント名称
|entry_no|`String`|申込番号
|status_cd|`String`|状態
|place_cd|`String`|場所
|point|`Number`|ポイント数
|coupon_cd|`String`|クーポンコード
|quantity|`Number`|数量
|beacon_id|`String`|ビーコンID
|beacon_spot_cd|`String`|ビーコンスポットコード
|rssi|`Number`|受信電波強度
|stamp_rally_cd|`String`|スタンプラリーコード
|stamp_rally_spot_cd|`String`|スタンプラリースポットコード
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

``` js
{
    contact_no: "1",
    contact_date: "2017-01-23 12:10:05+0900",
    contact_class_cd: "0001",
    contact_method_class_cd: "0003",
    remarks: "",
    contact_item_no: "MK00001",
    contact_item_name: "アプリユーザー",
    entry_no: "MA100013",
    status_cd: "1002",
    place_cd: null,
    point: null,
    coupon_cd: null,
    quantity: null,
    beacon_id: null,
    beacon_spot_cd: null,
    rssi: null,
    stamp_rally_cd: null,
    stamp_rally_spot_cd: null,
    attributes: {
        contact_class_cd_name: "顧客登録",
        contact_method_class_cd_name: "WEB",
        status_cd_name: "本登録",
        place_cd_name: null,
        coupon_cd_name: null,
        beacon_spot_cd_name: null,
        stamp_rally_cd_name: null,
        stamp_rally_spot_cd_name: null,
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

#### お知らせ情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|news_id|`String`|お知らせID|
|tenant_id|`String`|テナントID|
|title|`String`|タイトル|
|description|`String`|内容|
|author|`String`|発信者|
|release_flg|`Boolean`|公開フラグ|
|release_end_date|`Date`|公開開始日時|
|release_from_date|`Date`|公開終了日時|
|category|`String`|カテゴリコード|
|category_name|`String`|カテゴリ名称|
|genre|`String`|ジャンルコード|
|genre_name|`String`|ジャンル名称|
|photo|`String`|画像URL|
|url|`String`|詳細URL|
|date|`Date`|作成日付|

```js
{
    news_id: "1",
    tenat_id: "99999",
    title: "BaaS@rakuza正式リリース",
    description: "BaaS@rakuzaが正式にリリースされました",
    author: "プープルソフトウェア",
    release_flg: true,
    release_end_date: "2018-01-24 13:00:00+0900",
    release_from_date: "2017-01-24 13:00:00+0900",
    category: "0001",
    category_name: "(サンプル)",
    genre: "0001",
    genre_name: "(サンプル)",
    photo: "https://cloud.raku-za.jp/apps/sample/Image/users/1_45_37_1485103181107.png",
    url: "http://www.raku-za.jp/baas/",
    date: "2017-01-20 00:00:00+0900"
}
```

#### お知らせ既読情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|news_id|`String`|お知らせID|
|news_tenant_id|`String`|テナントID|
|read_date|`Date`|既読日時|
|read_flg|`Boolean`|既読フラグ|

```js
{
    news_id: "1",
    news_tenant_id: "99999",
    read_date: "2017-01-23 13:00:00+0900",
    read_flg: true
}
```

#### ビーコン情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|code|`String`|コード|
|name|`String`|ビーコン端末名称|
|short_name|`String`|短縮名称|
|beacon_type_cd|`String`|ビーコンタイプコード|
|beacon_id|`String`|ビーコンID|
|major|`String`|major|
|minor|`String`|minor|
|sort_no|`Number`|順序|
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

```js
{
    code: "DB000001",
    name: "サンプルビーコン1",
    short_name: "",
    beacon_type_cd: "0001",
    beacon_id: "DB00001",
    major: null,
    minor: null,
    sort_no: 1,
    attributes: {
        beacon_type_cd_name: "iBeacon",
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

#### スポット情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|code|`String`|コード|
|name|`String`|スポット名称|
|short_name|`String`|短縮名称|
|beacon|`Array`|設置ビーコン端末|
|beacon_range_for_iphone|`Number`|ビーコン検知範囲（iOS用）|
|beacon_range_for_android|`Number`|ビーコン検知範囲（Android用）|
|latitude|`String`|緯度|
|longitude|`String`|経度|
|pixel_position_x|`Number`|ピクセル位置X|
|pixel_position_y|`Number`|ピクセル位置Y|
|sort_no|`Number`|順序|
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

```js
{
    code: "0001",
    name: "サンプルスポット１",
    short_name: "サンプルスポット１",
    beacon: ["DB000001","DB000002"],
    beacon_range_for_iphone: 60,
    beacon_range_for_android: 50,
    latitude: "34.6008842",
    longitude: "133.7656701",
    pixel_position_x: "100",
    pixel_position_y: "50",
    sort_no: 1,
    attributes: {
        beacon_name: "サンプルビーコン2,サンプルビーコン3",
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

#### ビーコン検知コンタクト情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|contact_no|`String`|コンタクト番号
|contact_date|`Date`|日時
|contact_class_cd|`String`|コンタクト種別コード
|contact_class_name|`String`|コンタクト種別名称
|contact_method_class_cd|`String`|コンタクト方法種別コード
|contact_method_class_name|`String`|コンタクト方法種別名称
|beacon_id|`String`|ビーコンID
|beacon_spot_cd|`String`|ビーコンスポットコード
|remarks|`String`|備考
|rssi|`Number`|受信電波強度

``` js
{
    contact_no: "2",
    contact_date: "2017-01-24 10:36:53+0900",
    contact_class_cd: "0012",
    contact_class_cd_name: "ビーコン検知",
    contact_method_class_cd: "0008",
    contact_method_class_cd_name: "ビーコン検知",
    beacon_id: "DB000001",
    beacon_spot_cd: "0001",
    remarks: "備考です",
    rssi: 100
}
```

#### クーポン情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|code|`String`|コード|
|name|`String`|クーポン名称|
|image|`String`|画像|
|image_url|`String`|画像(URL)|
|possible_from_dte|`Date`|取得可能期間：開始|
|possible_to_dte|`Date`|取得可能期間：終了|
|enable_from_dte|`Date`|使用可能期間：開始|
|enable_to_dte|`Date`|使用可能期間：終了|
|point|`Number`|クーポン交換ポイント|
|sort_no|`Number`|順序|
|attributes|`Object`|[汎用データプロパティ](#汎用データプロパティ)|

```js
{
    code: "0001",
    name: "サンプルクーポン",
    image: "30_40_2_1485114218162.png",
    image_url: "https://cloud.raku-za.jp/apps/sample/Image/users/30_40_2_1485114218162.png",
    possible_from_dte: "2017-01-01 00:00:00+0900",
    possible_to_dte: "2017-12-31 09:00:00+0900",
    enable_from_dte: "2017-01-01 00:00:00+0900",
    enable_to_dte: "2017-12-31 09:00:00+0900",
    point: 5,
    sort_no: 1,
    attributes: {
        add_item1: "追加項目データ１",
        add_item2: "追加項目データ２"
    }
}
```

#### マイクーポン情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|code|`String`|コード|
|coupon_cd|`String`|クーポンコード|
|coupon_name|`String`|クーポン名称|
|get_date|`Date`|クーポン発行日時|
|quantity|`Number`|数量|
|used_flg|`Boolean`|クーポン使用済フラグ|
|use_date|`Date`|クーポン使用済日時|
|coupon|`Object`|[クーポン情報オブジェクト](#クーポン情報オブジェクト)|

```js
{
    code: "5",
    coupon_cd: "0001",
    coupon_name: "サンプルクーポン",
    get_date: "2017-01-23 13:24:00+0900",
    quantity: 2,
    used_flg: true,
    use_date: "2017-01-23 14:32:00+0900",
    coupon: {
        code: "0001",
        name: "サンプルクーポン",
        image: "30_40_2_1485114218162.png",
        image_url: "https://cloud.raku-za.jp/apps/sample/Image/users/30_40_2_1485114218162.png",
        possible_from_dte: "2017-01-01 00:00:00+0900",
        possible_to_dte: "2017-12-31 09:00:00+0900",
        enable_from_dte: "2017-01-01 00:00:00+0900",
        enable_to_dte: "2017-12-31 09:00:00+0900",
        point: 5,
        sort_no: 1,
        attributes: {
            add_item1: "追加項目データ１",
            add_item2: "追加項目データ２"
        }
    }
}
```

### エラー情報オブジェクト

|プロパティ名|データ型|説明|
|---|---|---|
|status_code|`String`|ステータスコード|
|message|`String`|エラーメッセージ|

```js
{
    status_code: "CDVE0002",
    message: "Failed to start beacon detection."
}
```
