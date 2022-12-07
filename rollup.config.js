import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import {terser } from 'rollup-plugin-terser'


export default {
  input: 'src/index.js',
   // input: 'src/modules/jquery.xhb.plugin.js',
  output: {
    file: 'dist/index.js',
	// file: 'dist/jquery.xhb.plugin.min.js',
    format: 'cjs',//文件输出格式
	name:'xhb007'//包全局变量命名
  },
  plugins:[
	  resolve(),
	  commonjs(),
	  terser()
],
};

