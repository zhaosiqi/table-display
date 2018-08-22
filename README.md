[效果预览https://zhaosiqi.github.io/table-display/WebRoot/viewdisplay.html](https://zhaosiqi.github.io/table-display/WebRoot/viewdisplay.html)

# table-display  

大屏展示，兼容不同设备分辨率，数据获取，前台分页，自动轮播，table表格双色行等  


> 最近，公司弄了一个实时的系统监控设备，采集了一批不同分辨率的设备，项目有多地方都需要实时展示到大屏幕上检测，此项目多为内容表格。  


***  
需求如图，大部分类似  
  
  
![blockchain](https://zhaosiqi.github.io/table-display/WebRoot/images/aa.png "需求")  
1. 要求样式如下，表格单双行  
2. 要求兼容不同分辨率的设备  
3. 要求数据及时刷新，自动填充，轮换等  

思考了一下，开始动工，上代码。  
  
## 首先考虑到数据，与后台沟通之后，数据不是太大，做前台分页。  

``` 

    function goPage(table, pno, psize) { 
            var num = table.find('.count').length; 
            var pageSize = psize; 
            var totalPage = 0;
            //总共分几页
            if(num / pageSize > parseInt(num / pageSize)) {
                totalPage = parseInt(num / pageSize) + 1;
            } else {
                totalPage = parseInt(num / pageSize);
            }
            //设置当前页面
            curPage = pno;

            var startRow = (curPage - 1) * pageSize + 1; //开始显示的行
            var endRow = curPage * pageSize; //结束显示的行
            endRow = (endRow > num) ? num : endRow;
            //遍历显示数据实现分页
            for(var i = 1; i < (num + 1); i++) {
                var irow = table.find('.count').eq(i - 1);
                var irow1 = irow.next();
                if(i >= startRow && i <= endRow) {
                    irow.show();
                    irow1.show();
                } else {
                    irow.hide();
                    irow1.hide();
                }
            }
            return {
                "totalPage": totalPage,
                "curPage": curPage
            };
        }
    
```  
## 接下来就是自动轮播的问题，这个简单  

```  
 function freshPage() {
      var tBodyHtml = $('.mainview').find('tbody');
      setInterval(function() {
          if(messageCur == totalMessagePage) {
              messageCur = 1;
          } else {
              messageCur++;
          }
          goPage(tBodyHtml, messageCur, 12);
      }, 10000);
  }

```  
搞定完这两个我觉的没有问题了，后面table样式布局却头疼了一会。因为一页显示几条数据是在代码里控制的，难免最后一页要少几条，不补齐那些空格子太丑了，为了避免被骂的准备开始着手实现。  
```    
  var tbBody = "";
      var trColor;
      if (i % 2 == 0) {
          trColor = "even";
      }else {
          trColor = "odd";
      }
  
 ```  
 用最简单的办法实现，效果出来很是满意，等我看到最后一页的时候发现，因为没有实际数据，我动态生成的空格子都是一个颜色，这怎么能忍。来来回回试了很多遍，最后是这样解决的。  
 
```  
$("tbody tr:odd").addClass("odd");
$("tbody tr:even").addClass("even");
  
 ```   
 最后一页补齐空格子的时候加上这两句，ok，大功告成。  
 学无止境啊，诸君需共勉。
