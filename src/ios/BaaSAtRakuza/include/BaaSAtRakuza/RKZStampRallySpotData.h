//
//  RKZStampRallySpotData.h
//  BaaSAtRakuza
//
//  Created by 妹尾 on 2015/12/15.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

#import "RKZSpotData.h"

/**
 スタンプラリー情報を管理するクラス
 
 情報取得の際に使用します。
 **/
@interface RKZStampRallySpotData : RKZData


///並び順
@property(nonatomic) NSNumber* sort_no;
///コード
@property(nonatomic) NSString *code;
///名称
@property(nonatomic) NSString *name;
///スタンプラリーコード
@property(nonatomic) NSString *stamp_rally_cd;
/**
 スタンプラリー名称
 @warning スタンプラリー名称は検索項目には指定できません。
 */
@property(nonatomic) NSString *stamp_rally_name;

///利用不可フラグ
@property(nonatomic) BOOL not_use_flg;
///自由項目
@property(nonatomic) NSMutableDictionary *attributes;

///スポット情報リスト
@property(nonatomic) RKZSpotData *spot;


/**
 指定イニシャライザ
 @param rs 変数名に対応したKeyを持つ連想配列
 @return id 初期化を行ったモデル情報
 */
+ (id)initWithResultSet:(NSDictionary *)rs;

@end