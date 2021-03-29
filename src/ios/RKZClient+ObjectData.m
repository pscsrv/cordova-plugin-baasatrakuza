//
//  RKZClient+ObjectData.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/23.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"

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
    RKZObjectDataExtensionAttribute *extensionAttribute = [RKZObjectDataExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:3]];

    [[RKZService sharedInstance] getDataList:tableName searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAttribute withBlock:^(NSMutableArray *rkzTableDataArray, RKZResponseStatus *responseStatus) {
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

- (void) getPaginateDataList:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSNumber *limit = [command.arguments objectAtIndex:1];
    NSNumber *offset = [command.arguments objectAtIndex:2];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:3]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:4]];
    RKZObjectDataExtensionAttribute *extensionAttribute = [RKZObjectDataExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:5]];

    [[RKZService sharedInstance] getPaginateDataList:tableName limit:limit offset:offset searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAttribute withBlock:^(RKZPagingData *pagingData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:pagingData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
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

- (void) getDataWithRelationObjects:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSString *code = [command.arguments objectAtIndex:1];
    NSNumber *treeCount = ([[command.arguments objectAtIndex:2] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:2];

    [[RKZService sharedInstance] getDataWithRelationObjects:tableName code:code treeCount:treeCount withBlock:^(RKZObjectData *objectData, RKZResponseStatus *responseStatus) {
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

- (void) getDataListWithRelationObjects:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSNumber *treeCount = ([[command.arguments objectAtIndex:1] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:1];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:2]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:3]];

    [[RKZService sharedInstance] getDataListWithRelationObjects:tableName treeCount:treeCount searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *rkzTableDataArray, RKZResponseStatus *responseStatus) {
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

- (void) getPaginateDataListWithRelationObjects:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSNumber *limit = [command.arguments objectAtIndex:1];
    NSNumber *offset = [command.arguments objectAtIndex:2];
    NSNumber *treeCount = ([[command.arguments objectAtIndex:3] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:3];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:4]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:5]];

    [[RKZService sharedInstance] getPaginateDataListWithRelationObjects:tableName limit:limit offset:offset treeCount:treeCount searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(RKZPagingData *pagingData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:pagingData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getDataWithLocation:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSString *code = [command.arguments objectAtIndex:1];
    RKZLocation *location = ([[command.arguments objectAtIndex:2] isEqual:[NSNull null]]) ? nil : [[RKZLocation alloc] initWithResultSet:[command.arguments objectAtIndex:2]];
    NSString *spotFieldName = ([[command.arguments objectAtIndex:3] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:3];

    [[RKZService sharedInstance] getDataWithLocation:tableName code:code location:location spotFieldName:spotFieldName withBlock:^(RKZObjectData *objectData, RKZResponseStatus *responseStatus) {

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

- (void) getDataListWithLocation:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    RKZLocation *location = ([[command.arguments objectAtIndex:1] isEqual:[NSNull null]]) ? nil : [[RKZLocation alloc] initWithResultSet:[command.arguments objectAtIndex:1]];
    NSString *spotFieldName = ([[command.arguments objectAtIndex:2] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:2];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:3]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:4]];

    [[RKZService sharedInstance] getDataListWithLocation:tableName location:location spotFieldName:spotFieldName searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSMutableArray *rkzObjectDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:rkzObjectDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPaginateDataListWithLocation:(CDVInvokedUrlCommand*)command
{
    // objectId, limit, offset, location, spotFieldName, searchConditions, sortConditions, success, error
    NSString *tableName = [command.arguments objectAtIndex:0];
    NSNumber *limit = [command.arguments objectAtIndex:1];
    NSNumber *offset = [command.arguments objectAtIndex:2];
    RKZLocation *location = ([[command.arguments objectAtIndex:3] isEqual:[NSNull null]]) ? nil : [[RKZLocation alloc] initWithResultSet:[command.arguments objectAtIndex:3]];
    NSString *spotFieldName = ([[command.arguments objectAtIndex:4] isEqual:[NSNull null]]) ? nil : [command.arguments objectAtIndex:4];
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:5]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:6]];

    [[RKZService sharedInstance] getPaginateDataListWithLocation:tableName limit:limit offset:offset location:location spotFieldName:spotFieldName searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(RKZPagingData *pagingData, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:pagingData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getFieldDataList:(CDVInvokedUrlCommand*)command
{
    NSString *tableName = [command.arguments objectAtIndex:0];
    BOOL visibleFieldOnly = [(NSNumber *)[command.arguments objectAtIndex:1] boolValue];;

    [[RKZService sharedInstance] getFieldDataList:tableName visibleFieldOnly:visibleFieldOnly withBlock:^(NSMutableArray *rkzFieldDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *resutlarray = [self arrayFromRKZData:rkzFieldDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resutlarray];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getDataFromQRCode:(CDVInvokedUrlCommand*)command
{
    NSString *qrCode = [command.arguments objectAtIndex:0];
    [[RKZService sharedInstance] getDataFromQRCode:qrCode withBlock:^(RKZObjectData *objectData, RKZResponseStatus *responseStatus) {
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

@end
