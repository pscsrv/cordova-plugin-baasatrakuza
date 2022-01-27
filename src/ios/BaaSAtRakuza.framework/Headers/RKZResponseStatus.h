//
//  RKZResponseStatus.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/17.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

@class RKZApiData;

///------------------------------
/// @name Constants
///------------------------------

/**
 楽座 API ステータスコード
 */
typedef NS_ENUM(NSInteger, RKZApiStatusCode) {
    /**
     成功 (Success)
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeSuccess = 1001,
    
    /**
     楽座バリデーションエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeValidationError = 2001,
    
    /**
     楽座アクションエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeActionError = 2002,
    
    /**
     楽座未ログインエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeNotLoginError = 2003,
    
    /**
     楽座認証エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeUnauthorizedError = 9001,
    
    /**
     楽座システムエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeSystemError = 9002,
    
    /**
     楽座データベース接続エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeDBConnectionError = 9003,
    
    
    /**
     楽座メール送信エラー(SMTP)
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeSendMailSMTPError = 9004,
    
    /**
     楽座メール送信エラー(SMTP)
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeSendMailError = 9005,
    
    /**
     楽座メンテナンス中エラー
     @since BaaSAtRakuzaSDK v2.5.0
     */
    RKZApiStatusCodeUnderMaintenanceError = 9009,
    
    /**
     楽座システム障害エラー
     @since BaaSAtRakuzaSDK v2.5.0
     */
    RKZApiStatusCodeSystemFailureError = 9010,
    
    /**
     API整合性エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeConsistencyError = 9011,
    
    /**
     サービス初期化エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeServiceInitializeError = 9012,
    
    /**
     必須入力エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeRequiredError = 9020,
    
    /**
     型変換エラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeClassCastError = 9021,
    
    /**
     コネクションエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeConnectionError = 9030,

    /**
     タイムアウトエラー
     @since BaaSAtRakuzaSDK v1.0
     */
    RKZApiStatusCodeConnectionTimeout = 9031,
};

/**
 RKZResponseStatusクラスは、楽座からのレスポンスステータスを格納するクラス
 */
@interface RKZResponseStatus : NSError


///------------------------------
/// @name Properties
///------------------------------

/// ステータスコード RKZApiStatusCode Enumが格納されます
@property(nonatomic) RKZApiStatusCode statusCode;
/// メッセージ
@property(nonatomic) NSString *message;
/// 詳細メッセージ
@property(nonatomic) NSString *detailMessage;
/// httpエラー
@property(nonatomic) NSError *httpError;

/**
 成功しているか
 
 YES:成功/ NO:失敗
 
 @since BaaSAtRakuzaSDK v1.0
 */
@property (nonatomic, readonly, getter=isSuccess) BOOL success;


///------------------------------
/// @name Initialization
///------------------------------

/**
 正常終了
 */
- (id)initSuccess;


/**
 楽座エラー
 
 @param rakuzaData 楽座から取得するエラーコード及びエラーメッセージ
 @param error 楽座以外から取得するエラー　httpエラー等
 楽座から取得されるエラーを返却するために用いられる。
 */
- (id)initWithError:(RKZApiData *)rakuzaData
              error:(NSError *)error;


/**
 コネクションエラー
 
 @param error 楽座以外から取得するエラー
 楽座から取得されるエラーを返却するために用いられる。
 */
- (id)initWithConnectionError:(NSError *)error;

/**
 コネクションタイムアウト

 @param error 楽座以外から取得するエラー
 楽座から取得されるエラーを返却するために用いられる。
 */
- (id)initWithConnectionTimeout:(NSError *)error;

/**
 楽座エラー (httpエラーなし)
 
 @param rakuzaData 楽座から取得するエラーコード及びエラーメッセージ
 楽座から取得されるエラーを返却するために用いられる。
 */
- (id)initWithError:(RKZApiData *)rakuzaData;

/**
 必須チェックエラー
 
 必須項目が未入力の時に返却するために用いられる。
 @param detailErrorMessage 詳細エラーメッセージ
 */
- (id)initWithRequiredError:(NSString *)detailErrorMessage;

/**
 入力チェックエラー
 入力チェックエラー時に返却するために用いられる。
 
 [columnName]は[message]を入力してください。
 
 @param columnName 項目名
 @param message メッセージ
 */
- (id)initWithInputError:(NSString *)columnName
                 message:(NSString *)message;

/**
 サービス初期化エラー
 
 サービスクラスを初期化していない状態で各種APIアクセスメソッドを呼び出したときに返却するために用いられる。
 */
- (id)initWithInitializeError;

/**
 サービス初期化エラー
 
 サービスクラスを初期化していない状態で各種APIアクセスメソッドを呼び出したときに返却するために用いられる。
 @param detailErrorMessage 詳細エラーメッセージ
 */
- (id)initWithInitializeError:(NSString *)detailErrorMessage;

/**
 楽座システム障害エラー
 @param error 楽座以外から取得するエラー
 楽座から取得されるエラーを返却するために用いられる。
 */
- (id)initWithSystemFailureError:(NSError *)error;

/**
 API整合性エラー
 
 ステータスコードは1001（正常）なのに、理屈的にはエラーの場合に返却するために用いられる。<br/>
 例）認証局に存在しないテナント認証コードを渡して認証局APIを呼び出した場合。
 @param detailErrorMessage 詳細エラーメッセージ
 */
- (id)initWithAPIConsistencyError:(NSString *)detailErrorMessage;

/**
 APIクラスエラー
 
 型変換に失敗した時に返却するために用いられる。<br/>
 例）検索条件クラス:RKZSearchCondition を用いず、他のクラスを設定してAPIを呼び出した場合。
 @param detailErrorMessage 詳細エラーメッセージ
 */
- (id)initWithAPIClassError:(NSString *)detailErrorMessage;


///------------------------------
/// @name Class Methods
///------------------------------

/**
 RKZApiStatusCode Enumのコード値をNSStringで返却する
 @param statusCode RKZApiStatusCode enum
 @return NSStringに変換したstatusCode
 */
+ (NSString *) RKZApiStatusCodeToString:(RKZApiStatusCode)statusCode;

@end
