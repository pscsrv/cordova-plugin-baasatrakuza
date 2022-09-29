//
//  RKZContactData.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2016/01/12.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 クーポン情報を管理するクラス
 
 クーポンの取得・交換を実行する際に使用します。
 */
@interface RKZContactData : RKZData


///------------------------------
/// @name Properties
///------------------------------

///コンタクト番号
@property(nonatomic, nullable)NSString *contact_no;
///コンタクト年月日
@property(nonatomic, nullable)NSDate *contact_date;
///コンタクト種別コード
@property(nonatomic, nullable)NSString *contact_class_cd;
///コンタクト方法種別コード
@property(nonatomic, nullable)NSString *contact_method_class_cd;
///コンタクトアイテム番号
@property(nonatomic, nullable)NSString *contact_item_no;
///コンタクトアイテム名称
@property(nonatomic, nullable)NSString *contact_item_name;
///申込番号
@property(nonatomic, nullable)NSString *entry_no;
///状態コード
@property(nonatomic, nullable)NSString *status_cd;
///場所
@property(nonatomic, nullable)NSString *place_cd;
///ポイント数
@property(nonatomic, nullable)NSNumber *point;
///備考
@property(nonatomic, nullable)NSString *remarks;
///入金番号
@property(nonatomic, nullable)NSString *deposit_no;
///ビーコンID
@property(nonatomic, nullable)NSString *beacon_id;
///ビーコンスポットコード
@property(nonatomic, nullable)NSString *beacon_spot_cd;
///受信電波強度
@property(nonatomic, nullable)NSNumber *rssi;
///クーポンコード
@property(nonatomic, nullable)NSString *coupon_cd;
///数量
@property(nonatomic, nullable)NSNumber *quantity;
///スタンプラリーコード
@property(nonatomic, nullable)NSString *stamp_rally_cd;
///スタンプラリースポットコード
@property(nonatomic, nullable)NSString *stamp_rally_spot_cd;

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