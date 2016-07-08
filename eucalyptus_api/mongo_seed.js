db.general.insert({
    sitename: "Test Site",
    baseurl: "localhost",
    admin_id: 1,
    theme_id: 1,
    color_scheme_id: 1,
    index: "home"
});

db.themes.insert({
    name: "Default",
    url: "default"
});

db.colorschemes.insert({
    name: "Default",
    colors: [
        "#123", "#FFF"
    ]
});

db.users.insert({
    name: "John Smith",
    access: 1
});


db.pages.insert({
    name: "Home Page",
    slug: "home",
    elements_id: [1,2,3],
    fonts_id: [1]
});

db.elements.insert({
    etype: "h1",
    content: "The Amazing Title",
    medialibrary_id: null
});
db.elements.insert({
    etype: "p",
    content: "Fancy Text Stuff",
    medialibrary_id: null
});
db.elements.insert({
    etype: "b",
    content: "Bold Fancy Text",
    medialibrary_id: null
});

db.medialibrary.insert({
    mtype: "image",
    url: "animage.jpg"
});

db.fonts.insert({
    name: "Main",
    url: "font.ttf"
});
