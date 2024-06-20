//
//  RKZService.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/12.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZResponseStatus.h"
#import "RKZPagingData.h"

NS_ASSUME_NONNULL_BEGIN

@class RKZUserData;
@class RKZPointData;
@class RKZCouponData;
@class RKZMyCouponData;
@class RKZMyStampRallyData;
@class RKZMyStampRallySpotData;
@class RKZMyStampData;
@class RKZNewsData;
@class RKZNewsReadHistoryData;
@class RKZObjectData;
@class RKZLocation;
@class RKZApplicationConfigData;
@class RKZUserEditWebView;
@class RKZContactData;
@class RKZEditPasswordWebView;
@class RKZObjectDataExtensionAttribute;
@class RKZNewsExtensionAttribute;
@class RKZFieldData;
@class RKZSearchCondition;
@class RKZSortCondition;
@class RKZBeaconData;
@class RKZBeaconDetectContactData;
@class RKZSpotData;
@class RKZLocaleData;
@class RKZStampRallyData;
@class RKZStampRallySpotData;
@class RKZMyStampHistoryData;
@class RKZUserDetailData;
@class RKZUserDetailExtensionAttribute;

/**
 BaaS@rakuza を利用するためのクラス
 
 BaaS@rakuza から情報の取得や新規登録・更新・削除を行う際に使用します。
 
 @warning -setTenantKey: を実行する前に各APIのメソッド呼び出しを行うと初期化エラーとなります。
 */
@interface RKZService : NSObject
{
    id manager;
}

///------------------------------
/// @name Properties
///------------------------------

/// RKZServiceが初期化されているか
@property (nonatomic, readonly, getter=isInitialized) BOOL initialized;
@property (nonatomic, readonly) NSNumber *_timeout;

///------------------------------
/// @name Class Methods
///------------------------------

/**
 シングルトンクラスのインスタンスを返す
 */
+ (RKZService *) sharedInstance;


///------------------------------
/// @name Instance Methods
///------------------------------

/**
 テナント認証を行います。
 
 @param tenantKey 契約時に配布したテナントキー(必須)
 @return RKZResponseStatus 初期化処理に成功するとisSuccessがYES、失敗するとNOで返却されます。<br >
 通信に成功するとテナント認証情報とシステム情報がUserdefaultsに保存され、 isInitialized がYESとなります。
 */
- (RKZResponseStatus *)setTenantKey:(NSString *)tenantKey;

- (RKZService *) setDefaultTimeout:(int)timeout;

- (RKZService *) setTimeout:(int)timeout;

@end

#pragma mark - Category

#pragma mark ユーザー
/**
 @category RKZService(User)
 ユーザサービス
 */
@interface RKZService(User)

/**
 ユーザー登録
 @param userData 登録するユーザー情報(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserData *userData, RKZResponseStatus *responseStatus )
 */
- (void)registUser:(RKZUserData *)userData
         withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus * responseStatus))block;

/**
 ユーザー編集
 @param userData 編集するユーザー情報 user_access_token を使用する
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br />(UserData* userData, RKZResponseStatus *responseStatus)
 通信に成功するとユーザーモデル:userDataが返却され、通信に失敗すると楽座エラー:rakuzaErrorが返却される。
 */
- (void) editUser:(RKZUserData *)userData withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus* responseStatus))block;

/**
 ユーザー情報取得
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserData *userData, RKZResponseStatus *responseStatus )
 */
- (void)getUser:(NSString *)userAccessToken
      withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus * responseStatus))block;


/**
 ユーザー編集WebView取得
 
 [RKZUserEditWebView startWebView] を実行すると WebView が開始されます。
 
 @param userData 編集するユーザー情報 user_access_token を使用する(必須)
 @param block 必須チェック後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserEditWebView *userEditWebView, RKZResponseStatus *responseStatus )
 */
- (void) getEditUserWebView:(RKZUserData *)userData
                  withBlock:(void (^)(RKZUserEditWebView* __nullable userEditWebView, RKZResponseStatus * responseStatus))block;


/**
 利用者のパスワード情報を変更する。
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param nowPassword 現在のパスワード(必須)
 @param newPassword 新パスワード(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
-(void) editPassword:(NSString *)userAccessToken nowPassword:(NSString *)nowPassword newPassword:(NSString *)newPassword
           withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus * responseStatus))block;

/**
 ユーザー情報を削除する
 
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) deleteUser:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 パスワード変更WebView取得
 
 [RKZEditPasswordWebView startWebView] を実行すると WebView が開始されます。
 
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 必須チェック後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZEditPasswordWebView *editPasswordWebView, RKZResponseStatus *responseStatus )
 */
- (void) getEditPasswordWebView:(NSString *)userAccessToken
                      withBlock:(void (^)(RKZEditPasswordWebView * __nullable editPasswordWebView, RKZResponseStatus * responseStatus))block;

/**
 機種変更コードを発行する。(パラメータ単数)
 
 @param userAccessToken   ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSString *modelChangeCode, NSDate *limitDate, RKZResponseStatus *responseStatus )
 */
-(void) registModelChangeCode:(NSString *)userAccessToken
                    withBlock:(void (^)(NSString * __nullable modelChangeCode, NSDate * __nullable limitDate, RKZResponseStatus * responseStatus))block;

/**
 機種変更認証コードを発行する。(パラメータ複数)
 
 @param userAccessToken   ユーザーアクセストークン
 @param password          パスワード
 @param limitCode         桁数
 @param limitMinute       有効時間(分)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSString *modelChangeCode, NSDate *limitDate, RKZResponseStatus *responseStatus )
 */
-(void) registModelChangeCode:(NSString *)userAccessToken
                     password:(nullable NSString *)password
                    limitCode:(nullable NSNumber *)limitCode
                  limitMinute:(nullable NSNumber *)limitMinute
                    withBlock:(void (^)(NSString * __nullable modelChangeCode, NSDate * __nullable limitDate, RKZResponseStatus * responseStatus))block;

/**
 機種変更の認証を行う。(パラメータ単数)
 
 @param modelChangeCode       認証コード
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserData* userData, RKZResponseStatus *responseStatus )
 */
