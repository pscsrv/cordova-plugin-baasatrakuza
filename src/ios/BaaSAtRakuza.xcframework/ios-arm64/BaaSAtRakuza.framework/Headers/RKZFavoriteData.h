#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 お気に入り情報を管理するクラス
 
 お気に入り情報の新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZFavoriteData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///お気に入り登録フラグ
@property(nonatomic) BOOL is_favorite;
///お気に入り更新日時
@property(nonatomic, nullable) NSDate *favorite_date;

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