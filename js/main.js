var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
var validatePhone = (rule, value, callback) => {
    if (!phoneReg.test(value)) {
        callback(new Error('请输入正确格式的手机号码'));
    } else {
        callback();
    }
};
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
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var clipboard = new ClipboardJS('.btn_fuzhi')
clipboard.on('success', function(e) {
    console.log(e)
    page.$message.success('复制成功')
})
clipboard.on('error', function(e) {
    console.log(e)
    page.$message.error('复制失败')
})


var invitation_code = GetQueryString('invitation_code')
Vue.prototype.axios = axios
var routes = [{
    path:"/mining",
    component:{
        template:"#mining",
        data: function() {
            return {
                miningForm: {

                }
            }
        }
    }
},{
    path:"/invite",
    component:{
        template:"#invite",
        data: function() {
            return {
                invitation_code: invitation_code,
                inviter: [],
                currentPage: 5
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/inviter',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                console.log(response)
                _this.invitation_code = response.data.invitation_code
                console.log(response.data.data == '')
                if(response.data.data != '') {
                    _this.inviter = response.data.data
                }
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            }
        }
    }
},{
    path:"/detail",
    component:{
        template:"#detail",
        data: function() {
            return {
                invitation_code: invitation_code,
                detail: [],
                currentPage: 5
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/detail',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                console.log(response)
                _this.detail = response.data.data
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            }
        }
    }
},{
    path:"/finance",
    component:{
        template:"#finance",
        data: function() {
            return {
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
            }
        },
        created: function() {
            var _this = this
            axios.post('/mining/frontend/web/inside/account',{
                username: window.localStorage.getItem('username'),
                auth_key: window.localStorage.getItem('Token')
            }).then(function(response) {
                console.log(response)
                _this.balance = response.data.balance
                _this.recharge_address = response.data.recharge_address
                _this.account = response.data.data
            }).catch(function(error) {
                console.log(error)
            })
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            }
        }
    }
}]
var router = new VueRouter({
    routes
});

const TIME_COUNT = 5;

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
        avatar: './img/pic_head.png'
    },
    methods: {
        submitloginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/mining/frontend/web/mining/login', {
                        username: this.loginForm.phone,
                        password: this.loginForm.pass
                    }).then(function(response) {
                        console.log(response)
                        var code = response.data.code
                        if(code == 200) {
                            window.localStorage.setItem("username",page.loginForm.phone)
                            window.localStorage.setItem("Token",response.data.auth_key)
                            window.location.href="./index.html#mining"
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
                            window.localStorage.setItem("Token",response.data.auth_key)
                            window.location.href="./index.html#mining"
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
                }  else if (code ==  204) {
                    page.$message.error('请输入正确格式的手机号码!');
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
            } else if(command == 'logout') {
                console.log('logout')
                this.$confirm('确认退出登录？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                   window.localStorage.setItem('Token', '')
                   window.location.href = './login.html'
                }).catch(() => {
                });
            }
        }
    }
})
console.log(page.loginForm.phone)