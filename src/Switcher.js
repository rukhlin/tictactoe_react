import React from 'react';

let Switcher = (props) => {
    return (
        <div className="switcher">
            <p>History sorter type: </p>
            <button className='switcher-btn' onClick={() => props.onClick()}>
                {props.isSorterAsc ? 'Asc' : 'Desc'}
            </button>
        </div>
    );
}


export default Switcher;
