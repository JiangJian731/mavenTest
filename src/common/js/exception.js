/**
 * 全局异常处理方法
 */
export default {

    /**
     *
     * @param vm
     * @param err
     */
    handle: function (vm, err) {
        if(!err){
            return;
        }
        var result = err.response.body;

        if(result != null ){
          vm.$message.error( result.message);

        }else if(err.status == 504){
          vm.$message.error( '网络出错，请稍后重试');

        }else{
          vm.$message.error( 'err.message');

        }
    }

};
