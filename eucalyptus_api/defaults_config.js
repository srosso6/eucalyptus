var configs = {
    siteInfo: function(sitename, admin_id, colorscheme_id, theme_id, font_id) {
        return {
                sitename: sitename,
                base_url: "localhost:3000",
                admin_id: admin_id,
                index: 'home',
                colorscheme_id: colorscheme_id,
                theme_id: theme_id,
                font_id: font_id
            }
    },
    pageDefaults: {name: "Home Page", slug: 'home'},
    elementsDefaults: function(page_id) {
        return {etype: "h1", content: "Welcome to your site!", url: null, page_id: page_id, order: 1}
    },
    colorDefaults: {name: "Default", _background: "#ffffff", _headerBackground: "#ffffff", _headerText: "#000000", _text: "#000000", _feature: "#ffffff"},
    themeDefaults: [{name: "Round", url: "round"},{name: "Square", url: "square"}, {name: 'Beach', url:'beach'}],
    fontDefaults: [{_font: 'Arima+Madurai'}, {_font: 'Bangers'}, {_font: 'Farsan'}, {_font: 'Inconsolata'}, {_font: 'Indie+Flower'}, {_font: 'Katibeh'}, {_font: 'Poiret+One'}, {_font: 'Suez+One'}, {_font: 'Tillana'}, {_font: 'Work+Sans'}]
};

module.exports = configs;
