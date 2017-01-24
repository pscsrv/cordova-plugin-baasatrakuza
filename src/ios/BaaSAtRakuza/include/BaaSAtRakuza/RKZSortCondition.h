//
//  RKZSortCondition.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/04/03.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 楽座のデータ取得処理のソート条件を管理するクラス
 
 楽座から情報を取得する際のソート条件を指定する際に使用します。
 */
@interface RKZSortCondition : RKZData

///------------------------------
/// @name Constants
///------------------------------

/**
 ソート条件タイプに指定する、昇順を表す文字列
 */
extern NSString *const RKZSortTypeAsc;

/**
 ソート条件タイプに指定する、降順を表す文字列
 */
extern NSString *const RKZSortTypeDesc;

///------------------------------
/// @name Properties
///------------------------------

///ソート条件タイプ
@property(nonatomic) NSString *sort_type;
///ソート項目
@property(nonatomic) NSString *sort_column;


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 @param sortType   NSString ソート条件タイプ
 @param sortColumn NSString ソート項目名
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithSortType:(NSString *)sortType
            sortColumn:(NSString *)sortColumn;

@end