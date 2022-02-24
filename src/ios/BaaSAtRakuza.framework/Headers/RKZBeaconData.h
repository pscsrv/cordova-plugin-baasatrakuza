//
//  RKZBeaconData.h
//  BaaSAtRakuza
//
//  Created by psc shunsuke ikumi on 2014/08/29.
//  Copyright (c) 2014年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 Beacon端末情報を管理するクラス
 
 Beacon端末情報の取得する際に使用します。
 */
@interface RKZBeaconData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///Beaconコード
@property(nonatomic, nullable) NSString *code;
///Beacon名
@property(nonatomic, nullable) NSString *name;
///略名称
@property(nonatomic, nullable) NSString *short_name;
///ビーコンID
@property(nonatomic, nullable) NSString *beacon_id;
///ビーコンタイプ
@property(nonatomic, nullable) NSString *beacon_type_cd;
///major
@property(nonatomic, nullable) NSNumber *major;
///minor
@property(nonatomic, nullable) NSNumber *minor;
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