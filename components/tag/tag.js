// components/tag/tag.js
Component({
  properties: {
    name: {
      type: String,
      value: "tag"
    },
    uid: {
      type: String
    },
    bgColor: {
      type: String,
      value: '#2db7f5'
    },
    color: {
      type: String,
      value: '#fff'
    }
  },
  methods: {
    tap: function(e) {
      this.triggerEvent('tag', { id: this.properties.uid, name: this.properties.name})
    }
  }
})