-(void) authModelChange:(NSString *)modelChangeCode withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus * responseStatus))block;

/**
 機種変更の認証を行う。(パラメータ複数)
 
 @param modelChangeCode       認証コード
 @param password              パスワード
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserData* userData, RKZResponseStatus *responseStatus )
 */
-(void) authModelChange:(NSString *)modelChangeCode password:(nullable NSString *)password withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus * responseStatus))block;

/**
 ログインを行う。
 
 @param loginId       ログインID
 @param password      パスワード
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZUserData* userData, RKZResponseStatus *responseStatus )
 */
-(void) userAuth:(NSString *)loginId password:(NSString *)password withBlock:(void (^)(RKZUserData* __nullable userData, RKZResponseStatus * responseStatus))block;

/**
 ユーザーアクセストークン更新
 
 現在利用中のユーザーアクセストークンを更新する。<br />
 
 @param userAccessToken 現在利用中のユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
(NSString *newUserAccessToken, RKZResponseStatus *responseStatus)
 */
-(void) updateUserAccessToken:(NSString *)userAccessToken withBlock:(void (^)(NSString * __nullable newUserAccessToken, RKZResponseStatus * responseStatus))block;

/**
 ユーザーアクセストークン更新開始
 
 現在利用中のユーザーアクセストークンを更新する。<br />
 このメソッドで発行される新ユーザーアクセストークンは commitUpdateUserAccessToken: が呼び出されるまで利用できない。
 
 @param userAccessToken 現在利用中のユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 (NSString *newUserAccessToken, RKZResponseStatus *responseStatus)
 */
-(void) beginUpdateUserAccessToken:(NSString *)userAccessToken withBlock:(void (^)(NSString * __nullable newUserAccessToken, RKZResponseStatus * responseStatus))block;

/**
 ユーザーアクセストークン更新確定
 
 現在利用中のユーザーアクセストークンを更新する。<br />
 
 @param userAccessToken 現在利用中のユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 (NSString *newUserAccessToken, RKZResponseStatus *responseStatus)
 */
-(void) commitUpdateUserAccessToken:(NSString *)userAccessToken withBlock:(void (^)(NSString * __nullable newUserAccessToken, RKZResponseStatus * responseStatus))block;

/**
 新ユーザーアクセストークン確定
 
 発行された新しいユーザーアクセストークンを確定する。

 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
-(void) fixedUserAccessToken:(NSString *)newUserAccessToken;

/**
 使用言語登録
 
 パラメータで指定されたの言語情報をサーバーに登録する。<br />
 送信された言語情報より、BaaSにて利用可能な言語か判定して、利用可能な言語の場合はその言語情報を登録する。<br />
 利用できない言語情報だった場合、BaaSにて利用可能な言語に置き換えた結果を登録する。置き換えた言語情報は復帰値として返却される。<br />
 楽座にて利用可能な言語が特定できない場合は、null でサーバーに登録される。
 
 @param userAccessToken 使用言語を登録するユーザーアクセストークン(必須)
 @param locale 登録する言語情報(必須)
 @param block 登録処理後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSLocale *updateLocale, RKZResponseStatus *responseStatus )
 */
- (void) setLocale:(nullable NSString *)userAccessToken locale:(NSLocale *)locale withBlock:(void (^)(NSLocale * __nullable updateLocale, RKZResponseStatus * responseStatus))block;


/**
 ユーザーオブジェクトのフィールド情報取得
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray *rkzFieldArray, RKZResponseStatus *responseStatus )
 */
- (void)getUserFieldDataList:(void (^)(NSArray<RKZFieldData *> *rkzFieldArray, RKZResponseStatus * responseStatus))block;

/**
 ユーザーオブジェクトのフィールド情報取得
 visibleOnlyを指定することで、表示、非表示の項目の取得が切り替えできる。
 @param visibleFieldOnly 表示のみ取得フラグ (true:表示設定のみ, false:非表示も含める)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray *rkzFieldArray, RKZResponseStatus *responseStatus )
 */
- (void)getUserFieldDataList:(BOOL)visibleFieldOnly withBlock:(void (^)(NSArray<RKZFieldData *> *rkzFieldArray, RKZResponseStatus * responseStatus))block;

@end



#pragma mark ポイント
/**
 @category RKZService(Point)
 ポイント情報サービス
 */
@interface RKZService(Point)

/**
 所持ポイント情報取得
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPointData *pointData, RKZResponseStatus *responseStatus )
 */
- (void)getPoint:(NSString *)userAccessToken
       withBlock:(void (^)(RKZPointData * __nullable pointData, RKZResponseStatus * responseStatus))block;

/**
 ポイント加算減算
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param point 加算減算を行うポイント数:point(必須)
 @param contactDate コンタクト日: contact_date を指定 (yyyy-MM-dd hh:mm:ss)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPointData *pointData, RKZResponseStatus *responseStatus )
 */
- (void)addPoint:(NSString *)userAccessToken
           point:(NSNumber *)point
     contactDate:(nullable NSDate *)contactDate
       withBlock:(void (^)(RKZPointData * __nullable pointData, RKZResponseStatus * responseStatus))block;

@end



#pragma mark クーポン
/**
 @category RKZService(Coupon)
 クーポン情報サービス
 */
@interface RKZService(Coupon)

/**
 クーポン取得（単一クーポン）
 @param code クーポンコード:code を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZCouponData　*couponData, RKZResponseStatus *responseStatus )
 */
- (void)getCoupon:(NSString *)code
        withBlock:(void (^)(RKZCouponData * __nullable couponData, RKZResponseStatus * responseStatus))block;

