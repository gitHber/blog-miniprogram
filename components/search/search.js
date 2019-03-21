// components/search/search.js
Component({
  externalClasses: ['myclass'],
  properties: {

  },
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput: function(e) {
      this.value = e.detail.value
    },
    onConfirm: function(e, op){
      if(this.value) {
        this.triggerEvent('search', {value: this.value})
      }
    }
  }
})
