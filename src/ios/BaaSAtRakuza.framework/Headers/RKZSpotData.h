//
//  RKZSpotData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/20.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 スポット情報を管理するクラス
 
 情報の取得をする際に使用します。
 */
@interface RKZSpotData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///スポットコード
@property(nonatomic) NSString *code;
///スポット名
@property(nonatomic) NSString *name;
///略名称
@property(nonatomic) NSString *short_name;

/**
 ビーコン
 @warning 検索条件タイプは RKZSearchConditionLikeOr のみ指定可能です。
 */
@property(nonatomic) NSArray *beacon;
///検知距離iPhone用(RSSI)
@property(nonatomic) NSNumber *beacon_range_for_iphone;
///検知距離Android用(RSSI)
@property(nonatomic) NSNumber *beacon_range_for_android;

/**
 緯度
 @warning 緯度は検索項目には指定できません。
 */
@property(nonatomic) NSString* latitude;
/**
 経度
 @warning 経度は検索項目には指定できません。
 */
@property(nonatomic) NSString* longitude;
//ピクセル位置(x)
@property(nonatomic) NSString* pixel_position_x;
//ピクセル位置(y)
@property(nonatomic) NSString* pixel_position_y;

///並び順
@property(nonatomic) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
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
