//
//  RKZBeaconSpotData.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/06/09.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 ビーコンスポット情報を管理するクラス
 
 Beacon検知後の判別に利用するbeaconIDを取得する際に使用します。
 */
@interface RKZBeaconSpotData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///Beaconスポットコード
@property(nonatomic) NSString *code;
///Beaconスポット名
@property(nonatomic) NSString *name;
///略名称
@property(nonatomic) NSString *short_name;
/**
 ビーコンコード
 @warning 検索条件タイプは RKZSearchConditionLikeOr のみ指定可能です。
 */
@property(nonatomic) NSArray *beacon_code;
///検知距離iPhone用(RSSi)
@property(nonatomic) NSNumber *beacon_range_for_iphone;
///検知距離Android用(RSSi)
@property(nonatomic) NSNumber *beacon_range_for_android;
///並び順
@property(nonatomic) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
///ビーコン情報
@property(nonatomic) NSMutableArray *beaconDataArray;
///自由項目
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
