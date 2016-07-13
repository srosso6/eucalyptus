const React = require('react');
const Koala = require('../../library.jsx');
const RegistrationForm = require('./RegistrationForm.jsx');

const HomeBox = React.createClass({
    getInitialState: function() {
        return {
            siteName: null,
            validSitename: null,
            error: null
        };
    },
    handleChange: function(e) {
        e.preventDefault()
        this.setState({siteName: e.target.value}, function() {
            console.log("site", this.state.siteName);
            this.checkForSite()
        })
    },

    registerUser: function (sitename, newUser) {
    var url = sitename + "/register";

    Koala.request("POST", url, newUser).then(function (data) {
        Koala.setCookie('EucalyptusUser', data._id, 30);
        window.location.href = "http://localhost:3000/" + sitename + "/admin";
    }).catch(function(error) {
        console.error("Cannot redirect", error);
    });
    },
    checkForSite: function () {
        var url = this.state.siteName + '/general'
        Koala.request('GET', url).then(function(data) {
            if(data.length > 0) {
                this.setState({validSitename: data}, function() {
                    console.log('this',this.state.validSitename);
                });
            }
        }.bind(this))
    },
    toLogin: function(e) {
        e.preventDefault()
        if(this.state.validSitename) {
            console.log('I am here', this.state.siteName);
            window.location.href = this.state.siteName + '/admin'
        }

    },
    render: function() {
    return (
        <div>
            <div className='headerDivLogin'>
                <h1></h1>
                <img className='leafs' src='/static/home/images/leafs.png'></img>
            </div>
            <div className ='boxes'>
                <div className='homeSpiel'>
                    <p >Welcome to Eucalyptus, a CMS built with React!</p>
                    <p>Bunch of cool guys, making cool shit.</p>
                    <p>I sell sea shells on the sea shore.</p>

                    <b className='bForSiteSearchReg'>--</b>
                    <p className='pForSiteSearchReg'>Already have a site?</p>
                    <label className='labelForSiteSearchReg'>Sitename:</label>
                    <input  className='inputForSiteSearchReg' type='text' onChange={this.handleChange}></input>
                    <button className='buttonForSiteSearchReg' onClick={this.toLogin}>To My Site</button>
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

    // need to call a login method from Koala to log-in user once re-directed
