
// Loads the tick audio sound in to an audio object.
let audio = new Audio('tick.mp3');

// This function is called when the sound is to be played.
function playSound() {
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

export const initalWheelData = (initalData, alertPrize) => {
   
    return new window.Winwheel({
        'numSegments': initalData.length,                 // Specify number of segments.
        'outerRadius': 212,               // Set outer radius so wheel fits inside the background.    
        'innerRadius': 30,         // Make wheel hollow so segments don't go all way to center.
        'textFontSize': 24,         // Set default font size for the segments.
        // 'textOrientation': 'vertical', // Make text vertial so goes down from the outside of wheel.
        'lineWidth': 7, // Width of lines around segments.
        'strokeStyle': 'white',      // Segment line colour. Again segment lines only drawn if this is specified.
        'drawText': true,              // Code drawn text can be used with segment images.

        'textMargin': 50,
        'textFontFamily': 'monospace',
        'textFontWeight': 'bold',       // Font weight.
        'textOrientation': 'curved', // Either horizontal, vertical, or curved.
        'textAlignment': 'center',     // Either center, inner, or outer.
        'textDirection': 'normal',     // Either normal or reversed. In normal mode for horizontal text in segment at 3 o'clock is correct way up, in reversed text at 9 o'clock segment is correct way up.
        'textStrokeStyle': 'black',
        'textLineWidth': 3,
        'textFillStyle': 'white',
        // 'responsive': true,

        // 'imageOverlay': true,
        'drawMode': 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
        'wheelImage': null,         // Must be set to image data in order to use image to draw the wheel - drawMode must also be 'image'.
        'imageDirection': 'N',          // Used when drawMode is segmentImage. Default is north, can also be (E)ast, (S)outh, (W)est.
        'segments': initalData,                  // Define segments including image and text.
        'animation':           // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 10,    // Duration in seconds.
            'spins': 6,     // Default number of complete spins.
            'callbackFinished': alertPrize,
            'callbackSound': playSound,   // Function to call when the tick sound is to be triggered.
            'soundTrigger': 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
        },
        'pins':				// Turn pins on.
        {
            'number': initalData.length,
            'fillStyle': 'silver',
            'outerRadius': 4,
        }
    });
}