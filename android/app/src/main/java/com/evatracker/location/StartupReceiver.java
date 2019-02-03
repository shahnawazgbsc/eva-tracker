package com.evatracker.location;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

/**
 * Anus Kaleem
 */

public class StartupReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        Intent backgroundServiceIntent = new Intent(context, LocationTrackerService.class);
        context.startService(backgroundServiceIntent);
      }
  }
}
