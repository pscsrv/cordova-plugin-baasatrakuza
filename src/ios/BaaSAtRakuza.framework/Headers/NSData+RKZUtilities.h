//
//  NSData+RKZUtilities.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2017/03/13.
//
//

#ifndef NSData_RKZUtilities_h
#define NSData_RKZUtilities_h

NS_ASSUME_NONNULL_BEGIN

@interface NSData (RKZUtilities)


/**
 */
+(nullable NSData *) dataFromBase64String:(nullable NSString *)base64string;

@end

NS_ASSUME_NONNULL_END

#endif /* NSData_RKZUtilities_h */
