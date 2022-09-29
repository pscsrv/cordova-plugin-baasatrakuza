//
//  RKZCouponData.h
//  BaaSAtRakuza
//
//  Created by psc shunsuke ikumi on 2014/08/12.
//  Copyright (c) 2014年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 クーポン情報を管理するクラス
 
 クーポンの取得・交換を実行する際に使用します。
 */
@interface RKZCouponData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///クーポンコード
@property(nonatomic, nullable)NSString* code;
///クーポン名
@property(nonatomic, nullable)NSString* name;
///クーポン画像
@property(nonatomic, nullable)NSString* image;
///クーポン画像(url)
@property(nonatomic, nullable)NSString* image_url;
///クーポン取得可能日時（FROM）
@property(nonatomic, nullable)NSDate* possible_from_dte;
///クーポン取得可能日時（TO）
@property(nonatomic, nullable)NSDate* possible_to_dte;
///クーポン利用可能日時（FROM）
@property(nonatomic, nullable)NSDate* enable_from_dte;
///クーポン利用可能日時（TO）
@property(nonatomic, nullable)NSDate* enable_to_dte;
///クーポン交換ポイント数
@property(nonatomic, nullable)NSNumber *point;
///ソート番号
@property(nonatomic, nullable)NSNumber *sort_no;
///使用不可フラグ
@property(nonatomic)BOOL not_use_flg;
/**
 自由項目
 */
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