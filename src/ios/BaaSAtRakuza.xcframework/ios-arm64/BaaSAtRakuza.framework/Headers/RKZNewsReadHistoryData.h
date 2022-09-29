//
//  RKZNewsReadHistoryData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/26.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 お知らせ情報の既読未読を管理するクラス
 
 お知らせ情報の既読を記録として管理する際に使用します。
 */
@interface RKZNewsReadHistoryData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///ニュース配信元テナントID
@property(nonatomic, nullable) NSString *news_tenant_id;
///ニュースID
@property(nonatomic, nullable) NSString *news_id;
///既読フラグ
@property(nonatomic) BOOL read_flg;
///既読日時
@property(nonatomic, nullable) NSDate *read_date;
///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///使用不可フラグ
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