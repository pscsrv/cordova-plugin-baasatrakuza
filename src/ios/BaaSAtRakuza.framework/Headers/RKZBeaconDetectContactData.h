//
//  RKZBeaconDetectContactData.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/04/02.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 ビーコン検知コンタクト情報を管理するクラス
 
 ビーコン検知コンタクト情報の取得や新規登録を実行する際に使用します。
 */
@interface RKZBeaconDetectContactData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///Beacon端末ID
@property(nonatomic, nullable)NSString *beacon_id;
///Beaconスポットコード
@property(nonatomic, nullable)NSString *beacon_spot_cd;
///コンタクト種別コード
@property(nonatomic, nullable)NSString *contact_class_cd;
///コンタクト種別名称
@property(nonatomic, nullable)NSString *contact_class_cd_name;
///コンタクト方法種別コード
@property(nonatomic, nullable)NSString *contact_method_class_cd;
///コンタクト方法種別名称
@property(nonatomic, nullable)NSString *contact_method_class_cd_name;
///コンタクト番号
@property(nonatomic, nullable)NSString *contact_no;
///コンタクト日
@property(nonatomic, nullable)NSDate *contact_date;
///備考
@property(nonatomic, nullable)NSString *remarks;
///検知電波強度
@property(nonatomic, nullable)NSNumber *rssi;
///対象テナントID
@property(nonatomic, nullable)NSString *target_tenant_id;
///ユーザーID
@property(nonatomic, nullable)NSString *user_id;


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