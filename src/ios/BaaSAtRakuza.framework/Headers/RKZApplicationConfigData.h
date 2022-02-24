//
//  RKZApplicationConfigData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/31.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 アプリケーション情報を管理するクラス
 
 アプリ名や、アプリのバージョン管理、AppストアのURL、アプリ公開終了日等の情報の取得の際に使用します。
 */
@interface RKZApplicationConfigData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///コード
@property(nonatomic, nullable) NSString *code;
///アプリケーション名
@property(nonatomic, nullable) NSString *name;
///略名称
@property(nonatomic, nullable) NSString *short_name;
///最新バージョン(Android)
@property(nonatomic, nullable) NSString *version_android;
///最新バージョン(iPhone)
@property(nonatomic, nullable) NSString *version_ios;
///アプリ公開終了日
@property(nonatomic, nullable) NSDate *app_end_dte;
///アプリ公開終了フラグ
@property(nonatomic) BOOL app_end_flg;
///AppストアURL
@property(nonatomic, nullable) NSString *app_store_url;
///GooglePlayストアURL
@property(nonatomic, nullable) NSString *google_play_store_url;
///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
/// アプリ公開終了メッセージ
@property(nonatomic, nullable) NSString *app_end_message;
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