var rooPath;
$(function(){
	rooPath=$('#absolutePath').val();
});
/*function formatterDate(date){
	var oDate=new Date(date),oYear=oDate.getFullYear(),oMonth=oDate
		.getMonth()+1,oDay=oDate.getDate(),oHour=oDate.getHours(),oMin=
			
}*/

function formatterDate2(date){
	var oDate = new Date(date), oYear = oDate.getFullYear(), oMonth = oDate
	.getMonth() + 1,oDay = oDate.getDate(),oHour = oDate.getHours(),
	oMinutes = oDate.getMinutes(),oSen = oDate.getSeconds(),oTime = oYear + '-'
	+getzf(oMonth)+ '-' + getzf(oDay)+ ' ' + getzf(oHour)+ ':' + getzf(oMinutes)
	+ ':' + getzf(oSen);
	return oTime;
};

function getzf(num){
	if(parseInt(num) < 10){
		num = '0'+num;
	}
	return num;
}