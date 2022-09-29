//
//  RKZPagingData.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2017/04/05.
//
//

#import <Foundation/Foundation.h>
#import "RKZData.h"

NS_ASSUME_NONNULL_BEGIN

@interface RKZPagingData<ObjectType> : RKZData

///取得件数
@property(nonatomic) NSNumber *limit;
///取得開始位置
@property(nonatomic) NSNumber *offset;
///取得対象件数
@property(nonatomic) NSNumber *result_cnt;
///取得したデータ
@property(nonatomic) NSArray<ObjectType> *datas;


+ (instancetype)initWithLimit:(NSNumber *)limit offset:(NSNumber *)offset resultCount:(NSNumber *)resultCount datas:(NSArray<ObjectType> *)datas;

@end

NS_ASSUME_NONNULL_END