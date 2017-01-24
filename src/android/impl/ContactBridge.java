package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnAddContactListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetContactListListener;
import jp.co.pscsrv.android.baasatrakuza.model.Contact;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class ContactBridge extends BridgeBase {

    public ContactBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * ビーコン情報取得用ブリッジクラス
     */
    private class GetContactListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToken = data.getString(0);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            RKZClient.getInstance().getContactList(userAccessToken, searchConditions, sortConditions, new OnGetContactListListener() {
                @Override
                public void onGetContactList(final List<Contact> list, final RKZResponseStatus rkzResponseStatus) {
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
     * ビーコン情報取得用ブリッジクラス
     */
    private class AddContactBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final GsonBuilder gb = new GsonBuilder().serializeNulls();
            gb.registerTypeHierarchyAdapter(Calendar.class, new SimpleCalendarJsonAdapter());
            final Gson gson = gb.create();

            final String userAccessToken = data.getString(0);
            final Contact contact = gson.fromJson(data.getString(1), Contact.class);

            RKZClient.getInstance().addContact(userAccessToken, contact, new OnAddContactListener() {
                @Override
                public void onAddContact(final RKZResponseStatus rkzResponseStatus) {
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
        tasks.put("getContactList", new GetContactListBridge());
        tasks.put("addContact", new AddContactBridge());
        return tasks;
    }
}
