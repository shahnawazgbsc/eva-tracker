package com.evatracker.location;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.support.v4.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;


/**
 * Anus Kaleem
 */

public class LocationModule extends ReactContextBaseJavaModule
{
    private static final String CHANNEL_ID = "EvaService_Channel";
    private FusedLocationProviderClient mFusedLocationClient;
    private Context context;
    LocationModule(ReactApplicationContext reactContext) {
      super(reactContext);
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext);
      context = reactContext;
      if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID,"evatracker", NotificationManager.IMPORTANCE_DEFAULT);
        NotificationManager manager = reactContext.getSystemService(NotificationManager.class);
        manager.createNotificationChannel(channel);
      }
    }

  @Override
public String getName() {
  return "LocationModule";
}
  @ReactMethod
  public void startService(Promise promise) {
    WritableMap result = Arguments.createMap();
    result.putString("status", "success");
    try {
      Intent serviceIntent = new Intent(getReactApplicationContext(), LocationTrackerService.class);
      getReactApplicationContext().startService(serviceIntent);
      promise.resolve(result);
    } catch (Exception e) {
      e.printStackTrace();
      promise.reject("rrrrr",e);
      return;
    }
  }
  @ReactMethod
  public void stopService(Promise promise) {
    String result = "Success";
    try {
      Intent serviceIntent = new Intent(getReactApplicationContext(), LocationTrackerService.class);
      getReactApplicationContext().stopService(serviceIntent);
    } catch (Exception e) {
      promise.reject(e);
      return;
    }
    promise.resolve(result);
  }
  @ReactMethod
  public void getLocation(final Promise promise) {
    final WritableMap res = Arguments.createMap();
    try {
      int permissionCheck = ContextCompat.checkSelfPermission(this.getReactApplicationContext(),
        android.Manifest.permission.ACCESS_FINE_LOCATION);
      if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
          mFusedLocationClient.getLastLocation()
                  .addOnSuccessListener(new OnSuccessListener<Location>() {
                      @Override
                      public void onSuccess(Location location) {
                          if (location != null) {
                              res.putDouble("latitude", location.getLatitude());
                              res.putDouble("longitude", location.getLongitude());
                              promise.resolve(res);
                          }
                      }
                  });
      }
    } catch (Exception e) {
        e.printStackTrace();
      promise.reject(e);
    }
  }
}
