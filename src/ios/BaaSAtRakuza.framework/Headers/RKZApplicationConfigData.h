//
//  RKZApplicationConfigData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/31.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 アプリケーション情報を管理するクラス
 
 アプリ名や、アプリのバージョン管理、AppストアのURL、アプリ公開終了日等の情報の取得の際に使用します。
 */
@interface RKZApplicationConfigData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///コード
@property(nonatomic) NSString *code;
///アプリケーション名
@property(nonatomic) NSString *name;
///略名称
@property(nonatomic) NSString *short_name;
///最新バージョン(Android)
@property(nonatomic) NSString *version_android;
///最新バージョン(iPhone)
@property(nonatomic) NSString *version_ios;
///アプリ公開終了日
@property(nonatomic) NSDate *app_end_dte;
///アプリ公開終了フラグ
@property(nonatomic) BOOL app_end_flg;
///AppストアURL
@property(nonatomic) NSString *app_store_url;
///GooglePlayストアURL
@property(nonatomic) NSString *google_play_store_url;
///並び順
@property(nonatomic) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
/// アプリ公開終了メッセージ
@property(nonatomic) NSString *app_end_message;
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
