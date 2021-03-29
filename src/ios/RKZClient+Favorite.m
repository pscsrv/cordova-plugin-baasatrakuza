//
//  RKZClient+Favorite.m
//  HelloCordova
//
//  Created by 松本清寛 on 2019/05/10.
//

#import "RKZClient.h"

@implementation RKZClient (Favorite)

- (void) addFavoriteToObjectData:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] addFavoriteToObjectData:objectData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {

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

- (void) deleteFavoriteToObjectData:(CDVInvokedUrlCommand*)command
{
    RKZObjectData *objectData = [RKZObjectData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];
    
    [[RKZService sharedInstance] deleteFavoriteToObjectData:objectData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        
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

- (void) addFavoriteToNews:(CDVInvokedUrlCommand*)command
{
    RKZNewsData *newsData = [RKZNewsData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] addFavoriteToNews:newsData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        
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

- (void) deleteFavoriteToNews:(CDVInvokedUrlCommand*)command
{
    RKZNewsData *newsData = [RKZNewsData initWithResultSet:[command.arguments objectAtIndex:0]];
    NSString *userAccessToken = [command.arguments objectAtIndex:1];
    
    [[RKZService sharedInstance] deleteFavoriteToNews:newsData userAccessToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        
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
