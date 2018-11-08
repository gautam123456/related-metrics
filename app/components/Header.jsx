import React from 'react';

const Header = ({isThumbnail}) => {
return (
    <div className={'head' + (isThumbnail ? ' thumbnail' : '')}>
    <div>
        Metrics for ####
    <div className='description'>Some description related to given metrics a bit longer like this...</div>
    </div>
    <div>
        <div className='bold'>
            Max: $234
        </div>
        <div className='light'>
            Min: $34
        </div>
    </div>
    </div>
)
}

export default Header;