/**
 クーポン取得（複数クーポン）
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZCouponData)　*couponDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getCouponList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
   sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
            withBlock:(void (^)(NSArray<RKZCouponData *> *couponDataArray, RKZResponseStatus * responseStatus))block;

/**
 クーポン交換
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param couponCd クーポンコード:code を指定する(必須)
 @param quantity クーポン枚数:quantity を指定する(任意)
 交換クーポン数が nil もしくは「0」や負数の場合は「1」として処理されます。
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)exchangeCoupon:(NSString *)userAccessToken
              couponCd:(NSString *)couponCd
              quantity:(nullable NSNumber *)quantity
             withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus * responseStatus))block;

/**
 クーポン利用
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param myCouponData マイクーポンコード:code クーポンコード:coupon_cd を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)useMyCoupon:(NSString *)userAccessToken
       myCouponData:(RKZMyCouponData *)myCouponData
          withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus * responseStatus))block;

/**
 マイクーポン取得（マイクーポン指定）
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param myCouponCd マイクーポンコード:code を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZMyCouponData *myCouponData, RKZResponseStatus *responseStatus )
 */
- (void)getMyCoupon:(NSString *)userAccessToken
         myCouponCd:(NSString *)myCouponCd
          withBlock:(void (^)(RKZMyCouponData * __nullable myCouponData, RKZResponseStatus * responseStatus))block;

/**
 マイクーポン取得（マイクーポン指定なし）
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZMyCouponData) *myCouponDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getMyCouponList:(NSString *)userAccessToken
   searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
     sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
              withBlock:(void (^)(NSArray<RKZMyCouponData *> *myCouponDataArray, RKZResponseStatus * responseStatus))block;

@end



#pragma mark ビーコン
/**
 @category RKZService(Beacon)
 ビーコン情報サービス
 */
@interface RKZService(Beacon)

/**
 ビーコン情報取得
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZBeaconData) *beaconDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getBeaconList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
   sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
            withBlock:(void (^)(NSArray<RKZBeaconData *> *beaconDataArray, RKZResponseStatus *responseStatus))block;

/**
 ビーコンスポット情報取得
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZBeaconSpotData) *beaconSpotDataArray, RKZResponseStatus *responseStatus )
 
 @warning ビーコンスポットに紐づくビーコンIDを検索条件に指定する場合、検索条件タイプ:RKZSearchConditionLikeOr ,検索項目名:"beacon" でビーコンIDを指定してください。
 */
- (void)getBeaconSpotList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
       sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                withBlock:(void (^)(NSArray<RKZBeaconData *> *beaconSpotDataArray, RKZResponseStatus *responseStatus))block;

/**
 ビーコン検知コンタクト追加
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param beaconId ビーコンID:beacon_id を指定する(必須)
 @param contactDate ビーコン検知コンタクト日時（日付型）:contactDate を指定する(必須)
 @param beaconSpotCd スポットコード:beacon_spot_cd を指定する(任意)
 @param rssi RSSI:rssi を指定する(任意)
 @param remarks 備考:remarks を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)addDetectBeaconContact:(NSString *)userAccessToken
                      beaconId:(NSString *)beaconId
                   contactDate:(NSDate *)contactDate
                  beaconSpotCd:(nullable NSString *)beaconSpotCd
                          rssi:(nullable NSString *)rssi
                       remarks:(nullable NSString *)remarks
                     withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 ビーコン検知コンタクト取得
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZBeaconDetectContactData)　*detectBeaconContactArray, RKZResponseStatus *responseStatus )
 */
- (void)getDetectBeaconContact:(NSString *)userAccessToken
          searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
            sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                     withBlock:(void (^)(NSArray<RKZBeaconDetectContactData *>*detectBeaconContactArray, RKZResponseStatus *responseStatus))block;

@end


#pragma mark スポット

/**
 @category RKZService(Spot)
 スポット情報サービス
 */
@interface RKZService(Spot)

/**
 スポット情報取得
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZSpotData) *spotDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getSpotList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
          withBlock:(void (^)(NSArray<RKZSpotData *> *spotDataArray, RKZResponseStatus *responseStatus))block;

@end

#pragma mark 言語
@interface RKZService(Locale)


/**
 楽座に設定されている言語リストを取得する。
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZLocaleData) *localeDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getLocaleList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
          withBlock:(void (^)(NSArray<RKZLocaleData *> *localeDataArray, RKZResponseStatus *responseStatus))block;

/**
 SDKに利用する言語情報(NSLocale)を設定します。<br />
 このメソッドにて設定したLocaleに該当するコンテンツがサーバより取得されるようになります。<br />
 @param locale 設定するLocaleを指定する。
 */
- (void) setLocale:(NSLocale *)locale __attribute__ ((deprecated));

/**
 SDKに設定されている言語情報(NSLocale)を取得します。
 @return NSLocale 設定されているlocale情報
 */
- (NSLocale *) getLocale;

@end

#pragma mark お知らせ
/**
 @category RKZService(News)
 お知らせ情報サービス
 */
@interface RKZService(News)

/**
 お知らせ取得（ニュースID指定）
 @param newsId ニュースID:news_id を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZNewsData *newsData, RKZResponseStatus *responseStatus )
 */
