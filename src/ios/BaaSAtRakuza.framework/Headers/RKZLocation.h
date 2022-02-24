//
//  RKZLocation.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2017/05/02.
//
//

#ifndef RKZLocation_h
#define RKZLocation_h

NS_ASSUME_NONNULL_BEGIN

/**
 位置情報を扱うためのクラス
 
 locationを利用して検索する場合に使用します。
 */
@interface RKZLocation : NSObject

///緯度
@property(nonatomic, nullable) NSNumber *latitude;
///経度
@property(nonatomic, nullable) NSNumber *longitude;
///範囲
@property(nonatomic, nullable) NSNumber *range;


- (instancetype)initWithResultSet:(NSDictionary *)rs;

- (instancetype)initWithLatitude:(NSNumber *)latitude longitude:(NSNumber *)longitude range:(NSNumber *)range;

@end

NS_ASSUME_NONNULL_END

#endif /* RKZLocation_h */
