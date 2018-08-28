# coin

github预览地址  
登陆注册  https://huaqhuaq.github.io/coin/login.html  
内页导航  https://huaqhuaq.github.io/coin/index.html


/index
/index/ming
/invite  
/detail
/finance

1.  breadcrumb  
vue-router el-menu 与 breadcrumb 结合使用  
el-menu 中的 `index="/index"` 里的内容即指向路由
```
getBreadcrumb () {
    let matched = this.$route.matched.filter(item => item.name);
    const first = matched[0];
    if (first && first.path == '/index/mining') {
        matched = [{ path: '/index', name: '交易挖矿'}].concat(matched)
    } else if (first && first.path == '/detail') {
        matched = [{ path: '/invite', name: '邀请好友'}].concat(matched)
    }
    _this.levelList = matched;
}
```

2. el-form  
el-form 要加上`ref="miningForm"` `:model="miningForm"`，要做表单验证要加上`:rules="miningrules"`，并在data里写验证。  
el-form-item 要加上`prop="AccessID"` 
el-input 写法 `<el-input v-model="miningForm.AccessID" :disabled="disabled"></el-input>`

```
<el-form
    ref="miningForm"
    :model="miningForm"
    :rules="miningrules"
    :label-position="labelPosition"
    label-width="150px">
    <el-form-item label="交易平台  交易ID" prop="AccessID">
      <div class="col-xs-12">
        <el-input v-model="miningForm.AccessID" :disabled="disabled"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="交易平台  交易密钥" prop="SecretKey">
      <div class="col-xs-12">
        <el-input v-model="miningForm.SecretKey" :disabled="disabled"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="交易对">
      <div class="col-xs-12">
        <el-select v-model="value"
                :disabled="disabled"
                @change="changeOrder">
          <el-option
              v-for="item in ordertype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item label="最大运行次数" label-suffix="次" prop="maxruntime">
      <div class="col-xs-10">
        <el-input v-model="miningForm.maxruntime" :disabled="disabled"></el-input>
      </div>
      <label class="col-xs-2">次</label>
    </el-form-item>
    <el-form-item label="交易间隔时间" prop="dealtime">
      <div class="col-xs-10">
        <el-input v-model="miningForm.dealtime" :disabled="disabled"></el-input>
      </div>
      <label class="col-xs-2">秒</label>
    </el-form-item>
    <el-form-item label="撤单时间" prop="intervaltime">
      <div class="col-xs-10">
        <el-input v-model="miningForm.intervaltime" :disabled="disabled"></el-input>
      </div>
      <label class="col-xs-2">秒</label>
    </el-form-item>
    <el-form-item>
      <div class="col-xs-12">
        <template v-if="disabled==false">
            <el-button type="success" @click="start('miningForm')">启动</el-button>
          </template>
          <template v-else>
          <el-button type="success" plain disabled>启动中</el-button>
        </template>
          <el-button type="danger" @click="stop" :disabled="!disabled">停止</el-button>
      </div>
    </el-form-item>
</el-form >
```

3. 有一处在表格中点某一行的明细进去看不会写，先这么强行做一下。
主要是 `this.bus.$emit` 和 `this.bus.$on` 不太会用，`this.bus.$on`中可以打印出接收到的数据但是不能绑到data里去。

```
//html
<template slot-scope="scope">
   <el-button type="primary" size="mini" @click="detailClick"><span class="hide">{{scope.$index}}</span>明细</el-button>
</template>

//js
detailClick: function(event){
    var _this = this
    var el = event.currentTarget
    var detailIndex = el.children[0].children[0].innerHTML
    var username = _this.inviter[detailIndex].username
    this.$router.push({path:"/detail", query: {username: username}})
}
```

在 /detail 组件内接收 `var username = _this.$route.query.username`