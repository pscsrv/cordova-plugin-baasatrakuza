//
//  RKZSpotData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/20.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 スポット情報を管理するクラス
 
 情報の取得をする際に使用します。
 */
@interface RKZSpotData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///スポットコード
@property(nonatomic, nullable) NSString *code;
///スポット名
@property(nonatomic, nullable) NSString *name;
///略名称
@property(nonatomic, nullable) NSString *short_name;

/**
 ビーコン
 @warning 検索条件タイプは RKZSearchConditionLikeOr のみ指定可能です。
 */
@property(nonatomic, nullable) NSArray<NSString *> *beacon;
///検知距離iPhone用(RSSI)
@property(nonatomic, nullable) NSNumber *beacon_range_for_iphone;
///検知距離Android用(RSSI)
@property(nonatomic, nullable) NSNumber *beacon_range_for_android;

/**
 緯度
 @warning 緯度は検索項目には指定できません。
 */
@property(nonatomic, nullable) NSString* latitude;
/**
 経度
 @warning 経度は検索項目には指定できません。
 */
@property(nonatomic, nullable) NSString* longitude;
//ピクセル位置(x)
@property(nonatomic, nullable) NSString* pixel_position_x;
//ピクセル位置(y)
@property(nonatomic, nullable) NSString* pixel_position_y;

///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
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