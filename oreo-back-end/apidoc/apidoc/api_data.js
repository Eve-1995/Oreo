define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "../src/public/apidoc/main.js",
    "group": "F__Development_Code_github_Oreo_oreo_back_end_src_public_apidoc_main_js",
    "groupTitle": "F__Development_Code_github_Oreo_oreo_back_end_src_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "登陆",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>编号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateTime",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>用户等级 0:普通用户 1:管理员</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "liveCity",
            "description": "<p>居住城市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hometown",
            "description": "<p>家乡</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "birth",
            "description": "<p>生日</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>公司</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "univercity",
            "description": "<p>大学</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eduacation",
            "description": "<p>教育程度</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 211": [
          {
            "group": "Error 211",
            "optional": false,
            "field": "message",
            "description": "<p>帐号或密码不正确</p>"
          }
        ],
        "Error 666": [
          {
            "group": "Error 666",
            "optional": false,
            "field": "message",
            "description": "<p>恭喜你获得[四魂之玉碎片I * 1]!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "../src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "PostUserLogin"
  }
] });
