package jp.raku_za.baas.cordova.android.impl;

import android.content.Context;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnInitializeListener;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 16/08/09.
 */
public final class TenantBridge extends BridgeBase {

    public TenantBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class SetTenantKeyBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Context context = cordova.getActivity();

            // テナントキーの認証
            final String tenantKey = data.get(0).toString();
            RKZClient.getInstance().initialize(context, tenantKey, new OnInitializeListener() {
                @Override
                public void onInitialize(boolean b, RKZResponseStatus rkzResponseStatus) {
                    if (rkzResponseStatus.isSuccess()) {
                        callbackContext.success();
                    } else {
                        callbackContext.error(rkzResponseStatus.getMessage());
                    }
                }
            });
            return true;
        }
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("setTenantKey", new SetTenantKeyBridge());
        return tasks;
    }
}
