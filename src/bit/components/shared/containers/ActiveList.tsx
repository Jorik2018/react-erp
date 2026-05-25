import React, { useRef } from 'react'
import { animateScroll } from 'react-scroll'
import Scrollable from './Scrollable'

const ActiveList = ({
	className,
	identifier,
	itemList,
	activeIndex,
	activeMinIndex = 0,
	activeMaxIndex = itemList.length - 1,
	selectCallback,
	activeClassName,
	activeStyles,
	children
}) => {
	const ariaSelection = useRef(null)

	const handleScrollToBottom = container =>
		animateScroll.scrollToBottom({
			duration: 500,
			smooth: true,
			containerId: container
		})

	const renderedList =
		itemList &&
		itemList.map((item, i) => {
			const key = `${identifier}-nav-${i}`
			return (
				<React.Fragment key={key}>
					<li
						id={key}
						className={`${activeClassName?.(item, i) || ''} ${
							activeIndex === i ? `${identifier}-list-active` : ''
						}`}
						// tabIndex="-1"
						onClick={() => {
							if (i >= activeMinIndex && i <= activeMaxIndex)
								selectCallback(item, i)
						}}
						// onKeyDown={e => handleKeyboardNav(e, item, i)}
					>
						{children(item, i)}
					</li>
				</React.Fragment>
			)
		})

	return (
		<Scrollable
			idName={`${identifier}-sidebar-nav`}
			bottomType="arrow"
			bottomCallback={() => handleScrollToBottom(`${identifier}-sidebar-nav`)}
			arrowNav={false}
		>
			<ul ref={ariaSelection} className="">
				{renderedList}
			</ul>
		</Scrollable>
	)
}

export default ActiveList
