
var contentstatus=0;
var count =1;
var timer;
var flag = 1 ;
var mapflag=1;
var page = 1;
var user = 0;
var firststep=0;
var company;
////////////////////////////////random img start///////////////////////////////////
setInterval(function()
{
$(".hero").fadeOut( 1500, function() {
$(".hero").attr("style",'background:url("css/img/img'+count+'.jpg")');});
$('.hero').css('display', 'block');
$('.hero').animate({ opacity: 0 }, 0);
$('.hero').animate({ opacity: 1, top: "-10px" }, 2000);
    // Animation complete.
    if(count === 4)
    {
    	count=1;
    }
  count++ ;

}, 10000);

/////////////////////////////////script google analytics//////////////////////////////////////

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-51359625-1', 'worldresident.net');
  ga('send', 'pageview');


///////////////////////////////////random img end///////////////////////////////////////

$(document).ready(function(){

///////////////init////////////////
$(".sel_district").attr('disabled','disabled');
$(".sel_provine").attr('disabled','disabled');
$(".sel_amphures").attr('disabled','disabled');


//////////////////////////////Moblie controller/////////////////////////////////////////////////////////////////////////
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//alert(navigator.userAgent);
}

$$(".content1").swipeRight(function(){expandmap();});
$$(".content1").swipeLeft(function(){minimizemap();});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////init page//////////////////////////////////////////////////////////
$(".auto_map_info").attr("height","0px");
$(".auto_map_info iframe").attr("height","0px");
$(".auto_map_info").attr("width","66%");
$(".auto_map_info iframe").attr("width","66%");
$("#loginopen").on("click",function(){
$(".loginfrm").css("visibility","visible");
$("#username_txt").focus();
});
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////function zone////////////////////////////////////////
function expandmap(){$(".auto_map_info").animate({height:window.screen.height-385+"px"});$(".auto_map_info iframe").animate({height:window.screen.height-385+"px"});$(".content1").animate({width:"100%"});$("#imgleftside").hide();};
function minimizemap(){$(".content1").animate({width:"23.23176%"});$("#imgleftside").show();$("#menu_index").show();};
function showlogin(){$(".loginfrm").css("visibility","visible");};
function hidelogin(){$(".loginfrm").css("visibility","hidden");};
/////////////////////////////////////////////////////////////////////////////////////////

$("#password_txt").focus(showlogin);
$("#username_txt").focus(showlogin);
$("#password_txt").focusout(hidelogin);
$("#username_txt").focusout(hidelogin);
$("#search_txt").focusout(function(){if(flag==0){minimizemap(); $("#menu_index").show();}});
$("#search_txt").on("click",function(){expandmap(); $("#menu_index").hide();});
$(".content1").on({
    'mouseover': function () {if(flag===1){timer = setTimeout(function () {contentstatus=1;expandmap();}, 1000);}},
    'mouseout' : function () {if(contentstatus===1){minimizemap(); contentstatus=0;}clearTimeout(timer);}
});
$(".pin").on({'mouseover': function () {flag=0;},'mouseout' : function () {flag=1;}});
$("#menu_index").on({'mouseover': function () {flag=0;},'mouseout' : function () {flag=1;}});
$(".content13").on({'mouseover': function () {flag=0;},'mouseout' : function () {flag=1;}});

$("#map_canvas").on("click",function(){$(".auto_map_info").animate({height:"0px"});$(".auto_map_info iframe").animate({height:"0px"});});
$("#tbrshow").html("");
$.ajax({type:'GET',url:'http://www.worldresident.net/getdb',success:function(data) {for(var i=0;i<10;i++){
					if(i==0)
					$("#tbrshow").append("<tr style='margin-bottom:2em; border-bottom-style: solid;border-width: 1px;border-color: #79bd9a;white-space: normal;'><td ><li style='padding-bottom:0.7em;'  class='linkme' id='"+data[i]._id+"'>"+data[i].title+"</li></ld></tr>");
					else
					$("#tbrshow").append("<tr  style='margin-bottom:2em; border-bottom-style: solid;border-width: 1px;border-color: #79bd9a;white-space: normal;'><td ><li style='padding-bottom:0.7em;padding-top:0.7em;'  class='linkme' id='"+data[i]._id+"'>"+data[i].title+"</li></ld></tr>");
					}
                    $(".linkme").on({
    'mouseover': function () {$(this).addClass("hover");},
    'mouseout' : function () {$(this).removeClass("hover");}
});
                     $(".linkme").bind("tap",function(){window.open("http://www.worldresident.net/info.html?id="+$(this).attr('id'),"_blank");});


				},
				error:function(err) {
					//alert("Sorry, I can't get the feed");	
				}
			});

                   
});
///////////////////////zipcode request//////////////////////////////////////////////////////////
$('.sel_amphures_plus').change(function(){

  $('.txt_amphures').val($(this).val());
});
$('.sel_District_plus').change(function(){

  $('.txt_district').val($(this).val());
});


