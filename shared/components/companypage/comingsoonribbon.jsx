import React from 'react';

const styles = {
    ribbon: {
        backgroundColor: '#00d7ff',
        boxShadow: '-4px 4px 15px 0px rgba(0, 0, 0, 0.5)',
        zIndex: 1031
    }
};

var ComingSoonRibbon = React.createClass({
    render: function(){
        return (
                <div
                    className="cr cr-top cr-right cr-sticky"
                    style={styles.ribbon}>
                    Coming Soon!
                </div>
        );
    }
});

export default ComingSoonRibbon;