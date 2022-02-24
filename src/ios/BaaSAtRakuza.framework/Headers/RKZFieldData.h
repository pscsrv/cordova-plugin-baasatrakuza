//
//  RKZFieldInfo.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2017/06/08.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

#ifndef RKZFieldInfo_h
#define RKZFieldInfo_h

NS_ASSUME_NONNULL_BEGIN

/**
 BaaS@rakuza のフィールド定義情報を管理するクラス
 
 情報取得の際に使用します。
 */
@interface RKZFieldData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///フィールド名称
@property(nonatomic, nullable) NSString *field_name;
///表示ラベル
@property(nonatomic, nullable) NSString *label_str;
///データタイプID
@property(nonatomic, nullable) NSString *data_type_id;
///表示タイプID
@property(nonatomic, nullable) NSString *display_type;
///必須項目
@property(nonatomic) BOOL is_required_flg;
///最小文字数
@property(nonatomic, nullable) NSNumber *min_length;
///最大文字数
@property(nonatomic, nullable) NSNumber *max_length;
///読み込み専用フラグ
@property(nonatomic, nullable) NSString *read_only_flg;
///ヘルプテキスト
@property(nonatomic, nullable) NSString *help_txt;
///項目表示順序
@property(nonatomic, nullable) NSNumber *sort_no;
///非表示フラグ
@property(nonatomic) BOOL not_visible_flg;


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
+ (instancetype)initWithResultSet:(NSDictionary *)rs fieldName:(NSString *)fieldName;

@end

NS_ASSUME_NONNULL_END

#endif /* RKZFieldInfo_h */
