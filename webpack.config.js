var path = require('path');
var VueLoadPlugin = require("vue-loader/lib/plugin.js");
module.exports = {
    mode:"development",
    entry:'./src/main.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|bmp|jpeg|gif)$/,
                use:[{
                    loader:'url-loader',
                }]
            },
            {
                test:/\.(ttf|svg|woff|woff2|eot)$/,use:['url-loader']
            },
            //匹配js的结尾的文件，交给babel-loader来处理
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.js"
        }
    },
    plugins:[
        new VueLoadPlugin()
    ]
}
