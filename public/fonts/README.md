# Fonts

Nexa is a commercial typeface and is not redistributed with this repo.
Drop these files here and the local font loader in `src/app/fonts.js` picks them up:

- `NexaRegular.woff2`
- `NexaLight.woff2`
- `NexaBold.woff2`     (optional — used for the heaviest wordmark weight)

Until they are present, `src/app/fonts.js` falls back to a system sans stack
so the build still succeeds. Manrope loads from Google Fonts automatically.
