# QR Master Creator

Build a modern, single-page mobile web app called "QR Master" with two tab sections: "Create" and "Scan".

Design & Aesthetics:

- Use a sleek dark-mode design with smooth card layouts, vibrant accent buttons, and rounded corners.

Tab 1: Create QR Code

- Include an input box for text or URLs.

- Provide color pickers for foreground/background colors and a dropdown to pick dot styles.

- Display a live preview of the QR code using the 'qr-code-styling' library.

- Include a primary button labeled "Download High-Res PNG".

- CELEBRATION FEATURE: When the user clicks "Download High-Res PNG" for the first time, trigger a canvas confetti explosion using 'canvas-confetti' and display a popup modal with a large thumbs-up emoji (👍) reading "First Code Created!".

Tab 2: Scan QR Code

- Access the device camera feed using the browser's HTML5 camera API.

- Render a semi-transparent square targeting box in the middle of the camera view.

- When a QR code is detected, show the result inside a clean modal with buttons to "Copy Text" or "Open Link".

- CELEBRATION FEATURE: When a QR code is successfully scanned for the first time, trigger the canvas confetti animation and show a thumbs-up popup modal reading "First Scan Completed!".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/27eff8a2-c68c-4dff-8e2b-e98c3bf79ff6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
