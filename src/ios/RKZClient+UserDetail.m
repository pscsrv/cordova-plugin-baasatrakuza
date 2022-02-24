#import "RKZClient.h"

@implementation RKZClient (UserDetail)

- (void)getUserDetail:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    NSString *userDetailId = command.arguments[2];
    
    RKZUserDetailExtensionAttribute *extensionAttribute = [RKZUserDetailExtensionAttribute initWithResultSet:command.arguments[3]];
    
    [[RKZService sharedInstance] getUserDetail:objectId userAccessToken:userAccessToken userDetailId:userDetailId extensionAttribute:extensionAttribute withBlock:^(RKZUserDetailData * _Nullable userDetail, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userDetail];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)getUserDetailList:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    
    NSMutableArray *searchConditions = [self createSearchConditions:command.arguments[2]];
    NSMutableArray *sortConditions = [self createSortConditions:command.arguments[3]];

    RKZUserDetailExtensionAttribute *extensionAttribute = [RKZUserDetailExtensionAttribute initWithResultSet:command.arguments[4]];
    
    [[RKZService sharedInstance] getUserDetailList:objectId userAccessToken:userAccessToken searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAttribute withBlock:^(NSArray<RKZUserDetailData *> * _Nonnull userDetails, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSArray *data = [self arrayFromRKZData:userDetails];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)getPaginateUserDetailList:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    
    NSNumber *limit = command.arguments[2];
    NSNumber *offset = command.arguments[3];
    
    NSMutableArray *searchConditions = [self createSearchConditions:command.arguments[4]];
    NSMutableArray *sortConditions = [self createSortConditions:command.arguments[5]];

    RKZUserDetailExtensionAttribute *extensionAttribute = [RKZUserDetailExtensionAttribute initWithResultSet:command.arguments[6]];
    
    [[RKZService sharedInstance] getPaginateUserDetailList:objectId userAccessToken:userAccessToken limit:limit offset:offset searchConditionArray:searchConditions sortConditionArray:sortConditions extensionAttribute:extensionAttribute withBlock:^(RKZPagingData<RKZUserDetailData *> * _Nonnull pagingData, RKZResponseStatus * _Nonnull responseStatus) {
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

- (void)getSharedUserDetail:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    NSString *userDetailId = command.arguments[2];
    
    NSArray<NSString *> *visibility = command.arguments[3];
    
    [[RKZService sharedInstance] getSharedUserDetail:objectId userAccessToken:userAccessToken userDetailId:userDetailId visibility:visibility withBlock:^(RKZUserDetailData * _Nullable userDetail, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userDetail];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)getSharedUserDetailList:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    
    NSArray<NSString *> *visibility = command.arguments[2];
    
    NSMutableArray *searchConditions = [self createSearchConditions:command.arguments[3]];
    NSMutableArray *sortConditions = [self createSortConditions:command.arguments[4]];
   
    [[RKZService sharedInstance] getSharedUserDetailList:objectId userAccessToken:userAccessToken visibility:visibility searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(NSArray<RKZUserDetailData *> * _Nonnull userDetails, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSArray *data = [self arrayFromRKZData:userDetails];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)getPaginateSharedUserDetailList:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    
    NSNumber *limit = command.arguments[2];
    NSNumber *offset = command.arguments[3];
    
    NSArray<NSString *> *visibility = command.arguments[4];
    
    NSMutableArray *searchConditions = [self createSearchConditions:command.arguments[5]];
    NSMutableArray *sortConditions = [self createSortConditions:command.arguments[6]];
    
    [[RKZService sharedInstance] getPaginateSharedUserDetailList:objectId userAccessToken:userAccessToken limit:limit offset:offset visibility:visibility searchConditionArray:searchConditions sortConditionArray:sortConditions withBlock:^(RKZPagingData<RKZUserDetailData *> * _Nonnull pagingData, RKZResponseStatus * _Nonnull responseStatus) {
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

- (void)addUserDetail:(CDVInvokedUrlCommand *)command
{
    RKZUserDetailData *userDetail = [RKZUserDetailData initWithResultSet:command.arguments[0]];
    NSString *userAccessToken = command.arguments[1];
    
    [[RKZService sharedInstance] addUserDetail:userDetail userAccessToken:userAccessToken withBlock:^(RKZUserDetailData * _Nullable userDetail, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userDetail];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)editUserDetail:(CDVInvokedUrlCommand *)command
{
    RKZUserDetailData *userDetail = [RKZUserDetailData initWithResultSet:command.arguments[0]];
    NSString *userAccessToken = command.arguments[1];
    
    [[RKZService sharedInstance] editUserDetail:userDetail userAccessToken:userAccessToken withBlock:^(RKZUserDetailData * _Nullable userDetail, RKZResponseStatus * _Nonnull responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userDetail];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void)deleteUserDetail:(CDVInvokedUrlCommand *)command
{
    NSString *objectId = command.arguments[0];
    NSString *userAccessToken = command.arguments[1];
    
    NSMutableArray *searchConditions = [self createSearchConditions:command.arguments[2]];
    
    [[RKZService sharedInstance] deleteUserDetail:objectId userAccessToken:userAccessToken searchConditionArray:searchConditions withBlock:^(NSNumber * _Nonnull deleteCount, RKZResponseStatus * _Nonnull responseStatus) {
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
