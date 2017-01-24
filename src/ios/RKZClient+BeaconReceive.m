//
//  RKZClient+BeaconReceive.m
//  BaasAtRakuza
//
//  Created by 松本清寛 on 2016/09/07.
//
//

#import <Cordova/CDVPlugin.h>

#import "RKZClient.h"
#import "RKZService.h"
#import "RKZBeaconReceiver.h"
#import "RKZBeaconInfo.h"

@interface RKZClient () <RKZBeaconReceiverDelegate>

@end

@implementation RKZClient(BeaconReceive)

- (void) setBluetusLicenseKey: (CDVInvokedUrlCommand*)command
{
    NSString *licenseKey = [command.arguments objectAtIndex:0];
    
    [[RKZService sharedInstance] setBluetusLicenseKey:licenseKey];

    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId: command.callbackId];
}

- (void) setBeaconetsAuthenticationPassword: (CDVInvokedUrlCommand*)command
{
    NSString *authPassword = [command.arguments objectAtIndex:0];
    
    [[RKZService sharedInstance] setBeaconetsAuthenticationPassword:authPassword];
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId: command.callbackId];
}

- (void) startSearchBeacon: (CDVInvokedUrlCommand*)command
{
    receiver = [[RKZService sharedInstance] getBeaconReceiver:self];
    [receiver searchStart];

    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId: command.callbackId];
}

- (void) stopSearchBeacon: (CDVInvokedUrlCommand*)command
{
    [receiver searchStop];

    // receiveCallbackを停止する
    // TODO : 一度も実行されていない場合の考慮必要
    CDVPluginResult *result;
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    result.keepCallback = [NSNumber numberWithBool:FALSE];
    [self.commandDelegate sendPluginResult:result callbackId:receiveCallbackId];
    
    receiveCallbackId = nil;

    // stopSearchBeaconの停止OKの復帰値を作成する
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId: command.callbackId];
}

- (void) receiveBeacon:(CDVInvokedUrlCommand*)command
{
    receiveCallbackId = command.callbackId;
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    result.keepCallback = [NSNumber numberWithBool:TRUE];
    [self.commandDelegate sendPluginResult:result callbackId:receiveCallbackId];
}


- (void)didFinishReadyForSearchBeacons
{
    
}

- (void)didDiscoverBeaconInfo:(RKZBeaconInfo *)beaconInfo
{
    NSDictionary *dicBeaconInfo = [beaconInfo dictionaryWithValuesForKeys:@[@"beaconId", @"RSSI", @"type"]];
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dicBeaconInfo];
    result.keepCallback = [NSNumber numberWithBool:TRUE];
    [self.commandDelegate sendPluginResult:result callbackId:receiveCallbackId];
}

@end

