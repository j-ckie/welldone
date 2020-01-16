for (i=0;i<document.getElementsByClassName('datesplit').length;i++)
{
  var txt = document.getElementsByClassName('datesplit')[i].innerText
  var res = txt.substring(4,15);
  document.getElementsByClassName('datesplit')[i].innerText = res;
}
