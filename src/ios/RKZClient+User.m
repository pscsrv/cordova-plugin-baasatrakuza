//
//  RKZClient+User.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/20.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"

@implementation RKZClient (User)

- (void) registUser:(CDVInvokedUrlCommand*)command
{
    RKZUserData *user = [RKZUserData initWithResultSet:[command.arguments objectAtIndex:0]];
    [[RKZService sharedInstance] registUser:user withBlock:^(RKZUserData *userData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getUser:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    [[RKZService sharedInstance] getUser:userAccessToken withBlock:^(RKZUserData *userData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) editUser:(CDVInvokedUrlCommand*)command
{
    RKZUserData *user = [RKZUserData initWithResultSet:[command.arguments objectAtIndex:0]];
    [[RKZService sharedInstance] editUser:user withBlock:^(RKZUserData *userData, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) registPushDeviceToken:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *deviceToken = [command.arguments objectAtIndex:1];
    [[RKZService sharedInstance] registPushDeviceToken:userAccessToken deviceToken:deviceToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:responseStatus.statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) clearPushDeviceToken:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    [[RKZService sharedInstance] clearPushDeviceToken:userAccessToken withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:responseStatus.statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) editPassword:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSString *nowPassword = [command.arguments objectAtIndex:1];
    NSString *newPassword = [command.arguments objectAtIndex:2];

    [[RKZService sharedInstance] editPassword:userAccessToken nowPassword:nowPassword newPassword:newPassword withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSNumber *code = [NSNumber numberWithInteger:responseStatus.statusCode];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[code stringValue]];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) registModelChangeCode:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];
    NSDictionary *params = [command.arguments objectAtIndex:1];
    NSString *password = nil;
    if ([params.allKeys containsObject:@"password"]) {
        password = [params objectForKey:@"password"];
    }
    NSNumber *limitCode = nil;
    if ([params.allKeys containsObject:@"limit_code"]) {
        limitCode = [params objectForKey:@"limit_code"];
    }
    NSNumber *limitMinute = nil;
    if ([params.allKeys containsObject:@"limit_minute"]) {
        limitMinute = [params objectForKey:@"limit_minute"];
    }

    [[RKZService sharedInstance] registModelChangeCode:userAccessToken password:password limitCode:limitCode  limitMinute:limitMinute withBlock:^(NSString *modelChangeCode, NSDate *limitDate, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {

            NSDateFormatter *outputDateFormatter = [[NSDateFormatter alloc] init];
            NSString *outputDateFormatterStr = @"yyyy-MM-dd HH:mm:ss+0900";
            [outputDateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
            [outputDateFormatter setDateFormat:outputDateFormatterStr];
            NSString *outputDateStr = [outputDateFormatter stringFromDate:limitDate];

            NSDictionary *results = @{@"model_change_code" : modelChangeCode,
                                     @"limit_date" : outputDateStr};

            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:results];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) authModelChange:(CDVInvokedUrlCommand*)command
{
    NSString *modelChangeCode = [command.arguments objectAtIndex:0];
    NSString *password = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] authModelChange:modelChangeCode password:password withBlock:^(RKZUserData *userData, RKZResponseStatus *responseStatus){
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) userAuth:(CDVInvokedUrlCommand*)command
{
    NSString *loginId = [command.arguments objectAtIndex:0];
    NSString *password = [command.arguments objectAtIndex:1];

    [[RKZService sharedInstance] userAuth:loginId password:password withBlock:^(RKZUserData *userData, RKZResponseStatus *responseStatus){
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSDictionary *data = [self dictionaryFromRKZData:userData];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) updateUserAccessToken:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];

    [[RKZService sharedInstance] updateUserAccessToken:userAccessToken withBlock:^(NSString *newUserAccessToken, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newUserAccessToken];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) beginUpdateUserAccessToken:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];

    [[RKZService sharedInstance] beginUpdateUserAccessToken:userAccessToken withBlock:^(NSString *newUserAccessToken, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newUserAccessToken];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) commitUpdateUserAccessToken:(CDVInvokedUrlCommand*)command
{
    NSString *userAccessToken = [command.arguments objectAtIndex:0];

    [[RKZService sharedInstance] commitUpdateUserAccessToken:userAccessToken withBlock:^(NSString *newUserAccessToken, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:newUserAccessToken];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getUserFieldDataList:(CDVInvokedUrlCommand*)command
{
    BOOL visibleFieldOnly = [(NSNumber *)[command.arguments objectAtIndex:0] boolValue];;

    [[RKZService sharedInstance] getUserFieldDataList:visibleFieldOnly withBlock:^(NSArray<RKZFieldData *> *rkzFieldDataArray, RKZResponseStatus *responseStatus) {
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

@end
