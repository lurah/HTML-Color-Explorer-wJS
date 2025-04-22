
document.addEventListener('DOMContentLoaded', function() {

    let red, green, blue, hue, saturation, lightness; 
    
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
                
        let percentage;
        
        if (inPrm === 'hue') {
            percentage = (inValue / 360) * 100;
        } else if (inPrm === 'saturation' || inPrm === 'lightness') {
            percentage = (inValue / 100) * 100;
        } else {
            percentage = (inValue / 255) * 100;            
        }

        otherEl = document.querySelector(`.slider.${inPrm}`);
        otherEl.value = inValue;
        otherEl.nextElementSibling.innerHTML = inValue;
        otherEl.style.background = gradBackground(percentage);

        const hslBox = document.querySelectorAll('.box.hue, .box.saturation, .box.lightness');
        hslBox.forEach (hslbox => {hslbox.style.background = inColor;})
        //otherEl.parentElement.parentElement.style.background = inColor;
    }

    function updateHSL(elm) {
        
        const value = elm.value;
        // Update the background gradient dynamically
        let percentage = (value / elm.max) * 100;
        elm.style.background = gradBackground(percentage);

        let nextEl = elm.nextElementSibling;
        nextEl.innerHTML = value;

        let hslnya;
        if (elm.classList.contains('hue')) {
            hslnya = `hsl(${value},${saturation},${lightness})`;
            hue = value;
        } else if (elm.classList.contains('saturation')) {
            hslnya = `hsl(${hue},${value},${lightness})`;
            saturation = value;
        } else {
            hslnya = `hsl(${hue},${saturation},${value})`;
            lightness = value;
        } 
        
        const rgb = hslToRgb(hue, saturation, lightness);

        updateOther(rgb[0], 'red', hslnya);

        red = rgb[0]; 
        percentage = red / 255;
        angmaks = document.querySelector('.slider.red');
        angmaks.value = red;
        angmaks.nextElementSibling.innerHTML = red;
        angmaks.style.background = gradBackGround;
        document.querySelector('.box.hue').style.background = hslnya;

        green = rgb[0]; 
        percentage = green / 255;
        angmaks = document.querySelector('.slider.green');
        angmaks.value = green;
        angmaks.nextElementSibling.innerHTML = green;
        angmaks.style.background = gradBackGround;
        document.querySelector('.box.saturation').style.background = hslnya;
        
        blue = rgb[0]; 
        percentage = blue / 255;
        angmaks = document.querySelector('.slider.blue');
        angmaks.value = blue;
        angmaks.nextElementSibling.innerHTML = blue;
        angmaks.style.background = gradBackGround;
        document.querySelector('.box.lightness').style.background = hslnya;

    }

    

    function updateRGB(elm) {
        
        const value = elm.value;
        // Update the background gradient dynamically
        let percentage = (value / elm.max) * 100;
        elm.style.background = gradBackground(percentage);

        let nextEl = elm.nextElementSibling;
        nextEl.innerHTML = value;

        let warna;
        if (elm.classList.contains('red')) {
            warna = `rgb(${value},${green},${blue})`;
            red = value;
        } else if (elm.classList.contains('green')) {
            warna = `rgb(${red},${value},${blue})`;
            green = value;
        } else {
            warna = `rgb(${red},${green},${value})`;
            blue= value;
        } 
        
        const hsl = rgbToHsl(red, green, blue);
        
        updateOther(hsl[0], 'hue', warna);
        updateOther(hsl[1], 'saturation', warna);
        updateOther(hsl[2], 'lightness', warna);
        /*
        hue = hsl[0]; 
        percentage = (hue / 360) * 100;
        nextEl = document.querySelector('.slider.hue');
        nextEl.value = hue;
        nextEl.nextElementSibling.innerHTML = hue;
        nextEl.style.background = gradBackground(percentage);
        nextEl.parentElement.parentElement.style.background = warna;

        saturation = hsl[1] 
        percentage = (saturation / 100) * 100;
        nextEl = document.querySelector('.slider.saturation');
        nextEl.value = saturation;
        nextEl.nextElementSibling.innerHTML = saturation;
        nextEl.style.background = gradBackground(percentage);
        nextEl.parentElement.parentElement.style.background = warna;

        lightness = hsl[2] 
        percentage = (lightness / 100) * 100;
        nextEl = document.querySelector('.slider.lightness');
        nextEl.value = lightness;
        nextEl.nextElementSibling.innerHTML = lightness;
        nextEl.style.background = gradBackground(percentage);
        nextEl.parentElement.parentElement.style.background = warna;
        */
    }

    function updateRangeTrack() {
        if (this.matches('.red, .green, .blue')) {
            updateRGB(this);
        } else {
            updateHSL(this);
        }
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
