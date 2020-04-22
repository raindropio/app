import React from 'react'
import t from '~t'
import _ from 'lodash'

export const formatDate = (value, short=true)=>{
    var content = ''
    var d;
    try{d = new Date(value)}catch(e){}
    if (d){
        var format = {month: "long", ...(!short ? {day: "numeric"} : {})};
        if (d.getFullYear() != new Date().getFullYear())
            format = {/*month: "long", */year: "numeric", ...(!short ? {month: "long", day: "numeric"} : {})};

        try{content = new Intl.DateTimeFormat(t.currentLang.replace('_','-'), format).format(d);}catch(e){}
    }

    if (!content)
        content = d.getMonth()+"/"+d.getFullYear();

    return _.capitalize(content);
}

export default function Section({item={}, className=''}){
	var content = "";
    switch(item.type){
        case 'date':
            content = <div className="sectionName">{formatDate(item.value)}</div>;
        break;

        case 'text':
            content = <div className="sectionName">{item.value}</div>;
        break;
    }

    return (
        <article className={"section "+className}>{content}</article>
    )
}