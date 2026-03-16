# Image Aspect Ratio Calculator

Calculate the aspect ratio of an image and compute new dimensions that preserve it, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/image-tools/image-aspect-ratio

## How It Works

The tool computes the aspect ratio using the Euclidean GCD (greatest common divisor) algorithm on the image width and height, reducing them to their simplest integer ratio (e.g., 1920x1080 becomes 16:9). When an image file is dropped, its natural dimensions are auto-detected via an `Image` object. The bidirectional new-dimensions calculator lets the user enter a new width to get the proportional height, or a new height to get the proportional width, by dividing by the ratio and multiplying by the other component.

## Features

- Reduce any width/height pair to its simplest aspect ratio using Euclidean GCD
- Auto-detect dimensions from a dropped image file
- Bidirectional dimension calculator: enter width to get height or vice versa
- Displays ratio as both fractional (16:9) and decimal (1.778) forms

## Browser APIs Used

- FileReader API / Image object for dimension detection
- Drag-and-drop API

## Code Structure

| File | Description |
|------|-------------|
| `image-aspect-ratio.js` | IIFE — Euclidean GCD, image dimension detection, bidirectional scaling calculator |

## Usage

| Element ID | Purpose |
|------------|---------|
| `dropZone` | Drag-and-drop target to auto-detect image dimensions |
| `fileInput` | File picker for image dimension detection |
| `widthInput` | Manual width entry |
| `heightInput` | Manual height entry |
| `ratioDisplay` | Computed simplified aspect ratio (e.g., 16:9) |
| `newWidth` | Enter desired new width to calculate height |
| `newHeight` | Enter desired new height to calculate width |

## License

MIT
