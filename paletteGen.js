document.addEventListener("keyup", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        var button = document.getElementById("generate");
        button.click();
    }
}); 

//converts hex to RGB
function hexToRGB(hex) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b];
}

//converts RGB to Hex
function RGBToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

//converts RGB to Hex without the #
function textRGBToHex(r, g, b) {
    return (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

//returns the color's luminance
function luminance(R, G, B) {
    return 0.2126*R + 0.7152*G + 0.0722*B;
}

//returns a random hex color
function randColor() {
    var color = Math.floor(Math.random() * 0xffffff).toString(16);
    color = `#${color.padStart(6, "0")}`;
    return color;
}

//string RGB value to hex
function rgbToHex(rgb) {
    // Split the RGB value into separate red, green, and blue values
    var [r, g, b] = rgb.match(/\d+/g);
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);

    return RGBToHex(r,g,b);
}

//updates number of columns in the palette table
function updateTable() {
    var rowCount = document.getElementById("num-rows").value;
    var table = document.getElementById("colors");
    var rows = table.getElementsByTagName("tr");

    if (rowCount == rows.length) return; // no updates
    
    for (var i = rows.length - 1; i >= rowCount; i--) { //delete rows
        table.deleteRow(i);
    }
    for (var i = rows.length; i < rowCount; i++) { //append rows
        (function(newRow) {
            //set base color
            newRow.innerHTML = "<td class= \"box\"><span><p>#A8A8C8</p></span></td>";
            newRow.querySelector(".box").style["background-color"] = "#A8A8C8";
            table.appendChild(newRow);

            //add click event to box
            const pElement = newRow.querySelector(".box span");
            pElement.addEventListener("click", () => copyColor(newRow));
        })(document.createElement("tr"));
    }
}

//copies color to clipboard
const copyColor = (elem) => {
    const colorElement = elem.querySelector(".box");
    const pElement = elem.querySelector(".box p");
    const hex = rgbToHex(colorElement.style["background-color"]);

    navigator.clipboard.writeText(hex).then(() => {
        pElement.innerText = "Copied";
        setTimeout(() => pElement.innerText = hex, 1000);
    });
}
