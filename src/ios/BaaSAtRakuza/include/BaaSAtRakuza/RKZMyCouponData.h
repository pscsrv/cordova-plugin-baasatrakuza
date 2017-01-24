//
//  RKZMyCouponData.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/03/24.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

@class RKZCouponData;

/**
 マイクーポン情報を管理するクラス
 
 マイクーポンの新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZMyCouponData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///マイクーポンコード
@property(nonatomic)NSString *code;
///クーポンコード
@property(nonatomic)NSString *coupon_cd;
///クーポン名
@property(nonatomic)NSString *coupon_name;
///取得日時
@property(nonatomic)NSDate *get_date;
///利用日時
@property(nonatomic)NSDate *use_date;
///使用済みフラグ
@property(nonatomic)BOOL used_flg;
///ユーザーID
@property(nonatomic)NSString *user_id;
///クーポン枚数
@property(nonatomic)NSNumber *quantity;
///クーポンモデル
@property(nonatomic)RKZCouponData *coupon;


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
