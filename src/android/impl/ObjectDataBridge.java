package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnDeleteDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnEditRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetPagingDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZFieldDataListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZObjectDataListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetRKZObjectDataListener;
import jp.co.pscsrv.android.baasatrakuza.model.ObjectDataExtensionAttribute;
import jp.co.pscsrv.android.baasatrakuza.model.PagingData;
import jp.co.pscsrv.android.baasatrakuza.model.RKZLocation;
import jp.co.pscsrv.android.baasatrakuza.model.RKZFieldData;
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
     * オブジェクトの複数データ取得用ブリッジクラス
     */
    private class GetDataListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            final Gson gson = getGson();
            final ObjectDataExtensionAttribute extensionAttribute = gson.fromJson(data.getString(3), ObjectDataExtensionAttribute.class);

            RKZClient.getInstance().getDataList(objectId, searchConditions, sortConditions, extensionAttribute, new OnGetRKZObjectDataListListener() {
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

    private class GetPaginateDataListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final Integer limit = data.getInt(1);
            final Integer offset = (data.getString(2).toLowerCase().equals("null")) ? 0 : data.getInt(2);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(3));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(4));

            final Gson gson = getGson();
            final ObjectDataExtensionAttribute extensionAttribute = gson.fromJson(data.getString(5), ObjectDataExtensionAttribute.class);

            RKZClient.getInstance().getPaginateDataList(objectId, limit, offset, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener() {
                @Override
                public void onGetPagingData(final PagingData pagingData, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(pagingData));
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

    /**
     * オブジェクトの単一データ取得用ブリッジクラス
     */
    private class GetDataWithRelationObjectsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String code = data.getString(1);
            final Integer treeCount = (data.getString(2).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(2));

            RKZClient.getInstance().getDataWithRelationObjects(objectId, code, treeCount, new OnGetRKZObjectDataListener() {
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
     * オブジェクトの複数データ取得用ブリッジクラス
     */
    private class GetDataListWithRelationObjectsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final Integer treeCount = (data.getString(1).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(1));
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(2));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(3));

            RKZClient.getInstance().getDataListWithRelationObjects(objectId, treeCount, searchConditions, sortConditions, new OnGetRKZObjectDataListListener() {
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
     * オブジェクトの複数データ取得用ブリッジクラス
     */
    private class GetPaginateDataListWithRelationObjectsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final Integer limit = data.getInt(1);
            final Integer offset = (data.getString(2).toLowerCase().equals("null")) ? 0 : data.getInt(2);
            final Integer treeCount = (data.getString(3).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(3));
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(4));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(5));

            RKZClient.getInstance().getPaginateDataListWithRelationObjects(objectId, limit, offset, treeCount, searchConditions, sortConditions, new OnGetPagingDataListener() {
                @Override
                public void onGetPagingData(final PagingData pagingData, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(pagingData));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * オブジェクトデータのフィールド定義取得用ブリッジクラス
     */
    private class GetFieldDataListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final Boolean visibleFieldOnly = (data.getString(1).toLowerCase().equals("null")) ? false : data.getBoolean(1);

            RKZClient.getInstance().getFieldDataList(objectId, visibleFieldOnly, new OnGetRKZFieldDataListListener() {
                @Override
                public void onGetRKZFieldDataList(final List<RKZFieldData> datas, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONArray(datas));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * 位置情報付きオブジェクトの取得用ブリッジクラス
     */
    private class GetDataWithLocationBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String code = data.getString(1);
            final RKZLocation location = (data.getString(2).toLowerCase().equals("null")) ? null : new RKZLocation().getInstance(data.getString(2));
            final String spotFieldName = (data.getString(3).toLowerCase().equals("null")) ? null : data.getString(3);

            RKZClient.getInstance().getDataWithLocation(objectId, code, location, spotFieldName, new OnGetRKZObjectDataListener() {
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
     * 位置情報付きオブジェクトの取得用ブリッジクラス
     */
    private class GetDataListWithLocationBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final RKZLocation location = (data.getString(1).toLowerCase().equals("null")) ? null : new RKZLocation().getInstance(data.getString(1));
            final String spotFieldName = (data.getString(2).toLowerCase().equals("null")) ? null : data.getString(2);

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(3));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(4));

            RKZClient.getInstance().getDataListWithLocation(objectId, location, spotFieldName, searchConditions, sortConditions, new OnGetRKZObjectDataListListener() {
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
     * 位置情報付きオブジェクトの取得用ブリッジクラス
     */
    private class GetPaginateDataListWithLocationBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final Integer limit = data.getInt(1);
            final Integer offset =  (data.getString(2).toLowerCase().equals("null")) ? 0 : data.getInt(2);
            final RKZLocation location = (data.getString(3).toLowerCase().equals("null")) ? null : new RKZLocation().getInstance(data.getString(3));
            final String spotFieldName = (data.getString(4).toLowerCase().equals("null")) ? null : data.getString(4);

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(5));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(6));

            RKZClient.getInstance().getPaginateDataListWithLocation(objectId,
                    limit,
                    offset,
                    location,
                    spotFieldName,
                    searchConditions,
                    sortConditions,
                    new OnGetPagingDataListener() {
                @Override
                public void onGetPagingData(final PagingData pagingData, final RKZResponseStatus rkzResponseStatus) {
                    // 復帰値を設定する
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(pagingData));
                        }
                    });
                }
            });
            return true;
        }
    }

    /**
     * QRコードからオブジェクトデータを取得する
     */
    private class GetDataFromQRCode implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String qrCode = data.getString(0);

            RKZClient.getInstance().getDataFromQRCode(qrCode,
                    new OnGetRKZObjectDataListener() {
                        @Override
                        public void onGetRKZObjectData(final RKZObjectData rkzObjectData, RKZResponseStatus rkzResponseStatus) {
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

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("getData", new GetDataBridge());
        tasks.put("getDataList", new GetDataListBridge());
        tasks.put("getPaginateDataList", new GetPaginateDataListBridge());
        tasks.put("addData", new AddDataBridge());
        tasks.put("editData", new EditDataBridge());
        tasks.put("deleteData", new DeleteDataBridge());
        tasks.put("getDataWithRelationObjects", new GetDataWithRelationObjectsBridge());
        tasks.put("getDataListWithRelationObjects", new GetDataListWithRelationObjectsBridge());
        tasks.put("getPaginateDataListWithRelationObjects", new GetPaginateDataListWithRelationObjectsBridge());
        tasks.put("getDataWithLocation", new GetDataWithLocationBridge());
        tasks.put("getDataListWithLocation", new GetDataListWithLocationBridge());
        tasks.put("getPaginateDataListWithLocation", new GetPaginateDataListWithLocationBridge());
        tasks.put("getFieldDataList", new GetFieldDataListBridge());
        tasks.put("getDataFromQRCode", new GetDataFromQRCode());
        return tasks;
    }
}
