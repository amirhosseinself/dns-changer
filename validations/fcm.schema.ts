import { z } from "zod";

// Schema برای ثبت FCM token
export const fcmRegisterSchema = z.object({
  deviceId: z.string().optional(),
  fcmToken: z.string().nonempty("FCM token is required"),
  platform: z.enum(["android", "ios", "web"], {
    errorMap: () => ({ message: "Platform must be 'android', 'ios' or 'web'" }),
  }),
});
