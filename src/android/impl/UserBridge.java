package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAuthModelChangeListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnClearPushDeviceTokenListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnEditPasswordListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnEditUserListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZFieldDataListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetUserListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnRegistModelChangeCodeListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnRegistPushDeviceTokenListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnUpdateUserAccessTokenListener;
import jp.co.pscsrv.android.baasatrakuza.model.RKZFieldData;
import jp.co.pscsrv.android.baasatrakuza.model.User;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 16/08/09.
 */
public final class UserBridge extends BridgeBase {

    public UserBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * ユーザー登録用のブリッジクラス
     */
    private class RegistUserBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            try {
                final User user = new User(data.getJSONObject(0));
                // API呼び出し
                RKZClient.getInstance().registUser(user, new OnGetUserListener() {
                    @Override
                    public void onGetUser(final User user, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                // 結果をJSONに変換
                                // ここではカレンダーをJavaScriptのDate形式に焼き直すため、SimpleCalendarJsonAdapterをセットしたgsonを利用する
                                callbackContext.success(convertToJSONObject(user));
                            }
                        });
                    }
                });
            } catch (RKZResponseStatus status) {
                final JSONException ex = new JSONException(status.getMessage());
            }
            return true;
        }
    }

    /**
     * 顧客情報取得用ブリッジクラス
     */
    private class GetUserBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);

            // API呼び出し
            RKZClient.getInstance().getUser(userAccessToken, new OnGetUserListener() {
                @Override
                public void onGetUser(final User user, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(user));

                        }
                    });
                }
            });

            return true;
        }
    }

    /**
     * 顧客情報編集用ブリッジクラス
     */
    private class EditUserBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            try {
                final User user = new User(data.getJSONObject(0));

                RKZClient.getInstance().editUser(user, new OnEditUserListener() {
                    @Override
                    public void onEditUser(final User user, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(convertToJSONObject(user));
                            }
                        });
                    }
                });
            } catch (RKZResponseStatus status) {
                final JSONException ex = new JSONException(status.getMessage());
            }
            return true;
        }
    }

    /**
     * ログイン処理用ブリッジクラス
     */
    private class UserAuthBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String loginId = data.getString(0);
            final String password = data.getString(1);

            RKZClient.getInstance().userAuth(loginId, password, new OnGetUserListener() {
                @Override
                public void onGetUser(final User userInfo, RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(userInfo));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * プッシュデバイストークン登録用ブリッジクラス
     */
    private class RegistPushDeviceTokenBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final String deviceToken = data.getString(1);

            RKZClient.getInstance().registPushDeviceToken(userAccessToken, deviceToken, new OnRegistPushDeviceTokenListener() {
                @Override
                public void onRegistPushDeviceToken(final String statusCode, RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(statusCode);
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * パスワード変更用ブリッジクラス
     */
    private class EditPasswordBridge implements RKZAPIBridge {
        @Override
        public boolean execute(JSONArray data, final CallbackContext callbackContext) throws JSONException {
            //ユーザーアクセストークン
            final String userAccessToken = data.getString(0);
            //現在のパスワード
            final String nowPassword = data.getString(1);
            //新パスワード
            final String newPassword = data.getString(2);

            RKZClient.getInstance().editPassword(userAccessToken, nowPassword, newPassword, new OnEditPasswordListener() {
                @Override
                public void onEditPassword(final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(rkzResponseStatus.getStatusCode());
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * 機種変更コード発行用ブリッジクラス
     */
    private class RegistModelChangeCodeBridge implements RKZAPIBridge {
        @Override
        public boolean execute(JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);

            final Type type = new TypeToken<HashMap<String, Object>>() {}.getType();
            final Gson gson = getGson();
            final Map<String, Object> params = gson.fromJson(data.getString(1), type);


            //任意パラメータ設定
            final String password = (params.get("password") != null) ? params.get("password").toString() : null;
            Integer limitCode = null;
            if (params.get("limit_code") != null) {
                final Double _limitCode = Double.parseDouble(params.get("limit_code").toString());
                limitCode = _limitCode.intValue();
            }
            Integer limitMinute = null;
            if (params.get("limit_minute") != null) {
                final Double _limitMinute = Double.parseDouble(params.get("limit_minute").toString());
                limitMinute = _limitMinute.intValue();
            }

            RKZClient.getInstance().registModelChangeCode(userAccessToken, password, limitCode, limitMinute, new OnRegistModelChangeCodeListener(){
                @Override
                public void onRegistModelChangeCode(final String modelChangeCode, final Calendar limitDate, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            final Map<String,Object> results = new HashMap<String, Object>();
                            results.put("model_change_code",modelChangeCode);
                            results.put("limit_date",limitDate);
                            callbackContext.success(convertToJSONObject(results));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * 機種変更の認証用ブリッジクラス
     */
    private class AuthModelChangeBridge implements RKZAPIBridge {
        @Override
        public boolean execute(JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String modelChangeCode = data.getString(0);
            final String password = data.getString(1);
            RKZClient.getInstance().authModelChange(modelChangeCode, password, new OnAuthModelChangeListener() {
                @Override
                public void onAuthModelChange(final User user, final RKZResponseStatus rkzResponseStatus) {
                    //復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(user));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ユーザーアクセストークン更新用ブリッジクラス
     */
    private class UpdateUserAccessTokenBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            //ユーザーアクセストークン
            final String userAccessToken = data.getString(0);
            RKZClient.getInstance().updateUserAccessToken(userAccessToken, new OnUpdateUserAccessTokenListener() {
                @Override
                public void onUpdateUserAccessToken(final String newUserAccessToken, final RKZResponseStatus rkzResponseStatus) {
                    //復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(newUserAccessToken);
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ユーザーアクセストークン更新前処理ブリッジクラス
     */
    private class BeginUpdateUserAccessTokenBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            //ユーザーアクセストークン
            final String userAccessToken = data.getString(0);
            RKZClient.getInstance().beginUpdateUserAccessToken(userAccessToken, new OnUpdateUserAccessTokenListener() {
                @Override
                public void onUpdateUserAccessToken(final String newUserAccessToken, final RKZResponseStatus rkzResponseStatus) {
                    //復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(newUserAccessToken);
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ユーザーアクセストークン更新確定処理ブリッジクラス
     */
    private class CommitUpdateUserAccessTokenBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            //ユーザーアクセストークン
            final String userAccessToken = data.getString(0);
            RKZClient.getInstance().commitUpdateUserAccessToken(userAccessToken, new OnUpdateUserAccessTokenListener() {
                @Override
                public void onUpdateUserAccessToken(final String newUserAccessToken, final RKZResponseStatus rkzResponseStatus) {
                    //復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(newUserAccessToken);
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ユーザーオブジェクトのフィールド定義取得用ブリッジクラス
     */
    private class GetUserFieldDataListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Boolean visibleFieldOnly = (data.getString(0).toLowerCase().equals("null")) ? false : data.getBoolean(0);

            RKZClient.getInstance().getUserFieldDataList(visibleFieldOnly, new OnGetRKZFieldDataListListener() {
                @Override
                public void onGetRKZFieldDataList(final List<RKZFieldData> datas, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONArray(datas));
                        }
                    });
                }
            });
            return true;
        }
    }


    /**
     * プッシュデバイストークン登録用ブリッジクラス
     */
    private class ClearPushDeviceTokenBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);

            RKZClient.getInstance().clearPushDeviceToken(userAccessToken, new OnClearPushDeviceTokenListener() {
                @Override
                public void onClearPushDeviceToken(final String statusCode, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(statusCode);
                        }
                    });
                }
            });
            return true;
        }
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("registUser", new RegistUserBridge());
        tasks.put("getUser", new GetUserBridge());
        tasks.put("editUser", new EditUserBridge());
        tasks.put("userAuth", new UserAuthBridge());
        tasks.put("registPushDeviceToken", new RegistPushDeviceTokenBridge());
        tasks.put("editPassword", new EditPasswordBridge());
        tasks.put("registModelChangeCode", new RegistModelChangeCodeBridge());
        tasks.put("authModelChange", new AuthModelChangeBridge());
        tasks.put("updateUserAccessToken", new UpdateUserAccessTokenBridge());
        tasks.put("beginUpdateUserAccessToken", new BeginUpdateUserAccessTokenBridge());
        tasks.put("commitUpdateUserAccessToken", new CommitUpdateUserAccessTokenBridge());
        tasks.put("getUserFieldDataList", new GetUserFieldDataListBridge());
        tasks.put("clearPushDeviceToken", new ClearPushDeviceTokenBridge());
        return tasks;
    }
}
