//
//  RKZClient+Favorite.m
//  HelloCordova
//
//  Created by 松本清寛 on 2019/05/10.
//

#import "RKZClient.h"

@implementation RKZClient (Favorite)

- (void) addObjectDataToFavorite:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] addObjectDataToFavorite:objectData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

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

- (void) deleteObjectDataFromFavorite:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] deleteObjectDataFromFavorite:objectData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

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

- (void) addNewsToFavorite:(CDVInvokedUrlCommand*)command
{
    RKZNewsData *newsData = [RKZNewsData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] addNewsToFavorite:newsData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

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

- (void) deleteNewsFromFavorite:(CDVInvokedUrlCommand*)command
{
    RKZNewsData *newsData = [RKZNewsData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] deleteNewsFromFavorite:newsData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

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

- (void)addUserDetailToFavorite:(CDVInvokedUrlCommand *)command
{
    RKZUserDetailData *userDetail = [RKZUserDetailData initWithResultSet:command.arguments[0]];
    NSString *userAccessToken = command.arguments[1];

    [[RKZService sharedInstance] addUserDetailToFavorite:userDetail userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus * _Nonnull responseStatus) {
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

- (void)deleteUserDetailFromFavorite:(CDVInvokedUrlCommand *)command
{
    RKZUserDetailData *userDetail = [RKZUserDetailData initWithResultSet:command.arguments[0]];
    NSString *userAccessToken = command.arguments[1];

    [[RKZService sharedInstance] deleteUserDetailFromFavorite:userDetail userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus * _Nonnull responseStatus) {
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

@end
