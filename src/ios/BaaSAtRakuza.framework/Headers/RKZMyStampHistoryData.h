//
//  RKZMyStamp.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2016/01/05.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

#ifndef RKZMyStampData_h
#define RKZMyStampData_h


/**
 スタンプ取得履歴を管理するクラス

 スタンプを取得したスポット情報をスタンプラリーに合わせて復帰する
 */
@interface RKZMyStampHistoryData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///種別
@property(nonatomic)NSString *contact_class_cd;
///スタンプラリーコード
@property(nonatomic)NSString *stamp_rally_cd;
/**
 スタンプラリー名称
 @warning スタンプラリー名称は検索項目には指定できません。
 */
@property(nonatomic)NSString *stamp_rally_name;
///取得スポットコード
@property(nonatomic)NSString *stamp_rally_spot_cd;
/**
 取得スポット名称
 @warning 取得スポット名称は検索項目には指定できません。
 */
@property(nonatomic)NSString *stamp_rally_spot_name;
///取得日時
@property(nonatomic)NSDate *contact_date;


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

#endif /* RKZMyStampData_h */
