var site_url = document.URL;
// Get the site root assuming that the root ends in github.io; that substring plus
// the trailing slash is 10 characters
var site_root = site_url.substr(0, site_url.lastIndexOf('github.io')+10)
var github = 'https://github.com/joshua-laughner'
var orcid = 'https://orcid.org/0000-0002-8599-4555'
var linkedin = 'http://www.linkedin.com/in/joshua-laughner'

document.getElementById("navMenu").innerHTML=
'<a class="navbar-brand" href="' + site_root + 'index.html' +'">JLL</a>'+
'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">'+
  '<span class="navbar-toggler-icon"></span>'+
'</button>'+
'<div class="collapse navbar-collapse" id="navbarSupportedContent">'+
  '<ul class="navbar-nav mr-auto">'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'index.html' + '">Home <span class="sr-only">(current)</span></a>'+
    '</li>'+
    '<li class="nav-item dropdown">'+
      '<a class="nav-link dropdown-toggle" href="' + site_root + 'site/research.html' + '" id="navbarDropbown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Research </a>'+
      '<div class="dropdown-menu" aria-labelledby="navbarDropdown">' + 
        '<a class="dropdown-item" href="' + site_root + 'site/research.html' + '">Current Research</a>' +
        '<a class="dropdown-item" href="' + site_root + 'site/phd-research.html' + '">Previous Research</a>' +
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/publications.html' + '">Publications</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/projects.html' + '">Projects</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/posts/posts-main.html' + '">Posts</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'files/Laughner-CV.pdf' + '">CV</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/other.html' + '">Other downloads</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/contact.html' + '">Contact</a>'+
    '</li>'+
  '</ul>'+
'</div>'

document.getElementById("myfooter").innerHTML =
'<div class="row">&nbsp;</div>'+
'<div class="row">'+
'<div class="col-sm-1"></div>'+
'<div class="col-sm-10" align="center">'+
  '<a href="' + linkedin + '" target="_blank"><img src="' + site_root + 'img/logos/In-2C-66px-TM.png' + '"></a>'+
  '&nbsp;&nbsp;&nbsp;'+
  '<a href="' + github + '" target="_blank"><img style="max-height:66px" src="' + site_root + 'img/logos/GitHub_Logo.png' +'"></a>'+
'</div>'+
'<div class="col-sm-1"></div>'+
'</div>'+
'<div class="row">&nbsp;</div>'+
'<div class="row">'+
'<div class="col-sm-1"></div>'+
'<div class="col-sm-10" align="center">'+
  '<a href="' + orcid + '" target="_blank"><img src="' + site_root + 'img/logos/orcid_16x16.png' + '">  ' + orcid + '</a>'+
'</div>'+
'<div class="col-sm-1"></div>'+
'</div>'+
'<div class="row">&nbsp;</div>'

var linkedin_a = document.getElementById("linkedin");
var github_a = document.getElementById("github");
var orcid_a = document.getElementById("orcid");

if (linkedin_a) {
    linkedin_a.setAttribute("href", linkedin);
}
if (github_a) {
    github_a.setAttribute("href", github);
}
if (orcid_a) {
    orcid_a.setAttribute("href", orcid);
}
