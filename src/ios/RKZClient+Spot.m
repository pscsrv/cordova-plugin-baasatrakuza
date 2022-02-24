//
//  RKZClient+Spot.m
//  HelloCordova
//
//  Created by 松本清寛 on 2016/09/15.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"

@implementation RKZClient (Spot)

- (void) getSpotList:(CDVInvokedUrlCommand*)command
{
    NSMutableArray *searchConditions = [self createSearchConditions:[command.arguments objectAtIndex:0]];
    NSMutableArray *sortConditions = [self createSortConditions:[command.arguments objectAtIndex:1]];

    [[RKZService sharedInstance] getSpotList:searchConditions sortConditionArray:sortConditions withBlock:^(NSArray<RKZSpotData *> *spotDataArray, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            NSMutableArray *datas = [self arrayFromRKZData:spotDataArray];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:datas];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
