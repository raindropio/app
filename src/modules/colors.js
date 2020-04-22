import network from './network'

var colorURLS = {};

export default {
	contrast(rgb) {
	    var c = "white", p = 255;
	    try{
	        p = (0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]);
	        if (p>150)
	            c = "black";
	    }catch(e){}
	    return [c,p];
	},

	shadeRGBColor(color, percent) {
	    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
	    return [(Math.round((t-R)*p)+R), (Math.round((t-G)*p)+G), (Math.round((t-B)*p)+B)];
	},

    lighten(color,percent) {
        if (!color) return null;
        var c = this.shadeRGBColor('rgb(' + color + ")", percent);
        return "rgb("+c[0]+","+c[1]+","+c[2]+")";
    },

	getDarkPalette(c, fromRGB) {
	    var _this = this;

	    try {
	        if (typeof c != "object")
	            c = [0, 0, 0];
	        if (c.length != 3)
	            c = [0, 0, 0];

            c[0] = parseInt(c[0]);
            c[1] = parseInt(c[1]);
            c[2] = parseInt(c[2]);

	        var cp = _this.contrast(c);
	        if (cp[0] == 'black') {
	            c = _this.shadeRGBColor('rgb(' + c[0] + "," + c[1] + "," + c[2] + ')', (((100 / 256) * (cp[1] - 100)) / 100) * -1);
	        }
	    }catch(e){}

	    return c[0] + "," + c[1] + "," + c[2];
	},

	colorFromString: function(str) {
        try{
            str = str.trim();
        }catch(e){if(e)str="";}
        if (str!="") {
            var b, bigint, colour, g, hash, i, r, value;
            hash = 0;
            i = 0;
            while (i < str.length) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
                i++;
            }
            colour = "";
            i = 0;
            while (i < 3) {
                value = (hash >> (i * 8)) & 0xff;
                colour += ("00" + value.toString(16)).substr(-2);
                i++;
            }
            bigint = parseInt(colour, 16);
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;

            return [r, g, b];
        }else
            return [0,0,0];
    },

    tagColor: function(str) {
    	return this.colorFromString(str.toLowerCase());
    }
}