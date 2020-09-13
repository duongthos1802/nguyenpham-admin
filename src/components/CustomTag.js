import React from 'react'
import { Tag } from 'antd'

const CustomTag = ({status}) => {
	return (
		status ?
			<Tag
				color = {status.isActive ? 'green' : '#ccc'}
			>
				{
					(status.isActive
						? 'Active'
						: 'Inactive').toUpperCase()
				}
			</Tag>
		: null
	)
}

export default CustomTag
