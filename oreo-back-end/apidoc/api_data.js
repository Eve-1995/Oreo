define({ "api": [
  {
    "type": "Delete",
    "url": "/classification/delete",
    "title": "删除",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([article, delete])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "DeleteClassificationDelete"
  },
  {
    "type": "Get",
    "url": "/article/findBasicInfo",
    "title": "查看文章内容",
    "description": "<p>查看文章详情时请求的接口</p>",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文章名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"id\": 1,\n  \"name\": \"SSR - Angular\",\n  \"content\": \"SSR是服务端渲染的技术\",\n  \"createTime\": \"2019-05-01T09:07:24.093Z\",\n  \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n  \"likeAmount\": 16,\n  \"collectAmount\": 22,\n  \"commentAmount\": 22\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "GetArticleFindbasicinfo"
  },
  {
    "type": "Get",
    "url": "/article/findByClassification",
    "title": "获取特定类别的文章列表",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>类别名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles",
            "description": "<p>文章列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles.id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles.name",
            "description": "<p>文章名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles.likeAmount",
            "description": "<p>文章点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles.collectAmount",
            "description": "<p>文章收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "articles.commentAmount",
            "description": "<p>文章评论总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"name\": \"前端技巧\",\n  \"articles\": [{\n     \"id\": 1,\n     \"name\": \"防抖与节流\"\n     \"likeAmount\": 1,\n     \"collectAmount\": 2,\n     \"commentAmount\": 3\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "GetArticleFindbyclassification"
  },
  {
    "type": "Get",
    "url": "/article/findDetail",
    "title": "获取特定文章信息",
    "description": "<p>用于编辑文章, 与findBasicInfo有一定的重复, 后期考虑合二为一</p>",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "1",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文章名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>文章关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "classifications",
            "description": "<p>类别</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "classifications.id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classifications.name",
            "description": "<p>类别名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classifications.keywords",
            "description": "<p>类别关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classifications.createTime",
            "description": "<p>类别创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "classifications.updateTime",
            "description": "<p>类别更新时间</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n \"id\": 1,\n \"name\": \"SSR - Angular\",\n \"content\": \"SSR是服务端渲染的技术\",\n \"keywords\": \"SSR是服务端渲染的技术\",\n \"createTime\": \"2019-05-01T09:07:24.093Z\",\n \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n \"classifications\": [{\n  \"id\": 1,\n  \"name\": \"Angular\",\n  \"keywords\": \"Google\",\n  \"createTime\": \"2019-05-01T09:07:24.093Z\",\n  \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "GetArticleFinddetail"
  },
  {
    "type": "Get",
    "url": "/article/findTableInfo",
    "title": "获取全部文章信息",
    "description": "<p>用于[管理中心]的表格数据</p>",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>文章名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"ng\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"name\": \"C语言\",\n  \"likeAmount\": 16,\n  \"collectAmount\": 22,\n  \"commentAmount\": 22\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "GetArticleFindtableinfo"
  },
  {
    "type": "Post",
    "url": "/article/save",
    "title": "新增",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文章名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "classifications",
            "description": "<p>类别</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "classifications.id",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"Typescript VS Javascript\",\n \"content\": \"其实本质是一样的\"\n \"classifications\": [\n   {\n     \"id\": 5\n   }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"添加成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"修改成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([article, save])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/article/article.controller.ts",
    "groupTitle": "Article",
    "name": "PostArticleSave"
  },
  {
    "type": "Post",
    "url": "/auth/login",
    "title": "登陆",
    "group": "Auth",
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
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"phone\": 123456789,\n \"password\": 123456789\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>用户凭证</p>"
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
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>用户类别 0:普通用户,1:管理员</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\",\n  \"nickname\": \"Eve\",\n  \"level\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"2\",\n  \"message\": \"帐号或密码不正确\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"4\",\n  \"message\": \"恭喜你获得[四魂之玉碎片I * 1]!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/auth/auth.controller.ts",
    "groupTitle": "Auth",
    "name": "PostAuthLogin"
  },
  {
    "type": "Post",
    "url": "/auth/save",
    "title": "注册",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "liveCity",
            "description": "<p>居住城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "hometown",
            "description": "<p>家乡</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "birth",
            "description": "<p>生日</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>公司</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "univercity",
            "description": "<p>大学</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "eduacation",
            "description": "<p>教育程度</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"nickname\": \"Eve\",\n \"phone\": \"123456789\",\n \"password\": \"huangmenji\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"注册成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"2\",\n  \"message\": \"手机号已存在\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([auth, save])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/auth/auth.controller.ts",
    "groupTitle": "Auth",
    "name": "PostAuthSave"
  },
  {
    "type": "Delete",
    "url": "/classification/delete",
    "title": "删除",
    "group": "Classification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([classification, delete])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "DeleteClassificationDelete"
  },
  {
    "type": "Get",
    "url": "/classification/findDetail",
    "title": "获取特定类别信息",
    "group": "Classification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类别名</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"id\": 1,\n  \"createTime\": \"2019-05-01T09:07:24.093Z\",\n  \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n  \"name\": \"C语言\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "GetClassificationFinddetail"
  },
  {
    "type": "Get",
    "url": "/classification/findFirst",
    "title": "获取第一个类别",
    "group": "Classification",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类别名</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"id\": 1,\n  \"createTime\": \"2019-05-01T09:07:24.093Z\",\n  \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n  \"name\": \"C语言\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "GetClassificationFindfirst"
  },
  {
    "type": "Get",
    "url": "/classification/findNames",
    "title": "获取类别名称",
    "group": "Classification",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类别名</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"createTime\": \"2019-05-01T09:07:24.093Z\",\n  \"updateTime\": \"2019-05-04T15:55:57.000Z\",\n  \"name\": \"C语言\",\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "GetClassificationFindnames"
  },
  {
    "type": "Get",
    "url": "/classification/findTableInfo",
    "title": "获取全部类别信息",
    "group": "Classification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>类别名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"ng\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "articleAmount",
            "description": "<p>文章总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"name\": \"C语言\",\n  \"articleAmount\": 6,\n  \"likeAmount\": 16,\n  \"collectAmount\": 22,\n  \"commentAmount\": 22\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "GetClassificationFindtableinfo"
  },
  {
    "type": "Post",
    "url": "/classification/save",
    "title": "新增",
    "group": "Classification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>文章名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"Typescript VS Javascript\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"添加成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"修改成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([classification, save])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/classification/classification.controller.ts",
    "groupTitle": "Classification",
    "name": "PostClassificationSave"
  },
  {
    "type": "Get",
    "url": "/comment/getCommentsByArticle",
    "title": "获取文章的评论列表",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"6\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>评论id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>评论内容</p>"
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
            "type": "Object",
            "optional": false,
            "field": "fromUser",
            "description": "<p>创建祖先评论的用户</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fromUser.id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fromUser.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fromUser.level",
            "description": "<p>用户类别 0:普通用户,1:管理员</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "children",
            "description": "<p>回复该条评论的评论集合</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "children.id",
            "description": "<p>评论id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "children.content",
            "description": "<p>评论内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "children.createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "toUser",
            "description": "<p>被回复者</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "toUser.id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toUser.nickname",
            "description": "<p>用户昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "toUser.level",
            "description": "<p>用户类别 0:普通用户,1:管理员</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rootCommentId",
            "description": "<p>祖先评论id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 13,\n  \"content\": \"第一篇文章收藏量有点高啊。。\",\n  \"createTime\": \"2019-05-04T16:21:40.187Z\",\n  \"fromUser\":\n  {\n      \"id\": 16,\n      \"nickname\": \"周家有女\",\n      \"level\": 0\n  },\n  \"children\": [\n    {\n      \"id\": 42,\n      \"content\": \"2\",\n      \"createTime\": \"2019-07-06T15:20:12.287Z\",\n      \"fromUser\":\n      {\n          \"id\": 1,\n          \"nickname\": \"Eve\",\n          \"level\": 1\n      },\n      \"toUser\":\n      {\n          \"id\": 16,\n          \"nickname\": \"周家有女\",\n          \"level\": 0\n      },\n      \"rootCommentId\": 13\n    }\n  ]\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comment",
    "name": "GetCommentGetcommentsbyarticle"
  },
  {
    "type": "Post",
    "url": "/comment/save",
    "title": "添加评论",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>留言内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "article",
            "description": "<p>文章</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "article.id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "parentComment",
            "description": "<p>回复的父评论</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "parentComment.id",
            "description": "<p>父评论id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "rootComment",
            "description": "<p>回复的祖先评论</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "rootComment.id",
            "description": "<p>祖先评论id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"content\":\"上海志愿者大妈: 你是什么垃圾?!\",\n \"article\":{\n   \"id\": 6\n },\n \"parentComment\":{\n   \"id\": 15\n },\n \"rootComment\":{\n   \"id\": 16\n }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"评论成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/comment/comment.controller.ts",
    "groupTitle": "Comment",
    "name": "PostCommentSave"
  },
  {
    "type": "Delete",
    "url": "/fragment/delete",
    "title": "删除",
    "group": "Fragment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>碎片id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([fragment, delete])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/fragment/fragment.controller.ts",
    "groupTitle": "Fragment",
    "name": "DeleteFragmentDelete"
  },
  {
    "type": "Get",
    "url": "/fragment/findAll",
    "title": "获取碎片列表",
    "group": "Fragment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "describe",
            "description": "<p>碎片描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "got",
            "description": "<p>是否已获得</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>碎片名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n \"describe\": 1,\n \"got\": \"如果时间定格, 就不会人走茶凉\",\n \"name\": \"只若初见\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/fragment/fragment.controller.ts",
    "groupTitle": "Fragment",
    "name": "GetFragmentFindall"
  },
  {
    "type": "Get",
    "url": "/fragment/findDetail",
    "title": "获取特定碎片信息",
    "group": "Fragment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>类别id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>碎片id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>碎片名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "describe",
            "description": "<p>碎片描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "usersAmount",
            "description": "<p>已获取该碎片的用户数量</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n \"id\": 1,\n \"name\": \"只若初见\",\n \"describe\": \"如果时间定格, 就不会人走茶凉\",\n \"usersAmount\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/fragment/fragment.controller.ts",
    "groupTitle": "Fragment",
    "name": "GetFragmentFinddetail"
  },
  {
    "type": "Get",
    "url": "/fragment/findTableInfo",
    "title": "获取全部类别信息",
    "group": "Fragment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>类别名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"只若初见\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>碎片id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>碎片名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "describe",
            "description": "<p>碎片描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "usersAmount",
            "description": "<p>已获取该碎片的用户数量</p>"
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"name\": \"只若初见\",\n  \"describe\": \"如果时间定格, 就不会人走茶凉\",\n  \"usersAmount\": 0\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/fragment/fragment.controller.ts",
    "groupTitle": "Fragment",
    "name": "GetFragmentFindtableinfo"
  },
  {
    "type": "Post",
    "url": "/fragment/save",
    "title": "新增",
    "group": "Fragment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>碎片名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "describe",
            "description": "<p>碎片描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"只若初见\",\n \"describe\": \"如果时间定格, 就不会人走茶凉\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"添加成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"修改成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"2\",\n  \"message\": \"碎片名称不能重复\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([fragment, save])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/fragment/fragment.controller.ts",
    "groupTitle": "Fragment",
    "name": "PostFragmentSave"
  },
  {
    "type": "Delete",
    "url": "/user/delete",
    "title": "删除",
    "description": "<p>该操作将触发级联删除, 如用户的收藏记录等一并删除.</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"userId\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"3\",\n  \"message\": \"发生未知错误, 请私信博主错误信息([user, delete])\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "DeleteUserDelete"
  },
  {
    "type": "Get",
    "url": "/user/actionStatus",
    "title": "用户与文章的关系",
    "description": "<p>获取用户是否已点赞、收藏过该文章</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"articleId\": \"6\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hasCollect",
            "description": "<p>是否已收藏</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hasLike",
            "description": "<p>是否已点赞</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"hasCollect\": true,\n  \"hasLike\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GetUserActionstatus"
  },
  {
    "type": "Get",
    "url": "/user/findByFilter",
    "title": "根据用户名查找用户",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>用户名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"name\": \"E\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"nickname\": \"Eve\",\n  \"createTime\": \"2019-05-01T09:05:15.958Z\",\n  \"updateTime\": \"2019-05-04T16:42:38.000Z\",\n  \"phone\": \"123456789\",\n  \"realname\": \"前夕\",\n  \"email\": \"948832626@qq.com\",\n  \"liveCity\": \"上海\",\n  \"hometown\": \"温州\",\n  \"birth\": \"1995-09-17\",\n  \"company\": \"上海易校信息科技有限公司\",\n  \"univercity\": \"浙江水利水电学院\",\n  \"eduacation\": \"本科\",\n  \"likeAmount\": 2,\n  \"collectAmount\": 8,\n  \"commentAmount\": 9\n}]",
          "type": "json"
        }
      ],
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
            "field": "realname",
            "description": "<p>真实姓名</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GetUserFindbyfilter"
  },
  {
    "type": "Get",
    "url": "/user/findTableInfo",
    "title": "获取全部用户信息",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 1,\n  \"nickname\": \"Eve\",\n  \"createTime\": \"2019-05-01T09:05:15.958Z\",\n  \"updateTime\": \"2019-05-04T16:42:38.000Z\",\n  \"phone\": \"123456789\",\n  \"realname\": \"前夕\",\n  \"email\": \"948832626@qq.com\",\n  \"liveCity\": \"上海\",\n  \"hometown\": \"温州\",\n  \"birth\": \"1995-09-17\",\n  \"company\": \"上海易校信息科技有限公司\",\n  \"univercity\": \"浙江水利水电学院\",\n  \"eduacation\": \"本科\",\n  \"likeAmount\": 2,\n  \"collectAmount\": 8,\n  \"commentAmount\": 9\n}]",
          "type": "json"
        }
      ],
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
            "field": "realname",
            "description": "<p>真实姓名</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GetUserFindtableinfo"
  },
  {
    "type": "Get",
    "url": "/user/getUser",
    "title": "获取登录用户信息",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n \"id\": 1,\n \"nickname\": \"Eve\",\n \"createTime\": \"2019-05-01T09:05:15.958Z\",\n \"updateTime\": \"2019-05-04T16:42:38.000Z\",\n \"phone\": \"123456789\",\n \"realname\": \"前夕\",\n \"email\": \"948832626@qq.com\",\n \"liveCity\": \"上海\",\n \"hometown\": \"温州\",\n \"birth\": \"1995-09-17\",\n \"company\": \"上海易校信息科技有限公司\",\n \"univercity\": \"浙江水利水电学院\",\n \"eduacation\": \"本科\",\n \"likeAmount\": 2,\n \"collectAmount\": 8,\n \"commentAmount\": 9\n}",
          "type": "json"
        }
      ],
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
            "field": "realname",
            "description": "<p>真实姓名</p>"
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
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GetUserGetuser"
  },
  {
    "type": "Get",
    "url": "/user/getUserInfoByToken",
    "title": "根据token获取用户信息",
    "description": "<p>该操作仅在项目初始化时会触发.</p>",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"nickname\": \"Eve\",\n  \"level\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GetUserGetuserinfobytoken"
  },
  {
    "type": "GMet",
    "url": "/user/getCollections",
    "title": "获取用户的收藏文章列表",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>文章名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likeAmount",
            "description": "<p>点赞总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "collectAmount",
            "description": "<p>收藏总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "commentAmount",
            "description": "<p>评论总数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response-Example",
          "content": "[{\n  \"id\": 6,\n  \"name\": \"Angular从入门到放弃\",\n  \"likeAmount\": \"2\",\n  \"collectAmount\": \"9\",\n  \"commentAmount\": \"8\",\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "GmetUserGetcollections"
  },
  {
    "type": "Post",
    "url": "/user/collect",
    "title": "收藏文章",
    "description": "<p>若用户未收藏过此文章则执行收藏操作, 反之取消收藏</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"articleId\": 6\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"收藏成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"取消收藏成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "PostUserCollect"
  },
  {
    "type": "Post",
    "url": "/user/like",
    "title": "点赞文章",
    "description": "<p>若用户未点赞过此文章则执行点赞操作, 反之取消点赞</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n \"articleId\": 6\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"点赞成功\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example",
          "content": "{\n  \"tipType\": \"1\",\n  \"message\": \"取消点赞成功\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipType",
            "description": "<p>弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示文本</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/user/user.controller.ts",
    "groupTitle": "User",
    "name": "PostUserLike"
  }
] });
