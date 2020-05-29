import React from 'react'
import t from '~t'
import Icon from '~icon'
import ListItem from '~co/bookmarks/item/listBlank'
import DuplicateItem from './parts/duplicateItem'
import Preloader from '~co/common/preloader'
import Main, { Header, Content, Footer } from '~co/screen/splitview/main'

export default class Loaded extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state={}
	}

	handleBodyScroll = (e)=>{
		const maxHeight = e.target.scrollHeight - e.target.clientHeight,
			  currentPosition = e.target.scrollTop;

		if (currentPosition+200 >= maxHeight)
			this.props.loadMore()
	}

	render() {
		const {
			buttonLabel='',
			sidebarToggle,
			itemsCount=0,
			items=[],
			selected=[],
			fullyRemoved=[],
			changeSelectionRule,
			changeSelection,
			removeSelected,
			httpActivity=false,
			more=false
		} = this.props;

		var elements = items.map((item, index)=>{
			var hereSelected = 0;
			var dups = (item.drops||[]).map((drop,di)=>{
				if (selected.indexOf(drop._id)!=-1)
					hereSelected++;

				return <DuplicateItem
							{...drop}
							link={item.link}
							key={di}
							newest={di==0}
							selected={selected.indexOf(drop._id)!=-1}
							changeSelection={changeSelection} />;
			})

			var hereFullyRemoved = (hereSelected==dups.length);

			var actions = (
				<div className='actions'>
					<a href={'#/space/0/'+encodeURIComponent(JSON.stringify([{key:'word',val:item.link}]))} className='button min default'>
						<b>{t.s('show')+' '+t.s('elements2')}</b>
					</a>
				</div>
			)

			return (
				<div className='duplicate-group' data-fully-removed={hereFullyRemoved} key={index}>
					<ListItem
						baseClassName='element element-list'
						item={item}
						author={true}
						actions={actions}>
						<div className='info'>
							{hereSelected}
							&nbsp;|&nbsp;
							{dups.length}
						</div>
					</ListItem>

					<div className='duplicate-items'>
						{dups}
					</div>
				</div>
			)
		})

		return (
			<Main>
				<Header title={t.s('duplicates')}>
					<div className='duplicates-toolbar'>
						<a tabIndex='-1' className='button active select'>
							<span>{t.s('select')}&nbsp;<Icon name='dropdown' size='micro' /></span>
							
							<select value={-1} onChange={(e)=>changeSelectionRule(e.target.options[e.target.selectedIndex].value)}>
								<option value='-1' disabled>{t.s('select')+' '+t.s('duplicates').toLowerCase()}</option>
								<option value='sameCollection'>{t.s('sameCollection')}</option>
								<option value='old'>{t.s('only') + ' ' + t.s('old').toLowerCase()}</option>
								<option value='new'>{t.s('only') + ' ' + t.s('newString').toLowerCase()}</option>
								<option value='nothing'>{t.s('nothing')}</option>
							</select>
						</a>

						<div className='di-space'/>

						<RemoveButton label={buttonLabel} count={selected.length} fully={fullyRemoved.length} onClick={removeSelected} />
					</div>
				</Header>

				<Content className='translateFromTopSlightly' onScroll={this.handleBodyScroll}>
					<div className='elements view-list'>
						{elements}
					</div>
				</Content>

				<Footer className={!more ? 'hidden' : ''}>
					<div className='title center' style={{opacity:0.6}}>
						{httpActivity ? <Preloader className='size-small' /> : 'Scroll down to load more...' }
					</div>
				</Footer>
			</Main>
		);
	}
}

const RemoveButton = ({label='', count=0, fully=0, onClick})=>{
	if (!count) return null;

	return (
		<a className='button red standart di-remove-button' onClick={onClick}>
			<Icon name='trash_active' />

			<span className='hide-on-small-body'>
				{`${label}: ${count} ${t.s('duplicates').toLowerCase()}`}
				{fully? `, ${t.s('including')} ${fully} ${t.s('original').toLowerCase()}` : null}
			</span>

			<span className='show-on-small-body'>
				{`${count}`}
			</span>
		</a>
	)
}

/*
handleBodyScroll(e,_this) {
		//Header
		var maxHeight = e.target.scrollHeight - e.target.clientHeight,
			currentPosition = e.target.scrollTop;

		if (currentPosition+200 >= maxHeight)
			_this.loadMore(_this)

		var scrolledState = false;

    	if (e.target.scrollHeight != e.target.clientHeight)
	    	if (e.target.scrollTop>34)
	    		scrolledState = true;

    	if (this.state.scrolled != scrolledState){
    		this.setState({scrolled:scrolledState});
    	}
	}*/