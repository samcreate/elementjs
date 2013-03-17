var onReady = function(obj){
	if (!document.createElement('canvas').getContext) {
		//no work
		obj.error({event:'error',info:"Canvas support was not detected."});
	}else{
		//it works
		obj.success({event:'success',info:"Canvas support detected!"})
	}
}