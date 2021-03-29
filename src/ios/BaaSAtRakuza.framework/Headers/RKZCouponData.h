//
//  RKZCouponData.h
//  BaaSAtRakuza
//
//  Created by psc shunsuke ikumi on 2014/08/12.
//  Copyright (c) 2014年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 クーポン情報を管理するクラス
 
 クーポンの取得・交換を実行する際に使用します。
 */
@interface RKZCouponData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///クーポンコード
@property(nonatomic)NSString* code;
///クーポン名
@property(nonatomic)NSString* name;
///クーポン画像
@property(nonatomic)NSString* image;
///クーポン画像(url)
@property(nonatomic)NSString* image_url;
///クーポン取得可能日時（FROM）
@property(nonatomic)NSDate* possible_from_dte;
///クーポン取得可能日時（TO）
@property(nonatomic)NSDate* possible_to_dte;
///クーポン利用可能日時（FROM）
@property(nonatomic)NSDate* enable_from_dte;
///クーポン利用可能日時（TO）
@property(nonatomic)NSDate* enable_to_dte;
///クーポン交換ポイント数
@property(nonatomic)NSNumber *point;
///ソート番号
@property(nonatomic)NSNumber *sort_no;
///使用不可フラグ
@property(nonatomic)BOOL not_use_flg;
/**
 自由項目
 */
@property(nonatomic) NSMutableDictionary *attributes;


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithResultSet:(NSDictionary *)rs;

@end
