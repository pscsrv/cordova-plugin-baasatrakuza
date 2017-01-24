package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.JsonParseException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddDetectBeaconContactListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetBeaconListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetDetectBeaconContactListener;
import jp.co.pscsrv.android.baasatrakuza.model.Beacon;
import jp.co.pscsrv.android.baasatrakuza.model.BeaconDetectContact;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class BeaconBridge extends BridgeBase {

    public BeaconBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * ビーコン情報取得用ブリッジクラス
     */
    private class GetBeaconListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getBeaconList(searchConditions, sortConditions, new OnGetBeaconListListener() {
                @Override
                public void onGetBeaconList(final List<Beacon> list, final RKZResponseStatus rkzResponseStatus) {
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
     * ビーコン検知コンタクト登録用ブリッジクラス
     */
    private class AddDetectBeaconContactBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final String beaconId = data.getString(1);
            final String beaconSpotCd = data.getString(2);
            final Integer rssi = (data.getString(3).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(3));
            final Calendar detectBeaconDatetime = (Calendar) Calendar.getInstance().clone();
            final DateFormat df = new SimpleDateFormat(STRING_TO_CALENDAR_PATTERN);
            df.setTimeZone(TimeZone.getDefault());
            try {
                detectBeaconDatetime.setTime(df.parse(data.getString(4)));
            } catch (ParseException e) {
                final JSONException ex = new JSONException(e.getMessage());
                ex.initCause(e);
                throw ex;
            }
            final String remarks = data.getString(5);

            RKZClient.getInstance().addDetectBeaconContact(userAccessToken, beaconId, beaconSpotCd, rssi, detectBeaconDatetime, remarks, new OnAddDetectBeaconContactListener() {
                @Override
                public void onAddDetectBeaconContact(final String status, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(status);
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ビーコン検知コンタクト登録用ブリッジクラス
     */
    private class GetDetectBeaconContactBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getDetectBeaconContact(userAccessToken, searchConditions, sortConditions, new OnGetDetectBeaconContactListener() {
                @Override
                public void onGetDetectBeaconContact(final List<BeaconDetectContact> list, final RKZResponseStatus rkzResponseStatus) {
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
        tasks.put("getBeaconList", new GetBeaconListBridge());
        tasks.put("addDetectBeaconContact", new AddDetectBeaconContactBridge());
        tasks.put("getDetectBeaconContact", new GetDetectBeaconContactBridge());
        return tasks;
    }
}
