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
         * プッシュトークン情報を登録します。
         *
         * @param {Array.<RKZSearchCondition>} searchConditions 取得する情報の検索条件
         * @param {Array.<RKZSortCondition>} sortConditions 取得する情報のソート条件
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
         * @param {params.<"news_id", String>} ニュースID (必須)
         * @param {params.<"tenant_id", String>} テナントID (任意)
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
        getReleasedNewsList: function(limit, searchConditions, sortConditions, success, error) {
            if (!is("Number", limit) && !is("Undefined", limit) && !is("Null", limit)) { error(RKZMessages.error("CDVE0001", "limit"));return; }
            var _limit = limit || null;
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getReleasedNewsList", [ _limit, _searchConditions, _sortConditions ]);
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
        getNewsList: function(limit, searchConditions, sortConditions, success, error) {
            if (!is("Number", limit) && !is("Undefined", limit) && !is("Null", limit)) { error(RKZMessages.error("CDVE0001", "limit"));return; }
            var _limit = limit || null;
            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getNewsList", [ _limit, _searchConditions, _sortConditions ]);
        },
        /**
         * 単一お知らせ既読情報を取得します。
         *
         * @param {Object.<String, Object>} params 連想配列パラメータ (必須)
         * @param {params.<"news_id", String>} ニュースID (必須)
         * @param {params.<"tenant_id", String>} テナントID (任意)
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
         * @param {params.<"news_id", String>} ニュースID (必須)
         * @param {params.<"tenant_id", String>} テナントID (任意)
         * @param {params.<"read_date", Date>} 既読日時 (任意)既読日時未指定時は現在日時を自動的に指定
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
        getDataList: function(objectId, searchConditions, sortConditions, success, error) {
            if (!is("String", objectId)) { error(RKZMessages.error("CDVE0001", "objectId"));return; }
            var _objectId = objectId || null;

            try { var _searchConditions = convertConditionToJson(searchConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "searchConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            try { var _sortConditions   = convertConditionToJson(sortConditions); } catch (ex) {
                error(RKZMessages.error(ex.message, "sortConditions"));return;    // messageにERROR_STATUSが入るので注意
            }
            cordova.exec(success, error, featureName, "getDataList", [ _objectId, _searchConditions, _sortConditions ]);
        },
        /**
         * データオブジェクトにレコードを追加します。
         *
         * @param {Object.<String, Object>} data データオブジェクト (必須) object_idとname属性は必ず指定しておく必要があります。
         * @param {data.<"object_id", String>} オブジェクトID (必須)
         * @param {data.<"name", String>} 名称 (必須)
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
         * @param {data.<"object_id", String>} オブジェクトID (必須)
         * @param {data.<"code", String>} コード (必須)
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
        }
    };
    return BaaSAtRakuza;
})();

module.exports = new BaaSAtRakuza();
