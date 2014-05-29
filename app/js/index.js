
var contentstatus=0;
var count =1;
var timer;
var flag = 1 ;
var mapflag=1;
var page = 1;
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
					
            for(var i=0;i<15;i++)
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
   if($(window).scrollTop() + $(window).height() < $(document).height()+200) {
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

});
$("#regisnone").on('click',function(){
$("#selector").attr("style","display:none");
$("#box2").attr("style","display:block");


});
$("#regiscoop").on('click',function(){
$("#selector").attr("style","display:none");
$("#box3").attr("style","display:block");


});


$(".btn_cancle").on('click',function(){
$("#box1").attr("style","display:none");
$("#box2").attr("style","display:none");
$("#box3").attr("style","display:none");
$("#selector").attr("style","display:block");

});

