//
//  RKZContactData.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2016/01/12.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 クーポン情報を管理するクラス
 
 クーポンの取得・交換を実行する際に使用します。
 */
@interface RKZContactData : RKZData


///------------------------------
/// @name Properties
///------------------------------

///コンタクト番号
@property(nonatomic)NSString *contact_no;
///コンタクト年月日
@property(nonatomic)NSDate *contact_date;
///コンタクト種別コード
@property(nonatomic)NSString *contact_class_cd;
///コンタクト方法種別コード
@property(nonatomic)NSString *contact_method_class_cd;
///コンタクトアイテム番号
@property(nonatomic)NSString *contact_item_no;
///コンタクトアイテム名称
@property(nonatomic)NSString *contact_item_name;
///申込番号
@property(nonatomic)NSString *entry_no;
///状態コード
@property(nonatomic)NSString *status_cd;
///場所
@property(nonatomic)NSString *place_cd;
///ポイント数
@property(nonatomic)NSNumber *point;
///備考
@property(nonatomic)NSString *remarks;
///入金番号
@property(nonatomic)NSString *deposit_no;
///ビーコンID
@property(nonatomic)NSString *beacon_id;
///ビーコンスポットコード
@property(nonatomic)NSString *beacon_spot_cd;
///受信電波強度
@property(nonatomic)NSNumber *rssi;
///クーポンコード
@property(nonatomic)NSString *coupon_cd;
///数量
@property(nonatomic)NSNumber *quantity;
///スタンプラリーコード
@property(nonatomic)NSString *stamp_rally_cd;
///スタンプラリースポットコード
@property(nonatomic)NSString *stamp_rally_spot_cd;

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
