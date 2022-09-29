#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 お気に入り集計情報を管理するクラス
 
 お気に入り集計情報の新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZFavoriteSummaryData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///お気に入り件数
@property(nonatomic, nullable) NSNumber *favorite_count;

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