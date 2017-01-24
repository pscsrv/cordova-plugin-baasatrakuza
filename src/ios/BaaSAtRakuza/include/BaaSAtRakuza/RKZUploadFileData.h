//
//  RKZUploadFileData.h
//  BaaSAtRakuza
//
//  Created by kyotu-mac-pc03 on 2015/07/03.
//  Copyright (c) 2015年 大野 斉正. All rights reserved.
//

#import <Foundation/Foundation.h>

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

///------------------------------
/// @name Properties
///------------------------------

///アップロードファイル
@property(nonatomic) NSData *upload_file;
///アップロードファイル名
@property(nonatomic) NSString *file_name;
///アップロードファイルのMIMEType名
@property(nonatomic) NSString *mime_type;


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
+ (id)initWithFile:(NSData *)uploadFile
          fileName:(NSString *)fileName
          mimeType:(NSString *)mimeType;

@end
