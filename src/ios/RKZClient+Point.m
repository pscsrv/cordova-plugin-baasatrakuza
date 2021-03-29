//
//  RKZClient+Point.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/10/13.
//
//

#import "RKZClient.h"

@implementation RKZClient (Point)

- (void) addPoint:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSNumber *point = [command.arguments objectAtIndex:1];
    NSDate *addDate = [NSDate getDateFromRakuzaStr:[command.arguments objectAtIndex:2]];

    [[RKZService sharedInstance] addPoint:userAccessToken point:point contactDate:addDate withBlock:^(RKZPointData *pointData, RKZResponseStatus *responseStatus) {

        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:pointData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getPoint:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    
    [[RKZService sharedInstance] getPoint:userAccessToken withBlock:^(RKZPointData *pointData, RKZResponseStatus *responseStatus) {
        
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:pointData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
