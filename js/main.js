var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
var validatePhone = (rule, value, callback) => {
    if (!phoneReg.test(value)) {
        callback(new Error('请输入正确格式的手机号码'));
    } else {
        callback();
    }
};
<<<<<<< HEAD
var validateInteger = (rule, value, callback) => {
    if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error('请输入正整数'));
    } else {
        callback();
    }
};
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (page.$data.signupForm.checkpass !== '') {
        page.$refs.signupForm.validateField('checkpass');
      }
      callback();
    }
};
var validateCheckPass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== page.$data.signupForm.pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
};
var validateforgotPass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (page.$data.forgotForm.checkpass !== '') {
        page.$refs.forgotForm.validateField('checkpass');
      }
      callback();
    }
};
var validateCheckforgotPass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== page.$data.forgotForm.pass) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
};
<<<<<<< HEAD

=======
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
var clipboard = new ClipboardJS('.btn_fuzhi')
clipboard.on('success', function(e) {
    console.log(e)
    page.$message.success('复制成功')
})
clipboard.on('error', function(e) {
    console.log(e)
    page.$message.error('复制失败')
})
<<<<<<< HEAD
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}

Vue.prototype.axios = axios
Vue.prototype.bus = new Vue()
var routes = [
    { path: '/', redirect: '/index' },
    { path: '/index',
      name:"交易挖矿",
      component:{
        template:"#index"
      }
    },{
    path:"/index/mining",
    name:"coinex平台",
=======


var invitation_code = GetQueryString('invitation_code')
Vue.prototype.axios = axios
var routes = [{
    path:"/mining",
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
    component:{
        template:"#mining",
        data: function() {
            return {
<<<<<<< HEAD
                platform_name: 'coinex',
                miningForm: {},
                labelPosition: 'right',
                disabled: false,
                outlog: [],
                totalloss_fcoin: '',
                totalloss_ordercoin: '',
                ordertype:[],
                value:'',
                miningrules:{
                    AccessID:[{ required: true, message: '交易ID不能为空', trigger: 'blur' }],
                    SecretKey:[{ required: true, message: '交易密钥不能为空', trigger: 'blur' }],
                    maxruntime:[{ required: true, message: '最大运行次数不能为空', trigger: 'blur' },
                    { validator: validateInteger, trigger: 'blur' }],
                    dealtime:[{ required: true, message: '交易间隔时间不能为空', trigger: 'blur' },
                    { validator: validateInteger, trigger: 'blur' }],
                    intervaltime:[{ required: true, message: '撤单时间不能为空', trigger: 'blur' },
                    { validator: validateInteger, trigger: 'blur' }]
                },
                balance: 0.00
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/miningindex',{
                username: window.localStorage.getItem('username'),
                platform_name: _this.platform_name,
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                console.log(response)
                if(response.data.code == -1) {
                    _this.$message.error('过期重新登录！')
                    window.location.href = './login.html'
                }
                for(var i=0;i<response.data.deal.length;i++){
                    _this.ordertype.push({
                        value: Object.keys(response.data.deal[i]).join(""),
                        label: Object.values(response.data.deal[i]).join("")
                    })
                }
                _this.value = _this.ordertype[0].value
                _this.totalloss_fcoin = '共损失' + _this.value.split("/")[1]
                _this.totalloss_ordercoin = '共损失' + _this.value.split("/")[0]
                if (response.data.data != null){
                    var parameter = JSON.parse(response.data.data.parameter)
                    _this.value = parameter.ordertype
                    _this.totalloss_fcoin = '共损失' + _this.value.split("/")[1]
                    _this.totalloss_ordercoin = '共损失' + _this.value.split("/")[0]
                    if(response.data.data.status == 1) {
                        _this.disabled = true
                    }
                    _this.miningForm = parameter
                }
            }).catch(function(error) {
                console.log(error)
            })
            axios.post('/mining/frontend/web/inside/outlog',{
                username: window.localStorage.getItem('username'),
                platform_name: _this.platform_name,
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                if(response.data.code == -1) {
                    _this.$message.error('过期重新登录！')
                    window.location.href = './login.html'
                }
                _this.balance = response.data.balance
                if(JSON.stringify(response.data.data) != '{}') {
                    _this.outlog = response.data.data
                    console.log(_this.outlog)
                }
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            start(formName) {
                console.log('启动')
                var _this = this
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                      axios.post('/mining/frontend/web/inside/start',{
                            username: window.localStorage.getItem('username'),
                            platform_name: _this.platform_name,
                            AccessID: _this.miningForm.AccessID,
                            SecretKey: _this.miningForm.SecretKey,
                            ordertype: _this.value,
                            maxruntime: _this.miningForm.maxruntime,
                            dealtime: _this.miningForm.dealtime,
                            intervaltime: _this.miningForm.intervaltime,
                            auth_key: window.localStorage.getItem('Token')
                        }).then(function(response) {
                            console.log(response)
                            if(response.data.code == -1) {
                                _this.$message.error('过期重新登录！')
                                window.location.href = './login.html'
                            } else if(response.data.code == 201) {
                                _this.$message.error(response.data.msg)
                            } else if(response.data.code == 200) {
                                _this.disabled = true
                            }
                        }).catch(function(error) {
                            console.log(error)
                        })
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                });
                setInterval(function() {
                    axios.post('/mining/frontend/web/inside/outlog',{
                        username: window.localStorage.getItem('username'),
                        platform_name: _this.platform_name,
                        auth_key: window.localStorage.getItem('Token')
                    }).then(function(response) {
                        if(response.data.code == -1) {
                            _this.$message.error('过期重新登录！')
                            window.location.href = './login.html'
                        }
                        _this.balance = response.data.balance
                        if(JSON.stringify(response.data.data) != '{}') {
                            _this.outlog = response.data.data
                        }
                    }).catch(function(error) {
                        console.log(error)
                    })
                },300000)
            },
            stop: function() {
                console.log('停止')
                var _this = this
                 axios.post('/mining/frontend/web/inside/stop',{
                    username: window.localStorage.getItem('username'),
                    platform_name: _this.platform_name,
                    auth_key: window.localStorage.getItem('Token')
                }).then(function(response) {
                    if(response.data.code == -1) {
                        _this.$message.error('过期重新登录！')
                        window.location.href = './login.html'
                    } else if(response.data.code == 200){
                        _this.disabled = false
                    }
                }).catch(function(error) {
                    console.log(error)
                })
            },
            changeOrder: function() {
                var _this = this
                if (_this.value != '') {
                    _this.totalloss_fcoin = '共损失' + _this.value.split("/")[1]
                    _this.totalloss_ordercoin = '共损失' + _this.value.split("/")[0]
=======
                miningForm: {

>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                }
            }
        }
    }
},{
    path:"/invite",
<<<<<<< HEAD
    name:"邀请好友",
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
    component:{
        template:"#invite",
        data: function() {
            return {
<<<<<<< HEAD
                invitation_code: '',
                inviter: [],
                currentPage: 1,
                pageSize: 5,
                totalCount: 0
=======
                invitation_code: invitation_code,
                inviter: [],
                currentPage: 5
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/inviter',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
<<<<<<< HEAD
                if(response.data.code == -1) {
                    _this.$message.error('过期重新登录！')
                    window.location.href = './login.html'
                } else if(response.data.code == 200) {
                    _this.invitation_code = response.data.invitation_code
                    if(JSON.stringify(response.data.data) != '{}') {
                       _this.inviter = response.data.data
                       _this.totalCount = response.data.data.length
                    }
=======
                console.log(response)
                _this.invitation_code = response.data.invitation_code
                console.log(response.data.data == '')
                if(response.data.data != '') {
                    _this.inviter = response.data.data
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                }
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
<<<<<<< HEAD
                _this.pageSize = val;
            },
            handleCurrentChange(val) {
                _this.currentPage = val;
            },
            handleCurrentChange(val) {
                _this.currentRow = val;
                _this.bus.$emit('username',_this.currentRow.username)
            },
            detailClick: function(event){
                var _this = this
                var el = event.currentTarget
                var detailIndex = el.children[0].children[0].innerHTML
                var username = _this.inviter[detailIndex].username
                this.$router.push({path:"/detail", query: {username: username}})
=======
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        }
    }
},{
    path:"/detail",
<<<<<<< HEAD
    name:"邀请明细",
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
    component:{
        template:"#detail",
        data: function() {
            return {
<<<<<<< HEAD
                detail: [],
                currentPage: 1,
                pageSize: 5,
                totalCount: 0,
                username: ''
=======
                invitation_code: invitation_code,
                detail: [],
                currentPage: 5
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        },
        created: function() {
            var _this = this
<<<<<<< HEAD
            var username = _this.$route.query.username
            axios.post('/mining/frontend/web/inside/detail',{
                username: username,
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                if(response.data.code == -1) {
                    _this.$message.error('过期重新登录！')
                    window.location.href = './login.html'
                }
                if(JSON.stringify(response.data.data) != '{}'){
                    _this.detail = response.data.data
                    _this.totalCount = response.data.data.length
                }
=======
            axios.post('/mining/frontend/web/inside/detail',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                console.log(response)
                _this.detail = response.data.data
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
<<<<<<< HEAD
                _this.pageSize = val;
            },
            handleCurrentChange(val) {
                _this.currentPage = val;
=======
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        }
    }
},{
    path:"/finance",
<<<<<<< HEAD
    name:"财务管理",
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
    component:{
        template:"#finance",
        data: function() {
            return {
<<<<<<< HEAD
                recordType: [{
                  value: '0',
                  label: '全部记录'
                },{
                  value: '1',
                  label: '充值记录'
                },{
                  value: '2',
                  label: '扣币记录'
                },{
                  value: '3',
                  label: '返佣记录'
                }],
                value: '0',
                balance: 0.00,
                recharge_address: '',
                account: [],
                currentPage: 1,
                pageSize: 5,
                totalCount: 0
=======
                currentPage: 10,
                type: [{
                  value: '1',
                  label: '充值记录 '
                },{
                  value: '2',
                  label: '扣币记录 '
                },{
                  value: '3',
                  label: '返佣记录 '
                }],
                value: '',
                balance: '',
                recharge_address: '',
                account: []
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/account',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
<<<<<<< HEAD
                console.log('财务管理')
                console.log(response)
                if(response.data.code == -1) {
                    _this.$message.error('过期重新登录！')
                    window.location.href = './login.html'
                }
                if (response.data.length != 0){
                    _this.balance = response.data.balance
                    _this.recharge_address = response.data.recharge_address
                    if(JSON.stringify(response.data.data) != '{}'){
                        _this.account = response.data.data
                        for(var i=0;i<_this.account.length;i++){
                            _this.account[i].type = _this.recordType[_this.account[i].type].label
                        }
                        _this.totalCount = response.data.data.length
                    }
                }
=======
                console.log(response)
                _this.balance = response.data.balance
                _this.recharge_address = response.data.recharge_address
                _this.account = response.data.data
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
<<<<<<< HEAD
                _this.pageSize = val;
            },
            handleCurrentChange(val) {
                _this.currentPage = val;
            },
            changeAccount: function() {
                var _this = this
                axios.post('/mining/frontend/web/inside/account',{
                    username: window.localStorage.getItem('username'),
                    auth_key: window.localStorage.getItem('Token')
                }).then(function(response) {
                    if(response.data.code == -1) {
                        _this.$message.error('过期重新登录！')
                        window.location.href = './login.html'
                    }
                    if (JSON.stringify(response.data.data) != '{}'){
                        if (_this.value == 0) {
                            _this.account = response.data.data
                            _this.totalCount = response.data.data.length
                            for(var i=0;i<_this.account.length;i++){
                                _this.account[i].type = _this.recordType[_this.account[i].type].label
                            }
                        } else if (_this.value != 0){
                            _this.account = []
                            _this.totalCount = 0
                            for(var i=0;i<response.data.data.length;i++){
                                var type = response.data.data[i].type
                                if(type == _this.value) {
                                    _this.account.push(response.data.data[i])
                                    _this.totalCount = _this.account.length
                                }
                            }
                            for(var i=0;i<_this.account.length;i++){
                                _this.account[i].type = _this.recordType[_this.account[i].type].label
                            }
                        }
                    }
                }).catch(function(error) {
                    console.log(error)
                })
=======
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            }
        }
    }
}]
var router = new VueRouter({
    routes
});

<<<<<<< HEAD
const TIME_COUNT = 60;
=======
const TIME_COUNT = 5;
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43

var page = new Vue({
    el: '#page',
    router,
    data: {
        logo: './img/pic_logo_3.png',
        loginForm: {
            phone: '',
            pass: ''
        },
        loginrules: {
            phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: validatePhone }
            ],
            pass: [
                { required: true, message: '请输入密码', trigger: 'change' }
            ]
        },
        vcode: '发送验证码',
        show: true,
        count: '',
        timer: null,
        disabled: '',
        signupForm: {
            phone: '',
            verify: '',
            pass: '',
            checkpass: '',
            invitation_code: ''
        },
        signuprules: {
            phone: [
                { required: true, message: '请输入手机号码' , trigger: 'blur' },
                { validator: validatePhone }
            ],
            verify: [
                { required: true, message: '请输入验证码', trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' },
                { min: 6, message: '密码长度至少在6个字符', trigger: 'blur' }
            ],
            checkpass: [
                { validator: validateCheckPass, trigger: 'blur' },
                { min: 6, message: '密码长度至少在6个字符', trigger: 'blur' }
            ]
        },
        forgotForm: {
            phone: '',
            verify: '',
            pass: '',
            checkpass: ''
        },
        forgotrules: {
            phone: [
                { required: true, message: '请输入手机号码' , trigger: 'blur' },
                { validator: validatePhone }
            ],
            verify: [
                { required: true, message: '请输入验证码', trigger: 'blur' }
            ],
            pass: [
                { validator: validateforgotPass, trigger: 'blur' },
                { min: 6, message: '密码长度至少在6个字符', trigger: 'blur' }
            ],
            checkpass: [
                { validator: validateCheckforgotPass, trigger: 'blur' },
                { min: 6, message: '密码长度至少在6个字符', trigger: 'blur' }
            ]
        },
        isCollapse: false,
<<<<<<< HEAD
        avatar: './img/pic_head.png',
        username: '用户名',
        levelList: null
    },
    created: function() {
        _this = this
        // axios.post('/mining/frontend/web/mining/checklogin',{
        //     auth_key: window.localStorage.Token
        // }).then(function(response) {
        //     if(response.data.code == 200) {
        //         window.location.href="./index.html#index"
        //     } else if(response.data.code == 500) {
        //         console.log('未登录状态，需要正常登录')
        //     }
        // })
        this.getBreadcrumb()
        this.username = window.localStorage.username
    },
    watch: {
       $route() {
         this.getBreadcrumb();
       }
=======
        avatar: './img/pic_head.png'
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
    },
    methods: {
        submitloginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/mining/frontend/web/mining/login', {
                        username: this.loginForm.phone,
<<<<<<< HEAD
                        password: this.loginForm.pass,
                        auth_key: window.localStorage.Token
=======
                        password: this.loginForm.pass
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                    }).then(function(response) {
                        console.log(response)
                        var code = response.data.code
                        if(code == 200) {
<<<<<<< HEAD
                            console.log(page.loginForm.phone)
                            window.localStorage.setItem('username',page.loginForm.phone)
                            window.localStorage.setItem('Token',response.data.auth_key)
                            window.location.href="./index.html#index"
=======
                            window.localStorage.setItem("username",page.loginForm.phone)
                            window.localStorage.setItem("Token",response.data.auth_key)
                            window.location.href="./index.html#mining"
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                        } else if(code == 201) {
                            page.$message.error('账号不存在!');
                        } else if(code == 202) {
                            page.$message.error('账户密码不匹配!');
                        }
                    }).catch(function(error) {
                        console.log(error)
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitsignupForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/mining/frontend/web/mining/signup', {
                        username: this.signupForm.phone,
                        phone_code: this.signupForm.verify,
                        password: this.signupForm.pass,
                        password_compare: this.signupForm.checkpass,
                        invitation_code: this.signupForm.invitation_code
                    }).then(function(response) {
                        var code = response.data.code
                        if(code == 200) {
                            page.$message.success('注册成功!');
<<<<<<< HEAD
                            window.localStorage.setItem("username",page.loginForm.phone)
                            window.localStorage.setItem("Token",response.auth_key)
                            window.location.href="./index.html#index"
=======
                            window.localStorage.setItem("Token",response.data.auth_key)
                            window.location.href="./index.html#mining"
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                        } else if (code == 201) {
                            page.$message.error('验证码错误!');
                        } else if (code == 202) {
                            page.$message.error('推荐码不存在!');
                        } else {
                            console.log('500错误')
                        }
                    }).catch(function(error) {
                        console.log(error)
                    });
                } else {
                    console.log('error submit!!')
                    return false;
                }
            })
        },
        getVCode(signupForm) {
            axios.post('/mining/frontend/web/mining/email', {
                phone: this.signupForm.phone
            }).then(function(response) {
                console.log(response)
                var code = response.data.code
                if (code == 200) {
                    var _this = page
                    if (_this.signupForm.phone !== "" && phoneReg.test(_this.signupForm.phone)) {
                        if (!_this.timer) {
                            _this.count = TIME_COUNT;
                            _this.show = false;
                            _this.timer = setInterval(() => {
                                if (_this.count > 0 && _this.count <= TIME_COUNT) {
                                    _this.count--;
                                } else {
                                    _this.show = true;
                                    _this.disabled = ''
                                    clearInterval(_this.timer);
                                    _this.timer = null;
                                    _this.vcode = '重新发送验证码'
                                }
                            }, 1000)
                            if (_this.show == false) {
                                _this.disabled = 'disabled'
                            }
                        }
                    } else if (_this.signupForm.phone === "") {
                        _this.$message.warning('请输入手机号码');
                    }
                } else if (code ==  203) {
                    page.$message.error('该手机号码已经注册!');
                } else if (code ==  204) {
                    page.$message.error('请输入正确格式的手机号码!');
<<<<<<< HEAD
                } else if (code ==  206) {
                    page.$message.warning('发送验证码过于频繁1分钟后重试');
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                }
            }).catch(function(error) {
                console.log(error)
            });
        },
        submitforgotForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/mining/frontend/web/mining/forgetpass', {
                        username: this.forgotForm.phone,
                        phone_code: this.forgotForm.verify,
                        password: this.forgotForm.pass,
                        password_compare: this.forgotForm.checkpass
                    }).then(function(response) {
                        var code = response.data.code
                        if(code == 200) {
                            page.$message.success('修改成功!');
<<<<<<< HEAD
                            setTimeout(function(){
                                window.localStorage.setItem("Token",response.auth_key)
                            }, 2000)
                            window.location.href="./index.html#index"
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                        } else if (code == 201) {
                            page.$message.error('验证码错误!');
                        } else {
                            console.log('500错误')
                        }
                    }).catch(function(error) {
                        console.log(error)
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getforgotCode(forgotForm) {
            axios.post('/mining/frontend/web/mining/email', {
                phone: this.forgotForm.phone,
                type: 1
            }).then(function(response) {
                console.log(response)
                var code = response.data.code
                if (code == 200) {
                    var _this = page
                    if (_this.forgotForm.phone !== "" && phoneReg.test(_this.forgotForm.phone)) {
                        if (!_this.timer) {
                            _this.count = TIME_COUNT;
                            _this.show = false;
                            _this.timer = setInterval(() => {
                                if (_this.count > 0 && _this.count <= TIME_COUNT) {
                                    _this.count--;
                                } else {
                                    _this.show = true;
                                    _this.disabled = ''
                                    clearInterval(_this.timer);
                                    _this.timer = null;
                                    _this.vcode = '重新发送验证码'
                                }
                            }, 1000)
                            if (_this.show == false) {
                                _this.disabled = 'disabled'
                            }
                        }
                    } else if (_this.forgotForm.phone === "") {
                        _this.$message.warning('请输入手机号码');
                    }
<<<<<<< HEAD
                } else if (code ==  204) {
                    page.$message.error('请输入正确格式的手机号码!');
                } else if (code ==  206) {
                    page.$message.warning('发送验证码过于频繁1分钟后重试');
=======
                }  else if (code ==  204) {
                    page.$message.error('请输入正确格式的手机号码!');
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
                }
            }).catch(function(error) {
                console.log(error)
            });
        },
        collapse: function() {
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleCommand(command) {
            if(command == 'account') {
                console.log('account')
<<<<<<< HEAD
                this.$router.push({path:"/finance"})
=======
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
            } else if(command == 'logout') {
                console.log('logout')
                this.$confirm('确认退出登录？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
<<<<<<< HEAD
                   axios.post('/mining/frontend/web/inside/logout',{
                      auth_key: window.localStorage.Token
                   }).then(function() {
                      window.localStorage.setItem('Token','')
                      window.location.href = './login.html'
                   })
                }).catch(() => {
                });
            }
        },
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
    }
})
=======
                   window.localStorage.setItem('Token', '')
                   window.location.href = './login.html'
                }).catch(() => {
                });
            }
        }
    }
})
console.log(page.loginForm.phone)
>>>>>>> 3fb0979033f563ea22bfe6334acc8167105edb43
