import React, {memo} from 'react'
import ProfileMenu from './ProfileMenu'
import Language from './Language'

const Index = (props) => {
  return (
    <div className="topbar">
      <div className="topbar__right">
        {/*<Language/>*/}
        <ProfileMenu {...props}/>
      </div>
      <div className='clearfix'/>
    </div>
  )
}

export default memo(Index)
