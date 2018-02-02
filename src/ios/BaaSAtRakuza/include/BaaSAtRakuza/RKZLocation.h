//
//  RKZLocation.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2017/05/02.
//
//

#ifndef RKZLocation_h
#define RKZLocation_h

/**
 位置情報を扱うためのクラス
 
 locationを利用して検索する場合に使用します。
 */
@interface RKZLocation : NSObject

///緯度
@property(nonatomic) NSNumber *latitude;
///経度
@property(nonatomic) NSNumber *longitude;
///範囲
@property(nonatomic) NSNumber *range;


- (id)initWithResultSet:(NSDictionary *)rs;

- (id)initWithLatitude:(NSNumber *)latitude longitude:(NSNumber *)longitude range:(NSNumber *)range;

@end

#endif /* RKZLocation_h */
