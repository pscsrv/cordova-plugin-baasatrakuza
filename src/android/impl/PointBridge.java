package jp.raku_za.baas.cordova.android.impl;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetPointListener;
import jp.co.pscsrv.android.baasatrakuza.model.Point;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class PointBridge extends BridgeBase {

    public PointBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * ポイント情報取得用ブリッジクラス
     */
    private class GetPointBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToke = data.getString(0);

            RKZClient.getInstance().getPoint(userAccessToke, new OnGetPointListener() {
                @Override
                public void onGetPoint(final Point point, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(point));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * ポイント情報追加用ブリッジクラス
     */
    private class AddPointBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToke = data.getString(0);
            final Integer point = data.getInt(1);

            Calendar addDate = null;
            if (!data.isNull(2)) {
                addDate = (Calendar) Calendar.getInstance().clone();
                final DateFormat df = new SimpleDateFormat(STRING_TO_CALENDAR_PATTERN);
                df.setTimeZone(TimeZone.getDefault());
                try {
                    addDate.setTime(df.parse(data.getString(2)));
                } catch (ParseException e) {
                    final JSONException ex = new JSONException(e.getMessage());
                    ex.initCause(e);
                    throw ex;
                }
            }

            RKZClient.getInstance().addPoint(userAccessToke, point, addDate, new OnGetPointListener() {
                @Override
                public void onGetPoint(final Point point, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(point));
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
        tasks.put("getPoint", new GetPointBridge());
        tasks.put("addPoint", new AddPointBridge());
        return tasks;
    }
}
