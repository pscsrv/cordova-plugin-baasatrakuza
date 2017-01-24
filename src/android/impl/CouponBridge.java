package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnDeleteDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnExchangeCouponListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetCouponListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetCouponListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetMyCouponListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetMyCouponListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnUseMyCouponListener;
import jp.co.pscsrv.android.baasatrakuza.model.Coupon;
import jp.co.pscsrv.android.baasatrakuza.model.MyCoupon;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class CouponBridge extends BridgeBase {

    public CouponBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * 単一クーポン取得用ブリッジクラス
     */
    private class GetCouponBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String couponCode = data.getString(0);

            RKZClient.getInstance().getCoupon(couponCode, new OnGetCouponListener() {
                @Override
                public void onGetCoupon(final Coupon coupon, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(coupon));
                        }
                    });
                }
          });
            return true;
        }
    }

    /**
     * 複数クーポン情報取得用ブリッジクラス
     */
    private class GetCouponListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getCouponList(searchConditions, sortConditions, new OnGetCouponListListener() {
                @Override
                public void onGetCouponList(final List<Coupon> list, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONArray(list));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * クーポン交換用ブリッジクラス
     */
    private class ExchangeCouponBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToke = data.getString(0);
            final String couponCode = data.getString(1);
            final Integer quantity = data.getInt(2);

            RKZClient.getInstance().exchangeCoupon(userAccessToke, couponCode, quantity, new OnExchangeCouponListener() {
                @Override
                public void onExchangeCoupon(final String statusCode, final RKZResponseStatus rkzResponseStatus) {
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
     * クーポン利用ブリッジクラス
     */
    private class UseMyCouponBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final String userAccessToken = data.getString(0);
            final MyCoupon myCoupon = gson.fromJson(data.getString(1), MyCoupon.class);

            RKZClient.getInstance().useMyCoupon(userAccessToken, myCoupon, new OnUseMyCouponListener() {
                @Override
                public void onUseMyCoupon(final String statusCode, final RKZResponseStatus rkzResponseStatus) {
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
     * 単一マイクーポン取得ブリッジクラス
     */
    private class GetMyCouponBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final String myCouponCode = data.getString(1);

            RKZClient.getInstance().getMyCoupon(userAccessToken, myCouponCode, new OnGetMyCouponListener() {
                @Override
                public void onGetMyCoupon(final MyCoupon myCoupon, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(myCoupon));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * 複数マイクーポン取得ブリッジクラス
     */
    private class GetMyCouponListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getMyCouponList(userAccessToken, searchConditions, sortConditions, new OnGetMyCouponListListener() {
                @Override
                public void onGetMyCouponList(final List<MyCoupon> list, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONArray(list));
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
        tasks.put("getCoupon", new GetCouponBridge());
        tasks.put("getCouponList", new GetCouponListBridge());
        tasks.put("exchangeCoupon", new ExchangeCouponBridge());
        tasks.put("useMyCoupon", new UseMyCouponBridge());
        tasks.put("getMyCoupon", new GetMyCouponBridge());
        tasks.put("getMyCouponList", new GetMyCouponListBridge());
        return tasks;
    }
}
