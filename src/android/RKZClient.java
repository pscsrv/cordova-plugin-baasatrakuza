package jp.raku_za.baas.cordova.android;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.raku_za.baas.cordova.android.impl.ApplicationBridge;
import jp.raku_za.baas.cordova.android.impl.BeaconBridge;
import jp.raku_za.baas.cordova.android.impl.ContactBridge;
import jp.raku_za.baas.cordova.android.impl.CouponBridge;
import jp.raku_za.baas.cordova.android.impl.FavoriteBridge;
import jp.raku_za.baas.cordova.android.impl.ObjectDataBridge;
import jp.raku_za.baas.cordova.android.impl.NewsBridge;
import jp.raku_za.baas.cordova.android.impl.PointBridge;
import jp.raku_za.baas.cordova.android.impl.PushBridge;
import jp.raku_za.baas.cordova.android.impl.SpotBridge;
import jp.raku_za.baas.cordova.android.impl.StampRallyBridge;
import jp.raku_za.baas.cordova.android.impl.TenantBridge;
import jp.raku_za.baas.cordova.android.impl.UserBridge;
import jp.raku_za.baas.cordova.android.impl.UserDetailBridge;

public class RKZClient extends CordovaPlugin
{

    private Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        tasks.putAll(new TenantBridge(cordova).getTasks());
        tasks.putAll(new ApplicationBridge(cordova).getTasks());
        tasks.putAll(new UserBridge(cordova).getTasks());
        tasks.putAll(new CouponBridge(cordova).getTasks());
        tasks.putAll(new PointBridge(cordova).getTasks());
        tasks.putAll(new BeaconBridge(cordova).getTasks());
        tasks.putAll(new NewsBridge(cordova).getTasks());
        tasks.putAll(new ObjectDataBridge(cordova).getTasks());
        tasks.putAll(new SpotBridge(cordova).getTasks());
        tasks.putAll(new StampRallyBridge(cordova).getTasks());
        tasks.putAll(new ContactBridge(cordova).getTasks());
        tasks.putAll(new FavoriteBridge(cordova).getTasks());
        tasks.putAll(new UserDetailBridge(cordova).getTasks());
        tasks.putAll(new PushBridge(cordova).getTasks());
    }

    @Override
    public boolean execute(String action, JSONArray data, final CallbackContext callbackContext) throws JSONException {

        if (!tasks.containsKey(action)) {
            // 該当するアクションが存在しない場合
            return false;
        }

        return tasks.get(action).execute(data, callbackContext);
    }
}
