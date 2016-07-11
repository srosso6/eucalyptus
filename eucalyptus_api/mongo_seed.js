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
    password: "password",
    access: 1,
    email: "john.smith@gmail.com"
});


db.pages.insert({
    name: "Home Page",
    slug: "home",
    fonts_id: [1]
});

db.elements.insert({
    etype: "h1",
    content: "The Amazing Title",
    medialibrary_id: null,
    page_id: "577fd8f8f8b00909abeb40e0",
    order: 1
});
db.elements.insert({
    etype: "p",
    content: "Fancy Text Stuff",
    medialibrary_id: null,
    page_id: "577fd8f8f8b00909abeb40e0",
    order: 2
});
db.elements.insert({
    etype: "b",
    content: "Bold Fancy Text",
    medialibrary_id: null,
    page_id: "577fd8f8f8b00909abeb40e0",
    order: 3
});

db.medialibrary.insert({
    mtype: "image",
    url: "animage.jpg"
});

db.fonts.insert({
    name: "Main",
    url: "font.ttf"
});
