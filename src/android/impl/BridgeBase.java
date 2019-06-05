package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;
import jp.raku_za.baas.cordova.android.RKZErrorResponse;

/**
 * Created by matsumoto on 16/08/09.
 */
public abstract class BridgeBase {

    /** 検索・並び順オブジェクトのカラム名定義 */
    private static final class COLUMN {
        public static final String TYPE = "type";
        public static final String NAME = "columnName";
        public static final String VALUE = "values";
    }

    static final String STRING_TO_CALENDAR_PATTERN = "yyyy-MM-dd HH:mm:ss";
    static final String CALENDAR_TO_STRING_PATTERN = "yyyy-MM-dd HH:mm:ss+0900";

    protected CordovaInterface cordova;

    public BridgeBase(final CordovaInterface cordova) {
        this.cordova = cordova;
    }

    /**
     * JSON値より検索条件リストを生成する。
     *
     * <p>
     *   検索タイプは、JSONにて渡された値をそのまま指定するため、RKZSearchConditionのTYPE値と同じでないとだめ。
     * </p>
     * @param searchValues JSON形式の検索条件
     * @return RKZSearchCondition
     * @throws JSONException
     */
    protected List<RKZSearchCondition> createSearchConditions(final JSONArray searchValues) throws JSONException {
        final Gson gson = getGson();
        final List<RKZSearchCondition> searchConditions = new ArrayList<RKZSearchCondition>();

        for (int i = 0; i < searchValues.length(); i++) {
            // SearchConditionのJSON値 -> Mapに変換
            final Map<String, Object> searchValue =  gson.fromJson(searchValues.getString(i), Map.class);

            if (searchValue.get(COLUMN.NAME).equals("sys_favorite:is_favorite")) {
                RKZSearchCondition sc = null;
                List<String> values = (List<String>) searchValue.get(COLUMN.VALUE);
                if (values.get(0).equals("1")) {
                    sc = RKZSearchCondition.initWithFavoriteType(RKZSearchCondition.WithFavoriteType.MyFavoriteOnly);
                } else if (values.get(0).equals("0")) {
                    sc = RKZSearchCondition.initWithFavoriteType(RKZSearchCondition.WithFavoriteType.NotMyFavorite);
                } else if (values.get(0).equals("ALL")) {
                    sc = RKZSearchCondition.initWithFavoriteType(RKZSearchCondition.WithFavoriteType.All);
                } else {
                    // 用意してないパターンなので無視
                }
                if (sc != null) { searchConditions.add(sc); }
                continue;
            }
            if (searchValue.get(COLUMN.NAME).equals("read_history_kbn")) {
                RKZSearchCondition sc = null;
                List<String> values = (List<String>) searchValue.get(COLUMN.VALUE);
                if (values.get(0).equals("1")) {
                    sc = RKZSearchCondition.initWithReadedNewsType(RKZSearchCondition.ReadedNewsType.AlreadyRead);
                } else if (values.get(0).equals("0")) {
                    sc = RKZSearchCondition.initWithReadedNewsType(RKZSearchCondition.ReadedNewsType.Nonread);
                } else if (values.get(0).equals("ALL")) {
                    sc = RKZSearchCondition.initWithReadedNewsType(RKZSearchCondition.ReadedNewsType.All);
                } else {
                    // 用意してないパターンなので無視
                }
                if (sc != null) { searchConditions.add(sc); }
                continue;
            }

            searchConditions.add(
                    new RKZSearchCondition(
                            (String) searchValue.get(COLUMN.TYPE),
                            (String) searchValue.get(COLUMN.NAME),
                            (List<String>) searchValue.get(COLUMN.VALUE)));
        }
        return searchConditions;
    }

    /**
     * JSON値より並び替え条件リストを生成する。
     *
     * <p>
     *   検索タイプは、JSONにて渡された値をそのまま指定するため、RKZSortConditionのTYPE値と同じでないとだめ。
     * </p>
     * @param searchValues JSON形式の並び替え条件
     * @return RKZSortCondition
     * @throws JSONException
     */
    protected List<RKZSortCondition> createSortConditions(final JSONArray searchValues) throws JSONException {
        final Gson gson = getGson();
        final List<RKZSortCondition> sortConditions = new ArrayList<RKZSortCondition>();

        for (int i = 0; i < searchValues.length(); i++) {
            // SearchConditionのJSON値 -> Mapに変換
            final Map<String, Object> searchValue =  gson.fromJson(searchValues.getString(i), Map.class);
            sortConditions.add(
                    new RKZSortCondition(
                            (String) searchValue.get(COLUMN.TYPE),
                            (String) searchValue.get(COLUMN.NAME)));
        }
        return sortConditions;
    }

    protected GsonBuilder getGsonBuilder() {
        final GsonBuilder gb = new GsonBuilder().serializeNulls();
        gb.registerTypeHierarchyAdapter(Calendar.class, new SimpleCalendarJsonAdapter());
        return gb;
    }

    protected Gson getGson() {
        return getGsonBuilder().create();
    }

    /**
     * JSONObjectに変換します。
     * @param object 変換対称のObject
     * @return JSONObject
     * @throws JSONException JSON変換時に発生するエラー
     */
    protected JSONObject convertToJSONObject(final Object object) throws JSONException {
        return convertToJSONObject(object, this.getGson());
    }

    protected JSONObject convertToJSONObject(final Object object, final Gson gson) throws JSONException {
        return new JSONObject(gson.toJson(object));
    }

    protected JSONArray convertToJSONArray(final List<?> objects) throws JSONException {
        return convertToJSONArray(objects, this.getGson());
    }

    protected JSONArray convertToJSONArray(final List<?> objects, final Gson gson) throws JSONException {
        return new JSONArray(gson.toJson(objects));
    }

    protected void callback(final CallbackContext callbackContext, final RKZResponseStatus rkzResponseStatus, final Success success) {
        try {
            if (rkzResponseStatus.isSuccess()) {
                success.execute(callbackContext);
            } else {
                final RKZErrorResponse errorResponse = new RKZErrorResponse(rkzResponseStatus);
                callbackContext.error(convertToJSONObject(errorResponse));
            }
        } catch (JSONException ex) {
            callbackContext.error(ex.getMessage());
        }
    }

    protected interface Success {
        public void execute(final CallbackContext callbackContext) throws JSONException;
    }

    /**
     * APIBridgeにて扱うタスクを復帰します。
     * @return タスク
     */
    public abstract Map<String, RKZAPIBridge> getTasks();

    protected class SimpleCalendarJsonAdapter implements JsonSerializer<Calendar>, JsonDeserializer<Calendar> {

        @Override
        public Calendar deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
            final String date = json.getAsString();
            final DateFormat df = new SimpleDateFormat(STRING_TO_CALENDAR_PATTERN);
            final Calendar c = (Calendar) Calendar.getInstance().clone();
            try {
                c.setTime(df.parse(date));
                return c;
            } catch (ParseException e) {
                throw new JsonParseException("Conversion error of date type.", e);
            }
        }

        @Override
        public JsonElement serialize(Calendar src, Type typeOfSrc, JsonSerializationContext context) {
            final DateFormat df = new SimpleDateFormat(CALENDAR_TO_STRING_PATTERN);
            df.setTimeZone(TimeZone.getDefault());
            return context.serialize(df.format(src.getTime()));
        }
    }
}
