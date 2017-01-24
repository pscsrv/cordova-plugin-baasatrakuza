//
//  RKZClient.m
//  BaasAtRakuza
//
//  Created by 松本清寛 on 2016/09/07.
//
//

#import <Cordova/CDVPlugin.h>

#import "objc/runtime.h"

#import "RKZClient.h"
#import "RKZService.h"

#import "RKZSearchCondition.h"
#import "RKZSortCondition.h"

static NSString *const kTYPE = @"type";
static NSString *const kNAME = @"columnName";
static NSString *const kVALUE = @"values";

@interface RKZClient()

@end

@implementation RKZClient

- (void) setTenantKey: (CDVInvokedUrlCommand*)command
{
    NSString *tenantKey = [command.arguments objectAtIndex:0];
    
    CDVPluginResult* result;
    RKZResponseStatus *responseStatus = [[RKZService sharedInstance]setTenantKey:tenantKey];
    if (responseStatus.isSuccess) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (NSMutableArray *) createSearchConditions:(NSArray *)jsonArray
{
    NSMutableArray *conditions = [NSMutableArray new];
    // searchConditionのJSONを紐解いていき、RKZSerachConditionを生成する
    for (NSDictionary *json in jsonArray) {
        [conditions addObject:[RKZSearchCondition initWithSearchConditionType:json[kTYPE] searchColumn:json[kNAME] searchValueArray:json[kVALUE]]];
    }
    return conditions;
}

- (NSMutableArray *) createSortConditions:(NSArray *)jsonArray
{
    NSMutableArray *conditions = [NSMutableArray new];
    // searchConditionのJSONを紐解いていき、RKZSerachConditionを生成する
    for (NSDictionary *json in jsonArray) {
        [conditions addObject:[RKZSortCondition initWithSortType:json[kTYPE] sortColumn:json[kNAME]]];
    }
    return conditions;
}

- (NSDictionary *) dictionaryFromRKZData:(RKZData *)data
{
    NSMutableDictionary *params = [NSMutableDictionary new];
    NSDictionary *props = [self getProperties:data];
    
    @try {
        for (id pName in [props keyEnumerator]) {
            // 変数を取得する
            id value = [data valueForKey:pName];
            id dataType = [props valueForKey:pName];

            // 出力用のキー値を作成
            // descriptionが予約語のため SDKにて "description_"として命名している。
            // description_は予約語回避のためにつけている暫定名称のため、descriptionに置換する
            id outPName = pName;
            if ([pName isEqualToString:@"description_"]) {
                outPName = @"description";
            }
            
            // 各出力時のタイプ事の擦り合わせを実施
            if(value != nil && ![value isEqual:[NSNull null]]) {
                if([dataType isEqualToString:@"NSNumber"]) {
                    [params setObject:value forKey:outPName];
                } else if([dataType isEqualToString:@"NSString"]) {
                    [params setObject:value forKey:outPName];
                } else if([dataType isEqualToString:@(@encode(BOOL))]) {
                    // BOOLタイプは intとして扱われるため、取得時からboolとして保持して出力する。
                    BOOL boolValue = [[data valueForKey:pName] boolValue];
                    [params setObject:[NSNumber numberWithBool:boolValue] forKey:outPName];
                } else if([dataType isEqualToString:@"NSDate"]) {
                    NSDateFormatter *outputDateFormatter = [[NSDateFormatter alloc] init];
                    NSString *outputDateFormatterStr = @"yyyy-MM-dd HH:mm:ss+0900";
                    [outputDateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
                    [outputDateFormatter setDateFormat:outputDateFormatterStr];
                    NSString *outputDateStr = [outputDateFormatter stringFromDate:value];
                    [params setObject:outputDateStr forKey:outPName];
                } else if([dataType isEqualToString:@"NSLocale"]) {
                    [params setObject:[self stringFromLocale:value] forKey:outPName];
                } else if([dataType isEqualToString:@"RKZSpotData"]) {
                    // TODO: 本当はRKZDataタイプか判定して処理を行いたい。(今は保留)
                    // RKZDataTypeは convertToDictionaryFromRKZData を再帰実行する。
                    [params setObject:[self dictionaryFromRKZData:value] forKey:outPName];
                } else if([dataType isEqualToString:@"RKZCouponData"]) {
                    // TODO: 本当はRKZDataタイプか判定して処理を行いたい。(今は保留)
                    // RKZDataTypeは convertToDictionaryFromRKZData を再帰実行する。
                    [params setObject:[self dictionaryFromRKZData:value] forKey:outPName];
                } else{
                    [params setObject:value forKey:outPName];
                }
            } else {
                [params setObject:[NSNull null] forKey:outPName];
            }
        }
        return params;
    }
    @catch (NSException *exception) {
        @throw [[RKZResponseStatus alloc] initWithAPIClassError:@"APIパラメータの作成処理にてエラーが発生しました。"];
        return nil;
    }
}

- (NSMutableArray *) arrayFromRKZData:(NSMutableArray *)datas
{
    NSMutableArray *_datas = [NSMutableArray new];
    for (RKZData *data in datas) {
        [_datas addObject:[self dictionaryFromRKZData:data]];
    }
    return _datas;
}

- (NSDictionary *) dictionaryFromResponseStatus:(RKZResponseStatus *)responseStatus
{
    NSNumber *code = [NSNumber numberWithInteger:responseStatus.statusCode];
    return @{@"status_code" : [code stringValue],
             @"message" : [NSString stringWithFormat:@"%@ : %@", responseStatus.message, responseStatus.detailMessage]};
}

- (NSDictionary *) getProperties:(RKZData *)data
{
    unsigned int outCount, i;
    objc_property_t *props = class_copyPropertyList([data class], &outCount);
    NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithCapacity:0];
    
    @try {
        for(i = 0; i < outCount; i++) {
            objc_property_t property = props[i];
            const char *propName = property_getName(property);
            if(propName) {
                const char *propType = getPropertyType(property);
                NSString *propertyName = [NSString stringWithCString:propName encoding:NSUTF8StringEncoding];
                NSString *propertyType = [NSString stringWithCString:propType encoding:NSUTF8StringEncoding];
                [dic setObject:propertyType forKey:propertyName];
            }
        }
        
        // 開放
        free(props);
        return dic;
    }
    @catch (NSException *exception) {
        
        // 開放
        free(props);
        return nil;
    }
}

static const char * getPropertyType(objc_property_t property) {
    const char *attributes = property_getAttributes(property);
    char buffer[1 + strlen(attributes)];
    strcpy(buffer, attributes);
    char *state = buffer, *attribute;
    
    /* while以下を以下に変更 */
    while ((attribute = strsep(&state, ",")) != NULL) {
        if (attribute[0] == 'T' && attribute[1] != '@') {
            
            NSString *name = [[NSString alloc] initWithBytes:attribute + 1 length:strlen(attribute) - 1 encoding:NSASCIIStringEncoding];
            return (const char *)[name cStringUsingEncoding:NSASCIIStringEncoding];
        }
        else if (attribute[0] == 'T' && attribute[1] == '@' && strlen(attribute) == 2) {
            // it's an ObjC id type:
            return "id";
        }
        else if (attribute[0] == 'T' && attribute[1] == '@') {
            // it's another ObjC object type:
            NSString *name = [[NSString alloc] initWithBytes:attribute + 3 length:strlen(attribute) - 4 encoding:NSASCIIStringEncoding];
            return (const char *)[name cStringUsingEncoding:NSASCIIStringEncoding];
        }
    }
    
    return "";
}


- (NSString *) stringFromLocale:(NSLocale *)locale
{
    NSString *language = [locale objectForKey:NSLocaleLanguageCode];
    if ([language isEqualToString:@"zh"]) {
        // 中国語の場合はScriptCodeから国を判別する
        // 国はNSLocaleCountryCodeで取得できるが、端末のLocaleから取得した場合"zh-Hans_US"のような想定しない
        NSString *scriptCode = [locale objectForKey:NSLocaleScriptCode];
        if ([scriptCode isEqualToString:@"Hant"]) {
            language = [language stringByAppendingString:@"-TW"];
        } else if ([scriptCode isEqualToString:@"Hans"]) {
            language = [language stringByAppendingString:@"-CN"];
        } else {
            // Hant or Hansがない場合は、国コードを頼りに結合する。
            // zhだけで投げても意味がない and Hantなどが入ってないがCN TWが入っている場合があるため。
            NSString *countryCode = [locale objectForKey:NSLocaleCountryCode];
            language = [NSString stringWithFormat:@"%@-%@",language, countryCode];
        }
    }
    return language;
}

- (NSLocale *) localeFromLanguageCd:(NSString *)languageCd
{
    NSDictionary *comp;
    NSArray *values = [languageCd componentsSeparatedByString:@"-"];
    NSString *language = [values objectAtIndex:0];
    
    if (values.count > 1) {
        // 「言語-国」で構成されたロケールの場合
        NSString *country = [values objectAtIndex:1];
        
        // 中国語：zhの場合は、ScriptCodeを特定して足す。
        if ([language isEqualToString:@"zh"]) {
            if ([country isEqualToString:@"CN"]) {
                comp = [[NSDictionary alloc] initWithObjectsAndKeys:language, NSLocaleLanguageCode, country, NSLocaleCountryCode, @"Hans", NSLocaleScriptCode, nil];
            } else {
                comp = [[NSDictionary alloc] initWithObjectsAndKeys:language, NSLocaleLanguageCode, country, NSLocaleCountryCode, @"Hant", NSLocaleScriptCode, nil];
            }
        } else {
            // 中国語以外で国が付いている場合は言語-国だけでLocaleを生成
            comp = [[NSDictionary alloc] initWithObjectsAndKeys:language, NSLocaleLanguageCode, country, NSLocaleCountryCode, nil];
        }
    } else {
        // 「言語-国」でロケール設定されていない場合
        // 言語コードのみでNSLocaleを生成する
        comp = [[NSDictionary alloc] initWithObjectsAndKeys:language, NSLocaleLanguageCode, nil];
    }
    // 言語情報からidentifierを生成
    NSString *identifier = [NSLocale localeIdentifierFromComponents:comp];
    // identifierからLocale生成
    return [[NSLocale alloc] initWithLocaleIdentifier:identifier];
}


@end