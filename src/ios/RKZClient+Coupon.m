//
//  RKZClient+Coupon.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/10/14.
//
//
#import "RKZClient.h"
#import "RKZService.h"

#import "RKZCouponData.h"
#import "RKZMyCouponData.h"

@implementation RKZClient (Coupon)

- (void) getCoupon:(CDVInvokedUrlCommand*)command
{
    NSString *couponCode = [command.arguments objectAtIndex:0];

    [[RKZService sharedInstance] getCoupon:couponCode withBlock:^(RKZCouponData *couponData, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:couponData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getCouponList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];

    [[RKZService sharedInstance] getCouponList:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *couponDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:couponDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) exchangeCoupon:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *couponCode = [command.arguments objectAtIndex:1];
    NSNumber *quantity = [command.arguments objectAtIndex:2];

    [[RKZService sharedInstance] exchangeCoupon:userAccessToken couponCd:couponCode quantity:quantity withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) useMyCoupon:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];

    NSDictionary *data = [command.arguments objectAtIndex:1];
    RKZMyCouponData *myCouponData = [RKZMyCouponData initWithResultSet:data];
    myCouponData.code = [data objectForKey:@"code"];
    myCouponData.coupon_cd = [data objectForKey:@"coupon_cd"];

    [[RKZService sharedInstance] useMyCoupon:userAccessToken myCouponData:myCouponData withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getMyCoupon:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *myCouponCode = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] getMyCoupon:userAccessToken myCouponCd:myCouponCode withBlock:^(RKZMyCouponData *myCouponData, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:myCouponData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getMyCouponList:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];

    [[RKZService sharedInstance] getMyCouponList:userAccessToken searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *myCouponDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:myCouponDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
