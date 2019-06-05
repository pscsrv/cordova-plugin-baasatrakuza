package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddFavoriteListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnDeleteFavoriteListener;
import jp.co.pscsrv.android.baasatrakuza.model.News;
import jp.co.pscsrv.android.baasatrakuza.model.RKZObjectData;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

public class FavoriteBridge extends BridgeBase {

    public FavoriteBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class AddFavoriteToObjectDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);

            final RKZObjectData objectData = new RKZObjectData().getInstance(data.getString(0));
            final String userAccessToke = data.getString(1);

            RKZClient.getInstance().addFavoriteToObjecttData(objectData, userAccessToke, new OnAddFavoriteListener() {
                @Override
                public void onAddFavorite(final RKZResponseStatus rkzResponseStatus) {
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

    private class DeleteFavoriteToObjectDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);

            final RKZObjectData objectData = new RKZObjectData().getInstance(data.getString(0));
            final String userAccessToke = data.getString(1);

            RKZClient.getInstance().deleteFavoriteToObjectData(objectData, userAccessToke, new OnDeleteFavoriteListener() {
                @Override
                public void onDeleteFavorite(final RKZResponseStatus rkzResponseStatus) {
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

    private class AddFavoriteToNewsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);

            final News news = new News().getInstance(data.getString(0));
            final String userAccessToke = data.getString(1);

            RKZClient.getInstance().addFavoriteToNews(news, userAccessToke, new OnAddFavoriteListener() {
                @Override
                public void onAddFavorite(final RKZResponseStatus rkzResponseStatus) {
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

    private class DeleteFavoriteToNewsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);

            final News news = new News().getInstance(data.getString(0));
            final String userAccessToke = data.getString(1);

            RKZClient.getInstance().deleteFavoriteToNews(news, userAccessToke, new OnDeleteFavoriteListener() {
                @Override
                public void onDeleteFavorite(final RKZResponseStatus rkzResponseStatus) {
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

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("addFavoriteToObjectData", new FavoriteBridge.AddFavoriteToObjectDataBridge());
        tasks.put("deleteFavoriteToObjectData", new FavoriteBridge.DeleteFavoriteToObjectDataBridge());
        tasks.put("addFavoriteToNews", new FavoriteBridge.AddFavoriteToNewsBridge());
        tasks.put("deleteFavoriteToNews", new FavoriteBridge.DeleteFavoriteToNewsBridge());
        return tasks;
    }
}
