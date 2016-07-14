const React = require('react');
const Koala = require('../../library.jsx');
const RegistrationForm = require('./RegistrationForm.jsx');

const HomeBox = React.createClass({
    getInitialState: function() {
        return {
            siteName: null,
            validSitename: null,
            message: null
        };
    },
    componentDidMount: function() {
        setTimeout(function() {
            this.setState({message: 'greeting'}, function() {
                setTimeout(function() {
                    this.setState({message: null})
                }.bind(this),3000)
            }.bind(this))
        }.bind(this),2000)
    },
    handleChange: function(e) {
        e.preventDefault()
        this.setState({siteName: e.target.value}, function() {
            this.checkForSite()
        })
    },

    registerUser: function (sitename, newUser) {
        Koala.request("POST", sitename + "/register", newUser).then(function (data) {
            Koala.setCookie('EucalyptusUser', data._id, sitename, 30);
            window.location.href = "http://localhost:3000/" + sitename + "/admin";
        });
    },
    checkForSite: function () {
        Koala.checkValidSiteName(this.state.siteName)
        .then(function(valid) {
            this.setState({validSitename: valid});
        }.bind(this));
    },
    toLogin: function(e) {
        e.preventDefault()
        if(this.state.validSitename) {
            window.location.href = this.state.siteName + '/admin'
        } else {
            this.setState({message: 'error'}, function() {
                setTimeout(function() {
                    this.setState({message: null})
                }.bind(this), 3000)
            }.bind(this))
        }

    },
    render: function() {

        var message = null
        if(this.state.message === 'error') {
            message = <img className='errorBubble' src='/static/home/images/bubble.png'></img>
        } else if(this.state.message === 'greeting') {
            message = <img className='errorBubble' src='/static/home/images/greeting.png'></img>
        }

        return (
            <div>
                <div className='headerDivLogin'>
                    <h1></h1>

                    <img className='leafs' src='/static/home/images/leafs.png'></img>
                </div>
                <div className ='boxes'>
                    <div className='homeSpiel'>
                        <p>Welcome to Eucalyptus, a CMS built with React!</p>
                        <p>Bunch of cool guys, making cool shit.</p>
                        <p>I sell sea shells on the sea shore.</p>


                        <b className='bForSiteSearchReg'>--</b>
                        <p className='pForSiteSearchReg'>Already have a site?</p>
                        <label className='labelForSiteSearchReg'>Sitename:</label>
                        <input  className='inputForSiteSearchReg' type='text' onChange={this.handleChange}></input>
                        <button className='buttonForSiteSearchReg' onClick={this.toLogin}>To My Site</button>
                        {message}
                        <img className='koala' src='/static/home/images/koala.png'></img>
                    </div>
                </div>
                <div className ='boxes'>
                    <div className='regForm'>
                        <h2>Register your new site:</h2>
                        <RegistrationForm onRegistration={this.registerUser}/>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = HomeBox;
