package com.evatracker.location;

import android.Manifest;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;

/**
 * Anus Kaleem
 */

public class LocationTrackerService extends Service implements LocationListener {

  int IntervalMinutes;
  int MinimumDistance;
  private LocationManager locationManager;
  boolean isLocationUpdatesRequested;

  @Override
  public void onCreate() {
    super.onCreate();
    locationManager = (LocationManager) getApplicationContext()
      .getSystemService(Context.LOCATION_SERVICE);
    isLocationUpdatesRequested=false;
  }


  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    if (ActivityCompat.checkSelfPermission(this,
      Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
      ActivityCompat.checkSelfPermission(this,
        Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
      requestLocationUpdates();
    }
    return Service.START_STICKY;
  }






  @Override
  public void onDestroy() {
    super.onDestroy();
    startService(new Intent(getApplicationContext(), LocationTrackerService.class));
  }
  private void requestLocationUpdates(){
    if (ActivityCompat.checkSelfPermission(this,
      Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
      ActivityCompat.checkSelfPermission(this,
        Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
      isLocationUpdatesRequested = false;
      return;
    }
    if (!isLocationUpdatesRequested) {
      if (locationManager.getAllProviders().contains(LocationManager.GPS_PROVIDER)){
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
          IntervalMinutes * 60 * 1000, MinimumDistance, this);
        isLocationUpdatesRequested = true;
      }
    }

  }

  @Override
  public void onLocationChanged(Location location) {

  }

  @Override
  public void onStatusChanged(String provider, int status, Bundle extras) {

  }

  @Override
  public void onProviderEnabled(String provider) {

  }

  @Override
  public void onProviderDisabled(String provider) {

  }
}

