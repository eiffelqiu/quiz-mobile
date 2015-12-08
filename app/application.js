var App = {

    init: function init() {

        var app = app || {};

        app.Q = [
            "我走路、吃饭、说话都很快。",
            "当别人伤害了我时，我必须表现得更强硬，以便更容易地对付过去。",
            "我必须一再给自己加压，然后才能完成事情。",
            "在我做决定前，我会考虑很久很详细。",
            "我是圆滑老练的。",
            "当事情发展不顺时，我情愿避开而不愿意看到事实。",
            "我可以长期忽视身体的不适。",
            "有些对别人不成问题的事情我却感到困难。",
            "在我开始某事之前，我会将它长期搁置。"
        ];

        app.testitle = '分析测试问卷';
        app.name = '匿名用户';
        app.result = '';

        app.counter = 0;

        app.a0 = 0;
        app.a1 = 0;
        app.a2 = 0;
        app.a3 = 0;
        app.a4 = 0;

        $("#question").text(app.Q[app.counter]);

        function sel(i) {
            if (app.counter < app.Q.length) {
                app.result += "" + app.counter + ":" + i + "|";
                app.counter += 1;
                $("#testProgress").text((app.counter) + "/" + app.Q.length);
                $("#question").text(app.Q[app.counter]);
                $('input:radio[name=choice-a]')[0].checked = false;
                $('input:radio[name=choice-b]')[0].checked = false;
                $('input:radio[name=choice-c]')[0].checked = false;
                $('input:radio[name=choice-d]')[0].checked = false;
                $('input:radio[name=choice-e]')[0].checked = false;
            }

            if (app.counter == app.Q.length) {
                $("#result").text(app.result);
                app.name = $('#username').val();
                //alert(app.name + " | " +  app.result);
                $.mobile.navigate("#final", {transition: "slide", info: "finish"});
            }
        }

        $("#begin").click(function () {
            if ($.trim($('#username').val()) != '') {
                $.mobile.navigate("#quiz", {transition: "slide", info: "finish"});
            } else {
                alert("请输入姓名");
            }
        });

        function drawPie() {
            var width = 400;
            var height = 400;
            var dataset = [ app.a0 , app.a1 , app.a2 , app.a3 , app.a4 ];
            var dataset1 = [ "完全不符合" , "基本不符合" , "有些符合" , "符合" , "非常符合" ];

            var svg = d3.select("#pie")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

            var pie = d3.layout.pie();

            var piedata = pie(dataset);

            var outerRadius = 150;	//外半径
            var innerRadius = 0;	//内半径，为0则中间没有空白

            var arc = d3.svg.arc()	//弧生成器
                .innerRadius(innerRadius)	//设置内半径
                .outerRadius(outerRadius);	//设置外半径

            var color = d3.scale.category10();

            var arcs = svg.selectAll("g")
                .data(piedata)
                .enter()
                .append("g")
                .attr("transform","translate("+ (width/2) +","+ (width/2) +")");

            arcs.append("path")
                .attr("fill",function(d,i){
                    return color(i);
                })
                .attr("d",function(d){
                    return arc(d);
                });

            arcs.append("text")
                .attr("transform",function(d){
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("text-anchor","middle")
                .text(function(d,i){
                    return  Math.round((d.data / app.Q.length) * 100) + "% " + dataset1[i] ;
                });
        }

        $("#submitest").click(function () {
            $.post("quiz.php", {
                    testitle: app.testitle,
                    username: app.name,
                    result: app.result
                },
                function (data) {
                    alert("提交成功");
                    $('#username').val("");
                    app.name = '';
                    $('#tip').hide();
                    drawPie();
                    //$.mobile.navigate("#home", {transition: "flip", info: "finish"});
                });
        });

        $("#choice-a").click(function () {
            app.a0 += 1;
            sel(0);
        });

        $("#choice-b").click(function () {
            app.a1 += 1;
            sel(1);
        });

        $("#choice-c").click(function () {
            app.a2 += 1;
            sel(2);
        });

        $("#choice-d").click(function () {
            app.a3 += 1;
            sel(3);
        });

        $("#choice-e").click(function () {
            app.a4 += 1;
            sel(4);
        });
    }

};

module.exports = App;

