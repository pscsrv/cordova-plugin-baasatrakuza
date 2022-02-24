package jp.raku_za.baas.cordova.android.impl;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;

import jp.co.pscsrv.android.baasatrakuza.client.RKZClient;
import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetNewsListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetNewsListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetNewsReadHistoryListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetNewsReadHistoryListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetPagingDataListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnGetReleasedNewsListListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnReadNewsListener;
import jp.co.pscsrv.android.baasatrakuza.listener.OnRegistNewsReadHistoryListener;
import jp.co.pscsrv.android.baasatrakuza.model.News;
import jp.co.pscsrv.android.baasatrakuza.model.NewsExtensionAttribute;
import jp.co.pscsrv.android.baasatrakuza.model.NewsReadHistory;
import jp.co.pscsrv.android.baasatrakuza.model.PagingData;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSearchCondition;
import jp.co.pscsrv.android.baasatrakuza.model.RKZSortCondition;
import jp.raku_za.baas.cordova.android.RKZAPIBridge;

/**
 * Created by matsumoto on 2016/08/23.
 */
public class NewsBridge extends BridgeBase {

    public NewsBridge(final CordovaInterface cordova) {
        super(cordova);
    }

    /**
     * お知らせ情報を取得します。
     */
    private class GetNewsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);

            // 指定されているパラメータ値を取得して呼び出すAPIを切り変える
            final String newsId = params.get("news_id");
            if (params.containsKey("tenant_id")) {
                final String tenantId = params.get("tenant_id");
                RKZClient.getInstance().getNews(newsId, tenantId, new OnGetNewsListener() {
                    @Override
                    public void onGetNews(final News news, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(convertToJSONObject(news));
                            }
                        });
                    }
                });
            } else {
                RKZClient.getInstance().getNews(newsId, new OnGetNewsListener() {
                    @Override
                    public void onGetNews(final News news, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(convertToJSONObject(news));
                            }
                        });
                    }
                });
            }
            return true;
        }
    }

    /**
     * 複数お知らせ情報（未公開も含む）を取得します。
     */
    private class GetNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = (data.getString(0).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(0));
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(3), NewsExtensionAttribute.class);

            RKZClient.getInstance().getNewsList(limit, searchConditions, sortConditions, extensionAttribute, new OnGetNewsListListener() {
                @Override
                public void onGetNewsList(final List<News> list, final RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（未公開も含む）を取得します。
     */
    private class GetPaginateNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = data.getInt(0);
            final Integer offset = (data.getString(1).toLowerCase().equals("null")) ? 0 : data.getInt(1);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(2));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(3));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(4), NewsExtensionAttribute.class);

            RKZClient.getInstance().getPaginateNewsList(limit, offset, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener<News>() {
                @Override
                public void onGetPagingData(PagingData<News> pagingData, RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（未公開も含む）を取得します。
     */
    private class GetSegmentNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = (data.getString(0).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(0));
            final String userAccessToke = (data.getString(1).toLowerCase().equals("null")) ? null : data.getString(1);
            final Boolean onlyMatchSegment = (data.getString(2).toLowerCase().equals("null")) ? false : data.getBoolean(2);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(3));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(4));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(5), NewsExtensionAttribute.class);

            RKZClient.getInstance().getSegmentNewsList(limit, userAccessToke, onlyMatchSegment, searchConditions, sortConditions, extensionAttribute, new OnGetNewsListListener() {
                @Override
                public void onGetNewsList(final List<News> list, final RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（未公開も含む）を取得します。
     */
    private class GetPaginateSegmentNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = data.getInt(0);
            final Integer offset = (data.getString(1).toLowerCase().equals("null")) ? 0 : data.getInt(1);
            final String userAccessToke = (data.getString(2).toLowerCase().equals("null")) ? null : data.getString(2);
            final Boolean onlyMatchSegment = (data.getString(3).toLowerCase().equals("null")) ? false : data.getBoolean(3);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(4));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(5));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(6), NewsExtensionAttribute.class);

            RKZClient.getInstance().getPaginateSegmentNewsList(limit, offset, userAccessToke, onlyMatchSegment, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener<News>() {
                @Override
                public void onGetPagingData(PagingData<News> pagingData, RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（公開中のもののみ）取得用ブリッジクラス
     */
    private class GetReleasedNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = (data.getString(0).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(0));
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(1));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(2));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(3), NewsExtensionAttribute.class);

            RKZClient.getInstance().getReleasedNewsList(limit, searchConditions, sortConditions, extensionAttribute, new OnGetReleasedNewsListListener() {
                @Override
                public void onGetReleasedNewsListListener(final List<News> list, final RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（公開中のもののみ）取得用ブリッジクラス
     */
    private class GetPaginateReleasedNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = data.getInt(0);
            final Integer offset = (data.getString(1).toLowerCase().equals("null")) ? 0 : data.getInt(1);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(2));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(3));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(4), NewsExtensionAttribute.class);

            RKZClient.getInstance().getPaginateReleasedNewsList(limit, offset, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener<News>() {
                @Override
                public void onGetPagingData(PagingData<News> pagingData, RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（公開中のもののみ）取得用ブリッジクラス
     */
    private class GetReleasedSegmentNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = (data.getString(0).toLowerCase().equals("null")) ? null : Integer.parseInt(data.getString(0));
            final String userAccessToke = (data.getString(1).toLowerCase().equals("null")) ? null : data.getString(1);
            final Boolean onlyMatchSegment = (data.getString(2).toLowerCase().equals("null")) ? false : data.getBoolean(2);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(3));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(4));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(5), NewsExtensionAttribute.class);

            RKZClient.getInstance().getReleasedSegmentNewsList(limit, userAccessToke, onlyMatchSegment, searchConditions, sortConditions, extensionAttribute, new OnGetReleasedNewsListListener() {
                @Override
                public void onGetReleasedNewsListListener(final List<News> list, final RKZResponseStatus rkzResponseStatus) {
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
     * 複数お知らせ情報（公開中のもののみ）取得用ブリッジクラス
     */
    private class GetPaginateReleasedSegmentNewsListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Integer limit = data.getInt(0);
            final Integer offset = (data.getString(1).toLowerCase().equals("null")) ? 0 : data.getInt(1);
            final String userAccessToke = (data.getString(2).toLowerCase().equals("null")) ? null : data.getString(2);
            final Boolean onlyMatchSegment = (data.getString(3).toLowerCase().equals("null")) ? false : data.getBoolean(3);
            final List<RKZSearchCondition> searchConditions = createSearchConditions(data.getJSONArray(4));
            final List<RKZSortCondition> sortConditions = createSortConditions(data.getJSONArray(5));

            final Gson gson = getGson();
            final NewsExtensionAttribute extensionAttribute = gson.fromJson(data.getString(6), NewsExtensionAttribute.class);

            RKZClient.getInstance().getPaginateReleasedSegmentNewsList(limit, offset, userAccessToke, onlyMatchSegment, searchConditions, sortConditions, extensionAttribute, new OnGetPagingDataListener<News>() {
                @Override
                public void onGetPagingData(PagingData<News> pagingData, RKZResponseStatus rkzResponseStatus) {
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
     * 単一お知らせ既読情報取得用ブリッジクラス
     */
    private class GetNewsReadHistoryBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);
            final String userAccessToke = data.getString(1);

            // 指定されているパラメータ値を取得して呼び出すAPIを切り変える
            final String newsId = params.get("news_id");
            if (params.containsKey("tenant_id")) {
                final String tenantId = params.get("tenant_id");
                RKZClient.getInstance().getNewsReadHistory(newsId, tenantId, userAccessToke, new OnGetNewsReadHistoryListener() {
                    @Override
                    public void onGetNewsReadHistory(final NewsReadHistory newsReadHistory, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(convertToJSONObject(newsReadHistory));
                            }
                        });
                    }
                });
            } else {
                RKZClient.getInstance().getNewsReadHistory(newsId, userAccessToke, new OnGetNewsReadHistoryListener() {
                    @Override
                    public void onGetNewsReadHistory(final NewsReadHistory newsReadHistory, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(convertToJSONObject(newsReadHistory));
                            }
                        });
                    }
                });
            }
            return true;
        }
    }

    /**
     * お知らせ既読情報取得用ブリッジクラス
     */
    private class GetNewsReadHistoryListBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final String userAccessToke = data.getString(0);

            RKZClient.getInstance().getNewsReadHistoryList(userAccessToke, new OnGetNewsReadHistoryListListener() {
                @Override
                public void onGetNewsReadHistoryList(final List<NewsReadHistory> list, final RKZResponseStatus rkzResponseStatus) {
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
     * お知らせ既読情報登録用ブリッジクラス
     */
    private class RegistNewsReadHistoryBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);
            final String userAccessToke = data.getString(1);

            // 指定されているパラメータ値を取得して呼び出すAPIを切り変える
            final String newsId = params.get("news_id");
            final Calendar readDate = (Calendar) Calendar.getInstance().clone();
            final DateFormat df = new SimpleDateFormat(STRING_TO_CALENDAR_PATTERN);
            df.setTimeZone(TimeZone.getDefault());
            try {
                readDate.setTime(df.parse(params.get("read_date")));
            } catch (ParseException e) {
                final JSONException ex = new JSONException(e.getMessage());
                ex.initCause(e);
                throw ex;
            }

            if (params.containsKey("tenant_id")) {
                final String tenantId = params.get("tenant_id");
                RKZClient.getInstance().registNewsReadHistory(newsId, tenantId, userAccessToke, readDate, new OnRegistNewsReadHistoryListener() {
                    @Override
                    public void onRegistNewsReadHistory(final String status, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(status);
                            }
                        });
                    }
                });
            } else {
                RKZClient.getInstance().registNewsReadHistory(newsId, userAccessToke, readDate, new OnRegistNewsReadHistoryListener() {
                    @Override
                    public void onRegistNewsReadHistory(final String status, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(status);
                            }
                        });
                    }
                });
            }
            return true;
        }
    }

    private class ReadNewsBridge implements RKZAPIBridge {

        @Override
        public boolean execute(final JSONArray data, final CallbackContext callbackContext) throws JSONException {
            final Gson gson = getGson();
            final Map<String, String> params = gson.fromJson(data.getString(0), HashMap.class);
            final String userAccessToke = data.getString(1);

            // 指定されているパラメータ値を取得して呼び出すAPIを切り変える
            final String newsId = params.get("news_id");

            if (params.containsKey("tenant_id")) {
                final String tenantId = params.get("tenant_id");
                RKZClient.getInstance().readNews(newsId, tenantId, userAccessToke, new OnReadNewsListener() {
                    @Override
                    public void onReadNews(final String status, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(status);
                            }
                        });
                    }
                });
            } else {
                RKZClient.getInstance().readNews(newsId, userAccessToke, new OnReadNewsListener() {
                    @Override
                    public void onReadNews(final String status, final RKZResponseStatus rkzResponseStatus) {
                        // 復帰値を設定する
                        callback(callbackContext, rkzResponseStatus, new Success() {
                            @Override
                            public void execute(CallbackContext callbackContext) throws JSONException {
                                callbackContext.success(status);
                            }
                        });
                    }
                });
            }
            return true;
        }
    }

    @Override
    public Map<String, RKZAPIBridge> getTasks() {
        final Map<String, RKZAPIBridge> tasks = new ConcurrentHashMap<String, RKZAPIBridge>();
        tasks.put("getNews", new GetNewsBridge());
        tasks.put("getNewsList", new GetNewsListBridge());
        tasks.put("getPaginateNewsList", new GetPaginateNewsListBridge());
        tasks.put("getSegmentNewsList", new GetSegmentNewsListBridge());
        tasks.put("getPaginateSegmentNewsList", new GetPaginateSegmentNewsListBridge());
        tasks.put("getReleasedNewsList", new GetReleasedNewsListBridge());
        tasks.put("getPaginateReleasedNewsList", new GetPaginateReleasedNewsListBridge());
        tasks.put("getReleasedSegmentNewsList", new GetReleasedSegmentNewsListBridge());
        tasks.put("getPaginateReleasedSegmentNewsList", new GetPaginateReleasedSegmentNewsListBridge());
        tasks.put("getNewsReadHistory", new GetNewsReadHistoryBridge());
        tasks.put("getNewsReadHistoryList", new GetNewsReadHistoryListBridge());
        tasks.put("registNewsReadHistory", new RegistNewsReadHistoryBridge());
        tasks.put("readNews", new ReadNewsBridge());
        return tasks;
    }
}
