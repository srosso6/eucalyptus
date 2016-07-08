module.exports = {

  getRequest: function (url, reqtype, callback, data=null) {
    var request = new XMLHttpRequest();
    request.open(reqtype, "http://localhost:5000/" + url);
    if(reqtype != "GET" || reqtype != "get"){
      request.setRequestHeader("Content-Type", "Application/json");
    }
    request.onload = function(){
      if(request.status===200){
        callback(JSON.parse(request.responseText));
      }
    }
    request.send(data);
  },

  getSiteName: function (url) {
    let urlparts = url.split("/");
    let sitename = urlparts[3];
    return sitename;
  }

}
