
document.addEventListener('DOMContentLoaded', function() {

    let red, green, blue, hue, saturation, lightness; 
    const sliders = document.getElementsByClassName('slider');

    function rgbToHsl(r, g, b) {
        // Normalize R, G, B values to the range [0, 1]
        r /= 255; g /= 255; b /= 255;
      
        // Find the maximum and minimum values among R, G, B
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
      
        let h, s, l;
      
        // Calculate Lightness (L)
        l = (max + min) / 2;
      
        // If max and min are the same, the color is grayscale (saturation is 0)
        if (max === min) {
          h = 0; // Hue is 0 for grayscale
          s = 0; // Saturation is 0
        } else {
          const delta = max - min;
      
          // Calculate Saturation (S)
          s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      
          // Calculate Hue (H)
          switch (max) {
            case r:
              h = (g - b) / delta + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / delta + 2;
              break;
            case b:
              h = (r - g) / delta + 4;
              break;
          }
      
          // Convert Hue to degrees [0, 360]
          h /= 6;
        }
      
        // Convert S and L to percentages [0, 100]
        s = s * 100;
        l = l * 100;
        h = h * 360; // Convert h from [0, 1] to [0, 360]
      
        // Return HSL values as an array
        // Ensure hue is within [0, 360) range
        h = Math.round(h) % 360;
        if (h < 0) {
            h += 360;
        }
      
        // Round S and L to a reasonable number of decimal places if needed,
        // or keep as is for full precision. Rounding to 0 decimals for simplicity here.
        s = Math.round(s);
        l = Math.round(l);
      
      
        return [h, s, l];
      }


    function updateRangeTrack() {
        //console.log ("Halloooo .......");
        const value = this.value;
        const max = this.max;
        const percentage = (value / max) * 100;        
        const angmaks = this.nextElementSibling;

        angmaks.innerHTML = value;

        let warna;
        if (this.classList.contains('red')) {
            warna = `rgb(${value},${green},${blue})`;
            red = value;
        } else if (this.classList.contains('green')) {
            warna = `rgb(${red},${value},${blue})`;
            green = value;
        } else {
            warna = `rgb(${red},${green},${value})`;
            blue= value;
        }

        const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
        document.querySelector('.box.hue').value = hue;
        console.log(`Hue: ${hue}`);
        document.querySelector('.box.saturation').value = saturation;
        console.log(saturation);
        document.querySelector('.box.lightness').value = lightness;
        console.log(lightness);

    // Update the background gradient dynamically
        this.style.background = `linear-gradient(to right, var(--bulma-text-light) 0%,
                                 var(--bulma-text-light) ${percentage}%,
                                 transparent ${percentage}%, transparent 100%)`;

        document.querySelector('.box.hue').style.background = warna;
        document.querySelector('.box.saturation').style.background = warna;
        document.querySelector('.box.lightness').style.background = warna;
    };

    // Attach event listeners
    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        slider.addEventListener('input', updateRangeTrack);

        // Initialize the track on page load
        const inputEvent = new InputEvent('input', {
            bubbles: true,
            cancelable: true
          });
        
        slider.dispatchEvent(inputEvent);
        };

    
    
});