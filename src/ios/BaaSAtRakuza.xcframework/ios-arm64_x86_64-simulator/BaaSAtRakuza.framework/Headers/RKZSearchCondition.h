//
//  RKZSearchCondition.h
//  BaaSAtRakuza
//
//  Created by 炭本大樹 on 2015/04/03.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

@interface FavoriteForSearchCondition : NSObject
@property(nonatomic) NSString *type;
@end

@interface ReadedNewsForSearchCondition : NSObject
@property(nonatomic) NSString *type;
@end

/**
 楽座のデータ取得処理の検索条件を管理するクラス
 
 楽座から情報を取得する際の検索条件を指定する際に使用します。
 */
@interface RKZSearchCondition : RKZData

///------------------------------
/// @name Constants
///------------------------------

/**
 検索条件タイプに指定する、検索項目のデータが２件の検索値の範囲内（指定値含む）に該当することを表す文字列です。<br/>
 この条件は、検索値配列の先頭から２要素のみを扱います。
 */
extern NSString *const RKZSearchConditionBetweenInclude;

/**
 検索条件タイプに指定する、検索項目のデータが２件の検索値の範囲内（指定値含まない）に該当することを表す文字列です。
 この条件は、検索値配列の先頭から２要素のみを扱います。
 */
extern NSString *const RKZSearchConditionBetweenExclude;

/**
 検索条件タイプに指定する、検索項目のデータが検索値のいずれかに該当することを表す文字列です。
 */
extern NSString *const RKZSearchConditionIn ;

/**
 検索条件タイプに指定する、検索項目のデータが検索値のいずれにも該当しないことを表す文字列です。
 */
extern NSString *const RKZSearchConditionNotIn;

/**
 検索条件タイプに指定する、検索項目のデータを検索値すべてであいまい検索することを表す文字列です。<br/>
 この条件は、楽座項目「チェックボックス」専用の条件指定となります。
 */
extern NSString *const RKZSearchConditionLikeOr;

/**
 検索条件タイプに指定する、検索項目のデータが検索値と完全一致することを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionEqual;

/**
 検索条件タイプに指定する、検索項目のデータが検索値と完全一致しないことを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionNotEqual;

/**
 検索条件タイプに指定する、検索項目のデータが検索値で前方一致することを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionLikeBefore;

/**
 検索条件タイプに指定する、検索項目のデータが検索値で後方一致することを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionLikeAfter;

/**
 検索条件タイプに指定する、検索項目のデータが検索値で部分一致することを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionLikeBoth;

/**
 検索条件タイプに指定する、検索項目のデータが検索値以下であることを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionLessThanInclude;

/**
 検索条件タイプに指定する、検索項目のデータが検索値以上であることを表す文字列です。<br>
 この条件は、検索値配列の最初の要素のみを扱います。
 */
extern NSString *const RKZSearchConditionGreaterThanInclude;

/**
 お気に入り情報のみを検索条件に含めるための文字列です。
 */
extern NSString *const MyFavoriteOnlyForFavorite;
/**
 お気に入り情報以外を検索条件に含めるための文字列です。
 */
extern NSString *const NotMyFavoriteForFavorite;
/**
 全てのお気に入り情報を検索条件に含めるための文字列です。
 */
extern NSString *const AllForFavorite;

/**
 お知らせ既読情報を検索条件に含めるための文字列です。
 */
extern NSString *const AlreadyReadForReadedNews;
/**
 お知らせ未読情報を検索条件に含めるための文字列です。
 */
extern NSString *const NonreadForReadedNews;
/**
 全てのお知らせ情報を検索条件に含めるための文字列です。
 */
extern NSString *const AllForReadedNews;

///------------------------------
/// @name Properties
///------------------------------

/**
 検索条件タイプ
 
 当クラスで定義している以下の定数を利用して、条件指定をしてください。
 
 - RKZSearchConditionBetweenInclude
 - RKZSearchConditionBetweenExclud
 - RKZSearchConditionIn
 - RKZSearchConditionNotIn
 - RKZSearchConditionLikeOr
 - RKZSearchConditionEqual
 - RKZSearchConditionNotEqual
 - RKZSearchConditionLikeBefore
 - RKZSearchConditionLikeAfter
 - RKZSearchConditionLikeBoth
 - RKZSearchConditionLessThanInclude
 - RKZSearchConditionGreaterThanInclude
 */
@property(nonatomic, nullable) NSString *search_condition_type;

/**
 検索項目
 
 検索条件に指定する項目名を設定してください。
 
 - **固定項目**の場合、項目名はモデルの変数名と対応しています。
 - **自由項目**の場合、楽座で指定した任意の項目名を使用してください。
 */
@property(nonatomic, nullable) NSString *search_column;

/**
 検索値
 
 検索条件に指定する値を指定してください。
 
 @warning 検索値はNSStringで指定してください。</br>
          NSDateなどのオブジェクトを設定すると正常に検索が機能しない可能性があります。
 */
@property(nonatomic, nullable) NSArray<NSString *> *search_value;


@property(nonatomic, nullable) FavoriteForSearchCondition *with_favorite;

@property(nonatomic, nullable) ReadedNewsForSearchCondition *readed_news;

///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 
 引数に渡された条件でインスタンス化を行います。
 
 @param searchConditionType NSString 検索条件タイプ
 @param searchColumn        NSString 検索項目名
 @param searchValueArray    NSArray 検索値配列
 @return id 初期化を行ったモデル情報

 @warning 検索値はNSStringで指定してください。</br>
          NSDateなどのオブジェクトを設定すると正常に検索が機能しない可能性があります。
 */
+ (instancetype)initWithSearchConditionType:(NSString *)searchConditionType
                     searchColumn:(NSString *)searchColumn
                 searchValueArray:(NSArray<NSString *> *)searchValueArray __attribute__ ((deprecated("このメソッドの替わりに`-initWithSearchConditionType:searchColumn:searchValueArray:`を使用してください")));

/**
 指定イニシャライザ
 
 引数に渡された条件でインスタンス化を行います。
 
 @param searchConditionType NSString 検索条件タイプ
 @param searchColumn        NSString 検索項目名
 @param searchValueArray    NSArray 検索値配列
 @return id 初期化を行ったモデル情報
 
 @warning 検索値はNSStringで指定してください。</br>
          NSDateなどのオブジェクトを設定すると正常に検索が機能しない可能性があります。
 */
- (instancetype)initWithSearchConditionType:(NSString *)searchConditionType
                               searchColumn:(NSString *)searchColumn
                           searchValueArray:(NSArray<NSString *> *)searchValueArray
NS_SWIFT_NAME(init(_:searchColumn:searchValueArray:));

/**
 お気に入り設定値の検索条件を有効にするイニシャライザ
 */
+ (instancetype)initWithFavoriteType:(NSString *)type __attribute__ ((deprecated("このメソッドの替わりに`-initWithFavoriteType:`を使用してください")));

/**
 お気に入り設定値の検索条件を有効にするイニシャライザ
 */
- (instancetype)initWithFavoriteType:(NSString *)type;

/**
 既読未読設定フラグの検索条件を作成するイニシャライザ
 */
+ (instancetype)initWithReadedNewsType:(NSString *)type __attribute__ ((deprecated("このメソッドの替わりに`-initWithReadedNewsType:`を使用してください")));

/**
 既読未読設定フラグの検索条件を作成するイニシャライザ
 */
- (instancetype)initWithReadedNewsType:(NSString *)type;

@end

NS_ASSUME_NONNULL_END
