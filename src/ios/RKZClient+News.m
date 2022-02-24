//
//  RKZClient+News.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/30.
//
//

#import "RKZClient.h"

@implementation RKZClient (News)

typedef void (^getNewsBlock)(RKZNewsData *newsData, RKZResponseStatus *responseStatus);
typedef void (^getNewsReadHistoryBlock)(RKZNewsReadHistoryData *newsReadHistoryData, RKZResponseStatus *responseStatus);
typedef void (^registBlock)(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus);

- (void) getNews:(CDVInvokedUrlCommand*)command
{
    NSDictionary *params = [command.arguments objectAtIndex:0];
    NSString *newsId = [params objectForKey:@"news_id"];

    getNewsBlock block = ^(RKZNewsData *newsData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:newsData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };

    if ([params.allKeys containsObject:@"tenant_id"]) {
        // テナントIDがパラメータで渡された場合は、テナントIDを考慮する
        NSString *tenantId = [params objectForKey:@"tenant_id"];
        [[RKZService sharedInstance] getNews:newsId tenantId:tenantId withBlock:block];
    } else {
        [[RKZService sharedInstance] getNews:newsId withBlock:block];
    }
}

- (void) getNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    if ([limit isEqual:[NSNull null]]) { limit = nil; }

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:3]];

    [[RKZService sharedInstance] getNewsList:limit searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:newsDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPaginateNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    NSNumber *offset = [command.arguments objectAtIndex:1];

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:2]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:3]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:4]];

    [[RKZService sharedInstance] getPaginateNewsList:limit offset:offset searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus) {
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

- (void) getSegmentNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    if ([limit isEqual:[NSNull null]]) { limit = nil; }

    NSString *userAccessToken = [command.arguments objectAtIndex:1];
    BOOL onlyMatchSegment = [(NSNumber *)[command.arguments objectAtIndex:2] boolValue];;

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:3]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:4]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:5]];

    [[RKZService sharedInstance] getSegmentNewsList:limit userAccessToken:userAccessToken onlyMatchSegment:onlyMatchSegment searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:newsDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPaginateSegmentNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    NSNumber *offset = [command.arguments objectAtIndex:1];

    NSString *userAccessToken = [command.arguments objectAtIndex:2];
    BOOL onlyMatchSegment = [(NSNumber *)[command.arguments objectAtIndex:3] boolValue];;

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:4]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:5]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:6]];

    [[RKZService sharedInstance] getPaginateSegmentNewsList:limit offset:offset userAccessToken:userAccessToken onlyMatchSegment:onlyMatchSegment searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus) {
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

- (void) getReleasedNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    if ([limit isEqual:[NSNull null]]) { limit = nil; }

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:1]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:2]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:3]];

    [[RKZService sharedInstance] getReleasedNewsList:limit searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:newsDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPaginateReleasedNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    NSNumber *offset = [command.arguments objectAtIndex:1];

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:2]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:3]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:4]];

    [[RKZService sharedInstance] getPaginateReleasedNewsList:limit offset:offset searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus) {
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

- (void) getReleasedSegmentNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    if ([limit isEqual:[NSNull null]]) { limit = nil; }

    NSString *userAccessToken = [command.arguments objectAtIndex:1];
    BOOL onlyMatchSegment = [(NSNumber *)[command.arguments objectAtIndex:2] boolValue];;

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:3]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:4]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:5]];

    [[RKZService sharedInstance] getReleasedSegmentNewsList:limit userAccessToken:userAccessToken onlyMatchSegment:onlyMatchSegment searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(NSArray<RKZNewsData *> *newsDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:newsDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPaginateReleasedSegmentNewsList:(CDVInvokedUrlCommand*)command
{
    NSNumber *limit = [command.arguments objectAtIndex:0];
    NSNumber *offset = [command.arguments objectAtIndex:1];

    NSString *userAccessToken = [command.arguments objectAtIndex:2];
    BOOL onlyMatchSegment = [(NSNumber *)[command.arguments objectAtIndex:3] boolValue];;

    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:4]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:5]];

    RKZNewsExtensionAttribute *extensionAtttribute = [RKZNewsExtensionAttribute initWithResultSet:[command.arguments objectAtIndex:6]];

    [[RKZService sharedInstance] getPaginateReleasedSegmentNewsList:limit offset:offset userAccessToken:userAccessToken onlyMatchSegment:onlyMatchSegment searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAtttribute withBlock:^(RKZPagingData<RKZNewsData *> *pagingData, RKZResponseStatus *responseStatus) {
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

- (void) getNewsReadHistory:(CDVInvokedUrlCommand*)command
{
    NSDictionary *params = [command.arguments objectAtIndex:0];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    NSString *newsId = [params objectForKey:@"news_id"];

    getNewsReadHistoryBlock block = ^(RKZNewsReadHistoryData *newsReadHistoryData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:newsReadHistoryData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };

    if ([params.allKeys containsObject:@"tenant_id"]) {
        // テナントIDがパラメータで渡された場合は、テナントIDを考慮する
        NSString *tenantId = [params objectForKey:@"tenant_id"];
        [[RKZService sharedInstance] getNewsReadHistory:newsId tenantId:tenantId userAccessToken:userAccessToken withBlock:block];
    } else {
        [[RKZService sharedInstance] getNewsReadHistory:newsId userAccessToken:userAccessToken withBlock:block];
    }
}

- (void) getNewsReadHistoryList:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    [[RKZService sharedInstance] getNewsReadHistoryList:userAccessToken withBlock:^(NSArray<RKZNewsReadHistoryData *> *newsReadHistoryDataArray, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:newsReadHistoryDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) registNewsReadHistory:(CDVInvokedUrlCommand*)command
{
    NSDictionary *params = [command.arguments objectAtIndex:0];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    NSString *newsId = [params objectForKey:@"news_id"];
    NSDate *readDate = [NSDate getDateFromRakuzaStr:[params objectForKey:@"read_date"]];

    registBlock block = ^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus){
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };

    if ([params.allKeys containsObject:@"tenant_id"]) {
        // テナントIDがパラメータで渡された場合は、テナントIDを考慮する
        NSString *tenantId = [params objectForKey:@"tenant_id"];
        [[RKZService sharedInstance] registNewsReadHistory:newsId tenantId:tenantId userAccessToken:userAccessToken readDate:readDate withBlock:block];
    } else {
        [[RKZService sharedInstance] registNewsReadHistory:newsId userAccessToken:userAccessToken readDate:readDate withBlock:block];
    }
}

- (void) readNews:(CDVInvokedUrlCommand*)command
{
    NSDictionary *params = [command.arguments objectAtIndex:0];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    NSString *newsId = [params objectForKey:@"news_id"];

    registBlock block = ^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus){
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    };

    if ([params.allKeys containsObject:@"tenant_id"]) {
        // テナントIDがパラメータで渡された場合は、テナントIDを考慮する
        NSString *tenantId = [params objectForKey:@"tenant_id"];
        [[RKZService sharedInstance] readNews:newsId tenantId:tenantId userAccessToken:userAccessToken withBlock:block];
    } else {
        [[RKZService sharedInstance] readNews:newsId userAccessToken:userAccessToken withBlock:block];
    }
}

@end
