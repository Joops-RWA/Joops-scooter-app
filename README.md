# Joops R.W.A scooter app
This project contains the app built for the Joops R.W.A electric rental scooter project. 

https://www.joops.app

## Installation
### Android
### IOS
## Building manually
1. Download [Appcelerator Studio](http://appcelerator.com).
2. Create an [Appcelerator account](https://platform.axway.com/#/signup)
3. Log into the [Appcelerator Platform](https://platform.axway.com)
4. Go to Account (top right) `->` Billing `->` Adjust Plan and select the free plan.
5. Login via CLI with `appc login`.
6. Clone this repo.
7. Execute `npm run build` in the root of the project.
7. Continue with Android or iOS below.

### Android
1. Download and install [Android Studio](https://developer.android.com/studio).
2. Open the SDK manager and install Android 10.
3. Install an Android Virtual Device (AVD) with Android 10.
4. Boot the AVD.
5. Use `appc ti info` to find the ID of the AVD.
6. Build and install the app with `appc run -p android -T emulator --device-id <deviceId>` (looks like `Pixel_3_API_29`).
7. Building will take a minute depending on your machine.
8. Once building is completed the app should automatically be installed and started on your AVD.

### IOS
1. Boot the simulator.
2. Run `appc ti info` and look for the iOS simulator UUID (looks like `D002EE88-AAA-1111-BBB-068016363672`).
3. Build and install the app with `appc run -p ios -C <deviceId>`.
4. Building will take a minute depending on your machine.
5. Once building is completed the app should automatically be installed and started on your simulator.


## License

[MIT](LICENSE)
