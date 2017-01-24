//
//  RakuzaBeaconReceiver.h
//  RakuzaBeaconReceiver
//
//  Created by psc shunsuke ikumi on 2014/09/05.
//  Copyright (c) 2014年 People Software Corp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>

#import "RKZBeaconInfo.h"

@protocol RKZBeaconReceiverDelegate;

/**
 BLUETUS によりBeaconの電波受信を行うためのクラス
 
 使用する際は RKZBeaconReceiverDelegate プロトコルを採用してください
 
 バックグラウンドでの受信を行いたい場合は、Xcode プロジェクトに *Background Modes* を指定してください。
 
 @warning **バックグラウンド動作の注意点** <br/>
 RKZBeaconReceiver を利用したアプリケーションから他のアプリケーションに切り替えた時およびディスプレイの電源をOFFにしているときなど、アプリケーションがバックグラウンドにある際は Beacon の受信間隔が広くなります。<br/>
 
 これは CoreBluetooth の省電力化の方針によるもので、バックグラウンドにいる際は Beacon 受信のために使用できる BLEハードウェアの利用時間が縮められてしまうからです。
 また、ディスプレイの電源を OFF にしている間は、基本的に Beacon 受信通知は１つのBeaconにつき１回までになることに注意してください。
 */
@interface RKZBeaconReceiver : NSObject

///------------------------------
/// @name Properties
///------------------------------

///RKZBeaconReceiverDelegate
@property (nonatomic, assign) id<RKZBeaconReceiverDelegate> delegate;


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 
 指定されたdelegate先でRKZBeaconReceiverを初期化します。
 
 @param delegate デリゲート
 */
- (instancetype)initWithDelegate:(id<RKZBeaconReceiverDelegate>)delegate;


///------------------------------
/// @name Instance Methods
///------------------------------

/**
 Beacon探索を開始します
 
 Beacon探索を開始します。端末利用者によってBluetooth機能がOFFにされ、再びONにされた後などは必要に応じて当メソッドを再呼び出ししてください。
 
 @warning 当メソッドは [RKZBeaconReceiverDelegate didFinishReadyForSearchBeacons] が呼ばれたあとに実行してください。<br/>
 上記手順を守らなかった場合、iOS8では探索が正しく開始されなかったり、iOS7以下では"CoreBluetooth[API MISUSE]"から始まる警告文が表示される原因となります。
 */
- (void)searchStart;

///Beacon探索を停止します
- (void)searchStop;

/**
 iOS Simulator用の仮想配信情報の登録
 
 シミュレータモード時での受信通知に使用される、仮想の Beacon 配信情報を登録します。 このメソッドは iOS Simulator 上で動作している時のみ有効です。
 
 1. **シミュレータモード**について <br/>
 iOS Simulator 向けに Beacon アプリケーションをビルドした場合、本ライブラリは自動的にシミュレータモードとして動作します。<br/>
 このモードで動作中、RKZBeaconReceiver オブジェクトは、仮想的に CentralManager が生成されているように振る舞い、あたかも周囲に Beacon が存在するかのように仮想の受信結果を通知するようになります。
 
 2. **シミュレータモード時の動作仕様**について<br/>
 シミュレータモード動作中では、iOS 実機での CentralManager の振る舞いや Beacon の受信を以下のようにして模倣します。
 
 - init 系メソッドによって RKZBeaconReceiver を初期化した際、500msec 後に beaconReceiverCentralManagerDidUpdateState:を CBCentralManagerStatePoweredOn で通知します。なお、状態変化通知はこれ以外のタイミングでは行われません。
 - registerVirtualBeaconData: で仮想の配信情報リストが登録され、searchStart によって探索が開始された場合、仮想の配信情報リストから 1 つの配信情報をランダムに選択し、 didDiscoverBeacon:RSSI:Time:で通知します。通知は 100~1000msec のランダム間隔で繰り返されます。また、RSSI は-30~-100 のランダム値、Time は現在時刻を取ります
 
 3. **仮想配信情報の登録方法**
 
 // 仮想配信情報の登録例
 RKZBeaconReceiver *rkzBeaconReceiver = [[RKZBeaconReceiver alloc] initWithDelegate:self];
 // ---> 500msec 後に CBCentralManagerStatePoweredOn を通知します。
 
 NSDictionary *beacon1 = @{@"keyForID":@"DB000001"};
 NSDictionary *beacon2 = @{@"keyForID":@"DB000002"};
 NSArray *virtualBeaconData = @[beacon1, beacon2];
 
 [rkzBeaconReceiver registerVirtualBeaconData:virtualBeaconData];
 // ---> CBCentralManagerStatePoweredOn通知後にsearchStartを呼び出すと通知が開始されます。
 
 @param beaconData 連想配列で定義された仮想の Beacon 配信情報を まとめたリストです。
 @warning 当メソッドをiOS実機で動かした場合、何も処理を行わない空メソッドとして動作します。
 */
- (void) registerVirtualBeaconData:(NSArray*)beaconData;


@end

/**
 RKZBeaconReceiver 用のdelegate
 
 Beaconの検知やBluetoothの状態の変化などのイベントを受け取ると、イニシャライザで指定されたオブジェクトに対し、当プロトコルで宣言されている delegate メソッドの呼び出しを行います。
 */
@protocol RKZBeaconReceiverDelegate <NSObject>

///------------------------------
/// @name Instance Methods
///------------------------------

///Beacon探索準備完了後に呼ばれます
@required
- (void)didFinishReadyForSearchBeacons;

/**
 Beacon検知時に呼ばれます
 
 [RKZBeaconReceiver searchStart] により探索状態となっている RKZBeaconReceiver がBeaconを検知した際、その受信結果を通知する delegate メソッドです。
 
 @param beaconId     検知したBeaconId
 @param RSSI         受信電波強度(dBm)
 @param receivedTime 検知日時
 
 @warning この delegate メソッド呼び出しはメインスレッドで実行されることが保証されています。
 RSSI はCoreBluetooth から通知された値を利用しています。この値は通常の環境ではおおよそ 「-100 〜 -30」の範囲を取りますが、**稀に 127 のような不正値が通知されることがあります。**
 
 @deprecated このメソッドは非推奨です。-didDiscoverBeaconInfoメソッドを使用してください。
 */
@optional
- (void)didDiscoverBeacon:(NSString *)beaconId
                     RSSI:(NSNumber *)RSSI
                     Time:(NSDate *)receivedTime;
@optional
- (void)didDiscoverBeacon:(NSString *)beaconId
                     rssi:(NSNumber *)RSSI
                     time:(NSDate *)receivedTime;


/**
 Beacon検知時に呼ばれます。
 
 @param beaconInfo 検知したBeacon情報
 
 */
@optional
- (void)didDiscoverBeaconInfo:(RKZBeaconInfo *)beaconInfo;



/**
 CoreBluetoothフレームワークのCBCentralManagerクラスのステートが変化したときに呼ばれます
 
 CBCentralManagerStatePoweredOn 時に didFinishReadyForSearchBeacons を呼びます。
 
 @param state CBCentralManagerStateオブジェクト
 
 @see `CBCentralManagerState
 */
@required
- (void)beaconReceiverCentralManagerDidUpdateState:(CBCentralManagerState)state;

@end