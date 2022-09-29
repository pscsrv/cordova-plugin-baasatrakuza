#import <Foundation/Foundation.h>
#import "RKZData.h"
#import "RKZFavoriteData.h"
#import "RKZFavoriteSummaryData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 ユーザー詳細情報を管理するクラス
 
 ユーザー詳細情報の新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZUserDetailData : RKZData

/**
 ユーザー詳細の公開範囲(非公開)
 この公開範囲を指定したユーザー詳細は、登録したユーザーのみ参照することができます。
*/
extern NSString *const RKZUserDetailVisibilityPrivate;
/**
 ユーザー詳細の公開範囲(制限付き公開)
 この公開範囲を指定したユーザー詳細は、登録したユーザー以外も参照することができます。
 ただし、参照するにはユーザーアクセストークンで認証を行う必要があります。
*/
extern NSString *const RKZUserDetailVisibilityPublicToUsers;
/**
 ユーザー詳細の公開範囲(公開)
 この公開範囲を指定したユーザー詳細は、登録したユーザー以外も参照することができます。
 参照にユーザーアクセストークンは不要です。
*/
extern NSString *const RKZUserDetailVisibilityPublic;


///------------------------------
/// @name Properties
///------------------------------

///オブジェクトID
@property(nonatomic, nullable) NSString *object_id;
///コード
@property(nonatomic, nullable) NSString *code;
///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///登録日時
@property(nonatomic, nullable) NSDate *sys_insert_date;
///更新日時
@property(nonatomic, nullable) NSDate *sys_update_date;
///ユーザー詳細ID
@property(nonatomic, nullable) NSString *id;
///並び順(オブジェクト別)
@property(nonatomic, nullable) NSNumber *object_sort_no;
///ユーザーID
@property(nonatomic, nullable) NSString *user_id;
///ユーザーテナントID
@property(nonatomic, nullable) NSString *user_tenant_id;
///顧客番号
@property(nonatomic, nullable) NSString *user_no;
///公開範囲
@property(nonatomic, nullable) NSString *visibility;
///お気に入り情報
@property(nonatomic, nullable) RKZFavoriteData *sys_favorite;
///お気に入り集計情報
@property(nonatomic, nullable) RKZFavoriteSummaryData *sys_favorite_sum;

///自由項目
@property(nonatomic, nullable) NSDictionary<NSString*, id> *attributes;


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (instancetype)initWithResultSet:(NSDictionary *)rs;

@end

NS_ASSUME_NONNULL_END
