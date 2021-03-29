//
//  RKZClient+Beacon.m
//  HelloCordova
//
//  Created by 松本清寛 on 2017/01/23.
//
//

#import "RKZClient.h"

@implementation RKZClient (Beacon)


- (void) getBeaconList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];
    
    [[RKZService sharedInstance] getBeaconList:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *beaconDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:beaconDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) addDetectBeaconContact:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *beaconId = [command.arguments objectAtIndex:1];
    NSString *spotCd = [command.arguments objectAtIndex:2];
    NSString *rssi = [command.arguments objectAtIndex:3];
    NSDate *detectBeaconDatetime = [NSDate getDateFromRakuzaStr:[command.arguments objectAtIndex:4]];
    NSString *remarks = [command.arguments objectAtIndex:5];
    
    [[RKZService sharedInstance] addDetectBeaconContact:userAccessToken beaconId:beaconId contactDate:detectBeaconDatetime beaconSpotCd:spotCd rssi:rssi remarks:remarks withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        
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

- (void) getDetectBeaconContact:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];
    
    [[RKZService sharedInstance] getDetectBeaconContact:userAccessToken searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *detectBeaconContactArray, RKZResponseStatus *responseStatus) {
        
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:detectBeaconContactArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
