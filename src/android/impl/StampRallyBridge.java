package jp.raku_za.baas.cordova.android.impl;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddMyStampListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetAcquisitionStateOfStampListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetStampRallyListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetStampRallySpotListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnStampCompleteListener;
import jp.co.pscsrv.android.baasatrakuza.model.MyStampHistory;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.co.pscsrv.android.baasatrakuza.model.StampRally;
import jp.co.pscsrv.android.baasatrakuza.model.StampRallySpot;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class StampRallyBridge extends BridgeBase {

    public StampRallyBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * スタンプラリー一覧取得用ブリッジクラス
     */
    private class GetStampRallyListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getStampRallyList(searchConditions, sortConditions, new OnGetStampRallyListListener() {
                @Override
                public void onGetStampRallyList(final List<StampRally> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリスポットの一覧取得用ブリッジクラス
     */
    private class GetAllStampRallyListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getAllStampRallyList(searchConditions, sortConditions, new OnGetStampRallyListListener() {
                @Override
                public void onGetStampRallyList(final List<StampRally> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class GetStampRallySpotListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getStampRallySpotList(searchConditions, sortConditions, new OnGetStampRallySpotListListener() {
                @Override
                public void onGetStampRallySpotList(final List<StampRallySpot> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class GetStampRallySpotListByStampRallyIdBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String stampRallyId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getStampRallySpotListByStampRallyId(stampRallyId, searchConditions, sortConditions, new OnGetStampRallySpotListListener() {
                @Override
                public void onGetStampRallySpotList(final List<StampRallySpot> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class GetStampRallySpotListBySpotIdBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String spotId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getStampRallySpotListBySpotId(spotId, searchConditions, sortConditions, new OnGetStampRallySpotListListener() {
                @Override
                public void onGetStampRallySpotList(final List<StampRallySpot> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class GetStampRallySpotListByBeaconIdBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String beaconId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getStampRallySpotListByBeaconId(beaconId, searchConditions, sortConditions, new OnGetStampRallySpotListListener() {
                @Override
                public void onGetStampRallySpotList(final List<StampRallySpot> list, final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class StampCompleteBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final String stampRallyId = data.getString(1);

            RKZClient.getInstance().stampComplete(userAccessToken, stampRallyId, new OnStampCompleteListener() {
                @Override
                public void onStampComplete(final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class AddMyStampBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final String stampRallyId = data.getString(1);
            final String stampRallySpotId = data.getString(2);

            RKZClient.getInstance().addMyStamp(userAccessToken, stampRallyId, stampRallySpotId, new OnAddMyStampListener() {
                @Override
                public void onAddMyStamp(final RKZResponseStatus rkzResponseStatus) {
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
     * スタンプラリースポット一覧取得用ブリッジクラス
     */
    private class GetMyStampHistoryListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getMyStampHistoryList(userAccessToken, searchConditions, sortConditions, new OnGetAcquisitionStateOfStampListener() {
                @Override
                public void onGetAcquisitionStateOfStamp(final List<MyStampHistory> list, final RKZResponseStatus rkzResponseStatus) {
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
        tasks.put("getStampRallyList", new GetStampRallyListBridge());
        tasks.put("getAllStampRallyList", new GetAllStampRallyListBridge());
        tasks.put("getStampRallySpotList", new GetStampRallySpotListBridge());
        tasks.put("getStampRallySpotListByStampRallyId", new GetStampRallySpotListByStampRallyIdBridge());
        tasks.put("getStampRallySpotListBySpotId", new GetStampRallySpotListBySpotIdBridge());
        tasks.put("getStampRallySpotListByBeaconId", new GetStampRallySpotListByBeaconIdBridge());
        tasks.put("stampComplete", new StampCompleteBridge());
        tasks.put("addMyStamp", new AddMyStampBridge());
        tasks.put("getMyStampHistoryList", new GetMyStampHistoryListBridge());
        return tasks;
    }
}
