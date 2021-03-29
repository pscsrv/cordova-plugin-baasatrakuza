//
//  RKZClient+StampRally.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/24.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"

@implementation RKZClient (StampRally)

- (void) getStampRallyList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];

    [[RKZService sharedInstance] getStampRallyList:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallyDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallyDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getAllStampRallyList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];
    
    [[RKZService sharedInstance] getAllStampRallyList:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallyDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallyDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getStampRallySpotList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];
    
    [[RKZService sharedInstance] getStampRallySpotList:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallyDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallyDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getStampRallySpotListByStampRallyId:(CDVInvokedUrlCommand*)command
{
    NSString *stampRallyId = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];
    
    [[RKZService sharedInstance] getStampRallySpotListByStampRallyId:stampRallyId searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallySpotDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallySpotDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getStampRallySpotListBySpotId:(CDVInvokedUrlCommand*)command
{
    NSString *spotId = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];

    [[RKZService sharedInstance] getStampRallySpotListBySpotId:spotId searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallySpotDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallySpotDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getStampRallySpotListByBeaconId:(CDVInvokedUrlCommand*)command
{
    NSString *beaconId = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];
    
    [[RKZService sharedInstance] getStampRallySpotListByBeaconId:beaconId searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *stampRallySpotDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:stampRallySpotDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) stampComplete:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *stampRallyId = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] stampComplete:userAccessToken stampRallyId:stampRallyId withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
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

- (void) addMyStamp:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *stampRallyId = [command.arguments objectAtIndex:1];
    NSString *stampRallySpotId = [command.arguments objectAtIndex:2];

    [[RKZService sharedInstance] addMyStamp:userAccessToken stampRallyId:stampRallyId spotId:stampRallySpotId withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
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

- (void) getMyStampHistoryList:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];

    [[RKZService sharedInstance] getMyStampHistoryList:userAccessToken searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *myStampRallyArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:myStampRallyArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end

