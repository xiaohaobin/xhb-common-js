
import xhb from './modules/xhb.plugin.js'
//设置log
function makeMulti(string){
	let l = new String(string);
	l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
	return l
}
let _string = function(){
	/*                                                                       
	__/\\\_______/\\\__/\\\________/\\\__/\\\\\\\\\\\\\___                        
	 _\///\\\___/\\\/__\/\\\_______\/\\\_\/\\\/////////\\\_                       
	  ___\///\\\\\\/____\/\\\_______\/\\\_\/\\\_______\/\\\_                      
	   _____\//\\\\______\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\__                     
	    ______\/\\\\______\/\\\/////////\\\_\/\\\/////////\\\_                    
	     ______/\\\\\\_____\/\\\_______\/\\\_\/\\\_______\/\\\_                   
	      ____/\\\////\\\___\/\\\_______\/\\\_\/\\\_______\/\\\_                  
	       __/\\\/___\///\\\_\/\\\_______\/\\\_\/\\\\\\\\\\\\\/__                 
	        _\///_______\///__\///________\///__\/////////////____   @xiaohaobin */
};

const setColor = (str)=>{
  console.log(`%c${str}`,'background-image: linear-gradient(#2a2a2a, #000); color:#B3CAFA;text-decoration: underline;');
};
setColor(makeMulti(_string));

xhb.version = '2.6.1';
export default xhb