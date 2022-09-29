//
//  RKZPointData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/16.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 ポイント情報を管理するクラス
 
 ポイント情報の取得やポイント加算・減算を実行する際に使用します。
 */
@interface RKZPointData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///ユーザーID
@property(nonatomic, nullable) NSString *user_id;
///ポイント数
@property(nonatomic, nullable) NSNumber *point;


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