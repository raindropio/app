export default {
    lighten(color,percent) {
        if (!color) return null;
        var c = this.shadeRGBColor('rgb(' + color + ')', percent);
        return 'rgb('+c[0]+','+c[1]+','+c[2]+')';
    },

	colorFromString: function(str) {
        try{
            str = str.trim();
        }catch(e){if(e)str='';}
        if (str!='') {
            var b, bigint, colour, g, hash, i, r, value;
            hash = 0;
            i = 0;
            while (i < str.length) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                i++;
            }
            colour = '';
            i = 0;
            while (i < 3) {
                value = (hash >> (i * 8)) & 0xff;
                colour += ('00' + value.toString(16)).substr(-2);
                i++;
            }
            bigint = parseInt(colour, 16);
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;

            return [r, g, b];
        }else
            return [0,0,0];
    }
}