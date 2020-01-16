
let count = 0;
var list = [];
  for (i=0;i<document.getElementsByClassName('sum').length;i++)
  {
   list[i] = (document.getElementsByClassName('sum')[i].innerText)
  var incominglike = document.getElementsByClassName('sum')[i].innerText
  if(incominglike == "like")
  {
    count += 1;
  }else{
    count = count;
  }
}

var object = []
list.sort()
var current = null;
var cnt = 0;
var a = 0;
for (var z=0; z < list.length;z++){
   sub = list[z].substring(0,7)
  if(sub == "comment"){
   continue;
  }else if(list[z] != current){
    if(cnt > 0){
      object[a] = {post:current,count:cnt}
      a++;
    }
    current = list[z];
    cnt = 1;
  }else{
    cnt++;
  }
}
if(cnt>0){
  object[a] = {post:current,count:cnt}
  a++;
}

object.sort((a,b)=>(a.count> b.count)? -1:1)

console.log(object)

var postStringa = object[0].post
var extractora = postStringa.match(/(\d+)/)
var postStringb = object[1].post
var extractorb = postStringb.match(/(\d+)/)
var postStringc = object[2].post
var extractorc = postStringc.match(/(\d+)/)
var postStringd = object[3].post
var extractord = postStringd.match(/(\d+)/)


document.getElementsByClassName('num')[0].innerHTML = extractora[0];
document.getElementsByClassName('num')[1].innerHTML = extractorb[0]; 
document.getElementsByClassName('num')[2].innerHTML = extractorc[0];
document.getElementsByClassName('num')[3].innerHTML = extractord[0];


