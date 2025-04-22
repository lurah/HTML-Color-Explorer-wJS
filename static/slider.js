
document.addEventListener('DOMContentLoaded', function() {

    let red, green, blue, hue, saturation, lightness; 
    
    function hslToRgb(h, s, l) {
        // Normalize H, S, L values to the range [0, 1]
        // Hue is normalized from [0, 360] to [0, 1]
        // Saturation and Lightness are normalized from [0, 100] to [0, 1]
        h /= 360; s /= 100; l /= 100;
      
        let r, g, b;
        // If saturation is 0, the color is grayscale (R, G, B are all equal to L)
        if (s === 0) {
          r = g = b = l; // R, G, B are equal to L
        } else {
          // Calculate intermediate values for conversion
          const chroma = (1 - Math.abs(2 * l - 1)) * s;
          const hueSegment = h * 6;
          const x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
          const lightnessAdjustment = l - chroma / 2;
      
          // Determine the RGB values based on the hue segment
          if (hueSegment >= 0 && hueSegment < 1) {
            [r, g, b] = [chroma, x, 0];
          } else if (hueSegment >= 1 && hueSegment < 2) {
            [r, g, b] = [x, chroma, 0];
          } else if (hueSegment >= 2 && hueSegment < 3) {
            [r, g, b] = [0, chroma, x];
          } else if (hueSegment >= 3 && hueSegment < 4) {
            [r, g, b] = [0, x, chroma];
          } else if (hueSegment >= 4 && hueSegment < 5) {
            [r, g, b] = [x, 0, chroma];
          } else if (hueSegment >= 5 && hueSegment < 6) {
            [r, g, b] = [chroma, 0, x];
          }
      
          // Add the lightness adjustment and scale R, G, B to the range [0, 255]
          r = (r + lightnessAdjustment) * 255;
          g = (g + lightnessAdjustment) * 255;
          b = (b + lightnessAdjustment) * 255;
        }
      
        // Round R, G, B values to the nearest integer
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
      
        // Return RGB values as an array
        return [r, g, b];
    }

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
    
    function gradBackground(persen) {
        const bgValue = `linear-gradient(to right,
                         var(--bulma-text-light) 0%, var(--bulma-text-light) ${persen}%,
                         transparent ${persen}%, transparent 100%)`;
        return bgValue;
    }

    function updateOther(inValue, inPrm, inColor) {
        
        const otherEl = document.querySelector(`.slider.${inPrm}`);
        let percentage;
        
        if (inPrm === 'hue') {
            hue = inValue;
            percentage = (inValue / 360) * 100;
            otherEl.nextElementSibling.innerHTML = `${inValue} deg`;}
        else if (inPrm === 'saturation') {
            saturation = inValue;
            percentage = inValue;
            otherEl.nextElementSibling.innerHTML = `${inValue}%`;}
        else if (inPrm === 'lightness') {
            lightness = inValue;
            percentage = inValue;
            otherEl.nextElementSibling.innerHTML = `${inValue}%`;}
        else {
            percentage = (inValue / 255) * 100;
            otherEl.nextElementSibling.innerHTML = 
                `Dec: ${inValue}, Hex: ${parseInt(inValue).toString(16).toUpperCase()}`;}
        
        otherEl.value = inValue;
        otherEl.style.background = gradBackground(percentage);

        const hslBox = document.querySelectorAll('.box.hue, .box.saturation, .box.lightness');
        hslBox.forEach (hslbox => {hslbox.style.background = inColor;})
    }

    function updateHSL(elm) {
        
        const value = elm.value;
        // Update the background gradient dynamically
        let percentage = (value / elm.max) * 100;
        elm.style.background = gradBackground(percentage);

        let nextEl = elm.nextElementSibling;
        
        let hslnya;
        if (elm.classList.contains('hue')) {
            hue = value;
            hslnya = `hsl(${value},${saturation}%,${lightness}%)`;
            nextEl.innerHTML = `${value} deg`;}
        else if (elm.classList.contains('saturation')) {
            saturation = value;
            hslnya = `hsl(${hue},${value}%,${lightness}%)`;
            nextEl.innerHTML = `${value}%`;}
        else {
            lightness = value;
            hslnya = `hsl(${hue},${saturation}%,${value}%)`;
            nextEl.innerHTML = `${value}%`;}

        const rgb = hslToRgb(hue, saturation, lightness);
        updateOther(rgb[0], 'red', hslnya);
        updateOther(rgb[1], 'green', hslnya);
        updateOther(rgb[2], 'blue', hslnya);        
    }

    function updateRGB(elm) {
        
        const value = elm.value;
        // Update the background gradient dynamically
        let percentage = (value / elm.max) * 100;
        elm.style.background = gradBackground(percentage);

        let nextEl = elm.nextElementSibling;        
        nextEl.innerHTML = `Dec: ${value}, Hex: ${parseInt(value).toString(16).toUpperCase()}`;

        let warna;
        if (elm.classList.contains('red')) {
            red = value;
            warna = `rgb(${value},${green},${blue})`;}
        else if (elm.classList.contains('green')) {
            green = value;
            warna = `rgb(${red},${value},${blue})`;}
        else {
            blue= value;
            warna = `rgb(${red},${green},${value})`;} 
        
        const hsl = rgbToHsl(red, green, blue);
        updateOther(hsl[0], 'hue', warna);
        updateOther(hsl[1], 'saturation', warna);
        updateOther(hsl[2], 'lightness', warna);        
    }

    function updateRangeTrack() {
        if (this.matches('.red, .green, .blue')) {updateRGB(this);} 
        else {updateHSL(this);}
    }

    // Attach event listeners
    const sliders = document.getElementsByClassName('slider');
    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        slider.addEventListener('input', updateRangeTrack);
    }

    // Initialize the track on page load
    const inputEvent = new InputEvent('input', {bubbles: true, cancelable: true});
    const mulai = document.querySelectorAll('.slider.red, .slider.blue, .slider.green');
    mulai.forEach (element => {element.dispatchEvent(inputEvent);})
    
})
