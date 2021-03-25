# Raindrop.io 5.0
Mono repo for Raindrop.io web app, browser extension and desktop app

## Build
Be sure to run `yarn` before calling any commands below
| target   | command | notes |
|----------|---------|-------|
| web      | `yarn build` |
| electron | `yarn build:electron` |
| chrome   | `yarn build:extension:chrome` |
| firefox  | `yarn build:extension:firefox` |
| opera    | `yarn build:extension:opera` |
| safari   | `yarn build:extension:safari` | Then open **build/xcode** project

## Development
| target   | command | notes |
|----------|---------|-------|
| web      | `yarn local` |
| chrome   | `yarn local:extension:chrome` | Turn off `same-site-by-default-cookies` in Chrome browser flags

## Supported browsers
- Chrome >= 67 - older versions not support SameSite cookie
- Safari >= 11 (OS X 10.11) - older version not support JS Rest in objects
- Firefox >= 55 - older version not support JS Rest in objects
- Edge >= 80 - earlies Blink version