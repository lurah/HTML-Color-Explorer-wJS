
document.addEventListener('DOMContentLoaded', function() {

    let red = 255, green = 0, blue = 0;
    let hue = 0, saturation = 100, lightness = 50;
    let alpha = 1; 

    const rgbSelector = document.querySelectorAll('.slider.red, .slider.blue, .slider.green');
    const hslSelector = document.querySelectorAll('.slider.hue, .slider.saturation, .slider.lightness');
    
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

    function updateHsl(elm = null) {
        if (elm != null) {
            const value = parseInt(elm.value);
            if (elm.classList.contains('hue')) {hue = value;}
            else if (elm.classList.contains('saturation')) {saturation = value;}
            else {lightness = value;}
            [red, green, blue] = hslToRgb(hue, saturation, lightness);
        }

        let hsl = [hue, saturation, lightness];
        let slideHsl;
        for (let i=0; i < 3; i++) {
            slideHsl = hslSelector[i];
            slideHsl.value = hsl[i];
            slideHsl.style.background = gradBackground((hsl[i] / slideHsl.max) * 100);
            if (i == 0) {slideHsl.nextElementSibling.innerHTML = `${hsl[i]} deg`;}
            else {slideHsl.nextElementSibling.innerHTML = `${hsl[i]} %`;}
        }
    }

    function updateRgb(elm = null) {
        if (elm != null) {
            const value = parseInt(elm.value);
            if (elm.classList.contains('red')) {red = value;}
            else if (elm.classList.contains('green')) {green = value;}
            else {blue = value;}
            [hue, saturation, lightness] = rgbToHsl(red, green, blue);
        }
        
        let rgb = [red, green, blue];
        let slideRgb;
        for (let i=0; i < 3; i++) {
            slideRgb = rgbSelector[i];
            slideRgb.value = rgb[i];
            slideRgb.style.background = gradBackground((rgb[i] / slideRgb.max) * 100);
            slideRgb.nextElementSibling.innerHTML = 
              `Dec: ${rgb[i]}, Hex: ${rgb[i].toString(16).toUpperCase()}`;
        }
      }

    function updateBackground() {
        const warnaBackground = document.querySelectorAll('.box.hue, .box.saturation, \
              .box.lightness, .box.alpha');
        warnaBackground.forEach (elm => {
            elm.style.background = `rgb(${red}, ${green}, ${blue})`;
        })
    }
    
    function updateKotakWarna() {
        const depan = document.querySelector('#depan');
        const belakang = document.querySelector('#belakang');
        const cmpClr = document.querySelector('#cmp_clr');
        const cmpTxt = document.querySelector('#cmp_txt');
        const wadah = document.querySelector('#wadah');
        
        wadah.style.border = `2px solid rgb(${red},${green},${blue})`
        depan.style.background = `rgba(${red},${green},${blue},${alpha})`;
        belakang.style.background = `rgba(${255-red},${255-green},${255-blue},1)`;
        cmpClr.innerHTML = `rgb(${red},${green},${blue})*`;
        cmpClr.style.color = `rgb(${red},${green},${blue})`;
        cmpTxt.style.color = `rgb(${255-red},${255-green},${255-blue})`;
    }

    function updateAlpha(elm = null) {
        if (elm != null) { alpha = parseFloat(elm.value);}
        else { 
            elm = document.querySelector('.slider.alpha');
            elm.value = alpha;
          }
        elm.nextElementSibling.innerHTML = alpha;
        elm.style.background = gradBackground(alpha * 100);
    }

    function updateRangeTrack() {
        if (this.matches('.red, .green, .blue')) {
            updateRgb(this);
            updateHsl();
        } 
        else if (this.matches('.hue, .saturation, .lightness')) {
            updateHsl(this);
            updateRgb();
        }
        else {updateAlpha(this);}
        updateBackground();
        updateKotakWarna();
        updateRangeInput();
        htmx.ajax('POST', '/name_color', {
            target: '#name_color',
            swap: 'outerHTML',
            values: {
                red: red,
                green: green,
                blue: blue}
        });
    }

    function updateHex() {
        let rgbhex = red.toString(16).toUpperCase().padStart(2,"0") +
            green.toString(16).toUpperCase().padStart(2,"0") +
            blue.toString(16).toUpperCase().padStart(2,"0");
        let alpha_hex = parseInt((alpha * 256) - 1).toString(16).toUpperCase().padStart(2,"0");
        document.querySelector('#hx_rgb').value = rgbhex + alpha_hex;
    }
    
    function updateRangeInput() {
        document.querySelector('#ip_red').value = red;
        document.querySelector('#ip_green').value = green;
        document.querySelector('#ip_blue').value = blue;
        updateHex();
        document.querySelector('#ip_rgb').value = alpha;
        document.querySelector('#ip_hue').value = hue;
        document.querySelector('#ip_saturation').value = saturation;
        document.querySelector('#ip_lightness').value = lightness;
        document.querySelector('#ip_hsl').value = alpha;
    }

    function makeActive() {
        const aktif = document.querySelector('.is-active');
        aktif.classList.remove('is-active');
        this.classList.add('is-active');
        htmx.ajax('POST', '/grid_color', {
            target: '#grid_color',
            swap: 'innerHTML',
            values: {
                elementId: this.id
            }
        });
    }

    // Attach event listeners
    function addTabItemLstnr() {
      document.querySelectorAll('.tab_item').forEach (elem => {
        elem.addEventListener('click', makeActive);})
    }
    document.querySelectorAll('.slider').forEach (slider => {
      slider.addEventListener('input', updateRangeTrack);}
    );
    document.querySelector('#name_color').addEventListener(
      'htmx:afterSwap', function() {addTabItemLstnr()}
    );
    
    updateRgb();
    updateHsl();
    updateKotakWarna();
    updateAlpha();
    updateBackground();
    updateRangeInput();
    addTabItemLstnr();
})
