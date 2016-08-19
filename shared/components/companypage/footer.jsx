import React from 'react';

const styles = {
    footer: {backgroundColor: '#333333'},
    copyright: {color: '#CCCCCC'}
}

var Footer = React.createClass({
    render: function(){
        return (
            <footer style={styles.footer}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="copyright" style={styles.copyright}>Copyright &copy; YourTime 2016</span>
                        </div>
                        {/*
                        <div className="col-md-4">
                            <ul className="list-inline social-buttons">
                                <li><a href="#"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="#"><i className="fa fa-facebook"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-inline quicklinks">
                                <li><a href="#">Privacy Policy</a>
                                </li>
                                <li><a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                         */}
                    </div>
                </div>
            </footer>
        );
    }
});

export default Footer;