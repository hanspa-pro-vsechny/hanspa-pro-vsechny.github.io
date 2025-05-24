function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}



barvy = ["#cc402a","teal","orange","grey","pink","violet","green","yellow","#4cb2ac","#941760","#61b8fa","#96d60c","#cbc2bc","#294f03","#a0cd93","magenta","lime","brown","amber","#362312","#ffbf46"]
function dalsiBarva(){
    console.log("%c další barva","font-size:1.1em;color:blue;")
    barva = barvy.random()

    barvaInput.value = barva //POZOR: musí být dřív než to další, protože to další moc nefunguje a občas barva na konci je absolutně jiná než ta puvodní 
    nahradURL();
    console.log("barva v inputu",barva)

    document.getElementsByTagName('html')[0].style.background = barva
    //změní barvu popředí horní části podle barvy pozadí
    //získá barvu pozadí horní poloviny ve formátu "rgb(00,00,00)"
    var barva = window.getComputedStyle( document.getElementsByTagName('html')[0] ,null).getPropertyValue('background-color'); 
    console.log("barva getComputedStyle",barva)
    barva = barva.substring(4, barva.length-1); //rgb(00,00,00) -> 00,00,00
    barva = barva.split(",")//00,00,00 -> [00,00,00]
    barva = rgbToHex(barva[0],barva[1],barva[2]) //[00,00,00] -> #000000
    console.log("upravená",barva)
    barvaPopredi = invertColor(barva,true) //je lepší černá nebo bílá?
    console.log("popředí",barvaPopredi)
    document.getElementsByTagName('html')[0].style.color = barvaPopredi
    

    
}