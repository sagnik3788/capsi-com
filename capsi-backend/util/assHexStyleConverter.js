
// const assObject = {
//     Name: 'Default',
//     Fontname: 'Roboto',
//     Fontsize: '18',
//     PrimaryColour: '&H00FFFFFF',
//     SecondaryColour: '&H00FFFFFF',
//     OutlineColour: '&H00000000',
//     BackColour: '&H00000000',
//     Bold: '0',
//     Italic: '0',
//     Underline: '0',
//     StrikeOut: '0',
//     ScaleX: '100',
//     ScaleY: '100',
//     Spacing: '0',
//     Angle: '0',
//     BorderStyle: '1',
//     Outline: '1',
//     Shadow: '1.5',
//     Alignment: '2',
//     MarginL: '10',
//     MarginR: '10',
//     MarginV: '60',
//     Encoding: '0'
// }

// function abgrToHex(abgr) {
//     if (abgr.length !== 8) {
//         throw new Error("Invalid ABGR format");
//     }
//     let a = abgr.substring(0, 2);
//     let b = abgr.substring(2, 4);
//     let g = abgr.substring(4, 6);
//     let r = abgr.substring(6, 8);
//     return "#" + r + g + b + a;
// }


function hexToAssBGR(hex) {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, '');

    // Ensure the hex code is valid
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        console.error('Invalid hex color code');
        return null;
    }

    // Split the hex code into RGB components
    let r = hex.slice(0, 2);
    let g = hex.slice(2, 4);
    let b = hex.slice(4, 6);

    // Concatenate the components in BGR order
    let bgr = b + g + r;

    // Return the uppercase BGR-formatted string
    return '&H' + bgr.toUpperCase() + '&';
}

module.exports={
    hexToAssBGR,
}