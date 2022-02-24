//
//  RKZClient+Application.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/30.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"

@implementation RKZClient (Application)

- (void) getApplicationSettingData:(CDVInvokedUrlCommand*)command
{
    [[RKZService sharedInstance] getApplicationSettingDataWithBlock:^(RKZApplicationConfigData *applicationConfigData, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:applicationConfigData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getLocaleList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];

    [[RKZService sharedInstance] getLocaleList:searchConditions sortConditionArray:sortConditions withBlock:^(NSArray<RKZLocaleData *> *localeDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:localeDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getLocale:(CDVInvokedUrlCommand*)command
{
    NSLocale *locale = [[RKZService sharedInstance] getLocale];
    NSString *languageCd = [self stringFromLocale:locale];

    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:languageCd];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) setLocale:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *languageCd = [command.arguments objectAtIndex:1];

    NSLocale *locale = [self localeFromLanguageCd:languageCd];

    [[RKZService sharedInstance] setLocale:userAccessToken locale:locale withBlock:^(NSLocale *updateLocale, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSString *languageCd = [self stringFromLocale:updateLocale];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:languageCd];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getSystemDate:(CDVInvokedUrlCommand*)command
{
    [[RKZService sharedInstance] getSystemDateWithBlock:^(NSDate *rakuzaSystemDate, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDateFormatter *outputDateFormatter = [[NSDateFormatter alloc] init];
            NSString *outputDateFormatterStr = @"yyyy-MM-dd HH:mm:ss+0900";
            [outputDateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
            [outputDateFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"en_US_POSIX"]];
            [outputDateFormatter setDateFormat:outputDateFormatterStr];
            NSString *outputDateStr = [outputDateFormatter stringFromDate:rakuzaSystemDate];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:outputDateStr];
        }  else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
