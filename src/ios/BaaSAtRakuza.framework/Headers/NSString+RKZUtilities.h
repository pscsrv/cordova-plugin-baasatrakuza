//
//  NSString+Utilities.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/12.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 楽座のJSON解析に利用している NSString 拡張カテゴリ
 */
@interface NSString (RKZUtilities)

/**
 （BaaS@rakuza）NSStringがnilまたは[NSNull null]、空か判定します。
 */
extern BOOL NSStringIsEmpty(NSString *str);

/**
 （BaaS@rakuza）NSStringからBOOLに変換します。
 
 引数が"1"である場合のみ YES を返却し、それ以外の場合は NO を返却します。
 */
extern BOOL NSStringToBOOL(NSString *str);

/**
 （BaaS@rakuza）NSStringからNSNumberに変換します。

 @warning intに変換して格納しています。
 */
extern NSNumber* NSStringToNSNumber(NSString *str);

@end
