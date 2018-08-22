function getMoving(obj,json,fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var bStop=true;
		for (var attr in json)
		{
			var now=0;
			if(attr=="opacity")
			{
				now=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				now=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-now)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(now!=json[attr])bStop=false;
			if(attr=="opacity")
			{
				obj.style.filter="alpha(opacity:"+(now+speed)+")";
				obj.style.opacity=(now+speed)/100;
			}
			else
			{
				obj.style[attr]=(now+speed)+"px";
			}
		}
		if(bStop)
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
	}, 30)
}

function getStyle(obj,name)	
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];
	}
}

function getClass(oParent,sClass)
{
	var aResult=[];
	var oEles=oParent.getElementsByTagName('*');
	for(var i=0; i<oEles.length; i++)
	{
		if(oEles[i].className==sClass)
		{
			aResult.push(oEles[i]);
		}
	}
	return aResult;
}
window.onload=function()
{
	var oBox=document.getElementById('box');
	var oTitle=getClass(document,'title');
	var aLink=oBox.getElementsByTagName('a');
	var PosX=0;
	var PosY=0;
	var dealy=2000;			//默认2秒后启动，可自行修改
	var timer=null;
	timer=setTimeout(function()
	{
		getMoving(oBox,{height:200,opacity:100})
	}, dealy)
	oTitle[0].onmousedown=function(ev)
	{
		var oEvent=ev||event;
		PosX=oEvent.clientX-oBox.offsetLeft;
		PosY=oEvent.clientY-oBox.offsetTop;
		var cBox=document.createElement('div');
		cBox.className="cbox";
		cBox.style.width=oBox.offsetWidth+"px";
		cBox.style.height=oBox.offsetHeight+"px";
		cBox.style.left=oBox.offsetLeft+"px";
		cBox.style.top=oBox.offsetTop+"px";
		document.body.appendChild(cBox);	
		document.onmousemove=function(ev)
		{
			var oEvent=ev||event;
			var x=oEvent.clientX-PosX;
			var y=oEvent.clientY-PosY;
			if(x<30)
			{
				x=0;
			}
			else if(x>document.documentElement.clientWidth-oBox.offsetWidth-30)
			{
				x=document.documentElement.clientWidth-oBox.offsetWidth;
			}
			if(y<30)
			{
				y=0;
			}
			else if(y>document.documentElement.clientHeight-oBox.offsetHeight-30)
			{
				y=document.documentElement.clientHeight-oBox.offsetHeight;
			}
			cBox.style.left=x+"px";
			cBox.style.top=y+"px";
		}
		document.onmouseup=function()
		{
			document.onmousemove=null;
			document.onmouseup=null;
			oBox.style.left=cBox.offsetLeft+"px";
			oBox.style.top=cBox.offsetTop+"px";
			document.body.removeChild(cBox);
		}
		return false;
	}
	aLink[0].onclick=function()
	{
		getMoving(oBox,{top:document.documentElement.clientHeight-oBox.offsetHeight,left:document.documentElement.clientWidth-oBox.offsetWidth},function()
		{
			getMoving(oBox,{height:20,opacity:0,top:document.documentElement.clientHeight-20});
		})
	}
}
/* 酷站代码整理 转载请注明出处 http://www.5icool.org */