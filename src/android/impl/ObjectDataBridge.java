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
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnDeleteDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnEditRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZObjectDataListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.model.RKZObjectData;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.O
 */
public class ObjectDataBridge extends BridgeBase {

    public ObjectDataBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * オブジェクトの単一データ取得用ブリッジクラス
     */
    private class GetDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String code = data.getString(1);

            RKZClient.getInstance().getData(objectId, code, new OnGetRKZObjectDataListener() {
                @Override
                public void onGetRKZObjectData(final RKZObjectData rkzObjectData, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(rkzObjectData));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * オブジェクトの単一データ取得用ブリッジクラス
     */
    private class GetDataListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getDataList(objectId, searchConditions, sortConditions, new OnGetRKZObjectDataListListener() {
                @Override
                public void onGetRKZObjectDataList(final List<RKZObjectData> list, final RKZResponseStatus rkzResponseStatus) {
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
     * オブジェクトの単一データ登録用ブリッジクラス
     */
    private class AddDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final RKZObjectData objectData = new RKZObjectData().getInstance(data.getString(0));

            RKZClient.getInstance().addData(objectData, new OnAddRKZObjectDataListener() {
                @Override
                public void onAddRKZObjectData(final String status, final RKZResponseStatus rkzResponseStatus) {
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
     * オブジェクトの単一データ編集用ブリッジクラス
     */
    private class EditDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final RKZObjectData objectData = new RKZObjectData().getInstance(data.getString(0));

            RKZClient.getInstance().editData(objectData, new OnEditRKZObjectDataListener() {
                @Override
                public void onEditRKZObjectData(final String status, final RKZResponseStatus rkzResponseStatus) {
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
     * オブジェクトの単一データ編集用ブリッジクラス
     */
    private class DeleteDataBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));

            RKZClient.getInstance().deleteData(objectId, searchConditions, new OnDeleteDataListener() {
                @Override
                public void onDeleteData(final Integer deleteCount, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(deleteCount);
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
        tasks.put("getData", new GetDataBridge());
        tasks.put("getDataList", new GetDataListBridge());
        tasks.put("addData", new AddDataBridge());
        tasks.put("editData", new EditDataBridge());
        tasks.put("deleteData", new DeleteDataBridge());
        return tasks;
    }
}
