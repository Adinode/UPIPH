# Universal Picture in Picture Hijacker (UPIPH)

**Developer:** Alticrux

A lightweight, zero-dependency Chrome extension that forces any web video into native Picture-in-Picture mode on demand.

## The Shortcut

* **Alt + P:** Toggles Picture-in-Picture mode. If a video is playing on the page, pressing the shortcut pulls it into a floating window over your screen. If a video is already floating, pressing the shortcut sends it straight back to the webpage.

## Why It Works

Modern media platforms build custom video players to lock you into their interface. They disable right-click menus and add custom attributes to prevent you from using standard browser features. 

UPIPH bypasses their entire interface:
* **Shadow DOM Traversal:** Digs through nested Web Components and Shadow DOM boundaries to find hidden video elements.
* **Target Detection:** Ignores background video loops and tracking pixels. It calculates on-screen dimensions to isolate the primary playing stream.
* **Defense Stripping:** Removes the `disablePictureInPicture` property directly before triggering the native Chrome PiP engine.
* **Zero Background Overhead:** Runs strictly on keypress. It stays completely inactive until you press the shortcut.

## Supported Platforms

Works on standard HTML5 players across the web, including:
* YouTube
* Instagram
* Reddit
* LinkedIn
* News and streaming platforms hosting standard video elements

## Tech Stack

* Vanilla JavaScript (ES6+)
* Chrome Extensions Manifest V3

## Installation

1. Clone or download this repository to a folder on your computer.
2. Confirm `manifest.json`, `content.js`, and `logo.png` are present in that single folder.
3. Open Google Chrome and type `chrome://extensions/` in the address bar.
4. Turn on the **Developer mode** toggle in the top-right corner.
5. Click the **Load unpacked** button in the top-left corner.
6. Select your extension folder.

Open any video, hit play, and press **Alt + P**.
