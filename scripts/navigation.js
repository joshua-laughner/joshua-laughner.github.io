var site_url = document.URL;
// Get the site root assuming that the root ends in github.io; that substring plus
// the trailing slash is 10 characters
var site_root = site_url.substr(0, site_url.lastIndexOf('github.io')+10)

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
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/research.html' + '">Research</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/publications.html' + '">Publications</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'site/projects.html' + '">Projects</a>'+
    '</li>'+
    '<li class="nav-item active">'+
      '<a class="nav-link" href="' + site_root + 'files/Laughner-CV.pdf' + '">CV</a>'+
    '</li>'+
  '</ul>'+
'</div>'

document.getElementById("myfooter").innerHTML =
'<div class="row">&nbsp;</div>'+
'<div class="row">'+
'<div class="col-sm-1"></div>'+
'<div class="col-sm-10" align="center">'+
  '<a href="http://www.linkedin.com/in/joshua-laughner" target="_blank"><img src="' + site_root + 'img/logos/In-2C-66px-TM.png' + '"></a>'+
  '&nbsp;&nbsp;&nbsp;'+
  '<a href="https://github.com/joshua-laughner" target="_blank"><img style="max-height:66px" src="' + site_root + 'img/logos/GitHub_Logo.png' +'"></a>'+
'</div>'+
'<div class="col-sm-1"></div>'+
'</div>'+
'<div class="row">&nbsp;</div>'+
'<div class="row">'+
'<div class="col-sm-1"></div>'+
'<div class="col-sm-10" align="center">'+
  '<a href="https://orcid.org/0000-0002-8599-4555" target="_blank"><img src="' + site_root + 'img/logos/orcid_16x16.png' + '">  https://orcid.org/0000-0002-8599-4555</a>'+
'</div>'+
'<div class="col-sm-1"></div>'+
'</div>'+
'<div class="row">&nbsp;</div>'
