//
//  RKZLocaleData.h
//  BaaSAtRakuza
//
//  Created by 妹尾 on 2015/11/17.
//
//
#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 言語情報を管理するクラス
 
 情報の取得をする際に使用します。
 */

@interface RKZLocaleData:RKZData

//コード
@property(nonatomic, nullable) NSString *code;
//名称
@property(nonatomic, nullable) NSString *name;
//デフォルトフラグ
@property(nonatomic) BOOL default_flg;
//楽座言語CD
@property(nonatomic, nullable)NSString *language_cd;
//言語名
@property(nonatomic, nullable)NSString *language_name;
//端末のロケール
@property(nonatomic, nullable) NSLocale *locale;


///並び順
@property(nonatomic, nullable) NSNumber *sort_no;
//利用不可フラグ
@property(nonatomic) BOOL not_use_flg;

//自由項目
@property(nonatomic, nullable) NSDictionary<NSString*, id> *attributes;


/**
 指定イニシャライザ
 @param resultset 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (instancetype)initWithResultSet:(NSDictionary *)resultset;


@end

NS_ASSUME_NONNULL_END