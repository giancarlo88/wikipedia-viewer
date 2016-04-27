var url1 = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="
var url2 = "&generator=images&iiprop=url|dimensions|mime&format=json&callback=?&continue=&sroffset="
var offset = 0

var qry = function () {
  offset = 0;
  $("#rndbutton").fadeOut(200, function(){
    $("#rndbutton").addClass("hidn");
  getString();})}


var getString = function() {
  var string = $("#srch input:text").val().replace(/ /g, "%20").trim();
  wikiSearch(string, offset)
}

var wikiSearch = function(srch, ofst) {
  $.getJSON(url1 + srch + url2 + ofst, htmlWrite)
}

var htmlWrite = function(data) {
  var html = "<div class='row'><div class='col-sm-2'></div><div class ='col-sm-8'>";
  if (data['query']['searchinfo']['totalhits'] == 0) {
    html += "Sorry! No results for that search."
  } else {
    for (var i = 0; i < 10; i++) {
      html += "<div class = 'card'><a href='http://www.wikipedia.org/wiki/" + data['query']['search'][i]['title'] + "'>" + data['query']['search'][i]['title'] + "</a><br>" + data['query']['search'][i]['snippet'] + "...<br></div>";
    }
     $("#wiki").hide().html(html).fadeIn();
    if (data["continue"] && offset == 0) {
      $("#nxt").removeClass("hidn");
    } else {
      $(".hidn").removeClass("hidn");

    }
  }
    $("#wikisrch").removeClass("centered").addClass("above")

    
  


}

var dispRlts = function() {
  $("#wiki").fadeOut();
  $("#prev, #nxt, .centered").addClass("hidn");
  $("html, body").animate({
    scrollTop: 10
  }, 600);
  getString();
}

$("#btn").on("click", qry);

$("#nxt").on("click", function() {
  offset += 10;
  dispRlts();
});

$("#prev").on("click", function() {
  offset -= 10;
  dispRlts();

});

$("#txtbx").keypress(function(e){ 
  if (e.which == 13){
      e.preventDefault();
   qry();
      return false;
   
  }})

$(document).ready(function(){});