- (void)getNews:(NSString *)newsId
      withBlock:(void (^)(RKZNewsData * __nullable newsData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（ニュースID指定）
 @param newsId ニュースID:news_id を指定する(必須)
 @param tenantId テナントID:検索対象となるnewsを登録したテナントのIDを指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZNewsData *newsData, RKZResponseStatus *responseStatus )
 */
- (void)getNews:(NSString *)newsId
       tenantId:(NSString *)tenantId
      withBlock:(void (^)(RKZNewsData * __nullable newsData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 
 */
- (void)getReleasedNewsList:(nullable NSNumber *)limit
       searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                  withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 
 */
- (void)getReleasedNewsList:(nullable NSNumber *)limit
       searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
         extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                  withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 
 */
- (void)getPaginateReleasedNewsList:(NSNumber *)limit
                             offset:(NSNumber *)offset
               searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                          withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 
 */
- (void)getPaginateReleasedNewsList:(NSNumber *)limit
                             offset:(NSNumber *)offset
               searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                 extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                          withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 
 */
- (void)getReleasedSegmentNewsList:(nullable NSNumber *)limit
            userAccessToken:(NSString *)userAccessToken
           onlyMatchSegment:(BOOL)onlyMatchSegment
       searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                  withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 
 */
- (void)getReleasedSegmentNewsList:(nullable NSNumber *)limit
                   userAccessToken:(NSString *)userAccessToken
                  onlyMatchSegment:(BOOL)onlyMatchSegment
              searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                         withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 
 */
- (void)getPaginateReleasedSegmentNewsList:(NSNumber *)limit
                                    offset:(NSNumber *)offset
                           userAccessToken:(NSString *)userAccessToken
                          onlyMatchSegment:(BOOL)onlyMatchSegment
                      searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                        sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                                 withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（公開中のみ）（ニュースID未指定）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 
 */
- (void)getPaginateReleasedSegmentNewsList:(NSNumber *)limit
                                    offset:(NSNumber *)offset
                           userAccessToken:(NSString *)userAccessToken
                          onlyMatchSegment:(BOOL)onlyMatchSegment
                      searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                        sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                        extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                                 withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）

 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 */
- (void) getNewsList:(nullable NSNumber *)limit
searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
  sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
           withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 */
- (void) getNewsList:(nullable NSNumber *)limit
searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
  sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
  extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
           withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）

 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 */
- (void) getPaginateNewsList:(NSNumber *)limit
                      offset:(NSNumber *)offset
        searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
          sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                   withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 */
- (void) getPaginateNewsList:(NSNumber *)limit
                      offset:(NSNumber *)offset
        searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
          sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
          extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                   withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）

 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getSegmentNewsList:(nullable NSNumber *)limit
    userAccessToken:(NSString *)userAccessToken
   onlyMatchSegment:(BOOL)onlyMatchSegment
searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
          withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）
 
 @param limit 取得件数を指定する(任意) nilを設定した場合は全件取得を行います
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsData) *newsDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getSegmentNewsList:(nullable NSNumber *)limit
           userAccessToken:(NSString *)userAccessToken
          onlyMatchSegment:(BOOL)onlyMatchSegment
      searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
        sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
        extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                 withBlock:(void (^)(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）

 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateSegmentNewsList:(NSNumber *)limit
                            offset:(NSNumber *)offset
                   userAccessToken:(NSString *)userAccessToken
                  onlyMatchSegment:(BOOL)onlyMatchSegment
              searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                         withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ取得（非公開含む）
 
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param userAccessToken ユーザーアクセストークン
 @param onlyMatchSegment 配信条件一致分のみ取得するか否か (YES:配信条件一致分のみ取得、NO:以外も取得)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus )
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 */
- (void)getPaginateSegmentNewsList:(NSNumber *)limit
                            offset:(NSNumber *)offset
                   userAccessToken:(NSString *)userAccessToken
                  onlyMatchSegment:(BOOL)onlyMatchSegment
              searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                extensionAttribute:(RKZNewsExtensionAttribute *)extensionAttribute
                         withBlock:(void (^)(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報取得（ニュースID指定）
 @param newsId ニュースID:news_id を指定する(必須)
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZNewsReadHistoryData *newsReadHistoryData, RKZResponseStatus *responseStatus )
 */
- (void)getNewsReadHistory:(NSString *)newsId
           userAccessToken:(NSString *)userAccessToken
                 withBlock:(void (^)(RKZNewsReadHistoryData * __nullable newsReadHistoryData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報取得（ニュースID指定）
 @param newsId ニュースID:news_id を指定する(必須)
 @param tenantId テナントID:newsを登録したテナントのIDを指定する(必須)
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZNewsReadHistoryData *newsReadHistoryData, RKZResponseStatus *responseStatus )
 */
- (void)getNewsReadHistory:(NSString *)newsId
                  tenantId:(NSString *)tenantId
           userAccessToken:(NSString *)userAccessToken
                 withBlock:(void (^)(RKZNewsReadHistoryData * __nullable newsReadHistoryData, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報取得（ニュースID未指定）
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZNewsReadHistoryData) *newsReadHistoryDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getNewsReadHistoryList:(NSString *)userAccessToken
                     withBlock:(void (^)(NSArray<RKZNewsReadHistoryData *> *newsReadHistoryDataArray, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報登録
 @param newsId ニュースID:news_id を指定する(必須)
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param readDate 日付(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)registNewsReadHistory:(NSString *)newsId
              userAccessToken:(NSString *)userAccessToken
                     readDate:(NSDate *)readDate
                    withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報登録
 @param newsId ニュースID:news_id を指定する(必須)
 @param tenantId テナントID:newsを登録したテナントのIDを指定する(必須)
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param readDate 日付(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)registNewsReadHistory:(NSString *)newsId
                     tenantId:(NSString *)tenantId
              userAccessToken:(NSString *)userAccessToken
                     readDate:(NSDate *)readDate
                    withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報登録 (New)
 
 @param newsId ニュースID (必須)
 @param user_access_token ユーザーアクセストークン (必須)
 */
- (void)readNews:(NSString *)newsId userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 お知らせ既読情報登録 (New)
 
 @param newsId ニュースID (必須)
 @param user_access_token ユーザーアクセストークン (必須)
 */
- (void)readNews:(NSString *)newsId tenantId:(NSString *)tenantId userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

@end



#pragma mark データオブジェクト
/**
 @category RKZService(ObjectData)
 データオブジェクトサービス
 */
@interface RKZService(ObjectData)

/**
 データオブジェクト取得（キー指定）
 @param objectId オブジェクトID:object_id (必須)
 @param code キーコード:code (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getData:(NSString *)objectId
           code:(NSString *)code
      withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getDataList:(NSString *)objectId
searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
 sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
          withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param userAccessToken ユーザーアクセストークン:userAccessToken (必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void) getDataList:(NSString *)objectId
searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
  sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
  extensionAttribute:(RKZObjectDataExtensionAttribute *)extensionAttribute
           withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData *pagingData, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataList:(NSString *)objectId
                      limit:(NSNumber *)limit
                     offset:(NSNumber *)offset
       searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                  withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param userAccessToken ユーザーアクセストークン:userAccessToken (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData *pagingData, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataList:(NSString *)objectId
                      limit:(NSNumber *)limit
                     offset:(NSNumber *)offset
       searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
         extensionAttribute:(RKZObjectDataExtensionAttribute *)extensionAttribute
                  withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト登録
 @param objectData オブジェクトデータ:object_id キーコード:code 名称:name が必須項目です
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)addData:(RKZObjectData *)objectData
      withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト編集
 @param objectData オブジェクトデータ:object_id キーコード:code が必須項目です
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)editData:(RKZObjectData *)objectData
       withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 オブジェクトデータ使用不可設定
 @param objectId オブジェクトID(必須)
 @param code キーコード:code (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)deleteData:(NSString *)objectId
              code:(NSString *)code
         withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block __attribute__ ((deprecated("このメソッドは`-deleteData:searchConditions:withBlock:`に置き換えられました。")));


/**
 オブジェクトデータ削除
 @param objectId オブジェクトID(必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)deleteData:(NSString *)objectId searchConditions:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
         withBlock:(void (^)(NSNumber *deleteCount, RKZResponseStatus *responseStatus))block;

/**
 オブジェクトデータ全件削除
 @param objectId オブジェクトID(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void)deleteAllData:(NSString *)objectId withBlock:(void (^)(NSNumber *deleteCount, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定）
 @param objectId オブジェクトID:object_id (必須)
 @param code キーコード:code (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getDataWithRelationObjects:(NSString *)objectId
                              code:(NSString *)code
                         withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定）
 @param objectId オブジェクトID:object_id (必須)
 @param code キーコード:code (必須)
 @param treeCount 取得階層数(任意) 指定した階層数を取得。
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getDataWithRelationObjects:(NSString *)objectId
                              code:(NSString *)code
                         treeCount:(nullable NSNumber *)treeCount
                         withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getDataListWithRelationObjects:(NSString *)objectId
                  searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                    sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                             withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param treeCount 取得階層数(任意) 指定した階層数を取得。
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getDataListWithRelationObjects:(NSString *)objectId
                             treeCount:(nullable NSNumber *)treeCount
                  searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                    sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                             withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData *pagingData, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataListWithRelationObjects:(NSString *)objectId
                                         limit:(NSNumber *)limit
                                        offset:(NSNumber *)offset
                          searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                            sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                                     withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得外部結合（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param treeCount 取得階層数(任意) 指定した階層数を取得。
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZPagingData *pagingData, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataListWithRelationObjects:(NSString *)objectId
                                         limit:(NSNumber *)limit
                                        offset:(NSNumber *)offset
                                     treeCount:(nullable NSNumber *)treeCount
                          searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                            sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                                     withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定）
 @param objectId オブジェクトID:object_id (必須)
 @param code キーコード:code (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getDataWithLocation:(NSString *)objectId
                       code:(NSString *)code
                  location:(nullable RKZLocation *)location
                  withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定）
 @param objectId オブジェクトID:object_id (必須)
 @param code キーコード:code (必須)
 @param location ロケーション情報
 @param spotFieldName スポットフィールド名称
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getDataWithLocation:(NSString *)objectId
                       code:(NSString *)code
                   location:(nullable RKZLocation *)location
              spotFieldName:(nullable NSString *)spotFieldName
                  withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param location ロケーション情報
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getDataListWithLocation:(NSString *)objectId
                       location:(nullable RKZLocation *)location
           searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
             sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                      withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param location ロケーション情報
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getDataListWithLocation:(NSString *)objectId
                       location:(nullable RKZLocation *)location
                  spotFieldName:(nullable NSString *)spotFieldName
           searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
             sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                      withBlock:(void (^)(NSArray<RKZObjectData *> *rkzObjectDataArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param location ロケーション情報
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataListWithLocation:(NSString *)objectId
                                  limit:(NSNumber *)limit
                                 offset:(NSNumber *)offset
                               location:(nullable RKZLocation *)location
                   searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                     sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                              withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（キー指定なし）
 @param objectId オブジェクトID:object_id (必須)
 @param limit 取得件数
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定
 @param location ロケーション情報
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZTableData) *rkzTableDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getPaginateDataListWithLocation:(NSString *)objectId
                                  limit:(NSNumber *)limit
                                 offset:(NSNumber *)offset
                               location:(nullable RKZLocation *)location
                          spotFieldName:(nullable NSString *)spotFieldName
                   searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                     sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                              withBlock:(void (^)(RKZPagingData<RKZObjectData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 オブジェクトのフィールド情報の表示設定されたフィールドのみ取得する
 @param objectId オブジェクトID (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray *rkzFieldArray, RKZResponseStatus *responseStatus )
 */
- (void)getFieldDataList:(NSString *)objectId withBlock:(void (^)(NSArray<RKZFieldData *> *rkzFieldArray, RKZResponseStatus *responseStatus))block;


/**
 オブジェクトのフィールド情報取得
 visibleOnlyを指定することで、表示、非表示の項目の取得が切り替えできる。
 @param objectId オブジェクトID (必須)
 @param visibleFieldOnly 表示のみ取得フラグ (true:表示設定のみ, false:非表示も含める)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray *rkzFieldArray, RKZResponseStatus *responseStatus )
 */
- (void)getFieldDataList:(NSString *)objectId visibleFieldOnly:(BOOL)visibleFieldOnly withBlock:(void (^)(NSArray<RKZFieldData *> *rkzFieldArray, RKZResponseStatus *responseStatus))block;

/**
 データオブジェクト取得（QRコード指定）
 @param qrCode QRコード:qr_code (必須)
 @param code キーコード:code (必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZObjectData* objectData, RKZResponseStatus *responseStatus )
 */
- (void)getDataFromQRCode:(NSString *)qrCode
      withBlock:(void (^)(RKZObjectData* __nullable objectData, RKZResponseStatus *responseStatus))block;

@end



#pragma mark アプリケーション設定
/**
 @category RKZService(ApplicationConfig)
 アプリケーション設定情報サービス
 */
@interface RKZService(ApplicationConfig)

/**
 アプリケーション設定情報取得
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApplicationConfigData *applicationConfigData, RKZResponseStatus *responseStatus )
 */
- (void)getApplicationSettingDataWithBlock:(void (^)(RKZApplicationConfigData * __nullable applicationConfigData, RKZResponseStatus *responseStatus))block;

@end


#pragma mark 楽座システム日付取得
/**
 @category RKZService(GetSystemDate)
 楽座システム日付取得サービス
 */
@interface RKZService(GetSystemDate)

/**
 楽座システム日付取得
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSDate *rakuzaSystemDate, RKZResponseStatus *responseStatus )
 */
- (void)getSystemDateWithBlock:(void (^)(NSDate * __nullable rakuzaSystemDate, RKZResponseStatus *responseStatus))block;

/**
 楽座システム日付取得
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSString *rakuzaSystemDateStr, RKZResponseStatus *responseStatus )
 */
- (void)getSystemDateStrWithBlock:(void (^)(NSString * __nullable rakuzaSystemDateStr, RKZResponseStatus *responseStatus))block;

/**
 楽座システム日付取得
 @return 楽座システム日付
 通信に失敗するとnilを返却する。
 */
- (nullable NSDate *)getSystemDate;

/**
 楽座システム日付取得
 @return 楽座システム日付
 通信に失敗するとnilを返却する。
 */
- (nullable NSString *)getSystemDateStr;

@end


#pragma mark プッシュ通知
/**
 @category RKZService(Push)
 プッシュ通知サービス
 */
@interface RKZService(Push)

/**
 プッシュトークン情報登録
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param deviceToken Push通知デバイストークン を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/> (RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus)
 */
- (void) registPushDeviceToken:(NSString *)userAccessToken
                   deviceToken:(NSString *)deviceToken
                     withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 プッシュトークン情報削除
 @param userAccessToken ユーザーアクセストークン:user_access_token を指定する(必須)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/> (RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus)
 */
- (void) clearPushDeviceToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 プッシュ通知を開封済みにします。
 
 @param userAccessToken ユーザーアクセストークン(必須)
 @param pushNo プッシュ番号(必須)
 @param block 通信後にblockが実行される
 */
- (void) openPush:(NSString *)userAccessToken
           pushNo:(NSNumber *)pushNo
        withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

@end


#pragma mark スタンプラリー機能
/**
 @category RKZService(StampRally)
 スタンプラリーサービス
 */
@interface RKZService(StampRally)

/**
 スタンプラリー一覧取得
 
 スタンプラリー情報を取得します。このメソッドでは開催期間に当てはまるスタンプラリー情報のみを取得します。
 searchConditionArrayに開催日時の条件を追加して検索できます。 (開催日時の検索条件は無効になります。)
 
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallyData) *stampRallyDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getStampRallyList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
      sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
               withBlock:(void (^)(NSArray<RKZStampRallyData *>*stampRallyDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプラリー一覧取得 (全件取得)
 
 スタンプラリー情報を取得します。このメソッドでは開催日時を無視して開催が終了している or 未来日に開催される情報もすべて取得します。
 searchConditionArrayに開催日時の条件を追加して検索できます。
 
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallyData) *stampRallyDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getAllStampRallyList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
       sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                withBlock:(void (^)(NSArray<RKZStampRallyData *>*stampRallyDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプラリースポット一覧取得
 
 開催期間中のスタンプラリーを判断して、開催中のスタンプラリーに該当するスポットの一覧を取得する。
 
 searchConditionArray, sortConditionArrayで指定できる項目は「スタンプラリースポット」の項目が対象で、
 スタンプラリー、スポットの項目での検索・並び替えは行えない。
 
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallySpotData) *stampRallySpotDataArray, RKZResponseStatus *responseStatus )
 */
-(void)getStampRallySpotList:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
          sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                   withBlock:(void (^)(NSArray<RKZStampRallySpotData *>*stampRallySpotDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプラリースポット一覧取得 (スタンプラリーID指定)

 開催期間中のスタンプラリーの判断は行わず、指定されたスタンプラリーIDに該当する情報を取得する。
 
 searchConditionArray, sortConditionArrayで指定できる項目は「スタンプラリースポット」の項目が対象。
 スタンプラリー、スポットの項目での検索・並び替えは行えない。

 @param stampRallyId スタンプラリーID
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallySpotData) *stampRallySpotDataArray, RKZResponseStatus *responseStatus )
 */
-(void)getStampRallySpotListByStampRallyId:(NSString *)stampRallyId
                      searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                        sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                                 withBlock:(void (^)(NSArray<RKZStampRallySpotData *>*stampRallySpotDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプラリーポット一覧取得（スポットID指定）

 開催期間中のスタンプラリーを判断して、開催中のスタンプラリーに該当するスポットの一覧を取得する。
 
 searchConditionArray, sortConditionArrayで指定できる項目は「スタンプラリースポット」の項目が対象。
 スタンプラリー、スポットの項目での検索・並び替えは行えない。

 @param spotId スポットID
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallySpotData) *stampRallySpotDataArray, RKZResponseStatus *responseStatus )
 */
-(void)getStampRallySpotListBySpotId:(NSString *)spotId
                searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                  sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                           withBlock:(void (^)(NSArray<RKZStampRallySpotData *>*stampRallySpotDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプラリーポット一覧取得（ビーコンID指定）

 開催期間中のスタンプラリーを判断して、開催中のスタンプラリーに該当するスポットの一覧を取得する。
 
 searchConditionArray, sortConditionArrayで指定できる項目は「スタンプラリースポット」の項目が対象。
 スタンプラリー、スポットの項目での検索・並び替えは行えない。
 
 @param beaconId 検知したBeaconId
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZStampRallySpotData) *stampRallySpotDataArray, RKZResponseStatus *responseStatus )
 */
-(void)getStampRallySpotListByBeaconId:(NSString *)beaconId
                  searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                    sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                             withBlock:(void (^)(NSArray<RKZStampRallySpotData *>*stampRallySpotDataArray, RKZResponseStatus *responseStatus))block;

/**
 スタンプコンプリート設定
 
 開催されているスタンプラリーで、コンプリートした状態に登録する。
 コンプリートしたかどうかを自動で判定するのではなく、コンプリートした状態として登録する場合、当APIを呼び出す。
 (コンプリートしたかどうかの判定は各自実装して判定する)

 @param userAccessToken ユーザーアクセストークン
 @param stampRallyId スタンプラリーID
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZResponseStatus) *statusCode, RKZResponseStatus *responseStatus )
 
 */
-(void)stampComplete:(NSString *)userAccessToken stampRallyId:(NSString *)stampRallyId withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 取得スタンプ登録

 スタンプ取得履歴を登録します。
 
 @param userAccessToken 登録するユーザーのアクセストークン
 @param stampRallyId スタンプを取得したスタンプラリーのID
 @param spotId スタンプを取得したスポットID
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZResponseStatus) *statusCode, RKZResponseStatus *responseStatus )
 */
-(void)addMyStamp:(NSString *)userAccessToken stampRallyId:(NSString *)stampRallyId spotId:(NSString *) spotId withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;

/**
 スタンプ取得情報取得
 
 スタンプの取得状況を取得します。
 
 @param userAccessToken 登録するユーザーのアクセストークン
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZMyStampHistory) *myStampHistoryArray, RKZResponseStatus *responseStatus )
 */
-(void)getMyStampHistoryList:(NSString *)userAccessToken searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray withBlock:(void (^)(NSArray<RKZMyStampHistoryData *>*myStampRallyArray, RKZResponseStatus *responseStatus))block;

@end


#pragma mark コンタクト履歴
/**
 @category RKZService(Contact)
 コンタクト履歴
 */
@interface RKZService(Contact)


/**
 コンタクト履歴一覧取得

 @param userAccessToken 取得するユーザーのアクセストークン
 @param searchConditionArray NSArray(RKZSearchCondition) 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray NSArray(RKZSortCondition) 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( NSArray(RKZContactData) *contactDataArray, RKZResponseStatus *responseStatus )
 */
- (void)getContactList:(NSString *)userAccessToken
  searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
    sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
             withBlock:(void (^)(NSArray<RKZContactData *>*contactDataArray, RKZResponseStatus *responseStatus))block;


/**
 コンタクトの登録
 
 @param userAccessToken 登録するユーザーのアクセストークン
 @param contactData 登録するコンタクトデータ
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
-(void)addContact:(NSString *)userAccessToken
      contactData:(RKZContactData *)contactData
        withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block;


@end

#pragma mark お気に入り
/**
 @category RKZService(Favorite)
 お気に入り
 */
@interface RKZService(Favorite)

/**
 オブジェクトデータをお気に入りに登録
 
 @param objectData オブジェクトデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) addFavoriteToObjectData:(RKZObjectData *)objectData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block __attribute__ ((deprecated("このメソッドは`-addObjectDataToFavorite:userAccessToken:withBlock:`に置き換えられました。")));

/**
 オブジェクトデータをお気に入りに登録
 
 @param objectData オブジェクトデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) addObjectDataToFavorite:(RKZObjectData *)objectData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(addObjectDataToFavorite(_:userAccessToken:with:));

/**
 オブジェクトデータをお気に入りから削除
 
 @param objectData オブジェクトデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) deleteFavoriteToObjectData:(RKZObjectData *)objectData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block __attribute__ ((deprecated("このメソッドは`-deleteObjectDataFromFavorite:userAccessToken:withBlock:`に置き換えられました。")));

/**
 オブジェクトデータをお気に入りから削除

 @param objectData オブジェクトデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) deleteObjectDataFromFavorite:(RKZObjectData *)objectData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(deleteObjectDataFromFavorite(_:userAccessToken:with:));

/**
 お知らせをお気に入りに登録
 
 @param newsData お知らせデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) addFavoriteToNews:(RKZNewsData *)newsData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block __attribute__ ((deprecated("このメソッドは`-addNewsToFavorite:userAccessToken:withBlock:`に置き換えられました。")));

/**
 お知らせをお気に入りに登録

 @param newsData お知らせデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) addNewsToFavorite:(RKZNewsData *)newsData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(addNewsToFavorite(_:userAccessToken:with:));

/**
 お知らせをお気に入りから削除
 
 @param newsData お知らせデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) deleteFavoriteToNews:(RKZNewsData *)newsData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block __attribute__ ((deprecated("このメソッドは`-deleteNewsFromFavorite:userAccessToken:withBlock:`に置き換えられました。")));

/**
 お知らせをお気に入りから削除

 @param newsData お知らせデータ
 @param userAccessToken ユーザーアクセストークン
 @param block 通信後にblockが実行される。 blockは次の引数のシグネチャを持つ<br/>
 ( RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus )
 */
- (void) deleteNewsFromFavorite:(RKZNewsData *)newsData userAccessToken:(NSString *)userAccessToken withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(deleteNewsFromFavorite(_:userAccessToken:with:));

/**
 ユーザー詳細をお気に入りに追加

 @param userDetail 追加するユーザー詳細(モデル内のobjectIdとidは必須項目)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param block 通信後にblockが実行される
 */
- (void)addUserDetailToFavorite:(RKZUserDetailData *)userDetail
                userAccessToken:(NSString *)userAccessToken
                      withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(addUserDetailToFavorite(_:userAccessToken:with:));

/**
 ユーザー詳細をお気に入りから削除

 @param userDetail 削除するユーザー詳細(モデル内のobjectIdとidは必須項目)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param block 通信後にblockが実行される
 */
- (void)deleteUserDetailFromFavorite:(RKZUserDetailData *)userDetail
                     userAccessToken:(NSString *)userAccessToken
                           withBlock:(void (^)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus))block
NS_SWIFT_NAME(deleteUserDetailFromFavorite(_:userAccessToken:with:));

@end

#pragma mark ユーザー詳細
/**
 @category RKZService(UserDetail)
 ユーザー詳細
 */
@interface RKZService(UserDetail)

/**
 ユーザー詳細を1件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param userDetailId ユーザー詳細ID(必須)
 @param block 通信後にblockが実行される
 */
- (void)getUserDetail:(NSString *)objectId
      userAccessToken:(NSString *)userAccessToken
         userDetailId:(NSString *)userDetailId
            withBlock:(void (^)(RKZUserDetailData* __nullable userDetail, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を1件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param userDetailId ユーザー詳細ID(必須)
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 @param block 通信後にblockが実行される
 */
- (void)getUserDetail:(NSString *)objectId
      userAccessToken:(NSString *)userAccessToken
         userDetailId:(NSString *)userDetailId
   extensionAttribute:(RKZUserDetailExtensionAttribute *)extensionAttribute
            withBlock:(void (^)(RKZUserDetailData* __nullable userDetail, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される
 */
- (void)getUserDetailList:(NSString *)objectId
          userAccessToken:(NSString *)userAccessToken
     searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
       sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                withBlock:(void (^)(NSArray<RKZUserDetailData *> *userDetails, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 @param block 通信後にblockが実行される
 */
- (void)getUserDetailList:(NSString *)objectId
          userAccessToken:(NSString *)userAccessToken
     searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
       sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
       extensionAttribute:(RKZUserDetailExtensionAttribute *)extensionAttribute
                withBlock:(void (^)(NSArray<RKZUserDetailData *> *userDetails, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param limit 取得件数(必須)
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定(必須)
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される
 */
- (void)getPaginateUserDetailList:(NSString *)objectId
                  userAccessToken:(NSString *)userAccessToken
                            limit:(NSNumber *)limit
                           offset:(NSNumber *)offset
             searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
               sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                        withBlock:(void (^)(RKZPagingData<RKZUserDetailData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param limit 取得件数(必須)
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定(必須)
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param extensionAttribute 拡張オブジェクト検索条件値(必須)
 @param block 通信後にblockが実行される
 */
- (void)getPaginateUserDetailList:(NSString *)objectId
                  userAccessToken:(NSString *)userAccessToken
                            limit:(NSNumber *)limit
                           offset:(NSNumber *)offset
             searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
               sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
               extensionAttribute:(RKZUserDetailExtensionAttribute *)extensionAttribute
                        withBlock:(void (^)(RKZPagingData<RKZUserDetailData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 公開されているユーザー詳細を1件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(任意)
 @param userDetailId ユーザー詳細ID(必須)
 @param visibility 取得対象の公開範囲
 @param block 通信後にblockが実行される
 */
- (void)getSharedUserDetail:(NSString *)objectId
            userAccessToken:(nullable NSString *)userAccessToken
               userDetailId:(NSString *)userDetailId
                 visibility:(nullable NSArray<NSString *> *)visibility
                  withBlock:(void (^)(RKZUserDetailData* __nullable userDetail, RKZResponseStatus *responseStatus))block;

/**
 公開されているユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(任意)
 @param visibility 取得対象の公開範囲
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される
 */
- (void)getSharedUserDetailList:(NSString *)objectId
                userAccessToken:(nullable NSString *)userAccessToken
                             visibility:(nullable NSArray<NSString *> *)visibility
                   searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                     sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                              withBlock:(void (^)(NSArray<RKZUserDetailData *> *userDetails, RKZResponseStatus *responseStatus))block;

/**
 公開されているユーザー詳細を複数件取得

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(任意)
 @param limit 取得件数(必須)
 @param offset 取得開始位置 0〜の開始位置(レコード位置)を指定(必須)
 @param visibility 取得対象の公開範囲
 @param searchConditionArray 取得する情報の検索条件を指定する(任意)
 @param sortConditionArray 取得する情報のソート条件を指定する(任意)
 @param block 通信後にblockが実行される
 */
- (void)getPaginateSharedUserDetailList:(NSString *)objectId
                        userAccessToken:(nullable NSString *)userAccessToken
                                  limit:(NSNumber *)limit
                                 offset:(NSNumber *)offset
                             visibility:(nullable NSArray<NSString *> *)visibility
                   searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
                     sortConditionArray:(nullable NSArray<RKZSortCondition *> *)sortConditionArray
                              withBlock:(void (^)(RKZPagingData<RKZUserDetailData *> *pagingData, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を1件追加

 @param userDetail 追加するユーザー詳細(モデル内のobjectIdは必須項目)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param block 通信後にblockが実行される
 */
- (void)addUserDetail:(RKZUserDetailData *)userDetail
      userAccessToken:(NSString *)userAccessToken
            withBlock:(void (^)(RKZUserDetailData* __nullable userDetail, RKZResponseStatus *responseStatus))block;

/**
 ユーザー詳細を1件編集

 @param userDetail 編集するユーザー詳細(モデル内のobjectIdとcodeは必須項目)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param block 通信後にblockが実行される
 */
- (void)editUserDetail:(RKZUserDetailData *)userDetail
       userAccessToken:(NSString *)userAccessToken
             withBlock:(void (^)(RKZUserDetailData* __nullable userDetail, RKZResponseStatus *responseStatus))block;

/**
 指定した条件のユーザー詳細を削除

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param searchConditionArray 削除する情報の検索条件を指定する(任意)
 @param block 通信後にblockが実行される
 */
- (void)deleteUserDetail:(NSString *)objectId
         userAccessToken:(NSString *)userAccessToken
    searchConditionArray:(nullable NSArray<RKZSearchCondition *> *)searchConditionArray
               withBlock:(void (^)(NSNumber *deleteCount, RKZResponseStatus *responseStatus))block;

/**
 すべてのユーザー詳細を削除

 @param objectId オブジェクトID(必須)
 @param userAccessToken ユーザーアクセストークン(必須)
 @param block 通信後にblockが実行される
 */
- (void)deleteAllUserDetail:(NSString *)objectId
            userAccessToken:(NSString *)userAccessToken
                  withBlock:(void (^)(NSNumber *deleteCount, RKZResponseStatus *responseStatus))block;

@end

NS_ASSUME_NONNULL_END
