//
//  RKZUploadFileData.h
//  BaaSAtRakuza
//
//  Created by kyotu-mac-pc03 on 2015/07/03.
//  Copyright (c) 2015年 大野 斉正. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 楽座に登録するファイルデータを管理するクラス
 
 楽座のデータオブジェクトの項目にファイルデータ(画像・動画など)を登録する際に使用します。
 */
@interface RKZUploadFileData : NSObject


///------------------------------
/// @name Constants
///------------------------------

/**
アップロードファイルの MIMEType に指定する文字列です。<br/>
このタイプはPNG画像をアップロードする際に使用します。
*/
extern NSString *const RKZMimeTypeForUploadFileImagePNG;

/**
 アップロードファイルの MIMEType に指定する文字列です。<br/>
 このタイプはJPEG画像をアップロードする際に使用します。
 */
extern NSString *const RKZMimeTypeForUploadFileImageJPEG;

/**
 アップロードファイルの MIMEType に指定する文字列です。<br/>
 このタイプはGIF画像をアップロードする際に使用します。
 */
extern NSString *const RKZMimeTypeForUploadFileImageGIF;

/**
 アップロードファイルの MIMEType に指定する文字列です。<br/>
 このタイプはMP4動画をアップロードする際に使用します。
 */
extern NSString *const RKZMimeTypeForUploadFileMovieMP4;

/**
 アップロードファイルの MIMEType に指定する文字列です。<br/>
 このタイプはその他のバイナリファイルをアップロードする際に使用します。<br/>
 他の定数に一致するMIMEタイプがない場合はこの値を指定してください。
 */
extern NSString *const RKZMimeTypeForUploadFileBinary;

///------------------------------
/// @name Properties
///------------------------------

///アップロードファイル
@property(nonatomic, nullable) NSData *upload_file;
///アップロードファイル名
@property(nonatomic, nullable) NSString *file_name;
///アップロードファイルのMIMEType名
@property(nonatomic, nullable) NSString *mime_type;


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 @param uploadFile NSData アップロードファイル
 @param fileName NSString アップロードファイル名
 @param mimeType NSString アップロードファイルのMIMEType名
 @return id 初期化を行ったモデル情報
 */
+ (instancetype)initWithFile:(nullable NSData *)uploadFile
          fileName:(nullable NSString *)fileName
          mimeType:(nullable NSString *)mimeType __attribute__ ((deprecated("このメソッドの替わりに`-initWithFile:fileName:mimeType:`を使用してください")));

/**
 空を表すファイルを返します。
 
 ファイルを削除する場合は、このメソッドの戻り値を登録してください。
 
 @return 空を表すファイル
 */
+ (instancetype)empty;

/**
 指定イニシャライザ
 @param uploadFile NSData アップロードファイル
 @param fileName NSString アップロードファイル名
 @param mimeType NSString アップロードファイルのMIMEType名
 @return id 初期化を行ったモデル情報
 */
- (instancetype)initWithFile:(nullable NSData *)uploadFile
                    fileName:(nullable NSString *)fileName
                    mimeType:(nullable NSString *)mimeType
NS_SWIFT_NAME(init(_:fileName:mimeType:));

@end

NS_ASSUME_NONNULL_END
