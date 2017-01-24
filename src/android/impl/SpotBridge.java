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
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetSpotListListener;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.co.pscsrv.android.baasatrakuza.model.Spot;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 16/08/09.
 */
public final class SpotBridge extends BridgeBase {

    public SpotBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class GetSpotListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(0));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(1));

            // API呼び出し
            RKZClient.getInstance().getSpotList(
                    searchConditions,
                    sortConditions,
                    new OnGetSpotListListener() {
                        @Override
                        public void onGetSpotList(final List<Spot> list, final RKZResponseStatus rkzResponseStatus) {
                            // 復帰値を設定する
                            callback(callbackContext, rkzResponseStatus, new Success() {
                                @Override
                                public void execute(CallbackContext callbackContext) throws JSONException {
                                    callbackContext.success(convertToJSONArray(list));
                                }
                            });
                        }
                    }
            );
            return true;
        }
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("getSpotList", new GetSpotListBridge());
        return tasks;
    }
}
