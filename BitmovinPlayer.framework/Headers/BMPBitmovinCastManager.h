//
// Bitmovin Player iOS SDK
// Copyright (C) 2017, Bitmovin GmbH, All Rights Reserved
//
// This source code and its use and distribution, is subject to the terms
// and conditions of the applicable license agreement.
//

#import <Foundation/Foundation.h>
#import <BitmovinPlayer/BMPBitmovinCastManagerListener.h>

@protocol GCKSessionManagerListener;
@class GCKMediaInformation;
@class GCKMediaStatus;
@class GCKMediaMetadata;
@class GCKDevice;

NS_ASSUME_NONNULL_BEGIN

/**
 * Singleton providing access to GoogleCast related features. The BMPBitmovinCastManager needs to be initialized by calling
 * BMPBitmovinCastManager#initializeCasting in the AppDelegate of the application which should support casting.
 */
NS_SWIFT_NAME(BitmovinCastManager)
@interface BMPBitmovinCastManager : NSObject
@property (nonatomic, readonly, getter=isConnected) BOOL connected;
@property (nonatomic, readonly, getter=isConnecting) BOOL connecting;
@property (nonatomic, readonly, getter=isCastAvailable) BOOL castAvailable;
@property (nonatomic, readonly, nullable) GCKMediaStatus *currentMediaStatus;
@property (nonatomic, readonly, nullable) GCKMediaMetadata *currentMediaMetadata;
@property (nonatomic, readonly, nullable) GCKDevice *currentDevice;
@property (nonatomic, readonly, getter=isPlaying) BOOL playing;
@property (nonatomic, readonly, getter=isPaused) BOOL paused;
@property (nonatomic, readonly, getter=isMuted) BOOL muted;
@property (nonatomic, readonly, getter=isStalled) BOOL stalled;
@property (nonatomic, readonly) NSTimeInterval currentTime;
@property (nonatomic, readonly) NSTimeInterval duration;

+ (instancetype)sharedInstance;
+ (BOOL)isInitialized;
+ (void)initializeCasting;

- (void)prepareWithMediaInformation:(GCKMediaInformation *)mediaInformation;
- (void)loadMedia;
- (void)loadMedia:(BOOL)autoplay;
- (void)loadMedia:(BOOL)autoplay position:(NSTimeInterval)position;
- (void)unload;
- (void)showDialog;
- (void)addListener:(id<BMPBitmovinCastManagerListener>)listener;
- (void)removeListener:(id<BMPBitmovinCastManagerListener>)listener;
- (void)play;
- (void)pause;
- (void)seek:(NSTimeInterval)time;
@end

NS_ASSUME_NONNULL_END