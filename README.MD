# APK build link: https://expo.dev/accounts/nimbas/projects/words-revise-app/builds


```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```