export default function(view, amplifier=1) {
    switch(view){
        case 'simple':
            return {
                width: 16,
                height: 16
            }

        case 'grid':
        case 'masonry':
            return {
                width: 190 + (amplifier * 30),
                height: (view == 'grid' ? 150 + (amplifier * 30) : undefined)
            }

        default:
            return {
                width: 56,
                height: 48
            }
    }
}