$(function () {
    console.log("js的外部引用")

})

//1.给 加入购物车 添加一个点击事件
function add_shoppingcart(dom) {
    var trDom = $(dom).parent().parent();
    //那第一个td
    var goodsName = trDom.children().eq(0).text();
    var goodsPrice = trDom.children().eq(1).text();

    //2.把trdom放入到下面的table表格中 goods
    //按需求 添加
    //编辑一个 dom元素
    var downTrDom = $("<tr>"
        + " <td>" + goodsName + "</td>"
        + " <td>" + goodsPrice + "</td>"
        + " <td align='center'>"
        + "  <input type='button' value='-' onclick='des(this);'/>"
        + "  <input type='text' size='3' readonly value='1'/>"
        + "  <input type='button' value='+' onclick='add(this);'/>"
        + " </td>"
        + " <td>" + goodsPrice + "</td>"
        + " <td align='center'><input type='button' value='x' onclick='del(this);'/></td>"
        + " </tr>"
    );
    //1.1遍历购物车
    var goodsTrDom = $("#goods tr");
    //创建一个数组，用来装产品名称
    var namesArr = new Array();
    $.each(goodsTrDom, function (index, value) {
        //在遍历的循环里面去看下面的内容和上面的内容是否有一样的
        // $(this).children('td').eq(0).text();
        //那$(this)下面的td
        //把拿到的名字装入到数组中
        namesArr.push($(this).children('td').eq(0).text());
    })
    console.log(namesArr);
    //做数组是否有name的判断
    var isHasName = namesArr.indexOf(goodsName);
    //console.log(isHasName);
    if (isHasName >= 0) {//证明下面有了
        //1.找出下面的数量进行+1 ，上面的库存-1，找出金额+单价
        //1.定位找出来
        console.log(goodsName);
        console.log(isHasName);
        //拿取goods tr对象的下面的数量
        var goodsCount = goodsTrDom.eq(isHasName).children('td').eq(2).children().eq(1).val();
        var num = Number.parseInt(goodsCount) + 1;
        goodsTrDom.eq(isHasName).children('td').eq(2).children().eq(1).val(num);

    } else {
        $("#goods").append(downTrDom);
        sum();
    }
}
// 从购物车中删除物品
function del(dom) {
    // <tr>是行 <td>是列
    $(dom).parent().parent().remove();
    sum();
};
// 购物车中实现点击按钮增加数量
function add(dom) {
    // 获取按钮的哥哥的内容(数量/String)
    var wd = $(dom).prev().val();
    // 数量加1,再重新设置文本框
    $(dom).prev().val(++wd);
    // 获取按钮的父亲的哥哥的内容(单价)
    var price = $(dom).parent().prev().html();
    // 计算总价
    var mny = price * wd;
    // 写入按钮的父亲的弟弟里(金额)
    $(dom).parent().next().html(mny);
    sum();
};

// 减法
function des(dom) {
    // 获取按钮的弟弟的内容(数量)
    var wd = $(dom).next().val();
    // 数量不能小于1
    if (wd <= 1) {
        return;
    }
    // 再重新设置文本框中的值
    $(dom).next().val(--wd);
    // 按钮的父亲的哥哥的内容(单价)
    var price = $(dom).parent().prev().html();
    // 计算总价
    var mny = price * wd;
    // 写入按钮的父亲的弟弟里(金额)
    $(dom).parent().next().html(mny);
    sum();
};

// 求订单的总计
function sum() {
    // 获取tbody下的所有行
    var jtrs = $("#goods tr");
    // 遍历他们
    var sum = 0;
    for (var i = 0; i < jtrs.length; i++) {
        // 获取每一行
        var jtr = jtrs.eq(i);
        // 获取该行中第四列的值(金额)
        var mny = jtr.children().eq(3).html();
        sum += parseFloat(mny);
    }
    // 写入到合计
    $("#total").html(sum);
};