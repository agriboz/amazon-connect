export const state = () => ({
  templates: [
    {
      id: 1,
      name: 'template1',
      layout: [
        { x: 0, y: 0, w: 6, h: 25, i: '0' },
        { x: 6, y: 18, w: 3, h: 7, i: '1' },
        { x: 9, y: 18, w: 3, h: 7, i: '2' },
        { x: 6, y: 0, w: 6, h: 18, i: '3' }
      ]
    }
  ],
  selectedTemplate: null
})

export const mutations = {
  setSelectedTemplate(state, payload) {
    state.selectedTemplate = payload
  }
}

export const actions = {}
