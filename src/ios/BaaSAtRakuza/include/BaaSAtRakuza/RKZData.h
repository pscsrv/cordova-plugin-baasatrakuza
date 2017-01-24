//
//  RKZData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/04/28.
//  Copyright (c) 2015年 大野 斉正. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 BaaS@rakuzaのデータを扱うモデルの基底クラス
 
 各サブクラスを用いてデータ操作を行います。
 */
@interface RKZData : NSObject

///------------------------------
/// @name Instance Methods
///------------------------------

/**
 渡された個別のAPIパラメータ情報に対して、Modelクラスの@propertyから自動作成したAPIパラメータを追加して返却する
 @param params APIパラメータ
 @param attributesOnly attribute項目のみ自由項目APIパラメータとして作成する場合YES<br/>
 個別propertyも自由項目APIパラメータとして作成する場合NO
 */
- (NSDictionary *)getAPIParameter :(NSMutableDictionary *)params
                   attributesOnly :(BOOL) attributesOnly;

/**
 渡された楽座から取得した情報（連想配列）に対して、Modelクラスの@propertyに存在するKeyを削除して返却する
 渡された個別のAPIパラメータ情報に対して、Modelクラスの@propertyから自動作成したAPIパラメータを追加して返却する
 @param rs 楽座から取得した連想配列情報
 @return 固定項目、無視リストを削除した楽座から取得した連想配列情報
 */
- (NSMutableDictionary *)getAttributes:(NSDictionary *)rs;

@end
