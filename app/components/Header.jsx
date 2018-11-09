import React from 'react';

const Header = ({isThumbnail, options}) => {
    options = options || { header: 'Metrics for ####', description: 'Some description related to given metrics a bit longer like this...', max: 234, min: 34 };

    const { header, description, max, min } = options;

return (
    <div className={'head' + (isThumbnail ? ' thumbnail' : '')}>
    <div>
        {header}
    <div className='description'>{description}</div>
    </div>
    <div>
        <div className='bold'>
            Max: ${max}
        </div>
        <div className='light'>
            Min: ${min}
        </div>
    </div>
    </div>
)
}

export default Header;
