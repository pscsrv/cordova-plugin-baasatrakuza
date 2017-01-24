//
//  RKZEntryData.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/04/27.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 申込情報を管理するクラス
 
 RKZSurveyDataを取得する際に使用します。
 
 [当クラスを保有するRKZSurveyDataのプロパティ]([RKZSurveyData entry_list])
 */
@interface RKZEntryData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///申込番号
@property(nonatomic)NSString *entry_no;
///申込日時
@property(nonatomic)NSDate *entry_dte;
///申込状態CD
@property(nonatomic)NSString *status_cd;


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