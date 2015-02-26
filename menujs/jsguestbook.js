<!-- Begin
function textCounter(field, countfield, maxlimit) {
   if(field.value.length > maxlimit){
      field.value = field.value.substring(0, maxlimit);
   }
   else{ 
      countfield.value = maxlimit - field.value.length;
   }
}
function cleartagboard() {
    document.tagboard.cjmsg.value="";
}  
function popUp(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=no,location=0,statusbar=0,menubar=0,resizable=0,width=300,height=250,left = 20,top = 200');");
}
var isNav, isIE
if (parseInt(navigator.appVersion) >= 4) {
  if (navigator.appName == "Netscape")
    isNav = true
  else
    isIE = true
}
function showKeyValue(evt) {
  var keyValue
  if (isNav) 
    keyValue = evt.which
  else
    keyValue = window.event.keyCode
        
  if (keyValue == 13) {
    javascript:document.tagboard.submit();
  }
  return false
}
// End -->