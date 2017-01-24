//
//  RKZClient+ObjectData.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/23.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"
#import "RKZService.h"

#import "RKZObjectData.h"

@implementation RKZClient (ObjectData)

- (void) getData:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSString *code = [command.arguments objectAtIndex:1];
    
    [[RKZService sharedInstance] getData:tableName code:code withBlock:^(RKZObjectData *objectData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:objectData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getDataList:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];
    
    [[RKZService sharedInstance] getDataList:tableName searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *rkzTableDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:rkzTableDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) addData:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];

    [[RKZService sharedInstance] addData:objectData withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
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

- (void) editData:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];

    [[RKZService sharedInstance] editData:objectData withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
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

- (void) deleteData:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];

    [[RKZService sharedInstance] deleteData:tableName searchConditions:searchConditions withBlock:^(NSNumber *deleteCount, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDouble:[deleteCount doubleValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];

}

@end


