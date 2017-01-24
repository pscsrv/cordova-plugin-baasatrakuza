package jp.raku_za.baas.cordova.android;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by matsumoto on 16/08/09.
 */
public interface RKZAPIBridge {

    public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException;
}
