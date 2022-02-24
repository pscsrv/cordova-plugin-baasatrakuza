//
//  RKZObjectDataExtensionAttribute.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2019/05/23.
//

#ifndef RKZObjectDataExtensionAttribute_h
#define RKZObjectDataExtensionAttribute_h

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 データ管理APIの拡張属性を管理するクラス
 
 オブジェクトデータを取得する際に使用します。
 */
@interface RKZObjectDataExtensionAttribute : NSObject

///ユーザーアクセストークン
@property(nonatomic, nullable) NSString *user_access_token;
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

#endif /* RKZObjectDataExtensionAttribute_h */
