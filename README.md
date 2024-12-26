# Intermittent Deep Link Event Listener Failure on Android using Expo Linking API

This repository demonstrates an intermittent bug encountered when using Expo's Linking API to handle deep links on Android.  After the app is opened from a deep link, subsequent attempts to open the same deep link may fail to trigger the `Linking.addEventListener` listener.  The issue is inconsistent and difficult to reproduce reliably.

## Problem Description

The `Linking.addEventListener` function, used to listen for incoming URLs, does not always fire on subsequent attempts to open the same deep link after the app has already been launched from that link.  This behavior is specific to Android and is not observed consistently across all tests.

## Steps to Reproduce

While exact steps are not consistently reproducible, the issue seems more prevalent after backgrounding or killing the app.

1. Install and run the application.
2. Open a deep link.  The app should open correctly and log the deep link in the console.
3. Immediately open the same deep link again. The listener *may or may not* fire. This is the intermittent behavior.
4. Repeat step 3 multiple times; the success rate of the listener firing appears to fluctuate.

## Potential Causes

The root cause is likely within Expo's Linking implementation on Android.  Possible causes include:

* **Internal State Management:** Expo's Linking might not correctly reset or manage its internal state after handling a deep link. 
* **Race Conditions:** A race condition could exist between the deep link processing and the event listener registration.
* **Android OS Behavior:** It's possible this relates to specific Android OS behavior related to handling intents after the application has already launched.

## Solution (Workaround)

The provided solution employs a workaround involving a timeout to enhance reliability. This is not a perfect fix, but a strategy to mitigate the problem.  Further investigation is required to determine the root cause within Expo's implementation.