$('#txt_zipcode1').on('input',function(){fetchzip($('#txt_zipcode1'));});
$('#txt_zipcode2').on('input',function(){fetchzip($('#txt_zipcode2'));});
$('#txt_zipcode3').on('input',function(){fetchzip($('#txt_zipcode3'));});

function fetchzip(ele){

  if($(ele).val().length>=2)
{
$.ajax({
                type:'GET',
                url:'http://www.worldresident.net/zip?zip='+$(ele).val(),
                success:function(data) {
                    var pro = new Array();
                    var amp =new Array();
                    var dis = new Array();
                    var pos = new Array();

  $('.sel_amphures_plus').html("");
   $('.sel_District_plus').html("");              
  for(var i=0;i<data.length;i++)
  {
    pos.push(data[i].zipcode);
    pro.push(data[i].province_name);
    dis.push(data[i].amphur_name);
     amp.push(data[i].district_name);
  }
  pos = eliminateDuplicates(pos);
   pro = eliminateDuplicates(pro);
   amp = eliminateDuplicates(amp);
   dis = eliminateDuplicates(dis);

// globals
var rawTags = pos;

var initInputFieldValue = $(ele).val();
var dataList = document.getElementById('htmlListTags');
var initNbVirgules = (initInputFieldValue.match(/,/g)||[]).length;

fillDatalist("");

function fillDatalist(prefix) {
  var nbRawList = rawTags.length;
  // vide la liste initiale (pas utile si elle est vide au début) // FIXME
  while(dataList.childNodes.length > 0) {
    dataList.removeChild(dataList.childNodes[0]);
  }
  // la recréé avec les tags de l’array
  for (i=0; i < nbRawList; i++ ) {
    var nOpt = document.createElement("option");
    nOpt.value = prefix+rawTags[i];
    dataList.appendChild(nOpt);
  }
}

function mainLoop() {
  var currInputFieldValue = $(ele).val();
  var currInputFieldValueTrimed = $(ele).val().replace(/^\s+|\s+$/g, "");
  var currNbVirgules = (currInputFieldValue.match(/,/g)||[]).length;

  // renouvelle les "option" uniquement si le contenu de l’input à changé.
  if (currInputFieldValueTrimed != initInputFieldValue) {
    // renouvelle que si on a tout juste ajouté ou retiré une virgule depuis le dernier passage.
    if (initNbVirgules != currNbVirgules) {
      // récupère l’emplacement de la dernière virgule
      var lsIndex = currInputFieldValueTrimed.lastIndexOf(",");
      // récupère la chaine contenant jusqu’au dernier tag entier dans le contenu du champ
      var str = (lsIndex != -1) ? currInputFieldValueTrimed.substr(0, lsIndex)+", " : "";
      fillDatalist(str);
      initNbVirgules = currNbVirgules;
    }
    initInputFieldValue = currInputFieldValueTrimed;
  }
  setTimeout("mainLoop()", 100); // la fonction se redéclenchera dans 0,1s
  return true;
}
try{
mainLoop();
}catch(ex){}



   $.each(dis, function(key, value) {   
     $('.sel_District_plus')
         .append($("<option></option>")
         .attr("value",value)
         .text(value)); 
});
   if($('.txt_district').val()!="")
   {$('.txt_district').attr('style','border-color:green');}

  if($('.txt_amphures').val()!="")
   {$('.txt_amphures').attr('style','border-color:green');}

 if($('.txt_provinces').val()!="")
   {$('.txt_provinces').attr('style','border-color:green');}


 $('.txt_district').val(dis[0]);
  
$('.txt_amphures').val(amp[0]);  
   $(".txt_provinces").val(pro);

       $.each(amp, function(key, value) {   
     $('.sel_amphures_plus')
         .append($("<option></option>")
         .attr("value",value)
         .text(value)); 
});


                },
                error:function(err) {
                    alert("Something bad happend, IN " +url );   


                }
            });
}
if($(ele).val().length==0)
{
  
   $('.txt_district').attr('style','border-color:red');
   $('.txt_district').val("");
   $('.txt_amphures').attr('style','border-color:red');
   $('.txt_amphures').val("");
   $('.txt_provinces').attr('style','border-color:red');
      $('.txt_provinces').val("");
}
}

function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};
 
  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}
  


