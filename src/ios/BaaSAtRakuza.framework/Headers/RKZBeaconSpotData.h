//
//  RKZBeaconSpotData.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/06/09.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"
#import "RKZBeaconData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 ビーコンスポット情報を管理するクラス
 
 Beacon検知後の判別に利用するbeaconIDを取得する際に使用します。
 */
@interface RKZBeaconSpotData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///Beaconスポットコード
@property(nonatomic, nullable) NSString *code;
///Beaconスポット名
@property(nonatomic, nullable) NSString *name;
///略名称
@property(nonatomic, nullable) NSString *short_name;
/**
 ビーコンコード
 @warning 検索条件タイプは RKZSearchConditionLikeOr のみ指定可能です。
 */
@property(nonatomic, nullable) NSArray<NSString *> *beacon_code;
///検知距離iPhone用(RSSi)
@property(nonatomic, nullable) NSNumber *beacon_range_for_iphone;
///検知距離Android用(RSSi)
@property(nonatomic, nullable) NSNumber *beacon_range_for_android;
///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
///ビーコン情報
@property(nonatomic, nullable) NSArray<RKZBeaconData *> *beaconDataArray;
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