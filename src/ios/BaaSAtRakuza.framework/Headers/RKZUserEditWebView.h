 //
//  UserEditWebView.h
//  BaaSAtRakuza
//
//  Created by 大野 斉正 on 2015/03/19.
//  Copyright (c) 2015年 People Software Corp. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@class RKZUserData;

/**
 ユーザー編集を行えるWebView
 
 - 指定イニシャライザ initWithURL:userData: により初期化を行ってください
 
 @warning 指定イニシャライザに必要項目を設定していない場合、nilを返します
 */
@interface RKZUserEditWebView : WKWebView <WKNavigationDelegate>


///------------------------------
/// @name Initialization
///------------------------------

/**
 指定イニシャライザ
 
 @param userData      ユーザー情報
 
 @return 初期化したWebView<br/>
 ユーザー情報が設定されていない場合、nilを返します
 */
- (id)initWithUserData:(RKZUserData *)userData;


///------------------------------
/// @name Instance Methods
///------------------------------

/**
 ユーザー編集を行えるWebViewを開始する
 */
- (void)startWebView;

@end
