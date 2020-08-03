function SelectCity(obj) {
    this.provinceList = obj.provinceList
    this.province = obj.province;
    this.city = obj.city;
    this.changeCityFunc = obj.changeCityFunc;
    this.defaultProvince = obj.defaultProvince;
    this.defaultCityId = obj.defaultCityId;
    this.init();

}

SelectCity.prototype = {
    init: function () {
        //为第一级动态添加省
        // 使用new Option创建新的选项
        // Option()构造函数接受两个参数：文本(text)和值(value)
        // options.add方法，添加新的选项
        this.province.options.length = 0;
        var selectedOption = null;
        for (var i = 0; i < this.provinceList.length; i++) {
            this.province.options.add(new Option(this.provinceList[i].name, this.provinceList[i].name));
        }
        // onchange事件发生时，事件函数中的this指向的是触发事件的元素，所以需要通过bind改变this指向，使事件函数中的this指向这个new出来的对象
        this.province.onchange = this.changeProvince.bind(this);
        this.changeProvince(false);
        if(this.defaultProvince) {
            for(var i = 0; i< this.province.options.length; i++){
                if(this.province.options[i].value == this.defaultProvince || this.province.options[i].value+"市" == this.defaultProvince) {
                    this.province.options[i].selected = true;
                    this.changeProvince(true);
                    break;
                }
            }
        }
    },

    changeProvince: function (isFirst) {
        //清空options
        this.city.options.length = 0;
        // selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。
        var cityAry = this.provinceList[this.province.selectedIndex].cityList;
        //第二级动态添加市
        if(isFirst){
            for (var i = 0; i < cityAry.length; i++) {
                if (cityAry[i].code == this.defaultCityId) {
                    var option = new Option(cityAry[i].name, parseInt(cityAry[i].code), true);
                } else {
                    var option = new Option(cityAry[i].name, parseInt(cityAry[i].code),false);
                }
                this.city.options.add(option);
            }
        }else {
            for (var i = 0; i < cityAry.length; i++) {
                if (i == 0) {
                    var option = new Option(cityAry[i].name, parseInt(cityAry[i].code), true);
                } else {
                    var option = new Option(cityAry[i].name, parseInt(cityAry[i].code,false));
                }
                this.city.options.add(option);
            }
        }
        this.changeCityFunc();
        //每次调用changeProvince()时，都调用一次changecity()，使地区发生变化
    }

}