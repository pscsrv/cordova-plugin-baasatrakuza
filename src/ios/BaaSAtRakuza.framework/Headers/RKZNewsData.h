//
//  RKZNewsData.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/16.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

/**
 お知らせ情報を管理するクラス
 
 お知らせ情報を取得する際に使用します。
 */
@interface RKZNewsData : RKZData

///------------------------------
/// @name Properties
///------------------------------

///作成者
@property(nonatomic, nullable) NSString *author;
///カテゴリコード
@property(nonatomic, nullable) NSString *category;
///カテゴリ名称
@property(nonatomic, nullable) NSString *category_name;
///作成日時
@property(nonatomic, nullable) NSDate *date;
/** 内容
 検索項目に指定する際は「description」と指定してください。
 */
@property(nonatomic, nullable) NSString *description_;
///ジャンルコード
@property(nonatomic, nullable) NSString *genre;
///ジャンル名
@property(nonatomic, nullable) NSString *genre_name;
///ニュースID
@property(nonatomic, nullable) NSString *news_id;
///テナントID
@property(nonatomic, nullable) NSString *tenant_id;
///TOP画像
@property(nonatomic, nullable) NSString *photo;
///公開フラグ
@property(nonatomic) BOOL release_flg;
///公開開始日
@property(nonatomic, nullable) NSDate *release_from_date;
///公開終了日
@property(nonatomic, nullable) NSDate *release_end_date;
///公開対象者区分
@property(nonatomic, nullable) NSString *release_target_kbn;
///公開対象者区分名称
@property(nonatomic, nullable) NSString *release_target_kbn_name;
///RSS出力フラグ
@property(nonatomic) BOOL rss_flg;
///ニュースURL
@property(nonatomic, nullable) NSString *url;
///プッシュ配信利用フラグ
@property(nonatomic) BOOL use_push_flg;
///プッシュ通知済フラグ
@property(nonatomic) BOOL push_done_flg;
///プッシュ通知予約日時
@property(nonatomic, nullable) NSDate *push_time;
///タイトル
@property(nonatomic, nullable) NSString *title;

///配信条件情報
@property(nonatomic, nullable) NSDictionary *news_segment_conditions;
///配信条件一致フラグ
@property(nonatomic) BOOL match_segment_flg;

///既読フラグ
@property(nonatomic) BOOL readed_flg;
///既読日時
@property(nonatomic, nullable) NSDate *readed_dte;

///お気に入り登録フラグ
@property(nonatomic) BOOL is_favorite;
///お気に入り更新日時
@property(nonatomic, nullable) NSDate *favorite_date;
///お気に入り件数
@property(nonatomic, nullable) NSNumber *favorite_count;

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
