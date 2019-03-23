// components/tag/tag.js
Component({
  properties: {
    name: {
      type: String,
      value: "tag"
    },
    uid: {
      type: String
    }
  },
  methods: {
    tap: function(e) {
      console.log(this.properties)
      this.triggerEvent('tag', { id: this.properties.uid, name: this.properties.name})
    }
  }
})
