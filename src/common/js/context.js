/**
 * 全局异常处理方法
 */
export default {

   /**
    * 获取上下文名字
    */
   getContextName: function(){
    return "CONTEXT";
   },

    /**
     * 持久上下文
     *
     * @param context
     */
    persist: function (context) {
        if(!context){
            return;
        }
        var contextName = this.getContextName();
        sessionStorage.setItem(contextName, JSON.stringify(context));
    },

    /**
    * 移除上下文
    */
    remove: function () {
      var contextName = this.getContextName();
      sessionStorage.removeItem(contextName);
    },

    /**
     *获取上下文
     */
    get: function () {
      var contextName = this.getContextName();
      var data = sessionStorage.getItem(contextName);
      return JSON.parse(data);
    },

    /**
    * 获取令牌
    */
    getToken: function () {
      var context = get();
      return context.token;
    }
};
