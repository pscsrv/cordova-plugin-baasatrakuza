//
//  RKZObjectData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/27.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"
#import "RKZFavoriteData.h"
#import "RKZFavoriteSummaryData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 データオブジェクトを管理するクラス
 
 データオブジェクトの新規登録・編集・取得を実行する際に使用します。
 */
@interface RKZObjectData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///オブジェクトID
@property(nonatomic, nullable) NSString *object_id;
///コード
@property(nonatomic, nullable) NSString *code;
///名称
@property(nonatomic, nullable) NSString *name;
///略名称
@property(nonatomic, nullable) NSString *short_name;
///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
///使用不可フラグ
@property(nonatomic) BOOL not_use_flg;
///登録日時
@property(nonatomic, nullable) NSDate *sys_insert_date;
///更新日時
@property(nonatomic, nullable) NSDate *sys_update_date;
///お気に入り情報
@property(nonatomic, nullable) RKZFavoriteData *sys_favorite;
///お気に入り集計情報
@property(nonatomic, nullable) RKZFavoriteSummaryData *sys_favorite_sum;

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
