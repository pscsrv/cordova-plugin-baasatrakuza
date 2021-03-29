//
//  RKZStampRallyData.h
//  BaaSAtRakuza
//
//  Created by 妹尾 on 2015/12/15.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
スタンプラリー情報を管理するクラス

情報取得の際に使用します。
*/
@interface RKZStampRallyData : RKZData

///スタンプラリーID
@property(nonatomic) NSString *code;
///スタンプラリー名称
@property(nonatomic) NSString *name;
///略称
@property(nonatomic) NSString *short_name;
///スタンプラリー詳細
@property(nonatomic) NSString *stamp_rally_detail;
///イメージ画像　(ファイル名)
@property(nonatomic) NSString *stamp_rally_image;
/**
 イメージ画像　(URL)
 @warning イメージ画像　(URL)は検索項目には指定できません。
 */
@property(nonatomic) NSString *stamp_rally_image_url;
///開催期間　開始日
@property(nonatomic) NSDate *stamp_rally_start_date;
///開催期間　終了日
@property(nonatomic) NSDate *stamp_rally_end_date;
///コンプリート可能回数コード
@property(nonatomic) NSString *complete_count_cd;
/**
 コンプリート可能回数名称
 @warning コンプリート可能回数名称は検索項目には指定できません。
 */
@property(nonatomic) NSString *complete_count_name;
///コンプリート条件コード
@property(nonatomic) NSString *complete_condition_cd;
/**
 コンプリート条件名称
 @warning コンプリート条件名称は検索項目には指定できません。
 */
@property(nonatomic) NSString *complete_condition_name;
///取得スタンプ有効期限コード
@property(nonatomic) NSString *stamp_expiration_date_cd;
/**
 取得スタンプ有効期限名称
 @warning 取得スタンプ有効期限名称は検索項目には指定できません。
 */
@property(nonatomic) NSString *stamp_expiration_date_name;

///並び順
@property(nonatomic) NSNumber *sort_no;
///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;

///自由項目
@property(nonatomic) NSMutableDictionary *attributes;

/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithResultSet:(NSDictionary *)rs;

@end
