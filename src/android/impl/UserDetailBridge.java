package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddUserDetailListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnDeleteUserDetailListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnEditUserDetailListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetPagingDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetUserDetailListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetUserDetailListener;
import jp.co.pscsrv.android.baasatrakuza.model.PagingData;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.co.pscsrv.android.baasatrakuza.model.UserDetail;
import jp.co.pscsrv.android.baasatrakuza.model.UserDetailExtensionAttribute;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

public class UserDetailBridge extends BridgeBase {

    public UserDetailBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    private class GetUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);
            final String userDetailId = data.getString(2);

            final Gson gson = getGson();
            final UserDetailExtensionAttribute extensionAttribute = gson.fromJson(data.getString(3), UserDetailExtensionAttribute.class);

            RKZClient.getInstance().getUserDetail(objectId, userAccessToken, userDetailId, extensionAttribute, new OnGetUserDetailListener() {
                @Override
                public void onGetUserDetail(UserDetail userDetail, RKZResponseStatus rkzResponseStatus) {
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(userDetail));
                        }
                    });
                }
            });
            return true;
        }
    }

    private class GetUserDetailListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(2));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(3));

            final Gson gson = getGson();
            final UserDetailExtensionAttribute extensionAttribute = gson.fromJson(data.getString(4), UserDetailExtensionAttribute.class);

            RKZClient.getInstance().getUserDetailList(objectId, userAccessToken, searchConditions, sortConditions, extensionAttribute, new OnGetUserDetailListListener() {
                @Override
                public void onGetUserDetailList(List<UserDetail> list, RKZResponseStatus rkzResponseStatus) {
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

    private class GetPaginateUserDetailListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            final Integer limit = data.getInt(2);
            final Integer offset = (data.getString(3).toLowerCase().equals("null")) ? 0 : data.getInt(3);

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(4));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(5));

            final Gson gson = getGson();
            final UserDetailExtensionAttribute extensionAttribute = gson.fromJson(data.getString(6), UserDetailExtensionAttribute.class);

            RKZClient.getInstance().getPaginateUserDetailList(objectId, userAccessToken, limit, offset, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener<UserDetail>() {
                @Override
                public void onGetPagingData(PagingData<UserDetail> pagingData, RKZResponseStatus rkzResponseStatus) {
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

    private class GetSharedUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);
            final String userDetailId = data.getString(2);

            final List<UserDetail.VisibilityType> visibility = createVisibility(data.getJSONArray(3));

            RKZClient.getInstance().getSharedUserDetail(objectId, userAccessToken, userDetailId, visibility, new OnGetUserDetailListener() {
                @Override
                public void onGetUserDetail(UserDetail userDetail, RKZResponseStatus rkzResponseStatus) {
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(userDetail));
                        }
                    });
                }
            });

            return true;
        }
    }

    private class GetSharedUserDetailListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            final List<UserDetail.VisibilityType> visibility = createVisibility(data.getJSONArray(2));

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(3));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(4));

            RKZClient.getInstance().getSharedUserDetailList(objectId, userAccessToken, visibility, searchConditions, sortConditions, new OnGetUserDetailListListener() {
                @Override
                public void onGetUserDetailList(List<UserDetail> list, RKZResponseStatus rkzResponseStatus) {
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

    private class GetPaginateSharedUserDetailListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            final Integer limit = data.getInt(2);
            final Integer offset = (data.getString(3).toLowerCase().equals("null")) ? 0 : data.getInt(3);

            final List<UserDetail.VisibilityType> visibility = createVisibility(data.getJSONArray(4));

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(5));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(6));

            RKZClient.getInstance().getPaginateSharedUserDetailList(objectId, userAccessToken, limit, offset, visibility, searchConditions, sortConditions, new OnGetPagingDataListener<UserDetail>() {
                @Override
                public void onGetPagingData(PagingData<UserDetail> pagingData, RKZResponseStatus rkzResponseStatus) {
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

    private class AddUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final UserDetail userDetail = new UserDetail().getInstance(data.getString(0));
            final String userAccessToken = data.getString(1);

            RKZClient.getInstance().addUserDetail(userDetail, userAccessToken, new OnAddUserDetailListener() {
                @Override
                public void onAddUserDetail(UserDetail userDetail, RKZResponseStatus rkzResponseStatus) {
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(userDetail));
                        }
                    });
                }
            });

            return true;
        }
    }

    private class EditUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final UserDetail userDetail = new UserDetail().getInstance(data.getString(0));
            final String userAccessToken = data.getString(1);

            RKZClient.getInstance().editUserDetail(userDetail, userAccessToken, new OnEditUserDetailListener() {
                @Override
                public void onEditUserDetail(UserDetail userDetail, RKZResponseStatus rkzResponseStatus) {
                    callback(callbackContext, rkzResponseStatus, new Success() {
                        @Override
                        public void execute(CallbackContext callbackContext) throws JSONException {
                            callbackContext.success(convertToJSONObject(userDetail));
                        }
                    });
                }
            });

            return true;
        }
    }

    private class DeleteUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(2));

            RKZClient.getInstance().deleteUserDetail(objectId, userAccessToken, searchConditions, new OnDeleteUserDetailListener() {
                @Override
                public void onDeleteUserDetail(Integer deleteCount, RKZResponseStatus rkzResponseStatus) {
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

    private class DeleteAllUserDetailBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String objectId = data.getString(0);
            final String userAccessToken = data.getString(1);

            RKZClient.getInstance().deleteAllUserDetail(objectId, userAccessToken, new OnDeleteUserDetailListener() {
                @Override
                public void onDeleteUserDetail(Integer deleteCount, RKZResponseStatus rkzResponseStatus) {
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

    private List<UserDetail.VisibilityType> createVisibility(JSONArray jsonArray) throws JSONException {
        final List<UserDetail.VisibilityType> visibility = new ArrayList<>();
        for (String visibilityType : createStringList(jsonArray)) {
            visibility.add(UserDetail.VisibilityType.of(visibilityType));
        }
        return visibility;
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<>();
        tasks.put("getUserDetail", new GetUserDetailBridge());
        tasks.put("getUserDetailList", new GetUserDetailListBridge());
        tasks.put("getPaginateUserDetailList", new GetPaginateUserDetailListBridge());
        tasks.put("getSharedUserDetail", new GetSharedUserDetailBridge());
        tasks.put("getSharedUserDetailList", new GetSharedUserDetailListBridge());
        tasks.put("getPaginateSharedUserDetailList", new GetPaginateSharedUserDetailListBridge());
        tasks.put("addUserDetail", new AddUserDetailBridge());
        tasks.put("editUserDetail", new EditUserDetailBridge());
        tasks.put("deleteUserDetail", new DeleteUserDetailBridge());
        tasks.put("deleteAllUserDetail", new DeleteAllUserDetailBridge());
        return tasks;
    }
}
