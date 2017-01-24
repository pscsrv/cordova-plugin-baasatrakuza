package jp.raku_za.baas.cordova.android;

import com.google.gson.annotations.SerializedName;

import jp.co.pscsrv.android.baasatrakuza.core.RKZResponseStatus;

/**
 * 楽座にて発生したレスポンスステータスのエラー情報をラップするためのクラス
 * Created by matsumoto on 16/08/18.
 */
public class RKZErrorResponse {

    @SerializedName("status_code")
    private String statusCode;
    @SerializedName("message")
    private String message;

    public RKZErrorResponse(final RKZResponseStatus rkzResponseStatus) {
        this.statusCode = rkzResponseStatus.getStatusCode();
        this.message = rkzResponseStatus.getMessage();
    }
}
