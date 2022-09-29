package jp.raku_za.baas.cordova.android.impl;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnOpenPushListener;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

public class PushBridge extends BridgeBase {

    public PushBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class OpenPushBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final Integer pushNo = data.getInt(1);

            RKZClient.getInstance().openPush(userAccessToken, pushNo, new OnOpenPushListener() {
                @Override
                public void onOpenPush(String status, RKZResponseStatus rkzResponseStatus) {
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

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<>();
        tasks.put("openPush", new OpenPushBridge());
        return tasks;
    }
}