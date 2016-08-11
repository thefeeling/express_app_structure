module.exports = {
	"object" : (code, msg, data) => {
		let obj = {};
		obj.code = (typeof code === "number" && code > 0) ? code : 500;
		obj.msg = (typeof msg === "string" && msg) ? msg : "";
		if(data){
			obj.data = data;
		}
		return Object.assign({}, obj);
	}
}