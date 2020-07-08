const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BLlt4SXu86SMTtrT4Jq0Di2zPDAct7AcpKjkr6qSQsdzRneYwFAsjfuDOvgxVTbY-s-0B7whrXRweAPhM9xRtEI",
  privateKey: "C-A-8nU3-c7vbfz0leKuiSXmr6gxcDcKC5FHgqK1_AE",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/e_FhadjbDPo:APA91bEks1hgHrxHUEJFnufo6zVswyj3B7jA3BQpmpunQF2LIi_PbfdEi8rIjqixyW8zvc7WNFyODzUouceDzhsmZtI0rEaEn2yjZv4D8dSfUhb6ep7nywwP-zizs2QNOD5aDn9ksiP5",
  keys: {
    p256dh:
      "BMQ9R6xW7JtMa/4NCdM28VQ2D5kYBW0O4ZBSzMDvaGtjDMftRX7U/D0z/5x69pv9C3vdl6UonScVWif+pM3A0oQ=",
    auth: "2Sdg06QNPfIVo9msjxnisw==",
  },
};
let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

const options = {
  gcmAPIKey: "320817513884",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