//$(".linkme").on('tap',window.location="/worldresiden/info?id="+$$(this).id);
/////////////////////////////////////////////////for info request////////////////////////////////
var parameter = window.location.search.replace( "?", "" );
var values = parameter.split("=");
 var lat ;
                    var loong ;
 if(values[0]==="id"&&values[1]!=null)
 {
   
    $.ajax({
                type:'GET',
                url:'http://www.worldresident.net/info?'+values[0]+"="+values[1],
                success:function(data) {
                  try{
                     lat = data.location[0];
                     loong = data.location[1];
                     console.log(data.location[1]);

                        if(data.location!=null)

                       {
                    $("#locationaprt").html('<iframe src="http://www.worldresident.net/map.html?location='+lat+','+loong+'" width="400" height="300" frameborder="0" style="border:0"></iframe>');
                   }
                   else
                   {
                    $("#locationaprt").html(" ")
                   }
                   }
                   catch(ex){

                    console.log(ex);
                   }
                    $("#nameaprt").html(data.title);
                    $("#detailaprt").html(data.detail);
                   
                   
                  
                    $("#nameaprt").html(data.title);
                    $("#detailaprt").html(data.detail);
                      
                    $("#imageaprt").html(data.image);
                },
                error:function(err) {
                    alert("Something bad happend, IN " +url );   


                }
            });
 }
if(values[0]==="page"&&values[1]!=null)
{
   $.ajax({
                type:'GET',
                url:'http://www.worldresident.net/page?'+values[0]+"="+values[1],
                success:function(data) {
					
            for(var i=0;i<25;i++)
				{
					var stat = 0;

				for(var j =0;j<20;j++)

					{
					try{	if(data[i].images[j].match(/jpg/g)||data[i].images[j].match(/png/g))
						{
						$("#columns").append('<div id="'+data[i]._id+'" class="pin"><img src="'+data[i].images[j]+'""><p>'+data[i].title+'</p></div>');
              						j=20;
									stat=1;
						}
					   }
					catch(ex){}
					}

					if(stat===0)
					{
						$("#columns").append('<div id="'+data[i]._id+'" class="pin"><p>'+data[i].title+'</p></div>');
              			
						}

          
            
					
                }
                 $(".pin").on("click",function(){window.open("http://www.worldresident.net/info.html?id="+$(this).attr('id'),"_blank")});
          
                },
                error:function(err) {
                    alert("Something bad happend, IN " +url );   


                }
            });

}
/////////////////////////////////////////check page action ////////////////////////////////////////
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height()-200&&window.location.pathname=== "/apartment_list.html") {
	   page++;
        $.ajax({
                type:'GET',
                url:'http://www.worldresident.net/page?page='+page,
                success:function(data) {
                   		
            for(var i=0;i<15;i++)
				{
					var stat = 0;

				for(var j =0;j<20;j++)

					{ try{
						if(data[i].images[j].match(/jpg/g)||data[i].images[j].match(/png/g))
						{
						$("#columns").append('<div id="'+data[i]._id+'" class="pin"><img src="'+data[i].images[j]+'""><p>'+data[i].title+'</p></div>');
              						j=20;
									stat=1;
						}
						}
					catch(ex){}
					}
					if(stat===0)
					{
						$("#columns").append('<div id="'+data[i]._id+'" class="pin"><p>'+data[i].title+'</p></div>');
              			
						}
              
                }

          $(".pin").unbind();      
           $(".pin").bind("click",function(){window.open("http://www.worldresident.net/info.html?id="+$(this).attr('id'))});
          

                },
                error:function(err) {
                    alert("Something bad happend, IN " +url );   


                }

            });
   }
});






////////////////////////////////// page control ///////////////////////////////////

$("#regiscommon").on('click',function(){
$("#selector").attr("style","display:none");
$("#box1").attr("style","display:block");
user=1;
});
$("#regisnone").on('click',function(){
$("#selector").attr("style","display:none");
$("#box2").attr("style","display:block");
user=2;

});
$("#regiscoop").on('click',function(){
$("#selector").attr("style","display:none");
$("#box3").attr("style","display:block");
user=3;

});


$(".btn_cancle").on('click',function(){
  if(window.location.pathname=="/signup.html")
  {
$("#box1").attr("style","display:none");
$("#box2").attr("style","display:none");
$("#box3").attr("style","display:none");
$("#selector").attr("style","display:block");
}
else if(window.location.pathname=="/first_step.html")
{
  if(firststep!=0){
                   var ele =  document.getElementsByClassName('box')[firststep];
                   $(ele).attr("style","display:none");
                  firststep--;
                  ele =  document.getElementsByClassName('box')[firststep];
                   $(ele).attr("style","display:block");
                  }
                  else 
                  {

                    window.location.pathname="/index.html";
                  }
}
});





