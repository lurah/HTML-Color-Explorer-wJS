
document.addEventListener('DOMContentLoaded', function() {

    let red = 255; let green = 0; let blue = 0;
    let hue = 0; let saturation = 100; lightness = 50;
    let alpha = 1; 

    const rgbSelector = document.querySelectorAll('.slider.red, .slider.blue, .slider.green');
    const hslSelector = document.querySelectorAll('.slider.hue, .slider.saturation, .slider.lightness');
    
    function rgbNormalizedToHex(rgb) {
        const [r, g, b] = rgb.map(c => Math.round(c * 255));
        return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}
                ${b.toString(16).padStart(2, '0')}`;
    }

    function findACompliantBackgrounds(step = 32) {
        const fgRgb = [ red/255.0, green/255.0, blue/255.0];
        const compliantColors = [];
        const minRatio = 7.1;
        const maxRatio = 10.1;

        for (let r = 0; r < 256; r += step) {
            for (let g = 0; g < 256; g += step) {
                for (let b = 0; b < 256; b += step) {
                    const bgRgb = [r / 255.0, g / 255.0, b / 255.0];

                    const ratio = tinycolor.readability(fgRgb, bgRgb); 

                    if (minRatio <= ratio && ratio <= maxRatio) {
                        const bgHex = rgbNormalizedToHex(bgRgb);
                        compliantColors.push({
                            "hex": bgHex,
                            "rgb": [r, g, b],
                            "cRatio": Math.round(ratio * 100) / 100
                        });
                    }
                }
            }
        }

        const grouped = compliantColors.reduce((acc, item) => {
            const key = item.hex.slice(0,4);
            if (!acc[key] || parseInt(item.hex.slice(-2), 16) > parseInt(acc[key].hex.slice(-2), 16)) {
                acc[key] = item;
            }
            return acc;
        }, {})


        const sortedColors = Object.values(grouped).sort((a,b) => a.hex.localCompare(b.hex));
        
        return sortedColors;
    }

    function hslToRgb(hx, sx, lx) {
        // Normalize H, S, L values to the range [0, 1]
        // Hue is normalized from [0, 360] to [0, 1]
        // Saturation and Lightness are normalized from [0, 100] to [0, 1]
        const h = hx/360; const s = sx/100; const l = lx/100;
      
        let r; let g; let b;
        // If saturation is 0, the color is grayscale (R, G, B are all equal to L)
        if (s === 0) {
            r = g = b = l;} // R, G, B are equal to L
        else {
            // Calculate intermediate values for conversion
            const chroma = (1 - Math.abs(2 * l - 1)) * s;
            const hueSegment = h * 6;
            const x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
            const lightnessAdjustment = l - chroma / 2;
      
            // Determine the RGB values based on the hue segment
            if (hueSegment >= 0 && hueSegment < 1) {
                [r, g, b] = [chroma, x, 0];}
            else if (hueSegment >= 1 && hueSegment < 2) {
                [r, g, b] = [x, chroma, 0];}
            else if (hueSegment >= 2 && hueSegment < 3) {
                [r, g, b] = [0, chroma, x];}
            else if (hueSegment >= 3 && hueSegment < 4) {
                [r, g, b] = [0, x, chroma];}
            else if (hueSegment >= 4 && hueSegment < 5) {
                [r, g, b] = [x, 0, chroma];}
            else if (hueSegment >= 5 && hueSegment < 6) {
                [r, g, b] = [chroma, 0, x];}
      
            // Add the lightness adjustment and scale R, G, B to the range [0, 255]
            r = (r + lightnessAdjustment) * 255;
            g = (g + lightnessAdjustment) * 255;
            b = (b + lightnessAdjustment) * 255;}
      
        // Round R, G, B values to the nearest integer
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
      
        // Return RGB values as an array
        return [r, g, b]; }

    function rgbToHsl(rx, gx, bx) {
        // Normalize R, G, B values to the range [0, 1]
        const r = rx/255; const g = gx/255; const b = bx/255;
              
        // Find the maximum and minimum values among R, G, B
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        
        let h = 0; let s = 0; let l = 0;
      
        // Calculate Lightness (L)
        l = (max + min) / 2;
      
        // If max and min are the same, the color is grayscale (saturation is 0)
        if (max === min) {
            h = 0; // Hue is 0 for grayscale
            s = 0;} // Saturation is 0
        else {
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
                    break; }
      
            // Convert Hue to degrees [0, 360]
            
            h /= 6; }
      
        s *= 100; l *= 100; // Convert S and L to percentages [0, 100]
        h *= 360;           // Convert h from [0, 1] to [0, 360]
      
        // Return HSL values as an array
        // Ensure hue is within [0, 360) range
        h = Math.round(h) % 360;
        if (h < 0) {h += 360;}
      
        // Round S and L to a reasonable number of decimal places if needed,
        // or keep as is for full precision. Rounding to 0 decimals for simplicity here.
        s = Math.round(s);
        l = Math.round(l);
        
        return [h, s, l]; }
    
    function gradBackground(persen) {
        const bgValue = `linear-gradient(to right,
                         var(--bulma-text-light) 0%, var(--bulma-text-light) ${persen}%,
                         transparent ${persen}%, transparent 100%)`;
        return bgValue; }

    function updateHsl(elm = null) {
        if (elm != null) {
            const value = parseInt(elm.value);
            if (elm.classList.contains('hue')) {hue = value;}
            else if (elm.classList.contains('saturation')) {saturation = value;}
            else {lightness = value;}
            [red, green, blue] = hslToRgb(hue, saturation, lightness);}

        const hsl = [hue, saturation, lightness];
        let slideHsl;
        for (let i=0; i < 3; i++) {
            slideHsl = hslSelector[i];
            slideHsl.value = hsl[i];
            slideHsl.style.background = gradBackground((hsl[i] / slideHsl.max) * 100);
            if (i === 0) {slideHsl.nextElementSibling.innerHTML = `${hsl[i]} deg`;}
            else {slideHsl.nextElementSibling.innerHTML = `${hsl[i]} %`;}} }

    function updateRgb(elm = null) {
        if (elm != null) {
            const value = parseInt(elm.value);
            if (elm.classList.contains('red')) {red = value;}
            else if (elm.classList.contains('green')) {green = value;}
            else {blue = value;}
            [hue, saturation, lightness] = rgbToHsl(red, green, blue);}
            
            
        const rgb = [red, green, blue];
        let slideRgb;
        for (let i=0; i < 3; i++) {
            slideRgb = rgbSelector[i];
            slideRgb.value = rgb[i];
            slideRgb.style.background = gradBackground((rgb[i] / slideRgb.max) * 100);
            slideRgb.nextElementSibling.innerHTML = 
              `Dec: ${rgb[i]}, Hex: ${rgb[i].toString(16).toUpperCase()}`;} }

    function updateBackground() {
        const warnaBackground = document.querySelectorAll('.box.hue, .box.saturation, \
              .box.lightness, .box.alpha');
        warnaBackground.forEach (elm => {
            elm.style.background = `rgb(${red}, ${green}, ${blue})`;
        }) }
    
    function updateKotakWarna() {
        const depan = document.querySelector('#depan');
        const belakang = document.querySelector('#belakang');
        const cmpClr = document.querySelector('#cmp_clr');
        const cmpTxt = document.querySelector('#cmp_txt');
        const wadah = document.querySelector('#wadah');
        
        wadah.style.border = `2px solid rgb(${red},${green},${blue})`
        depan.style.background = `rgba(${red},${green},${blue},${alpha})`;
        belakang.style.background = `rgba(${255-red},${255-green},${255-blue},1)`;
        cmpClr.innerHTML = `rgb(${255-red},${255-green},${255-blue})*`;
        cmpClr.style.color = `rgb(${red},${green},${blue})`;
        cmpTxt.style.color = `rgb(${255-red},${255-green},${255-blue})`; }
    
    function updateHex() {
        const rgbhex = red.toString(16).toUpperCase().padStart(2,"0") +
            green.toString(16).toUpperCase().padStart(2,"0") +
            blue.toString(16).toUpperCase().padStart(2,"0");
        const alpha_hex = parseInt(((alpha * 256) - 1)).toString(16).toUpperCase().padStart(2,"0");
        document.querySelector('#hx_rgb').value = rgbhex + alpha_hex; }
    
    function updateRangeInput() {
        document.querySelector('#ip_red').value = red;
        document.querySelector('#ip_green').value = green;
        document.querySelector('#ip_blue').value = blue;
        document.querySelector('#ip_rgb').value = alpha;
        updateHex();
        document.querySelector('#ip_hue').value = hue;
        document.querySelector('#ip_saturation').value = saturation;
        document.querySelector('#ip_lightness').value = lightness;
        document.querySelector('#ip_hsl').value = alpha; }

    function updateMinor() {
        updateBackground();
        updateKotakWarna();
        updateRangeInput(); }

    function updateMayor() {
        updateRgb();
        updateHsl();
        updateMinor(); }
    
    function updateAlpha(elmx = null) {
        let elm = elmx;
        if (elm != null) { alpha = parseFloat(elm.value);}
        else { 
            elm = document.querySelector('.slider.alpha');
            elm.value = alpha;}
        elm.nextElementSibling.innerHTML = alpha.toFixed(2);
        elm.style.background = gradBackground(alpha * 100); }

    function updateNameColor() {
        htmx.ajax('POST', '/name_color', {
            target: '#name_color',
            swap: 'outerHTML',
            values: {
                red: red,
                green: green,
                blue: blue}}); }

    function updateRangeTrack() {
        if (this.matches('.red, .green, .blue')) {
            updateRgb(this);
            updateHsl();} 
        else if (this.matches('.hue, .saturation, .lightness')) {
            updateHsl(this);
            updateRgb();}
        else {updateAlpha(this);}
        updateMinor();
        updateNameColor(); }

    function updateInputField() {
        const id = this.id;
        if (["ip_red","ip_green","ip_blue","ip_hue","ip_saturation","ip_lightness"].includes(id)) {
            const value = parseInt(this.value);
            if (value !== NaN) {
                if (["ip_red", "ip_green", "ip_blue"].includes(id) && 0 <= value && value < 256) {
                    if (id === "ip_red") red = value;
                    else if (id === "ip_green") green = value;
                    else if (id === "ip_blue") blue = value;
                    [hue, saturation, lightness] = rgbToHsl(red, green, blue);}
                else if (["ip_hue", "ip_saturation", "ip_lightness"].includes(id)) {
                    if (id === "ip_hue" && 0 <= value && value <= 360) {
                        hue = value;
                        [red, green, blue] = hslToRgb(hue, saturation, lightness);}
                    else if (0 <= value && value <= 100) {
                        if (id === "ip_saturation") saturation = value;
                        else if (id === "ip_lightness") lightness = value;
                        [red, green, blue] = hslToRgb(hue, saturation, lightness);}}
                updateMayor();
                updateNameColor();}}
        else if (["ip_rgb", "ip_hsl"].includes(id)) {
            const value = parseFloat(this.value);
            if (value !== NaN) {
                if (0 <= value && value <= 1) {
                    alpha = value;
                    updateAlpha();
                    updateMinor();
                    updateNameColor();}}} }

    function updateHexInput() {
        const match = this.value.match(/\b[0-9A-Fa-f]{1,8}\b/);
        if (match) {
            const hexa = match[0].toUpperCase();
            const parseColor = (start, length = 2) => parseInt(hexa.slice(start, start + length), 16);

            red = parseColor(0);
            if (hexa.length > 2) green = parseColor(2, hexa.length >= 4 ? 2 : 1);
            if (hexa.length > 4) blue = parseColor(4, hexa.length >= 6 ? 2 : 1);
            if (hexa.length > 6) alpha = parseFloat(((parseColor(6, hexa.length === 8 ? 2 : 1))/255).toFixed(2));
            else alpha = 1;
            
            [hue, saturation, lightness] = rgbToHsl(red, green, blue);
            updateMayor();
            updateAlpha();
            updateNameColor();} }

    function makeActive() {
        const aktif = document.querySelector('.is-active');
        aktif.classList.remove('is-active');
        this.classList.add('is-active');
        htmx.ajax('POST', '/grid_color', {
            target: '#grid_color',
            swap: 'innerHTML',
            values: {
                elementId: this.id}}); }

    function addTabItemLstnr() {
        document.querySelectorAll('.tab_item').forEach (elem => {
            elem.addEventListener('click', makeActive);})}

    function changeColor() {
        const tulisan = this.innerHTML;
        const match = tulisan.match(/rgb\((\d+),(\d+),(\d+)\)/);
        red = parseInt(match[1]);
        green = parseInt(match[2]);
        blue = parseInt(match[3]);
        [hue, saturation, lightness] = rgbToHsl(red, green, blue);
        updateMayor(); }

    function addNmClrLstnr() {
        document.querySelectorAll('.grid_color').forEach (elem => {
            elem.addEventListener('click', changeColor);})}

    // Attach event listeners
    document.querySelectorAll('.slider').forEach (slider => {
        slider.addEventListener('input', updateRangeTrack);});

    document.querySelectorAll('.angka').forEach (angka => {
        angka.addEventListener('change', updateInputField);});
    
    document.querySelector('#hx_rgb').addEventListener('change', updateHexInput);

    document.querySelector('#awal').addEventListener(
        'htmx:afterSwap', function(event) {
            if (event.target.id === "name_color") {
                addTabItemLstnr();
                addNmClrLstnr();}
            else if (event.target.id === "grid_color") {addNmClrLstnr();}});
    
    updateMayor();
    updateAlpha();
    addTabItemLstnr();
    addNmClrLstnr();
})
