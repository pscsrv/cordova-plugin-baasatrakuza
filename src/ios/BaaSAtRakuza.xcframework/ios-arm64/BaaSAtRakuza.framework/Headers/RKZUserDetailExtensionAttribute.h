#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 ユーザー詳細管理APIの拡張属性を管理するクラス
 
 ユーザー詳細を取得する際に使用します。
 */
@interface RKZUserDetailExtensionAttribute : NSObject

///お気に入り表示有無
@property(nonatomic) BOOL show_favorite;
///お気に入り件数表示有無
@property(nonatomic) BOOL show_favorite_summary;


/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (instancetype)initWithResultSet:(NSDictionary *)rs;

- (NSDictionary *)createExtensionAttribute;

@end

NS_ASSUME_NONNULL_END
