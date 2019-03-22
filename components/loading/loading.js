
Component({
  properties: {
    loading: {
      type: Boolean,
      value: false,
      observer(loading) {
        if (loading){
          this.setData({
            myclass: 'loading'
          })
        }
      }
    }
  },
  data: {
    myclass: ''
  },
  methods: {

  }
})
