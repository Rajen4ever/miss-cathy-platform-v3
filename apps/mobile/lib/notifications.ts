import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { supabase } from "./supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function ensureNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();
  if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }
  const updated = await Notifications.requestPermissionsAsync();
  return updated.granted;
}

export async function scheduleLocalReminder(title: string, body: string, secondsFromNow = 5) {
  const granted = await ensureNotificationPermission();
  if (!granted) {
    throw new Error("Notification permission was not granted.");
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: { title, body, data: { source: "miss-cathy-local-reminder" } },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsFromNow
    }
  });

  return id;
}

export async function registerExpoPushToken(currentUserId?: string | null) {
  if (!Device.isDevice) {
    return null;
  }

  const granted = await ensureNotificationPermission();
  if (!granted) {
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId ??
    process.env.EXPO_PUBLIC_EAS_PROJECT_ID;

  if (!projectId) {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  if (supabase && currentUserId) {
    await supabase.from("device_push_tokens").upsert(
      {
        owner_user_id: currentUserId,
        platform: Device.osName ?? "android",
        expo_push_token: token,
        device_label: Device.deviceName ?? "Android device"
      },
      { onConflict: "expo_push_token" }
    );
  }

  return token;
}
