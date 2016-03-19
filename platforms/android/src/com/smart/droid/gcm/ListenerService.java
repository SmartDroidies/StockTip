package com.smart.droid.gcm;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.android.gms.gcm.GcmListenerService;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Set;

/**
 * Created by prasathbasuvaraj on 02/02/16.
 */
public class ListenerService extends GcmListenerService {

    private final String TAG = "ListenerService";

    @Override
    public void onMessageReceived(String from, Bundle data) {
        JSONObject jsonObject = new JSONObject();
        final Set<String> keys = data.keySet();
        for (String key : keys) {
            try {
                jsonObject.put(key, data.getString(key));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        Log.d(TAG, "Sending JSON:" + jsonObject.toString());
        sendNotification(jsonObject);
    }

    /**
     * Create and show a notification containing the received GCM message.
     *
     * @param message GCM message received.
     */
    private void sendNotification(JSONObject message) {
        Intent notificationIntent = new Intent(this, GCMActivity.class);
        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        notificationIntent.putExtra("extras",message.optString("extra").toString());

        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(getApplicationInfo().icon)
                .setContentTitle(message.optString("title"))
                .setContentText(message.optString("text"))
                .setAutoCancel(true)
                .setSound(defaultSoundUri)
                .setContentIntent(contentIntent);

        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
    }



}
