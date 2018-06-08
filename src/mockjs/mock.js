import Mock from 'mockjs'

export default {
    mockData() {
        Mock.mock('/api/user', {
            "code": "000",
            "datas": {
                "name": "@cname", // 内容：npm安装后 mockjs/src/mock/random/xxx.js
                "area": "@province(true)",
                "identity": "超级管理员"
            }
        });
        Mock.mock('/api/getTable', {
            "code": "000",
            "datas|5-20": [{
                "date": '@date("yyyy-MM-dd")',
                "name": "@cname",
                "address": "@county(true)"
            }]
        });
        Mock.mock('/api/getOptions', {
            "code": "000",
            "datas|5-7": [{
                "value": "@natural(1-10000)",
                "label": "@province",
                "children|5-8": [{
                    "value": "@natural(1-10000)",
                    "label": "@city",
                }]
            }],
            "places|9-18": [{
                "value": "@natural(1-10000)",
                "label": "@city(true)"
            }]
        });
        Mock.mock('/api/getTableData', 'post', function(options) {
            var params = JSON.parse(options.body);
            var pageSize = params.pageSize;
            var originData = Mock.mock({
                "datas|200": [{
                    "date": '@date("yyyy-MM-dd")',
                    "name": "@cname",
                    "address": "@county(true)"
                }]
            })
            return {
                code: "000",
                datas: originData.datas.slice(0, pageSize)
            }
        })
    }
}