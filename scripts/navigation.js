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
    '<li class="nav-item dropdown">'+
      '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
        'Teaching'+
      '</a>'+
      '<div class="dropdown-menu" aria-labelledby="navbarDropdown">'+
        '<a class="dropdown-item" href="' + site_root + 'site/teaching.html' + '">Teaching philosophy</a>'+
        '<a class="dropdown-item" href="' + site_root + 'site/teaching-experience.html' + '">Teaching experience</a>'+
      '</div>'+
    '</li>'+
    '<li class="nav-item dropdown">'+
      '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
        'About me'+
      '</a>'+
      '<div class="dropdown-menu" aria-labelledby="navbarDropdown">'
        '<a class="dropdown-item" href="#">Bio</a>'+
        '<a class="dropdown-item" href="#">CV</a>'+
        '<div class="dropdown-divider"></div>'+
        '<a class="dropdown-item" href="#">Contact</a>'+
      '</div>'+
    '</li>'+
  '</ul>'+
'</div>'