/////////////////////////////////////////action handler/////////////////////////





$('.plus_mobile').on("click",function(){
if(window.location.pathname=="/first_step.html")
{

    $(".ser_box").append('<tr class="ser_name"><td width="30%" align="right"><h6>Name of Service:</h6></td> <td width="70%"><input name="txt_name_service" type="text" size="20" maxlength="100" width="80%" class="name_service"></td></tr><tr class="ser_fee"><td align="right"><h6>Fee :</h6></td><td><input name="txt_fee" type="text" size="20" maxlength="100" width="80%" class="fee_service" placeholder="unit"></td></tr><tr class="ser_tax"><td align="right"><h6>Tax :</h6></td><td><input name="txt_tax" type="text" maxlength="10" class="fee_service" placeholder="%"></td></tr> <tr class="ser_detail"><td align="right" class="ser_detail"><h6>Detail :</h6></td><td><textarea name="txt_service_detail" rows="6" class="detail_service"></textarea></td></tr><tr class="box_end"><td colspan="2" align="right" bgcolor="#E3E3E3" height="10px"></td></tr>');
}


});



function radiocheck(companytype)
{
company =companytype;

}
$('.txt_user').focusout(
function()
{
  var ele =document.getElementsByClassName('txt_user')[user-1];
$.get("/usercheck",{username:document.getElementsByClassName('txt_user')[user-1].value},
 function(data,status){
  if(data!="") {
    $(ele).attr("style","border-color:red");
    $(".check_user").attr("style","visibility:visible;color:red;");
  }
     else 
     {
      $(ele).attr("style","border-color:green"); 
          $(".check_user").attr("style","visibility:hidden");
    }


}
  );
});

$(".btn_submit").on('click',function(){
if(window.location.pathname=="/signup.html"){

var name = document.getElementsByClassName('txt_name')[user-1].value;
var lastname = document.getElementsByClassName('txt_lastname')[user-1].value;
var email = document.getElementsByClassName('txt_email')[user-1].value;
var address = document.getElementsByClassName('txt_address')[user-1].value;
var zipcode = document.getElementById('txt_zipcode'+user).value;
var amphures = document.getElementsByClassName('txt_amphures')[user-1].value;
var district = document.getElementsByClassName('txt_district')[user-1].value;
var province = document.getElementsByClassName('txt_provinces')[user-1].value;
var tel = document.getElementsByClassName('txt_tel')[user-1].value;
var mobile = document.getElementsByClassName('txt_tel_mobile')[user-1].value;
var fax = document.getElementsByClassName('txt_fax')[user-1].value;
var username = document.getElementsByClassName('txt_user')[user-1].value;
var passwd = MD5(document.getElementsByClassName('txt_pass')[user-1].value.toString());
var regisnum =document.getElementsByClassName('txt_regis_no')[0].value; 
var capital = document.getElementsByClassName('txt_registered_capital')[0].value; 
var companyname = document.getElementsByClassName('txt_company_name')[0].value; 

 $.get("/adduser",
    {
  username:username,
  psswd:passwd,
  type: user,
  name: name,
  lastname:lastname,
  email: email,
  address: address,
  zipcode:zipcode,
  amphure:amphures,
  district:district,
  province:province,
  tel:tel,
  company:company,
  regisnum:regisnum,
  capital:capital,
  companyname:companyname,
  mobile : mobile,
  fax : fax
    },
    function(data,status){
      
    });
}
else if(window.location.pathname=="/first_step.html"){

  if(firststep!=4){
 var ele =  document.getElementsByClassName('box')[firststep];
 $(ele).attr("style","display:none");
firststep++;
ele =  document.getElementsByClassName('box')[firststep];
 $(ele).attr("style","display:block");
}

}
});





  $('input[type=text]').on("input",function(){

if($(this).val()=="")
{
  $(this).attr("style","border-color:red");

}
else
{
  $(this).attr("style","border-color:green");

}
});
 $('textarea').on("input",function(){

if($(this).val()=="")
{
  $(this).attr("style","border-color:red");

}
else
{
  $(this).attr("style","border-color:green");

}

  });
































/////////////////////////////////////MD5//////////////////////////////////////

var MD5 = function (string) {
 
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
 
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
     }
 
     function F(x,y,z) { return (x & y) | ((~x) & z); }
     function G(x,y,z) { return (x & z) | (y & (~z)); }
     function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
 
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
 
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
 
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
 
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    };
 
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
 
    string = Utf8Encode(string);
 
    x = ConvertToWordArray(string);
 
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
 
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
    return temp.toLowerCase();
}




