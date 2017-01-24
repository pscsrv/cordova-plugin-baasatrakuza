//
//  RKZLocaleData.h
//  BaaSAtRakuza
//
//  Created by 妹尾 on 2015/11/17.
//
//
#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 言語情報を管理するクラス
 
 情報の取得をする際に使用します。
 */

@interface RKZLocaleData:RKZData

//コード
@property(nonatomic) NSString *code;

//名称
@property(nonatomic) NSString *name;

//デフォルトフラグ
@property(nonatomic) BOOL default_flg;

//楽座言語CD
@property(nonatomic)NSString *language_cd;

//言語名
@property(nonatomic)NSString *language_name;

//端末のロケール
@property(nonatomic) NSLocale *locale;


///並び順
@property(nonatomic) NSNumber *sort_no;
//利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
//自由項目
@property(nonatomic) NSMutableDictionary *attributes;


/**
 指定イニシャライザ
 @param resultset 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithResultSet:(NSDictionary *)resultset;


@end