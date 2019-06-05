var BaaSAtRakuza = (function() {
    var featureName = "BaaSAtRakuza";
    var BaaSAtRakuza = function() {};

    var convertConditionToJson = function(conditions) {
        // Condition は undefined and null も許容する
        var conditions = conditions || [];
        // タイプエラー (配列で指定されていない)
        if (!is("Array", conditions)) throw new TypeError("CDVE0001");
        var _conditions = [];
        for (var i = 0; i < conditions.length; i++) {
            _conditions.push( conditions[i].convertToJson() );
        }
        return _conditions;
    };

    var is = function(type, obj) {
        var clazz = Object.prototype.toString.call(obj).slice(8, -1);
        // return obj !== undefined && obj !== null && clazz === type;
        return clazz === type;
    };

    var _formatDate = function (date, format) {
        if (!format) format = 'YYYY-MM-DD hh:mm:ss';
        format = format.replace(/YYYY/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        if (format.match(/S/g)) {
            var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
            var length = format.match(/S/g).length;
            for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
        }
        return format;
    };

    var formatDate = function(value, format) {
        var _value = value;
        if (is("Date", value)) {
            _value = _formatDate(_value);
        } else if(is("String", value)) {
            value = value.replace(/\//g, "-");
            if (value.length == 10) {
                value = value + " 00:00:00.000";
            } else if (value.length == 16) {
                value = value + ":00.000";
            } else {
                value = value + ".000";
            }
            var sep = value.match(/[0-9]+/gi);
            _value = formatDate(new Date(sep[0], sep[1] - 1, sep[2], sep[3], sep[4], sep[5], sep[6]));
        }
        return _value;
    };

    BaaSAtRakuza.prototype = {
        //--------------------------------------------------------------------------------
        // システム環境API
        //--------------------------------------------------------------------------------
        /**
         * テナント認証キーを設定して、SDKを利用可能な状態にします。
         *
         * @param {String} tenantKey テナント認証キー(必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        setTenantKey: function(tenantKey, success, error) {
            if (!is("String", tenantKey)) { error(RKZMessages.error("CDVE0001", "tenantKey"));return; }
            var _tenantKey = tenantKey || null;
            cordova.exec(success, error, featureName, "setTenantKey", [ _tenantKey ]);
        },
        /**
         * APIリクエスト時のデフォルトタイムアウト値を設定
         *
         * @param {Number} tenantKey テナント認証キー(必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        setDefaultTimeout: function(timeout, success, error) {
            if (!is("Number", timeout)) { error(RKZMessages.error("CDVE0001", "timeout"));return; }
            var _timeout = timeout || 30;
            cordova.exec( success, error, featureName, "setDefaultTimeout", [ _timeout ] );
        },
        /**
         * アプリケーション設定情報を取得します。
         *
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getApplicationSettingData: function(success, error) {
            cordova.exec(success, error, featureName, "getApplicationSettingData", []);
        },
        /**
         * 言語情報を取得します。
         *
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getLocaleList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getLocaleList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * 言語情報を取得します。
         *
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getLocale: function(success, error) {
            cordova.exec(success, error, featureName, "getLocale", []);
        },
        /**
         * 言語情報を設定します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} locale 言語コード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        setLocale: function(userAccessToken, locale, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            if (!is("String", locale)) { error(RKZMessages.error("CDVE0001", "locale"));return; }
            cordova.exec(success, error, featureName, "setLocale", [ userAccessToken, locale ]);
        },
        /**
         * システム日付を取得します。
         *
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getSystemDate: function(success, error) {
            cordova.exec(success, error, featureName, "getSystemDate", [ ]);
        },
        //--------------------------------------------------------------------------------
        // ユーザーAPI
        //--------------------------------------------------------------------------------
        registUser: function(user, success, error) {
            if (!is("Object", user)) { error(RKZMessages.error("CDVE0001", "user"));return; }
            var _user = user || {};
            _user.birth_day = formatDate(_user.birth_day);
            cordova.exec(success, error, featureName, "registUser", [ _user ]);
        },
        getUser: function(userAccessToken, success, error) {
            var _userAccessToken = (is("String", userAccessToken)) ? userAccessToken : "";
            cordova.exec(success, error, featureName, "getUser", [ _userAccessToken ]);
        },
        /**
         * 顧客情報を編集します。
         *
         * @param {Object.<String, Object>} user 編集する顧客情報 (必須)　userAccessTokenは必須
         * @param {user.<"user_access_token", String>} ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        editUser: function(user, success, error) {
            if (!is("Object", user)) { error(RKZMessages.error("CDVE0001", "user"));return; }
            var _user = user || {};
            _user.birth_day = formatDate(_user.birth_day);
            cordova.exec(success, error, featureName, "editUser", [ _user ]);
        },
        /**
         * プッシュデバイストークン情報を登録します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} deviceToken 言語コード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        registPushDeviceToken: function(userAccessToken, deviceToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            if (!is("String", deviceToken)) { error(RKZMessages.error("CDVE0001", "deviceToken"));return; }
            var _userAccessToken = userAccessToken || "";
            var _deviceToken = deviceToken || "";
            cordova.exec(success, error, featureName, "registPushDeviceToken", [ _userAccessToken, _deviceToken ]);
        },
        /**
         * プッシュデバイストークンをクリアします。
         * 
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        clearPushDeviceToken: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "clearPushDeviceToken", [ _userAccessToken ]);
        },
        /**
         * パスワード情報を変更します。
         *
         * @param {String} "userAccessToken" ユーザーアクセストークン (必須)
         * @param {String} "nowPassword" 現在のパスワード (必須)
         * @param {String} "newPassword" 新パスワード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        editPassword: function(userAccessToken, nowPassword, newPassword, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            if (!is("String", nowPassword)) { error(RKZMessages.error("CDVE0001", "nowPassword"));return; }
            if (!is("String", newPassword)) { error(RKZMessages.error("CDVE0001", "newPassword"));return; }
            var _userAccessToken = userAccessToken || "";
            var _nowPassword = nowPassword || "";
            var _newPassword = newPassword || "";
            cordova.exec(success, error, featureName, "editPassword", [ _userAccessToken, _nowPassword, _newPassword ]);
        },
        /**
         * 機種変更認証コードを発行します。
         *
         * @param {Object.<String, Object>} params 連想配列パラメータ (必須)
         * @param {params.<"password", String>} パスワード (任意)
         * @param {params.<"limit_code", Number>} 桁数 (任意)
         * @param {params.<"limit_minute", Number>} 有効時間 (任意)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        registModelChangeCode: function(userAccessToken, params, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            var _params = params || {};
            if (!is("String", _params.password) && !is("Undefined", _params.password)) { error(RKZMessages.error("CDVE0001", "params.password"));return; }
            if (!is("Number", _params.limit_code) && !is("Undefined", _params.limit_code)) { error(RKZMessages.error("CDVE0001", "params.limit_code"));return; }
            if (!is("Number", _params.limit_minute) && !is("Undefined", _params.limit_minute)) { error(RKZMessages.error("CDVE0001", "params.limit_minute"));return; }

            cordova.exec(success, error, featureName, "registModelChangeCode", [ _userAccessToken, _params ]);
        },
        /**
         * 機種変更の認証を行います。
         *
         * @param {String} modelChangeCode 機種変更認証コード (必須)
         * @param {String} password        パスワード (任意)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        authModelChange: function(modelChangeCode, password, success, error) {
            if (!is("String", modelChangeCode)) { error(RKZMessages.error("CDVE0001", "modelChangeCode"));return; }
            var _modelChangeCode = modelChangeCode || "";
            if (!is("String", password) && !is("Undefined", password) && !is("Null", password)) { error(RKZMessages.error("CDVE0001", "password"));return; }
            var _password = password || null;
            cordova.exec(success, error, featureName, "authModelChange", [ _modelChangeCode, _password ]);
        },
        /**
         * ログインを行います。
         *
         * @param {String} loginId         ログインID (必須)
         * @param {String} password        パスワード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        userAuth: function(loginId, password, success, error) {
            if (!is("String", loginId)) { error(RKZMessages.error("CDVE0001", "loginId"));return; }
            var _loginId = loginId || "";
            if (!is("String", password)) { error(RKZMessages.error("CDVE0001", "password"));return; }
            var _password = password || "";
            cordova.exec(success, error, featureName, "userAuth", [ _loginId, _password ]);
        },
        /**
         * 現在利用中のユーザーアクセストークンを更新する
         *
         * @param {String} userAccessToken ユーザーアクセストークン(必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        updateUserAccessToken: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "updateUserAccessToken", [ _userAccessToken ]);
        },
        /**
         * 現在利用中のユーザーアクセストークンの更新を開始する<br />
         * 新しいユーザーアクセストークンを仮発行するが、確定はしないので利用不可の状態で復帰される。
         * 新しいユーザーアクセストークンを利用する場合は commitUpdateUserAccessToken を呼び出して、ユーザーアクセストークンを確定させる必要がある。
         *
         * @param {String} userAccessToken ユーザーアクセストークン(必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        beginUpdateUserAccessToken: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "beginUpdateUserAccessToken", [ _userAccessToken ]);
        },
        /**
         * 現在利用中のユーザーアクセストークンの更新を確定する<br />
         * 仮発行されたユーザーアクセストークンを確定して、利用可能な状態にする。
         *
         * @param {String} userAccessToken ユーザーアクセストークン(必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        commitUpdateUserAccessToken: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "commitUpdateUserAccessToken", [ _userAccessToken ]);
        },
        /**
         * ユーザーオブジェクトのフィールド情報を取得する
         *
         * @param {Boolean} visibleFieldOnly 表示項目のみ対象 (任意) true:表示項目のみ, false:表示項目以外も対象
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getUserFieldDataList: function(visibleFieldOnly, success, error) {
            var _visibleFieldOnly;
            var _success, _error;

            if (arguments.length == 2) {
                // 引数が 2 の場合は、visibleFieldOnly がない前提で処理する
                _visibleFieldOnly = true;
                _success = arguments[0];
                _error = arguments[1];
            } else {
                // 引数が 2 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _visibleFieldOnly = visibleFieldOnly;
                _success = success;
                _error = error;
            }

            if (!is("Boolean", _visibleFieldOnly) && !is("Null", _visibleFieldOnly) && !is("Undefined", _visibleFieldOnly)) { error(RKZMessages.error("CDVE0001", "visibleFieldOnly"));return; }
            if (is("Null", _visibleFieldOnly) || is("Undefined", _visibleFieldOnly)) {
                _visibleFieldOnly = true;
            }

            cordova.exec(_success, _error, featureName, "getUserFieldDataList", [ _visibleFieldOnly ]);
        },
        //--------------------------------------------------------------------------------
        // クーポンAPI
        //--------------------------------------------------------------------------------
        getCoupon: function(couponCd, success, error) {
            if (!is("String", couponCd)) { error(RKZMessages.error("CDVE0001", "couponCd"));return; }
            var _couponCd = couponCd || "";
            cordova.exec(success, error, featureName, "getCoupon", [ _couponCd ]);
        },
        /**
         * 複数クーポン情報を取得します。
         *
         * @param {Array.<RKZSearchCondition>} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getCouponList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getCouponList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * クーポンを交換します。交換すると、ポイントは自動的に減ります。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} couponCd クーポンコード
         * @param {Number} quantity クーポン交換数。
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        exchangeCoupon: function(userAccessToken, couponCd, quantity, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("String", couponCd)) { error(RKZMessages.error("CDVE0001", "couponCd"));return; }
            var _couponCd = couponCd || "";
            if (!is("Number", quantity)) { error(RKZMessages.error("CDVE0001", "quantity"));return; }
            var _quantity = quantity || 0;
            cordova.exec(success, error, featureName, "exchangeCoupon", [ _userAccessToken, _couponCd, _quantity ]);
        },
        /**
         * クーポンを利用します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Object} myCoupon マイクーポン情報
         * @param {String} myCoupon.code マイクーポンコード (必須)
         * @param {String} myCoupon.coupon_cd クーポンコード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        useMyCoupon: function(userAccessToken, myCoupon, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("Object", myCoupon)) { error(RKZMessages.error("CDVE0001", "myCoupon"));return; }
            var _myCoupon = myCoupon || {};
            if (!is("String", _myCoupon.code)) { error(RKZMessages.error("CDVE0001", "myCoupon.code"));return; }
            if (!is("String", _myCoupon.coupon_cd)) { error(RKZMessages.error("CDVE0001", "myCoupon.coupon_cd"));return; }

            cordova.exec(success, error, featureName, "useMyCoupon", [ _userAccessToken, _myCoupon ]);
        },
        /**
         * 単一マイクーポン情報を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} couponCd マイクーポンコード
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getMyCoupon: function(userAccessToken, couponCd, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("String", couponCd)) { error(RKZMessages.error("CDVE0001", "couponCd"));return; }
            var _couponCd = couponCd || "";
            cordova.exec(success, error, featureName, "getMyCoupon", [ _userAccessToken, _couponCd ]);
        },
        /**
         * 複数マイクーポン情報を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Array.<RKZSearchCondition>} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getMyCouponList: function(userAccessToken, searchConditions, sortConditions, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getMyCouponList", [ _userAccessToken, _searchConditions, _sortConditions ]);
        },
        //--------------------------------------------------------------------------------
        // ポイントAPI
        //--------------------------------------------------------------------------------
        /**
         * ポイント情報を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getPoint: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "getPoint", [ _userAccessToken ]);
        },
        /**
         * ポイントを追加します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Number} point 追加するポイント数。0は指定不可。マイナス値を指定するとポイントを減らす。
         * @param {Date} addDate ポイントを追加する日。
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addPoint: function(userAccessToken, point, addDate, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("Number", point)) { error(RKZMessages.error("CDVE0001", "point"));return; }
            var _point = point || null;
            if (!is("Date", addDate)) { error(RKZMessages.error("CDVE0001", "addDate"));return; }
            var _addDate = formatDate(addDate);
            cordova.exec(success, error, featureName, "addPoint", [ _userAccessToken, _point, _addDate ]);
        },
        //--------------------------------------------------------------------------------
        // ビーコン
        //--------------------------------------------------------------------------------
        /**
         * ビーコン情報を取得します。
         *
         * @param {Array.<RKZSearchCondition>} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getBeaconList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getBeaconList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * ビーコン検知コンタクトを追加します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} beaconId ビーコンID
         * @param {String} beaconSpotCode ビーコンスポットコード
         * @param {Number} rssi 検知電波強度
         * @param {Date} detectBeaconDatetime ビーコン検知日時
         * @param {String} remarks 備考
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addDetectBeaconContact: function(userAccessToken, beaconId, beaconSpotCode, rssi, detectBeaconDatetime, remarks, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("String", beaconId)) { error(RKZMessages.error("CDVE0001", "beaconId"));return; }
            var _beaconId = beaconId || "";
            if (!is("Date", detectBeaconDatetime)) { error(RKZMessages.error("CDVE0001", "detectBeaconDatetime"));return; }
            var _detectBeaconDatetime = formatDate(detectBeaconDatetime);

            if (!is("String", beaconSpotCode) && !is("Undefined", beaconSpotCode) && !is("Null", beaconSpotCode)) { error(RKZMessages.error("CDVE0001", "beaconSpotCode"));return; }
            var _beaconSpotCode = beaconSpotCode || "";
            if (!is("Number", rssi) && !is("Undefined", rssi) && !is("Null", rssi)) { error(RKZMessages.error("CDVE0001", "rssi"));return; }
            var _rssi = rssi || null;
            if (!is("String", remarks) && !is("Undefined", remarks) && !is("Null", remarks)) { error(RKZMessages.error("CDVE0001", "remarks"));return; }
            var _remarks = remarks || null;
            cordova.exec(success, error, featureName, "addDetectBeaconContact", [ _userAccessToken, _beaconId, _beaconSpotCode, _rssi, _detectBeaconDatetime, _remarks ]);
        },
        /**
         * ビーコン検知コンタクト情報を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDetectBeaconContact: function(userAccessToken, searchConditions, sortConditions, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getDetectBeaconContact", [ _userAccessToken, _searchConditions, _sortConditions ]);
        },
        //--------------------------------------------------------------------------------
        // お知らせ情報API
        //--------------------------------------------------------------------------------
        /**
         * お知らせ情報を取得します。
         *
         * @param {Object.<String, Object>} params 連想配列パラメータ (必須)
         * @param {String} params.news_id  ニュースID (必須)
         * @param {String} params.tenant_id テナントID (任意)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getNews: function(params, success, error) {
            if (!is("Object", params)) { error(RKZMessages.error("CDVE0001", "params"));return; }
            var _params = params || [];
            if (!is("String", _params.news_id)) { error(RKZMessages.error("CDVE0001", "params.news_id"));return; }
            if (!is("String", _params.tenant_id) && !is("Undefined", _params.tenant_id)) { error(RKZMessages.error("CDVE0001", "params.tenant_id"));return; }

            cordova.exec(success, error, featureName, "getNews", [ _params ]);
        },
        /**
         * 複数お知らせ情報（公開中のもののみ）を取得します。
         *
         * @param {Number} limit 取得件数。すべてを取得する場合はnullを指定します。
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getReleasedNewsList: function(limit, searchConditions, sortConditions, extensionAttributes, success, error) {
            var _limit, _extensionAttributes;
            var _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 5) {
                // 引数が 5 の場合は、extensionAttributesがない
                _limit = arguments[0];
                _searchConditions = arguments[1];
                _sortConditions = arguments[2];
                _extensionAttributes = {}
                _success = arguments[3];
                _error = arguments[4];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _limit = limit;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _extensionAttributes = extensionAttributes;
                _success = success;
                _error = error;
            }

            if (!is("Number", _limit) && !is("Undefined", _limit) && !is("Null", _limit)) { _error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            try { _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
            var uat = _extensionAttributes.user_access_token;
            if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
            var sf = _extensionAttributes.show_favorite;
            if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
            var sfs = _extensionAttributes.show_favorite_summary;
            if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

            cordova.exec(_success, _error, featureName, "getReleasedNewsList", [ _limit, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * 複数お知らせ情報（公開中のもののみ）を取得します。
         *
         * @param {Number} limit 取得件数。すべてを取得する場合はnullを指定します。
         * @param {String} userAccessToken セグメント配信を取得するユーザーのアクセストークン (必須)
         * @param {Boolean} onlyMatchSegment セグメント配信情報のみ取得するか (true:セグメント配信のみ取得, false:全て取得) (必須) nullの場合は、false:全て取得
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getReleasedSegmentNewsList: function(limit, userAccessToken, onlyMatchSegment, searchConditions, sortConditions, extensionAttributes, success, error) {
            var _limit, _userAccessToken, _onlyMatchSegment, _extensionAttributes;
            var _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 7) {
                // 引数が 5 の場合は、extensionAttributesがない
                _limit = arguments[0];
                _userAccessToken = arguments[1];
                _onlyMatchSegment = arguments[2];
                _searchConditions = arguments[3];
                _sortConditions = arguments[4];
                _extensionAttributes = {}
                _success = arguments[5];
                _error = arguments[6];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _limit = limit;
                _userAccessToken = userAccessToken;
                _onlyMatchSegment = onlyMatchSegment;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _extensionAttributes = extensionAttributes;
                _success = success;
                _error = error;
            }

            if (!is("Number", _limit) && !is("Undefined", _limit) && !is("Null", _limit)) { error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            if (!is("String", _userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            _userAccessToken = _userAccessToken || "";

            if (!is("Boolean", _onlyMatchSegment)) { error(RKZMessages.error("CDVE0001", "onlyMatchSegment"));return; }
            _onlyMatchSegment = _onlyMatchSegment || false;

            try { _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
            var uat = _extensionAttributes.user_access_token;
            if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
            var sf = _extensionAttributes.show_favorite;
            if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
            var sfs = _extensionAttributes.show_favorite_summary;
            if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

            cordova.exec(_success, _error, featureName, "getReleasedSegmentNewsList", [ _limit, _userAccessToken, _onlyMatchSegment, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * 複数お知らせ情報（未公開も含む）を取得します。
         *
         * @param {Number} limit 取得件数。すべてを取得する場合はnullを指定します。
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getNewsList: function(limit, searchConditions, sortConditions, extensionAttributes, success, error) {
            var _limit, _extensionAttributes;
            var _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 5) {
                // 引数が 5 の場合は、extensionAttributesがない
                _limit = arguments[0];
                _searchConditions = arguments[1];
                _sortConditions = arguments[2];
                _extensionAttributes = {}
                _success = arguments[3];
                _error = arguments[4];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _limit = limit;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _extensionAttributes = extensionAttributes;
                _success = success;
                _error = error;
            }

            if (!is("Number", _limit) && !is("Undefined", _limit) && !is("Null", _limit)) { _error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            try { _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
            var uat = _extensionAttributes.user_access_token;
            if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
            var sf = _extensionAttributes.show_favorite;
            if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
            var sfs = _extensionAttributes.show_favorite_summary;
            if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

            cordova.exec(_success, _error, featureName, "getNewsList", [ _limit, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * 複数お知らせ情報（未公開も含む）を取得します。
         *
         * @param {Number} limit 取得件数。すべてを取得する場合はnullを指定します。
         * @param {String} userAccessToken セグメント配信を取得するユーザーのアクセストークン (必須)
         * @param {Boolean} onlyMatchSegment セグメント配信情報のみ取得するか (true:セグメント配信のみ取得, false:全て取得) (必須) nullの場合は、false:全て取得
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getSegmentNewsList: function(limit, userAccessToken, onlyMatchSegment, searchConditions, sortConditions, extensionAttributes, success, error) {
            var _limit, _userAccessToken, _onlyMatchSegment, _extensionAttributes;
            var _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 7) {
                // 引数が 5 の場合は、extensionAttributesがない
                _limit = arguments[0];
                _userAccessToken = arguments[1];
                _onlyMatchSegment = arguments[2];
                _searchConditions = arguments[3];
                _sortConditions = arguments[4];
                _extensionAttributes = {}
                _success = arguments[5];
                _error = arguments[6];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _limit = limit;
                _userAccessToken = userAccessToken;
                _onlyMatchSegment = onlyMatchSegment;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _extensionAttributes = extensionAttributes;
                _success = success;
                _error = error;
            }

            if (!is("Number", _limit) && !is("Undefined", _limit) && !is("Null", _limit)) { error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            if (!is("String", _userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            _userAccessToken = _userAccessToken || "";

            if (!is("Boolean", _onlyMatchSegment)) { error(RKZMessages.error("CDVE0001", "onlyMatchSegment"));return; }
            _onlyMatchSegment = _onlyMatchSegment || false;

            try { _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
            var uat = _extensionAttributes.user_access_token;
            if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
            var sf = _extensionAttributes.show_favorite;
            if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
            var sfs = _extensionAttributes.show_favorite_summary;
            if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

            cordova.exec(success, error, featureName, "getSegmentNewsList", [ _limit, _userAccessToken, _onlyMatchSegment, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * 単一お知らせ既読情報を取得します。
         *
         * @param {Object.<String, Object>} params 連想配列パラメータ (必須)
         * @param {String} params.news_id ニュースID (必須)
         * @param {String} params.tenant_id テナントID (任意)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getNewsReadHistory: function(params, userAccessToken, success, error) {
            if (!is("Object", params)) { error(RKZMessages.error("CDVE0001", "params"));return; }
            var _params = params || [];
            if (!is("String", _params.news_id)) { error(RKZMessages.error("CDVE0001", "params.news_id"));return; }
            if (!is("String", _params.tenant_id) && !is("Undefined", _params.tenant_id)) { error(RKZMessages.error("CDVE0001", "params.tenant_id"));return; }

            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "getNewsReadHistory", [ _params, _userAccessToken ]);
        },
        /**
         * 複数お知らせ既読情報を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getNewsReadHistoryList: function(userAccessToken, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "getNewsReadHistoryList", [ _userAccessToken ]);
        },
        /**
         * お知らせ既読情報の登録を行います。
         *
         * @param {Object.<String, Object>} params 連想配列パラメータ (必須)
         * @param {String} params.news_id ニュースID (必須)
         * @param {String} params.tenant_id テナントID (任意)
         * @param {Date} params.read_date 既読日時 (任意)既読日時未指定時は現在日時を自動的に指定
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        registNewsReadHistory: function(params, userAccessToken, success, error) {
            if (!is("Object", params)) { error(RKZMessages.error("CDVE0001", "params"));return; }
            var _params = params || [];
            if (!is("String", _params.news_id)) { error(RKZMessages.error("CDVE0001", "params.news_id"));return; }
            if (!is("String", _params.tenant_id) && !is("Undefined", _params.tenant_id)) { error(RKZMessages.error("CDVE0001", "params.tenant_id"));return; }
            if (is("Undefined", _params.read_date) || is("Null", _params.read_date)) {
                _params.read_date = formatDate(new Date());
            } else if (is("String", _params.read_date) || is("Date", _params.read_date)) {
                _params.read_date = formatDate(_params.read_date);
            } else {
                error(RKZMessages.error("CDVE0001", "params.read_date"));return;
            }
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "registNewsReadHistory", [ _params, _userAccessToken ]);
        },
        /**
         * お知らせの既読情報の登録を行います。
         * @param {Object.<String, Object>} params  連想配列パラメータ
         * @param {*} userAccessToken 
         * @param {*} success 
         * @param {*} error 
         */
        readNews: function(params, userAccessToken, success, error) {
            if (!is("Object", params)) { error(RKZMessages.error("CDVE0001", "params"));return; }
            var _params = params || [];
            if (!is("String", _params.news_id)) { error(RKZMessages.error("CDVE0001", "params.news_id"));return; }
            if (!is("String", _params.tenant_id) && !is("Undefined", _params.tenant_id)) { error(RKZMessages.error("CDVE0001", "params.tenant_id"));return; }
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            cordova.exec(success, error, featureName, "readNews", [ _params, _userAccessToken ]);
        },
        //--------------------------------------------------------------------------------
        // データオブジェクトAPI
        //--------------------------------------------------------------------------------
        /**
         * データオブジェクトの単一レコードを取得します。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {String} code コード値 (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getData: function(objectId, code, success, error) {
            if (!is("String", objectId)) { error(RKZMessages.error("CDVE0001", "objectId"));return; }
            if (!is("String", code)) { error(RKZMessages.error("CDVE0001", "code"));return; }
            var _objectId = objectId || "";
            var _code = code || "";
            cordova.exec(success, error, featureName, "getData", [ _objectId, _code ]);
        },
        /**
         * データオブジェクトの複数レコードを取得します。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataList: function(objectId, searchConditions, sortConditions, extensionAttributes, success, error) {
            var _objectId, _extensionAttributes;
            var _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 5) {
                // 引数が 5 の場合は、userAccessTokenがない前提
                _objectId = arguments[0];
                _searchConditions = arguments[1];
                _sortConditions = arguments[2];
                _extensionAttributes = {}
                _success = arguments[3];
                _error = arguments[4];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _extensionAttributes = extensionAttributes;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
            var uat = _extensionAttributes.user_access_token;
            if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
            var sf = _extensionAttributes.show_favorite;
            if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
            var sfs = _extensionAttributes.show_favorite_summary;
            if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

            cordova.exec(_success, _error, featureName, "getDataList", [ _objectId, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * データオブジェクトの複数レコードを取得します。
         *
         * 取得する際に、取得する件数(limit)と取得する開始位置(offset)を指定します。
         *
         * 復帰値は以下の内容で返却します。
         * results = {
         *    limit: 10,         // 指定したlimitが格納されます。
         *    offset: 0,         // 指定したoffsetが格納されます。
         *    result_cnt: 108,   // 指定した条件に該当する件数が格納されます。 (limit, offsetは対象外)
         *    datas: [
         *          {},
         *          {},
         *          {},
         *      ]
         *   }
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Number} limit 取得件数 (必須)
         * @param {Number} offset 取得開始位置 (必須)　0~の開始位置(レコード位置)を指定する
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getPaginateDataList: function(objectId, limit, offset, searchConditions, sortConditions, extensionAttributes, success, error) {
          var _objectId, _limit, _offset, _extensionAttributes;
          var _searchConditions, _sortConditions;
          var _success, _error;

          if (arguments.length == 7) {
            // 引数が 7 の場合は、userAccessTokenがない前提
            _objectId = arguments[0];
            _limit = arguments[1];
            _offset = arguments[2];
            _searchConditions = arguments[3];
            _sortConditions = arguments[4];
            _extensionAttributes = {}
            _success = arguments[5];
            _error = arguments[6];
        } else {
            // 引数が 7 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
            _objectId = objectId;
            _limit = limit;
            _offset = offset;
            _searchConditions = searchConditions;
            _sortConditions = sortConditions;
            _extensionAttributes = extensionAttributes;
            _success = success;
            _error = error;
          }

          if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
          _objectId = _objectId || "";

          if (!is("Number", _limit)) { _error(RKZMessages.error("CDVE0001", "limit"));return; }
          _limit = _limit || null;

          if (!is("Number", _offset)) { _error(RKZMessages.error("CDVE0001", "offset"));return; }
          _offset = _offset || null;

          try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
              _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
          }
          try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
              _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
          }

          if (!is("Object", _extensionAttributes)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes"));return; }
          var uat = _extensionAttributes.user_access_token;
          if (!is("String", uat) && !is("Undefined", uat) && !is("Null", uat)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.user_access_token"));return; }
          var sf = _extensionAttributes.show_favorite;
          if (!is("Boolean", sf) && !is("Undefined", sf) && !is("Null", sf)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite"));return; }
          var sfs = _extensionAttributes.show_favorite_summary;
          if (!is("Boolean", sfs) && !is("Undefined", sfs) && !is("Null", sfs)) { _error(RKZMessages.error("CDVE0001", "extensionAttributes.show_favorite_summary"));return; }

          cordova.exec(_success, _error, featureName, "getPaginateDataList", [ _objectId, _limit, _offset, _searchConditions, _sortConditions, _extensionAttributes ]);
        },
        /**
         * データオブジェクトにレコードを追加します。
         *
         * @param {Object.<String, Object>} data データオブジェクト (必須) object_idとname属性は必ず指定しておく必要があります。
         * @param {String} data.object_id オブジェクトID (必須)
         * @param {String} data.name 名称 (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addData: function(data, success, error) {
            if (!is("Object", data)) { error(RKZMessages.error("CDVE0001", "data"));return; }
            var _data = data || null;
            cordova.exec(success, error, featureName, "addData", [ _data ]);
        },
        /**
         * データオブジェクトのレコードを編集します。
         *
         * @param {Object.<String, Object>} data データオブジェクト (必須) object_idとcode属性は必ず指定しておく必要があります。
         * @param {String} data.object_id オブジェクトID (必須)
         * @param {String} data.code コード (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        editData: function(data, success, error) {
            if (!is("Object", data)) { error(RKZMessages.error("CDVE0001", "data"));return; }
            var _data = data || null;
            cordova.exec(success, error, featureName, "editData", [ _data ]);
        },
        /**
         * データオブジェクトのレコードを削除します。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Object} searchConditions 検索条件リスト (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        deleteData: function(objectId, searchConditions, success, error) {
            if (!is("String", objectId)) { error(RKZMessages.error("CDVE0001", "objectId"));return; }
            var _objectId = objectId || null;

            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            cordova.exec(success, error, featureName, "deleteData", [ _objectId, _searchConditions ]);
        },
        /**
         * データオブジェクトの単一レコードを取得します。<br />
         * オブジェクトの項目に「関連オブジェクト」を指定しているフィールドがある場合、関連オブジェクトの内容を結合して取得します。<br />
         * 取得した結果は {関連オブジェクトを指定したフィールド名}_objects というフィールドに格納されます。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {String} code コード値 (必須)
         * @param {Number} treeCount 取得階層数 (任意) 指定した階層数を取得。
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataWithRelationObjects: function(objectId, code, treeCount, success, error) {
            var _objectId, _code, _treeCount;
            var _success, _error;

            if (arguments.length == 4) {
                // 引数が 4 の場合は、treeCountがない前提で処理する
                _objectId = arguments[0];
                _code = arguments[1];
                _treeCount = null;
                _success = arguments[2];
                _error = arguments[3];
            } else {
                // 引数が 4 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _code = code;
                _treeCount = treeCount;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("String", _code)) { _error(RKZMessages.error("CDVE0001", "code"));return; }
            _code = _code || "";

            if (!is("Number", _treeCount) && !is("Null", _treeCount)) { _error(RKZMessages.error("CDVE0001", "treeCount"));return; }
            _treeCount = _treeCount || null;

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(_success, _error, featureName, "getDataWithRelationObjects", [ _objectId, _code, _treeCount ]);
        },
        /**
         * データオブジェクトの複数レコードを取得します。
         * オブジェクトの項目に「関連オブジェクト」を指定しているフィールドがある場合、関連オブジェクトの内容を結合して取得します。<br />
         * 取得した結果は {関連オブジェクトを指定したフィールド名}_objects というフィールドに格納されます。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Number} treeCount 取得階層数 (任意) 指定した階層数を取得。最大3階層まで指定可能
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataListWithRelationObjects: function(objectId, treeCount, searchConditions, sortConditions, success, error) {
            var _objectId, _treeCount, _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 5) {
                // 引数が 5 の場合は、treeCountがない前提で処理する
                _objectId = arguments[0];
                _treeCount = null;
                _searchConditions = arguments[1];
                _sortConditions = arguments[2];
                _success = arguments[3];
                _error = arguments[4];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _treeCount = treeCount;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("Number", _treeCount) && !is("Null", _treeCount)) { _error(RKZMessages.error("CDVE0001", "treeCount"));return; }
            _treeCount = _treeCount || null;

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(_success, _error, featureName, "getDataListWithRelationObjects", [ _objectId, _treeCount, _searchConditions, _sortConditions ]);
        },
        /**
         * データオブジェクトの複数レコードを取得します。
         * オブジェクトの項目に「関連オブジェクト」を指定しているフィールドがある場合、関連オブジェクトの内容を結合して取得します。<br />
         * 取得した結果は {関連オブジェクトを指定したフィールド名}_objects というフィールドに格納されます。
         *
         * 取得する際に、取得する件数(limit)と取得する開始位置(offset)を指定します。
         *
         * 復帰値は以下の内容で返却します。
         * results = {
         *    limit: 10,         // 指定したlimitが格納されます。
         *    offset: 0,         // 指定したoffsetが格納されます。
         *    result_cnt: 108,   // 指定した条件に該当する件数が格納されます。 (limit, offsetは対象外)
         *    datas: [
         *          {},
         *          {},
         *          {},
         *      ]
         *   }
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Number} limit 取得件数 (必須)
         * @param {Number} offset 取得開始位置 (必須)　0~の開始位置(レコード位置)を指定する
         * @param {Number} treeCount 取得階層数 (任意) 指定した階層数を取得。最大3階層まで指定可能
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getPaginateDataListWithRelationObjects: function(objectId, limit, offset, treeCount, searchConditions, sortConditions, success, error) {
            var _objectId, _limit, _offset, _treeCount, _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 7) {
                // 引数が 7 の場合は、treeCountがない前提で処理する
                _objectId = arguments[0];
                _limit = arguments[1];
                _offset = arguments[2];
                _treeCount = null;
                _searchConditions = arguments[3];
                _sortConditions = arguments[4];
                _success = arguments[5];
                _error = arguments[6];
            } else {
                // 引数が 7 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _limit = limit;
                _offset = offset;
                _treeCount = treeCount;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("Number", _limit)) { _error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            if (!is("Number", _offset)) { _error(RKZMessages.error("CDVE0001", "offset"));return; }
            _offset = _offset || null;

            if (!is("Number", _treeCount) && !is("Null", _treeCount)) { _error(RKZMessages.error("CDVE0001", "treeCount"));return; }
            _treeCount = _treeCount || null;

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(_success, _error, featureName, "getPaginateDataListWithRelationObjects", [ _objectId, _limit, _offset, _treeCount, _searchConditions, _sortConditions ]);
        },
        /**
         * 位置情報付きオブジェクトデータを取得します。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {String} code コード値 (必須)
         * @param {Object} location スポット検索条件 (任意) 指定した位置情報でスポットを検索する
         * @param {Number} location.latitude 緯度情報。経度と合わせて指定する。
         * @param {Number} location.longitude 経度情報。緯度と合わせて指定する。
         * @param {Number} location.range 範囲情報。緯度経度と合わせて指定する。
         * @param {String} spotFieldName スポット項目名称 (任意) スポット情報を関連付けしている項目の名称を指定する。未指定時は、先頭のスポット項目が利用される。
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataWithLocation: function(objectId, code, location, spotFieldName, success, error) {
            var _objectId, _code, _location, _spotFieldName;
            var _success, _error;

            if (arguments.length == 5) {
                // 引数が 5 の場合は、spotFieldName がない前提で処理する
                _objectId = arguments[0];
                _code = arguments[1];
                _location = arguments[2]
                _spotFieldName = null;
                _success = arguments[3];
                _error = arguments[4];
            } else {
                // 引数が 5 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _code = code;
                _location = location;
                _spotFieldName = spotFieldName;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("String", _code)) { _error(RKZMessages.error("CDVE0001", "code"));return; }
            _code = _code || "";

            if (!is("Object", _location) && !is("Null", _location) && !is("Undefined", _location)) { _error(RKZMessages.error("CDVE0001", "location"));return; }
            _location = _location || null;
            if (_location != null) {
                if (!is("Number", _location.latitude) && !is("Null", _location.latitude) && !is("Undefined", _location.latitude)) { _error(RKZMessages.error("CDVE0001", "location.latitude"));return; }
                if (!is("Number", _location.longitude) && !is("Null", _location.longitude) && !is("Undefined", _location.longitude)) { _error(RKZMessages.error("CDVE0001", "location.longitude"));return; }
                if (!is("Number", _location.range) && !is("Null", _location.range) && !is("Undefined", _location.range)) { _error(RKZMessages.error("CDVE0001", "location.range"));return; }
            }

            if (!is("String", _spotFieldName) && !is("Null", _spotFieldName) && !is("Undefined", _spotFieldName)) { _error(RKZMessages.error("CDVE0001", "spotFieldName"));return; }
            _spotFieldName = _spotFieldName || null;

            cordova.exec(_success, _error, featureName, "getDataWithLocation", [ _objectId, _code, _location, _spotFieldName ]);
        },
        /**
         * 位置情報付きオブジェクトデータを一覧で取得します。
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Object} location スポット検索条件 (任意) 指定した位置情報でスポットを検索する
         * @param {Number} location.latitude 緯度情報。経度と合わせて指定する。
         * @param {Number} location.longitude 経度情報。緯度と合わせて指定する。
         * @param {Number} location.range 範囲情報。緯度経度と合わせて指定する。
         * @param {String} spotFieldName スポット項目名称 (任意) スポット情報を関連付けしている項目の名称を指定する。未指定時は、先頭のスポット項目が利用される。
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataListWithLocation: function(objectId, location, spotFieldName, searchConditions, sortConditions, success, error) {
            var _objectId, _location, _spotFieldName, _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 6) {
                // 引数が 6 の場合は、spotFieldName がない前提で処理する
                _objectId = arguments[0];
                _location = arguments[1]
                _spotFieldName = null;
                _searchConditions = arguments[2];
                _sortConditions = arguments[3];
                _success = arguments[4];
                _error = arguments[5];
            } else {
                // 引数が 6 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _location = location;
                _spotFieldName = spotFieldName;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("Object", _location) && !is("Null", _location) && !is("Undefined", _location)) { _error(RKZMessages.error("CDVE0001", "location"));return; }
            _location = _location || null;
            if (_location != null) {
                if (!is("Number", _location.latitude) && !is("Null", _location.latitude) && !is("Undefined", _location.latitude)) { _error(RKZMessages.error("CDVE0001", "location.latitude"));return; }
                if (!is("Number", _location.longitude) && !is("Null", _location.longitude) && !is("Undefined", _location.longitude)) { _error(RKZMessages.error("CDVE0001", "location.longitude"));return; }
                if (!is("Number", _location.range) && !is("Null", _location.range) && !is("Undefined", _location.range)) { _error(RKZMessages.error("CDVE0001", "location.range"));return; }

                if (is("Number", _location.latitude)) { _location.latitude = String(_location.latitude); }
                if (is("Number", _location.longitude)) { _location.longitude = String(_location.longitude); }
                if (is("Number", _location.range)) { _location.range = String(_location.range); }
            }

            if (!is("String", _spotFieldName) && !is("Null", _spotFieldName) && !is("Undefined", _spotFieldName)) { _error(RKZMessages.error("CDVE0001", "spotFieldName"));return; }
            _spotFieldName = _spotFieldName || null;

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            cordova.exec(_success, _error, featureName, "getDataListWithLocation", [ _objectId, _location, _spotFieldName, _searchConditions, _sortConditions ]);
        },
        /**
         * 位置情報付きオブジェクトデータを一覧で取得します。
         *
         * 取得する際に、取得する件数(limit)と取得する開始位置(offset)を指定します。
         *
         * 復帰値は以下の内容で返却します。
         * results = {
         *    limit: 10,         // 指定したlimitが格納されます。
         *    offset: 0,         // 指定したoffsetが格納されます。
         *    result_cnt: 108,   // 指定した条件に該当する件数が格納されます。 (limit, offsetは対象外)
         *    datas: [
         *          {},
         *          {},
         *          {},
         *      ]
         *   }
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Object} location スポット検索条件 (任意) 指定した位置情報でスポットを検索する
         * @param {Number} location.latitude 緯度情報。経度と合わせて指定する。
         * @param {Number} location.longitude 経度情報。緯度と合わせて指定する。
         * @param {Number} location.range 範囲情報。緯度経度と合わせて指定する。
         * @param {String} spotFieldName スポット項目名称 (任意) スポット情報を関連付けしている項目の名称を指定する。未指定時は、先頭のスポット項目が利用される。
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getPaginateDataListWithLocation: function(objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions, success, error) {
            var _objectId, _limit, _offset, _location, _spotFieldName, _searchConditions, _sortConditions;
            var _success, _error;

            if (arguments.length == 8) {
                // 引数が 8 の場合は、spotFieldName がない前提で処理する
                _objectId = arguments[0];
                _limit = arguments[1];
                _offset = arguments[2];
                _location = arguments[3]
                _spotFieldName = null;
                _searchConditions = arguments[4];
                _sortConditions = arguments[5];
                _success = arguments[6];
                _error = arguments[7];
            } else {
                // 引数が 8 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _limit = limit;
                _offset = offset;
                _location = location;
                _spotFieldName = spotFieldName;
                _searchConditions = searchConditions;
                _sortConditions = sortConditions;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("Number", _limit)) { _error(RKZMessages.error("CDVE0001", "limit"));return; }
            _limit = _limit || null;

            if (!is("Number", _offset)) { _error(RKZMessages.error("CDVE0001", "offset"));return; }
            _offset = _offset || null;

            if (!is("Object", _location) && !is("Null", _location) && !is("Undefined", _location)) { _error(RKZMessages.error("CDVE0001", "location"));return; }
            _location = _location || null;
            if (_location != null) {
                if (!is("Number", _location.latitude) && !is("Null", _location.latitude) && !is("Undefined", _location.latitude)) { _error(RKZMessages.error("CDVE0001", "location.latitude"));return; }
                if (!is("Number", _location.longitude) && !is("Null", _location.longitude) && !is("Undefined", _location.longitude)) { _error(RKZMessages.error("CDVE0001", "location.longitude"));return; }
                if (!is("Number", _location.range) && !is("Null", _location.range) && !is("Undefined", _location.range)) { _error(RKZMessages.error("CDVE0001", "location.range"));return; }
            }

            if (!is("String", _spotFieldName) && !is("Null", _spotFieldName) && !is("Undefined", _spotFieldName)) { _error(RKZMessages.error("CDVE0001", "spotFieldName"));return; }
            _spotFieldName = _spotFieldName || null;

            try { var _searchConditions = convertConditionToJson(_searchConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(_sortConditions); } catch (ex) {
                _error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }

            cordova.exec(_success, _error, featureName, "getPaginateDataListWithLocation", [ _objectId, _limit, _offset, _location, _spotFieldName, _searchConditions, _sortConditions ]);
        },
        /**
         * オブジェクトのフィールド情報を取得する
         *
         * @param {String} objectId オブジェクトID (必須)
         * @param {Boolean} visibleFieldOnly 表示項目のみ対象 (任意) true:表示項目のみ, false:表示項目以外も対象
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getFieldDataList: function(objectId, visibleFieldOnly, success, error) {
            var _objectId, _visibleFieldOnly;
            var _success, _error;

            if (arguments.length == 3) {
                // 引数が 3 の場合は、visibleFieldOnly がない前提で処理する
                _objectId = arguments[0];
                _visibleFieldOnly = true;
                _success = arguments[1];
                _error = arguments[2];
            } else {
                // 引数が 7 以外の場合は、どこに何が格納されているか判断できないので、デフォルトのまま処理する
                _objectId = objectId;
                _visibleFieldOnly = visibleFieldOnly;
                _success = success;
                _error = error;
            }

            if (!is("String", _objectId)) { _error(RKZMessages.error("CDVE0001", "objectId"));return; }
            _objectId = _objectId || "";

            if (!is("Boolean", _visibleFieldOnly) && !is("Null", _visibleFieldOnly) && !is("Undefined", _visibleFieldOnly)) { error(RKZMessages.error("CDVE0001", "visibleFieldOnly"));return; }
            if (is("Null", _visibleFieldOnly) || is("Undefined", _visibleFieldOnly)) {
                _visibleFieldOnly = true;
            }

            cordova.exec(_success, _error, featureName, "getFieldDataList", [ _objectId, _visibleFieldOnly ]);
        },
        /**
         * オブジェクトデータのQRコードからオブジェクトデータを取得する
         * 
         * @param {String} qrCode オブジェクトデータを表すQRコード値
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getDataFromQRCode: function(qrCode, success, error) {
            if (!is("String", qrCode)) { error(RKZMessages.error("CDVE0001", "qrCode"));return; }
            cordova.exec(success, error, featureName, "getDataFromQRCode", [ qrCode ]);
        },
        //--------------------------------------------------------------------------------
        // スポットAPI
        //--------------------------------------------------------------------------------
        /**
         * スポット情報を取得します。
         *
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getSpotList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getSpotList", [ _searchConditions, _sortConditions ]);
        },
        //--------------------------------------------------------------------------------
        // スタンプラリーAPI
        //--------------------------------------------------------------------------------
        /**
         * スタンプラリー一覧を取得します。
         *
         * @description
           無条件開催期間を条件に加えた形で検索します。

         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getStampRallyList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getStampRallyList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * スタンプラリー一覧を全件取得します。
         *
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getAllStampRallyList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getAllStampRallyList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * スタンプラリスポットの一覧を取得します。
         *
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getStampRallySpotList: function(searchConditions, sortConditions, success, error) {
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getStampRallySpotList", [ _searchConditions, _sortConditions ]);
        },
        /**
         * 指定されたスタンプラリーIDに該当するスタンプラリスポットの一覧を取得します。
         *
         * @param {String} stampRallyId スタンプラリーID (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getStampRallySpotListByStampRallyId: function(stampRallyId, searchConditions, sortConditions, success, error) {
            if (!is("String", stampRallyId)) { error(RKZMessages.error("CDVE0001", "stampRallyId"));return; }
            var _stampRallyId = stampRallyId || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getStampRallySpotListByStampRallyId", [ _stampRallyId, _searchConditions, _sortConditions ]);
        },
        /**
         * 指定されたスポットIDに該当するスタンプラリスポットの一覧を取得します。
         *
         * @param {String} spotId スポットID (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getStampRallySpotListBySpotId: function(spotId, searchConditions, sortConditions, success, error) {
            if (!is("String", spotId)) { error(RKZMessages.error("CDVE0001", "spotId"));return; }
            var _spotId = spotId || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getStampRallySpotListBySpotId", [ _spotId, _searchConditions, _sortConditions ]);
        },
        /**
         * 指定されたビーコンIDに該当するスタンプラリスポットの一覧を取得します。
         *
         * @param {String} beaconId ビーコンID (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getStampRallySpotListByBeaconId: function(beaconId, searchConditions, sortConditions, success, error) {
            if (!is("String", beaconId)) { error(RKZMessages.error("CDVE0001", "beaconId"));return; }
            var _beaconId = beaconId || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getStampRallySpotListByBeaconId", [ _beaconId, _searchConditions, _sortConditions ]);
        },
        /**
         * スタンプラリーのコンプリート結果を登録します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} stampRallyId スタンプラリーID (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        stampComplete: function(userAccessToken, stampRallyId, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("String", stampRallyId)) { error(RKZMessages.error("CDVE0001", "stampRallyId"));return; }
            var _stampRallyId = stampRallyId || "";
            cordova.exec(success, error, featureName, "stampComplete", [ _userAccessToken, _stampRallyId ]);
        },
        /**
         * スタンプを取得した結果を登録します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {String} stampRallyId スタンプラリーID (必須)
         * @param {String} stampRallySpotId スタンプラリースポットID (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addMyStamp: function(userAccessToken, stampRallyId, stampRallySpotId, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("String", stampRallyId)) { error(RKZMessages.error("CDVE0001", "stampRallyId"));return; }
            var _stampRallyId = stampRallyId || "";
            if (!is("String", stampRallySpotId)) { error(RKZMessages.error("CDVE0001", "stampRallySpotId"));return; }
            var _stampRallySpotId = stampRallySpotId || "";
            cordova.exec(success, error, featureName, "addMyStamp", [ _userAccessToken, _stampRallyId, _stampRallySpotId ]);
        },
        /**
         * スタンプを取得した履歴を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getMyStampHistoryList: function(userAccessToken, searchConditions, sortConditions, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getMyStampHistoryList", [ _userAccessToken, _searchConditions, _sortConditions ]);
        },
        //--------------------------------------------------------------------------------
        // コンタクト履歴API
        //--------------------------------------------------------------------------------
        /**
         * コンタクト履歴の一覧を取得します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Array.<RKZSearchCondition>|null} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>|null} sortConditions 取得する情報のソート条件
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        getContactList: function(userAccessToken, searchConditions, sortConditions, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getContactList", [ _userAccessToken, _searchConditions, _sortConditions ]);
        },
        /**
         * コンタクトを登録します。
         *
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Object} contact コンタクト情報 (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addContact: function(userAccessToken, contact, success, error) {
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";
            if (!is("Object", contact)) { error(RKZMessages.error("CDVE0001", "contact"));return; }
            var _contact = contact || {};
            _contact.contact_date = formatDate(_contact.contact_date);

            cordova.exec(success, error, featureName, "addContact", [ _userAccessToken, _contact ]);
        },
        //--------------------------------------------------------------------------------
        // お気に入りAPI
        //--------------------------------------------------------------------------------
        /**
         * オブジェクトデータをお気に入りに登録する
         * 
         * @param {Object} data オブジェクトデータ (必須)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addFavoriteToObjectData: function(data, userAccessToken, success, error) {
            if (!is("Object", data)) { error(RKZMessages.error("CDVE0001", "data"));return; }
            var _data = data || {};
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";

            cordova.exec(success, error, featureName, "addFavoriteToObjectData", [ _data, _userAccessToken ]);
        },
        /**
         * オブジェクトデータのお気に入りを削除する
         * 
         * @param {Object} data オブジェクトデータ (必須)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        deleteFavoriteToObjectData: function(data, userAccessToken, success, error) {
            if (!is("Object", data)) { error(RKZMessages.error("CDVE0001", "data"));return; }
            var _data = data || {};
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";

            cordova.exec(success, error, featureName, "deleteFavoriteToObjectData", [ _data, _userAccessToken ]);
        },
        /**
         * お知らせをお気に入りに登録する
         * 
         * @param {Object} news お知らせ情報 (必須)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        addFavoriteToNews: function(news, userAccessToken, success, error) {
            if (!is("Object", news)) { error(RKZMessages.error("CDVE0001", "news"));return; }
            var _news = news || {};
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";

            cordova.exec(success, error, featureName, "addFavoriteToNews", [ _news, _userAccessToken ]);
        },
        /**
         * お知らせのお気に入りを削除する
         * 
         * @param {Object} news お知らせ情報 (必須)
         * @param {String} userAccessToken ユーザーアクセストークン (必須)
         * @param {Function} success 成功時コールバック関数
         * @param {Function} error 失敗時のコールバック関数
         */
        deleteFavoriteToNews: function(news, userAccessToken, success, error) {
            if (!is("Object", news)) { error(RKZMessages.error("CDVE0001", "news"));return; }
            var _news = news || {};
            if (!is("String", userAccessToken)) { error(RKZMessages.error("CDVE0001", "userAccessToken"));return; }
            var _userAccessToken = userAccessToken || "";

            cordova.exec(success, error, featureName, "deleteFavoriteToNews", [ _news, _userAccessToken ]);
        }
    };
    return BaaSAtRakuza;
})();

module.exports = new BaaSAtRakuza();
