import _ from 'lodash-es'

const colors = {
	default: '#4990E2',

	'0': '#909090',
	'1': '#909090',
	'2': '#909090',
	'3': '#909090',
	'4': '#909090',
	'5': '#909090',
	'6': '#909090',
	'7': '#909090',
	'8': '#909090',
	'9': '#909090',
	'#': '#909090',
	a: '#F44336',
	b: '#E91E63',
	c: '#7B1FA2',
	d: '#673AB7',
	e: '#3F51B5',
	f: '#2196F3',
	g: '#039BE5',
	h: '#00ACC1',
	i: '#009688',
	j: '#43A047',
	k: '#7CB342',
	l: '#FDDC1E',
	m: '#FF6F00',
	n: '#FF5722',
	o: '#795548',
	p: '#757575',
	q: '#607D8B',
	r: '#E3717D',
	s: '#AA91DB',
	t: '#B3C9D9',
	u: '#95D1D8',
	v: '#8CD892',
	w: '#EE8D82',
	x: '#6BB8EB',
	y: '#BA9988',
	z: '#009688'
}

export const getLetter = (s='')=>{
	return (s.toString()[0]||'').toString().toLowerCase()
}

export const getColorForString = _.memoize((str)=>{
	const letter = getLetter(str)
	var index = 'default';
	if (typeof colors[letter] != 'undefined')
		index = letter;

	return colors[index];
})