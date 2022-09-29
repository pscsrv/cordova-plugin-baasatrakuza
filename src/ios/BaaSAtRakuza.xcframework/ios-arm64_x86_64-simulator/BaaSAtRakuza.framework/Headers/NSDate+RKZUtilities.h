//
//  NSDate+Utilities.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/04/20.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//
NS_ASSUME_NONNULL_BEGIN

/**
 楽座の日時形式（YYYY-MM-dd HH:mm:ss）に対応した NSDate 拡張カテゴリ
 */
@interface NSDate (RKZUtilities)

///------------------------------
/// @name Class Methods
///------------------------------

/**
 （BaaS@rakuza）楽座形式の日時文字列をNSDateに変換する(YYYY-MM-dd HH:mm:ss)
 @param str 日時文字列
 @param existsSecond 日時文字列にssが存在するか
 @return NSDateに変換した日時情報<br/>
 existsSecondがYESの場合はssを含めた日時情報を返し、NOの場合はssを含めない
 */
+ (nullable NSDate *)getDatetimeFromRakuzaStr:(nullable NSString *)str
                        existsSecond:(BOOL)existsSecond;

/**
 （BaaS@rakuza）楽座形式の日付文字列をNSDateに変換する(YYYY-MM-dd)
 @param str 日付文字列
 @return NSDateに変換した日付情報
 */
+ (nullable NSDate *)getDateFromRakuzaStr:(nullable NSString *)str;



/**
 （BaaS@rakuza）NSDateを楽座形式の日時文字列(YYYY-MM-dd HH:mm:ss)に変換する
 @param datetime 日時情報
 @param existsSecond 日時文字列にssが存在するか
 @return NSString NSDateから変換した日時文字列(YYYY-MM-dd HH:mm:ss)<br/>
 existsSecondがYESの場合はssを含めた文字列を返し、NOの場合はssを含めない
 */
+ (NSString *)getRakuzaStrFromDatetime:(NSDate *)datetime
                          existsSecond:(BOOL)existsSecond ;

/**
 （BaaS@rakuza）NSDateを楽座形式の日付文字列(YYYY-MM-dd)に変換する
 @param date 日付情報
 @return NSString NSDateから変換した日付文字列(YYYY-MM-dd)
 */
+ (NSString *)getRakuzaStrFromDate:(NSDate *)date;

@end

NS_ASSUME_NONNULL_END