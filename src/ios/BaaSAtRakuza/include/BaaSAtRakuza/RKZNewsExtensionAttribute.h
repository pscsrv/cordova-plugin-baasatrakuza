//
//  RKZNewsExtensionAttribute.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2019/05/23.
//

#ifndef RKZNewsExtensionAttribute_h
#define RKZNewsExtensionAttribute_h

#import <Foundation/Foundation.h>

/**
 お知らせ管理APIの拡張属性を管理するクラス
 
 お知らせ情報を取得する際に使用します。
 */
@interface RKZNewsExtensionAttribute : NSObject

///ユーザーアクセストークン
@property(nonatomic) NSString *user_access_token;
///お気に入り表示有無
@property(nonatomic) BOOL show_favorite;
///お気に入り件数表示有無
@property(nonatomic) BOOL show_favorite_summary;

/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithResultSet:(NSDictionary *)rs;

- (NSDictionary *)createExtensionAttribute;

@end

#endif /* RKZNewsExtensionAttribute_h */
