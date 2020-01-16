
i =0;
for (i=0;i<document.getElementsByClassName('opener').length;i++)
{
  var txt = document.getElementsByClassName('opener')[i].innerText
  var newtxt = txt.substring(0,140)
  var dot = "..."
  var open = newtxt.concat(dot)
  document.getElementsByClassName('opener')[i].innerText = open;
}