package jp.raku_za.baas.cordova.android.impl;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetApplicationSettingDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetLocaleListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetSystemDateListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnSetLocaleListener;
import jp.co.pscsrv.android.baasatrakuza.model.ApplicationConfig;
import jp.co.pscsrv.android.baasatrakuza.model.LocaleData;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.co.pscsrv.android.baasatrakuza.util.LocaleUtil;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/09/29.
 */

public class ApplicationBridge extends BridgeBase {

    public ApplicationBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class GetApplicationSettingDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            RKZClient.getInstance().getApplicationSettingData(new OnGetApplicationSettingDataListener() {
                @Override
                public void onGetApplicationSettingData(final ApplicationConfig applicationConfig, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(applicationConfig));
                        }
                    });
                }
            });
            return true;
        }
    }

    private class GetLocaleListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            RKZClient.getInstance().getLocaleList(searchConditions, sortConditions, new OnGetLocaleListListener() {
                @Override
                public void onGetLocaleList(final List<LocaleData> list, final RKZResponseStatus rkzResponseStatus) {
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

    private class GetLocaleBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            callbackContext.success(LocaleUtil.toString(RKZClient.getInstance().getLocale()));
            return true;
        }
    }

    private class SetLocaleBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);

            String strLocale = data.getString(1).replace("_", "-");
            final Locale locale = LocaleUtil.toLocale(strLocale);

            RKZClient.getInstance().setLocale(userAccessToken, locale, new OnSetLocaleListener() {
                @Override
                public void onSetLocale(final Locale locale, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            final String localeStr = LocaleUtil.toString(locale);
                            callbackContext.success(localeStr);
                        }
                    });
                }
            });
            return true;
        }
    }

    private class GetSystemDateBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            RKZClient.getInstance().getSystemDate(new OnGetSystemDateListener() {
                @Override
                public void onGetSystemDateListener(final Calendar calendar, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            final DateFormat df = new SimpleDateFormat(CALENDAR_TO_STRING_PATTERN);
                            df.setTimeZone(TimeZone.getDefault());
                            callbackContext.success(df.format(calendar.getTime()));
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
        tasks.put("getApplicationSettingData", new GetApplicationSettingDataBridge());
        tasks.put("getLocaleList", new GetLocaleListBridge());
        tasks.put("getLocale", new GetLocaleBridge());
        tasks.put("setLocale", new SetLocaleBridge());
        tasks.put("getSystemDate", new GetSystemDateBridge());
        return tasks;
    }
}
