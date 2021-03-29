//
//  RKZUserData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/16.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 ユーザー情報を管理するクラス
 
 ユーザーの新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZUserData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///ユーザー番号
@property(nonatomic) NSString *user_no;
///性別
@property(nonatomic) NSString *sex_cd;
///年代
@property(nonatomic) NSString *age_config;
///職業
@property(nonatomic) NSString *business_class_cd;
///都道府県
@property(nonatomic) NSString *state_cd;
///登録日
@property(nonatomic) NSDate *join_dte;

///ログインID
@property(nonatomic) NSString *login_id;
///名称
@property(nonatomic) NSString *user_name;
///姓
@property(nonatomic) NSString *user_last_name;
///名
@property(nonatomic) NSString *user_first_name;
///フリガナ
@property(nonatomic) NSString *user_furigana;
///フリガナ姓
@property(nonatomic) NSString *user_last_furigana;
///フリガナ名
@property(nonatomic) NSString *user_first_furigana;
///生年月日
@property(nonatomic) NSDate *birth_day;

///ポイント数
@property(nonatomic) NSNumber *point;

///最終更新日
@property(nonatomic) NSDate *last_update_dte;

///ユーザーアクセストークン
@property(nonatomic) NSString *user_access_token;
///ユーザーID
@property(nonatomic) NSString *user_id;

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
