package jp.raku_za.baas.cordova.android.impl;

import android.content.Context;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.BeaconReceiverClient;
import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.listener.OnReceiveBeaconListener;
import jp.co.pscsrv.android.baasatrakuza.model.BeaconInfo;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Search for the beacon.
 *
 * Created by matsumoto on 2016/09/06.
 */
public class BeaconReceiverBridge extends BridgeBase {

    /** When receiving the beacon , calling the callback */
    private CallbackContext mReceiveCallbackContext = null;
    /** The beacon receiver client */
    private BeaconReceiverClient mReceiverClient = null;

    /**
     * Constructors with CordovaInterface in argument.
     *
     * @param cordova CordovaInterface
     */
    public BeaconReceiverBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * The bridge class for setting the 'BLUETUS' license key .
     *
     * @see <a href="http://www.bluetus.jp/">This is BLUETUS home page.</a>
     */
    private class SetBluetusLicenseKeyBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String licenseKey = data.getString(0);
            final Context context = cordova.getActivity().getApplicationContext();

            RKZClient.getInstance().setBluetusLicenseKey(context, licenseKey);
            callbackContext.success();
            return true;
        }
    }

    /**
     * The bridge class for setting the 'Beaconets' authentication password .
     *
     * @see <a href="http://www.fujitsu.com/jp/group/fnets/products/beaconets/">This is Beaconets home page.</a>
     */
    private class SetBeaconetsAuthenticationPasswordBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String licenseKey = data.getString(0);
            final Context context = cordova.getActivity().getApplicationContext();

            RKZClient.getInstance().setBluetusLicenseKey(context, licenseKey);
            callbackContext.success();
            return true;
        }
    }

    private class StartSearchBeaconBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            init();

            if (mReceiverClient.startSearchBeacon()) {
                callbackContext.success();
            } else {
                // TODO : エラーはここだけテキストで返す？
                // TODO : かといってオリジナルのエラーはcordovaで管理しているから、ここで作成はしたくない。(分散されてまう)
                // TODO : なのでcordova側でエラーをラップして復帰するしかないかな？
                callbackContext.error("CDVE0002");
            }

            return true;
        }
    }

    private class StopSearchBeaconBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            dispose();
            callbackContext.success();
            return true;
        }
    }

    private class ReceiveBeaconBridge implements RKZAPIBridge {
        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            mReceiveCallbackContext = callbackContext;

            PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);

            return true;
        }
    }

    private void init() {
        if (mReceiverClient != null) {
            dispose();
        }

        final Context context = cordova.getActivity().getApplicationContext();
        mReceiverClient = RKZClient.getInstance().getBeaconReceiverClient();
        mReceiverClient.init(context, new Runnable() {
            @Override
            public void run() {
                send(PluginResult.Status.ERROR, "aaaaa", true);
            }
        }, new Runnable() {
            @Override
            public void run() {
                send(PluginResult.Status.ERROR, "bbbbb", true);
            }
        });

        // 受信した時のイベントを作成する
        mReceiverClient.setOnReceiveBeaconListener(new OnReceiveBeaconListener() {
            @Override
            public void onReceiveBeacon(BeaconInfo beaconInfo) {
                send(beaconInfo, true);
            }
        });
    }

    private void dispose() {
        if (mReceiverClient != null) {
            mReceiverClient.stopSearchBeacon();
        }
        mReceiverClient = null;
        // イベント監視コールバックを停止する
        send(PluginResult.Status.NO_RESULT, null, false);
        mReceiveCallbackContext = null;
    }

    private void send(Object info, Boolean keepCallback) {
        send(PluginResult.Status.OK, info, keepCallback);
    }

    private void send(PluginResult.Status status, Object info, Boolean keepCallback) {
        if (mReceiveCallbackContext != null) {
            JSONObject json;
            try {
                PluginResult result;
                if (info != null) {
                    json = convertToJSONObject(info);
                    result = new PluginResult(status, json);
                } else {
                    result = new PluginResult(status);
                }
                result.setKeepCallback(keepCallback);
                mReceiveCallbackContext.sendPluginResult(result);
            } catch (JSONException e1) {
                try {
                    json = convertToJSONObject(e1.getMessage());
                    PluginResult result = new PluginResult(PluginResult.Status.JSON_EXCEPTION, json);
                    result.setKeepCallback(keepCallback);
                    mReceiveCallbackContext.sendPluginResult(result);
                } catch (JSONException e2) {
                    PluginResult result = new PluginResult(PluginResult.Status.JSON_EXCEPTION);
                    result.setKeepCallback(keepCallback);
                    mReceiveCallbackContext.sendPluginResult(result);
                }
            }
        }
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("setBluetusLicenseKey", new SetBluetusLicenseKeyBridge());
        tasks.put("setBeaconetsAuthenticationPassword", new SetBeaconetsAuthenticationPasswordBridge());
        tasks.put("startSearchBeacon", new StartSearchBeaconBridge());
        tasks.put("stopSearchBeacon", new StopSearchBeaconBridge());
        tasks.put("receiveBeacon", new ReceiveBeaconBridge());
        return tasks;
    }
}
