# formalEgg

一个属于自己构思的项目

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
$ open swagger http://127.0.0.1:7001/public/swagger/index.html
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### controller下的文件配置
- controller下的文件进行如下配置，以便用于加载swagger
```
let methodParm = {
    topLogo: {
        role: 'admin',  //角色名，与js文件名相同，也对应于swagger的大分类
        register: {    //  该文件下的方法函数名
            param: {   //   入参参数
                userName: {type: 'string'},
                phone: {type: 'string'},
                password: {type: 'string'},
                realName: {type: 'string',optional: true}
            },
            ginseng: {   //出参参数，因为无法自动判定出参是什么所以需要手动配置
                code: {type: 'int'},
                message: {type: 'string'}
            },
            rule: {      // 配置需要准守的规则，可以自己定义
                desc: '',
                url: '',
                method: 'register'
            }
        },
        login: {
            param: {
                userName: {type: 'string'},
                password: {type: 'string'}
            },
            ginseng: {
                code: {type: 'int'},
                message: {type: 'string'}
            },
            rule: {
                desc: '',
                url: '',
                method: 'login'
            }
        }
    }
    
}
app.loadApiswagger(methodParm);   //将参数配置放到公共组件的扩展方法中
```
- swagger.js是关于swagger文档格式的拼接方法，其在router.js文件中引入并配置
[egg]: https://eggjs.org