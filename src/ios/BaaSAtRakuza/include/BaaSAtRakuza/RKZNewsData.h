//
//  RKZNewsData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/16.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

/**
 お知らせ情報を管理するクラス
 
 お知らせ情報を取得する際に使用します。
 */
@interface RKZNewsData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///作成者
@property(nonatomic) NSString *author;
///カテゴリコード
@property(nonatomic) NSString *category;
///カテゴリ名称
@property(nonatomic) NSString *category_name;
///作成日時
@property(nonatomic) NSDate *date;
/** 内容
 検索項目に指定する際は「description」と指定してください。
 */
@property(nonatomic) NSString *description_;
///ジャンルコード
@property(nonatomic) NSString *genre;
///ジャンル名
@property(nonatomic) NSString *genre_name;
///ニュースID
@property(nonatomic) NSString *news_id;
///テナントID
@property(nonatomic) NSString *tenant_id;
///TOP画像
@property(nonatomic) NSString *photo;
///公開フラグ
@property(nonatomic) BOOL release_flg;
///公開開始日
@property(nonatomic) NSDate *release_from_date;
///公開終了日
@property(nonatomic) NSDate *release_end_date;
///公開対象者区分
@property(nonatomic) NSString *release_target_kbn;
///公開対象者区分名称
@property(nonatomic) NSString *release_target_kbn_name;
///RSS出力フラグ
@property(nonatomic) BOOL rss_flg;
///ニュースURL
@property(nonatomic) NSString *url;
///プッシュ配信利用フラグ
@property(nonatomic) BOOL use_push_flg;
///プッシュ通知済フラグ
@property(nonatomic) BOOL push_done_flg;
///プッシュ通知予約日時
@property(nonatomic) NSDate *push_time;
///タイトル
@property(nonatomic) NSString *title;
///自由項目
@property(nonatomic) NSMutableDictionary *attributes;

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
