//
//  RKZEditPasswordWebView.h
//  BaaSAtRakuza
//
//  Created by maehara on 2016/12/05.
//  Copyright (c) 2016 People Software Corp. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@class RKZUserData;

/**
 パスワード変更を行えるWebView
 
 - 指定イニシャライザ により初期化を行ってください
 
 @warning 指定イニシャライザに必要項目を設定していない場合、nilを返します
 */
@interface RKZEditPasswordWebView : WKWebView <WKNavigationDelegate>


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 
 @param userAccessToken      ユーザーアクセストークン
 
 @return 初期化したWebView<br/>
 ユーザーアクセストークン、現在のパスワード、新パスワード、最終更新日時が設定されていない場合、nilを返します
 */
- (nullable id)initWithPassword:(NSString *)userAccessToken;


///------------------------------
/// @name Instance Methods
///------------------------------

/**
 パスワード変更を行えるWebViewを開始する
 */
- (void)startWebView;

@end

NS_ASSUME_NONNULL_END