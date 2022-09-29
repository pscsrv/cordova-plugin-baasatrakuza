#import "RKZClient.h"

@implementation RKZClient (Push)

- (void)openPush:(CDVInvokedUrlCommand *)command
{
    NSString *userAccessToken = command.arguments[0];
    NSNumber *pushNo = command.arguments[1];
    
    [[RKZService sharedInstance] openPush:userAccessToken pushNo:pushNo withBlock:^(RKZApiStatusCode statusCode, RKZResponseStatus *responseStatus) {
        CDVPluginResult *result;
        if (responseStatus.isSuccess) {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@(statusCode).stringValue];
        } else {
            NSDictionary *error = [self dictionaryFromResponseStatus:responseStatus];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:error];
        }
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

@end
