# APK build link: https://expo.dev/accounts/nimbas/projects/words-revise-app/builds

Firebase rules when common records for all users where 1 is admin:

{
  "rules": {
    ".read": true,
    ".write": "auth.uid === 'ADMIN_USER_ID'"
  }
}
