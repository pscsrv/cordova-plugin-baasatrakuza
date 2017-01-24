//
//  BeaconInfo.h
//  BaaSAtRakuza
//
//  Created by 松本清寛 on 2015/10/21.
//  Copyright © 2015年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>


/**
 ビーコン検知結果を管理するクラス
 
 以下のBeaconの受信結果を返却します。
 
 * BLUETUS
 * Beaconets

 */
@interface RKZBeaconInfo : NSObject

/// ビーコンのProfileタイプ定義
enum BeaconType {
    WLANConnection = 0,
    URL,
    Message,
    ID,
    FreeFormat,
    Unknown,
};

/// ビーコンID
@property(readonly, atomic, retain) NSString *beaconId;
/// RSSI値
@property(readonly, atomic, retain) NSNumber *RSSI;
/// ビーコンのProfileタイプ
@property(readonly, atomic) enum BeaconType type;


@end

/**
 ビーコンのWi-Fi接続情報を管理するクラス
 
 ビーコンのWi-Fi接続情報を取得する際に使用します。
 
 */
@interface RKZBeaconInfoWLANConnection : RKZBeaconInfo

/// SSID
@property(readonly, atomic, retain) NSString *SSID;
/// セキュリティキー
@property(readonly, atomic, retain) NSString *securityKey;
/// Wi-Fi接続後、最初に表示するページのURL
@property(readonly, atomic, retain) NSString *URL;

/**
 RKZBeaconInfoWLANConnectionのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI		RSSI
 @param SSID		SSID
 @param securityKey	セキュリティキー
 @param URL Wi-Fi接続後、最初に表示するページのURL
 @return RKZBeaconInfoWLANConnectionのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI SSID:(NSString *)SSID securityKey:(NSString *)securityKey URL:(NSString *)URL;

@end

/**
 ビーコンのURL情報を管理するクラス

 ビーコンのURL情報を取得する際に使用します。
 
 */
@interface RKZBeaconInfoURL : RKZBeaconInfo

/// Beacon端末が配信するURL情報
@property(readonly, atomic, retain) NSString *URL;

/**
 RKZBeaconInfoURLのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI 		RSSI
 @param URL 		Beacon端末が配信するURL
 @return RKZBeaconInfoURLのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI URL:(NSString *)URL;

@end

/**
 ビーコンのメッセージ情報を管理するクラス
 
 ビーコンのメッセージ情報を取得する際に使用します。
 
 */
@interface RKZBeaconInfoMessage : RKZBeaconInfo

/// タイトル
@property(readonly, atomic, retain) NSString *title;
/// 本文
@property(readonly, atomic, retain) NSString *body;

/**
 RKZBeaconInfoMessageのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI		RSSI
 @param title		タイトル
 @param body		本文
 @return RKZBeaconInfoMessageのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI Title:(NSString *)title Body:(NSString *)body;

@end

/**
 ビーコンの3階層のID情報を管理するクラス
 
 ビーコンの3階層のID情報を取得する際に使用します。
 
 */
@interface RKZBeaconInfoID : RKZBeaconInfo

/// 第1階層のID
@property (atomic, readonly, retain) NSString *identifier1;
/// 第2階層のID
@property (atomic, readonly, retain) NSString *identifier2;
/// 第3階層のID
@property (atomic, readonly, retain) NSString *identifier3;

/**
 RKZBeaconInfoIDのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI		RSSI
 @param identifier1	第1階層のID
 @param identifier2	第2階層のID
 @param identifier3	第3階層のID
 @return RKZBeaconInfoIDのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI Identifier1:(NSString *)identifier1 Identifier2:(NSString *)identifier2 Identifier3:(NSString *)identifier3;

@end

/**
 ビーコンのフリーフォーマットのバイト列情報を管理するクラス
 
 ビーコンのフリーフォーマットのバイト列情報を取得する際に使用します。
 
 */
@interface RKZBeaconInfoFreeFormat : RKZBeaconInfo

/// フリーフォーマットのバイト列情報
@property (atomic, readonly, retain) NSData *freeFormat;

/**
 RKZBeaconInfoFreeFormatのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI		RSSI
 @param freeFormat	フリーフォーマットのバイト列情報
 @return RKZBeaconInfoFreeFormatのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI FreeFormat:(NSData *)freeFormat;

@end


/**
 ライブラリバージョンでは対応していないプロファイル情報を管理するクラス
 
 */
@interface RKZBeaconInfoUnknown : RKZBeaconInfo

/**
 RKZBeaconInfoUnknownのインスタンスを生成します。
 
 @param beaconId	ビーコンID
 @param RSSI		RSSI
 @return RKZBeaconInfoUnknownのインスタンス
 
 */
- (instancetype) initWithBeaconId:(NSString *)beaconId RSSI:(NSNumber *)RSSI;

@end